import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para entregar tareas.' }, { status: 401 });
    }

    const body = await req.json();
    const { homeworkId, solutionText, solutionMoves } = body;

    if (!homeworkId || !solutionText) {
      return NextResponse.json({ error: 'Faltan datos de la solución.' }, { status: 400 });
    }

    // Asegurar que el usuario tenga un registro de estudiante
    let student = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      student = await prisma.student.create({
        data: {
          userId: user.id,
          level: 'Principiante',
        },
      });
    }

    // Buscar si ya existe una entrega previa
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        homeworkId,
        studentId: student.id,
      },
    });

    let submission;
    if (existingSubmission) {
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          solutionText: solutionText.trim(),
          solutionMoves: solutionMoves?.trim() || null,
          status: 'SUBMITTED',
          submittedAt: new Date(),
        },
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          homeworkId,
          studentId: student.id,
          solutionText: solutionText.trim(),
          solutionMoves: solutionMoves?.trim() || null,
          status: 'SUBMITTED',
        },
      });
    }

    return NextResponse.json({ message: 'Tarea entregada exitosamente.', submission });
  } catch (error: any) {
    console.error('Error al entregar tarea:', error);
    return NextResponse.json({ error: 'Error interno al enviar la entrega.' }, { status: 500 });
  }
}
