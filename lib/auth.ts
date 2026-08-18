import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export interface UserSession {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
  role: 'SUPERADMIN' | 'ADMIN' | 'COACH' | 'OPERACIONES' | 'STUDENT' | 'CUSTOMER';
}

const AUTH_COOKIE_NAME = 'alekhins_auth_token';

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    // 1. Intentar obtener sesión estándar de NextAuth
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      return {
        id: (session.user as any).id || '',
        email: session.user.email,
        name: session.user.name || null,
        image: session.user.image || null,
        role: ((session.user as any).role as UserSession['role']) || 'CUSTOMER',
      };
    }
  } catch (err) {
    // Fallback a cookie directa si NextAuth no está disponible
  }

  // 2. Fallback a cookie de sesión directa
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: token },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role as UserSession['role'],
    };
  } catch (error) {
    return null;
  }
}

export async function loginDemoUser(email: string): Promise<UserSession | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role as UserSession['role'],
  };
}

export async function logoutUser() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
