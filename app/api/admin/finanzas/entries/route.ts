import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// POST: Crear nuevo ingreso o egreso manual
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(user.role)) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
    }

    const body = await req.json();
    const { type, category, concept, amount, date, paymentMethod, notes } = body;

    if (!type || !['INCOME', 'EXPENSE'].includes(type)) {
      return NextResponse.json({ error: 'El tipo debe ser INCOME (Ingreso) o EXPENSE (Egreso).' }, { status: 400 });
    }

    if (!concept || concept.trim().length === 0) {
      return NextResponse.json({ error: 'El concepto o descripción es obligatorio.' }, { status: 400 });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: 'El monto debe ser un número positivo válido.' }, { status: 400 });
    }

    const entry = await prisma.financeEntry.create({
      data: {
        type,
        category: category || (type === 'INCOME' ? 'Ingreso General' : 'Gasto Operativo'),
        concept: concept.trim(),
        amount: numAmount,
        date: date ? new Date(date) : new Date(),
        paymentMethod: paymentMethod || 'Transferencia',
        notes: notes ? notes.trim() : null,
      },
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error: any) {
    console.error('Error al registrar movimiento financiero:', error);
    return NextResponse.json({ error: 'Error interno al registrar el movimiento.' }, { status: 500 });
  }
}

// DELETE: Eliminar un movimiento manual
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !['SUPERADMIN', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'No autorizado. Solo administradores pueden eliminar registros.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID de registro requerido.' }, { status: 400 });
    }

    const existing = await prisma.financeEntry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Registro no encontrado.' }, { status: 404 });
    }

    await prisma.financeEntry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Registro financiero eliminado correctamente.' });
  } catch (error: any) {
    console.error('Error al eliminar movimiento financiero:', error);
    return NextResponse.json({ error: 'Error interno al eliminar el movimiento.' }, { status: 500 });
  }
}

// PUT: Modificar un movimiento manual existente
export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !['SUPERADMIN', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
    }

    const body = await req.json();
    const { id, type, category, concept, amount, date, paymentMethod, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido.' }, { status: 400 });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: 'Monto inválido.' }, { status: 400 });
    }

    const updated = await prisma.financeEntry.update({
      where: { id },
      data: {
        ...(type && { type }),
        ...(category && { category }),
        ...(concept && { concept: concept.trim() }),
        amount: numAmount,
        ...(date && { date: new Date(date) }),
        ...(paymentMethod && { paymentMethod }),
        notes: notes ? notes.trim() : null,
      },
    });

    return NextResponse.json({ success: true, entry: updated });
  } catch (error: any) {
    console.error('Error al actualizar movimiento financiero:', error);
    return NextResponse.json({ error: 'Error al actualizar registro.' }, { status: 500 });
  }
}
