import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const resetConfirmSchema = z.object({
  token: z.string().min(10, 'Token de recuperación inválido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetConfirmSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Datos de recuperación inválidos.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { token, password } = parsed.data;

    // Buscar token en la base de datos
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: 'El enlace de recuperación es inválido o no existe.' },
        { status: 400 }
      );
    }

    if (resetRecord.usedAt !== null) {
      return NextResponse.json(
        { error: 'Este enlace de recuperación ya ha sido utilizado.' },
        { status: 400 }
      );
    }

    if (new Date() > resetRecord.expiresAt) {
      return NextResponse.json(
        { error: 'El enlace de recuperación ha expirado. Por favor solicita uno nuevo.' },
        { status: 400 }
      );
    }

    // Buscar al usuario
    const user = await prisma.user.findUnique({
      where: { email: resetRecord.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No se encontró la cuenta asociada a este enlace.' },
        { status: 404 }
      );
    }

    // Hashear nueva contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Actualizar contraseña del usuario y marcar token como usado en transacción
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetRecord.id },
        data: { usedAt: new Date() },
      }),
      prisma.auditLog.create({
        data: {
          userId: user.id,
          userEmail: user.email,
          action: 'PASSWORD_RESET',
          entity: 'USER',
          entityId: user.id,
          details: 'Contraseña actualizada mediante token de recuperación',
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: '¡Tu contraseña ha sido actualizada exitosamente! Ya puedes iniciar sesión con tu nueva credencial.',
    });
  } catch (error: any) {
    console.error('❌ [PasswordReset] Error en reset-confirm:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al actualizar la contraseña.' },
      { status: 500 }
    );
  }
}
