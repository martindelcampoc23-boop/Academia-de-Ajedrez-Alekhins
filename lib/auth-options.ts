import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'alekhins-chess-academy-super-secret-key-2026',
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo Electrónico', type: 'email', placeholder: 'tu@correo.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Por favor ingresa tu correo y contraseña.');
        }

        const email = credentials.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('No encontramos una cuenta con este correo electrónico.');
        }

        // Si es usuario demo inicial sin bcrypt o demo hash
        if (
          user.passwordHash === 'admin123_hash' ||
          user.passwordHash === 'alumno123_hash' ||
          user.passwordHash === credentials.password
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role,
            image: user.image || null,
          };
        }

        if (user.passwordHash) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name || '',
              role: user.role,
              image: user.image || null,
            };
          }
        }

        throw new Error('Contraseña incorrecta. Por favor verifica tus credenciales.');
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const email = user.email.toLowerCase();
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                name: user.name || 'Usuario Google',
                image: user.image || null,
                role: 'STUDENT',
                customer: {
                  create: {},
                },
                student: {
                  create: {
                    level: 'Principiante',
                  },
                },
              },
            });
          } else if (user.image && !existingUser.image) {
            await prisma.user.update({
              where: { email },
              data: { image: user.image },
            });
          }
          return true;
        } catch (error) {
          console.error('Error al sincronizar usuario de Google:', error);
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'CUSTOMER';
        token.picture = user.image;
      }

      // Si se ejecuta una actualización de sesión del cliente
      if (trigger === 'update' && session) {
        if (session.name) token.name = session.name;
        if (session.role) token.role = session.role;
      }

      // Asegurar que el rol siempre esté actualizado desde DB
      if (token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, name: true, image: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          if (dbUser.name) token.name = dbUser.name;
          if (dbUser.image) token.picture = dbUser.image;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || 'CUSTOMER';
        if (token.picture) session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
