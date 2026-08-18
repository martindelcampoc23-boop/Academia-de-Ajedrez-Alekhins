import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'ADMIN' && currentUser.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para gestionar usuarios.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const roleFilter = searchParams.get('role');
    const search = searchParams.get('search')?.toLowerCase();

    // Obtener todos los usuarios registrados en el sistema
    const users = await prisma.user.findMany({
      where: {
        ...(roleFilter && roleFilter !== 'ALL' ? { role: roleFilter } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        customer: {
          select: { phone: true, notes: true },
        },
        student: {
          include: {
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
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Formatear usuarios asegurando que tengan registro unificado
    const formattedUsers = users.map((u) => ({
      id: u.id,
      userId: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      image: u.image,
      createdAt: u.createdAt,
      phone: u.customer?.phone || null,
      studentId: u.student?.id || null,
      level: u.student?.level || 'Principiante',
      status: u.student?.status || (u.role === 'SUPERADMIN' || u.role === 'ADMIN' ? 'APPROVED' : 'PENDING'),
      approvedAt: u.student?.approvedAt || null,
      approvedBy: u.student?.approvedBy || null,
      rejectionReason: u.student?.rejectionReason || null,
      notes: u.student?.notes || u.customer?.notes || null,
      enrollments: u.student?.enrollments || [],
      submissions: u.student?.submissions || [],
    }));

    // Filtrar por status si se especificó
    const filtered = status && status !== 'ALL'
      ? formattedUsers.filter((u) => u.status === status)
      : formattedUsers;

    return NextResponse.json({ users: filtered });
  } catch (error: any) {
    console.error('Error al consultar usuarios:', error);
    return NextResponse.json({ error: 'Error al consultar usuarios.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'ADMIN' && currentUser.role !== 'COACH')) {
      return NextResponse.json({ error: 'No autorizado para modificar usuarios.' }, { status: 403 });
    }

    const body = await req.json();
    const { userId, studentId, role, status, level, notes, rejectionReason } = body;

    const targetUserId = userId || (studentId ? (await prisma.student.findUnique({ where: { id: studentId } }))?.userId : null);

    if (!targetUserId) {
      return NextResponse.json({ error: 'Falta el ID del usuario a modificar.' }, { status: 400 });
    }

    // 1. Si se solicita actualizar el Rol del usuario (solo Admins y Superadmins pueden asignar roles)
    if (role) {
      if (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Solo los administradores pueden cambiar roles.' }, { status: 403 });
      }

      // No permitir que un ADMIN común promueva a SUPERADMIN (solo un SUPERADMIN puede promover a SUPERADMIN)
      if (role === 'SUPERADMIN' && currentUser.role !== 'SUPERADMIN') {
        return NextResponse.json({ error: 'Solo un Superadmin puede asignar el rol de Superadmin.' }, { status: 403 });
      }

      await prisma.user.update({
        where: { id: targetUserId },
        data: { role },
      });
    }

    // 2. Asegurar o actualizar el registro de Student
    let student = await prisma.student.findUnique({
      where: { userId: targetUserId },
    });

    if (!student) {
      student = await prisma.student.create({
        data: {
          userId: targetUserId,
          level: level || 'Principiante',
          status: status || (role === 'COACH' || role === 'ADMIN' || role === 'SUPERADMIN' ? 'APPROVED' : 'PENDING'),
          approvedAt: status === 'APPROVED' ? new Date() : undefined,
          approvedBy: status === 'APPROVED' ? currentUser.name || currentUser.email : undefined,
        },
      });
    } else {
      student = await prisma.student.update({
        where: { id: student.id },
        data: {
          status: status || undefined,
          level: level || undefined,
          notes: notes !== undefined ? notes : undefined,
          rejectionReason: rejectionReason !== undefined ? rejectionReason : undefined,
          approvedAt: status === 'APPROVED' ? new Date() : undefined,
          approvedBy: status === 'APPROVED' ? currentUser.name || currentUser.email : undefined,
        },
      });
    }

    return NextResponse.json({
      message: 'Usuario y rol actualizados exitosamente.',
      student,
    });
  } catch (error: any) {
    console.error('Error al actualizar rol y estado del usuario:', error);
    return NextResponse.json({ error: 'Error interno al actualizar usuario.' }, { status: 500 });
  }
}
