import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { z } from 'zod';

const resetRequestSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Por favor ingresa un correo electrónico válido.' },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();

    // Buscar si existe el usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Por seguridad (anti user enumeration), respondemos positivamente incluso si el correo no existe
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Si el correo está registrado en la Academia, recibirás un enlace de recuperación en los próximos minutos.',
      });
    }

    // Invalidar tokens previos no usados para este email
    await prisma.passwordResetToken.updateMany({
      where: {
        email,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    // Generar token seguro
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora de validez

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com';
    const resetUrl = `${baseUrl}/login/nueva-contrasena?token=${token}`;

    console.info(`🔑 [PasswordReset] Token generado para ${email}: ${resetUrl}`);

    // Si existe RESEND_API_KEY en variables de entorno, enviamos el correo
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Academia Alekhins <contacto@ajedrezprofesional.com>',
            to: [email],
            subject: 'Restablecer contraseña — Academia de Ajedrez Alekhins',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #121E17; color: #F6F3EC; padding: 32px; border-radius: 12px; border: 1px solid #2B3E34;">
                <h1 style="color: #C8AA6E; font-size: 24px; margin-bottom: 16px;">Academia de Ajedrez Alekhins</h1>
                <p style="font-size: 15px; line-height: 1.6; color: #D2DBD0;">Hola,</p>
                <p style="font-size: 15px; line-height: 1.6; color: #D2DBD0;">
                  Recibimos una solicitud para restablecer la contraseña de tu cuenta en el portal de la Academia.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${resetUrl}" style="background-color: #C8AA6E; color: #0B1510; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; display: inline-block;">
                    Restablecer Contraseña
                  </a>
                </div>
                <p style="font-size: 13px; line-height: 1.5; color: #A8B2A6;">
                  Este enlace expirará en 1 hora. Si tú no solicitaste este cambio, puedes ignorar este correo de forma segura.
                </p>
                <hr style="border: 0; border-top: 1px solid #2B3E34; margin: 24px 0;" />
                <p style="font-size: 11px; color: #6E7D73;">
                  Academia de Ajedrez Alekhins | MI Roberto Abel Martín del Campo
                </p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('⚠️ [PasswordReset] Error enviando correo vía Resend:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Si el correo está registrado en la Academia, recibirás un enlace de recuperación en los próximos minutos.',
    });
  } catch (error: any) {
    console.error('❌ [PasswordReset] Error en reset-request:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar la solicitud. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
