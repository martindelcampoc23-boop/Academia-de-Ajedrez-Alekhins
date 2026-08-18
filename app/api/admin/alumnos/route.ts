import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para gestionar alumnos.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    const students = await prisma.student.findMany({
      where: {
        status: status && status !== 'ALL' ? status : undefined,
        ...(search
          ? {
              user: {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                ],
              },
            }
          : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
            customer: {
              select: { phone: true },
            },
          },
        },
        enrollments: {
          include: {
            plan: {
              select: { id: true, name: true, level: true },
            },
          },
        },
        submissions: {
          select: {
            id: true,
            status: true,
            grade: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ students });
  } catch (error: any) {
    console.error('Error al consultar alumnos:', error);
    return NextResponse.json({ error: 'Error al consultar alumnos.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para modificar alumnos.' }, { status: 403 });
    }

    const body = await req.json();
    const { studentId, status, level, notes, rejectionReason, role } = body;

    if (!studentId) {
      return NextResponse.json({ error: 'Falta el ID del alumno.' }, { status: 400 });
    }

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        status: status || undefined,
        level: level || undefined,
        notes: notes !== undefined ? notes : undefined,
        rejectionReason: rejectionReason !== undefined ? rejectionReason : undefined,
        approvedAt: status === 'APPROVED' ? new Date() : undefined,
        approvedBy: status === 'APPROVED' ? user.name || user.email : undefined,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    // Si también se solicita actualizar el rol del usuario (por ejemplo a COACH o STUDENT)
    if (role && (user.role === 'SUPERADMIN' || user.role === 'ADMIN')) {
      await prisma.user.update({
        where: { id: updatedStudent.userId },
        data: { role },
      });
    }

    return NextResponse.json({
      message: 'Alumno actualizado exitosamente.',
      student: updatedStudent,
    });
  } catch (error: any) {
    console.error('Error al actualizar alumno:', error);
    return NextResponse.json({ error: 'Error interno al actualizar alumno.' }, { status: 500 });
  }
}
