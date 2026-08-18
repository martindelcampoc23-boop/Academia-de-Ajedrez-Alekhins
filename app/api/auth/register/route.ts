import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  role: z.enum(['STUDENT', 'CUSTOMER']).optional().default('STUDENT'),
  level: z.string().optional().default('Principiante'),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessage = parsed.error.issues[0]?.message || 'Datos de registro inválidos.';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, password, role, level, phone } = parsed.data;
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta registrada con este correo electrónico.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        role: role || 'STUDENT',
        customer: {
          create: {
            phone: phone || null,
          },
        },
        student: {
          create: {
            level: level || 'Principiante',
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Cuenta creada exitosamente. Ya puedes iniciar sesión.',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al registrar la cuenta. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
