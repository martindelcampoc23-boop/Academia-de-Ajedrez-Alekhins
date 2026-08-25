import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET || 'alekhins-chess-academy-super-secret-key-2026';
  const token = await getToken({ req, secret });

  // 1. Proteger panel de administración (/admin/*)
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = (token as any)?.role;
    if (!['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(role)) {
      // Redirigir a inicio si no tiene permisos administrativos
      return NextResponse.redirect(new URL('/mi-cuenta', req.url));
    }
  }

  // 2. Proteger panel docente / maestro (/maestro/*)
  if (pathname.startsWith('/maestro')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = (token as any)?.role;
    if (!['SUPERADMIN', 'ADMIN', 'COACH'].includes(role)) {
      return NextResponse.redirect(new URL('/mi-cuenta', req.url));
    }
  }

  // 3. Proteger portal de usuario (/mi-cuenta/*)
  if (pathname.startsWith('/mi-cuenta')) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/maestro/:path*', '/mi-cuenta/:path*'],
};
