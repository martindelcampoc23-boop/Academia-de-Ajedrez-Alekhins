import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para calificar tareas.' }, { status: 403 });
    }

    const body = await req.json();
    const { submissionId, grade, feedback } = body;

    if (!submissionId) {
      return NextResponse.json({ error: 'ID de entrega requerido.' }, { status: 400 });
    }

    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade: grade !== undefined ? parseFloat(grade) : null,
        feedback: feedback?.trim() || null,
        status: 'REVIEWED',
        reviewedAt: new Date(),
      },
      include: {
        homework: true,
        student: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    });

    return NextResponse.json({ message: 'Calificación y feedback guardados.', submission: updated });
  } catch (error: any) {
    console.error('Error al calificar entrega:', error);
    return NextResponse.json({ error: 'Error interno al calificar la tarea.' }, { status: 500 });
  }
}
