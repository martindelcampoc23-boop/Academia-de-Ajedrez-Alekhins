import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('planId');

    const homeworks = await prisma.homework.findMany({
      where: planId ? { planId } : undefined,
      include: {
        plan: {
          select: { id: true, name: true, level: true },
        },
        submissions: {
          include: {
            student: {
              include: {
                user: {
                  select: { name: true, email: true, image: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ homeworks });
  } catch (error: any) {
    console.error('Error al obtener tareas:', error);
    return NextResponse.json({ error: 'Error al consultar tareas.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para crear tareas.' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, fen, pgn, solution, dueDate, planId, attachmentUrl, attachmentName } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'El título y la descripción son obligatorios.' }, { status: 400 });
    }

    const homework = await prisma.homework.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        fen: fen?.trim() || 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        pgn: pgn?.trim() || null,
        solution: solution?.trim() || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        planId: planId || null,
        coachName: user.name || 'MI Roberto Martín del Campo',
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachmentName?.trim() || null,
      },
    });

    return NextResponse.json({ message: 'Tarea creada exitosamente.', homework }, { status: 201 });
  } catch (error: any) {
    console.error('Error al crear tarea:', error);
    return NextResponse.json({ error: 'Error interno al crear tarea.' }, { status: 500 });
  }
}
