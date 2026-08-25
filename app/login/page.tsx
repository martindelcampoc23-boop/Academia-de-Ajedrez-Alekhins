'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/mi-cuenta';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    errorParam === 'OAuthSignin' || errorParam === 'OAuthCallback'
      ? '⚠️ Para habilitar el botón de Google se requiere configurar GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en las variables de entorno.'
      : errorParam
      ? 'Hubo un error al iniciar sesión. Por favor verifica tus credenciales.'
      : ''
  );

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage('Ocurrió un error inesperado al intentar iniciar sesión.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setErrorMessage('');
    signIn('google', { callbackUrl });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-[#121E17] border border-[#2B3E34] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8AA6E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1B4D3E]/10 rounded-full blur-3xl -z-10" />

        {/* Encabezado */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1B4D3E]/30 border border-[#C8AA6E]/40 text-[#C8AA6E] mb-2 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block">
            Portal Oficial Alekhins
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F6F3EC]">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-[#A8B2A6]">
            Accede a tus cursos, videoteca, tareas y pedidos de material.
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Botón de Google OAuth */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold flex items-center justify-center gap-3 transition shadow hover:shadow-md disabled:opacity-60 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isGoogleLoading ? 'Conectando con Google...' : 'Continuar con Google'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2B3E34]" />
            <span className="text-[11px] uppercase tracking-wider text-[#A8B2A6]">
              o con correo
            </span>
            <div className="flex-1 h-px bg-[#2B3E34]" />
          </div>
        </div>

        {/* Formulario de Correo & Contraseña */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#D2DBD0]">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Contraseña
              </label>
              <Link
                href="/login/recuperar"
                className="text-[11px] text-[#C8AA6E] hover:underline transition font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
          >
            <span>{isLoading ? 'Iniciando sesión...' : 'Ingresar a mi cuenta'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Pie de registro */}
        <div className="text-center pt-2 text-xs text-[#A8B2A6]">
          ¿Aún no tienes una cuenta?{' '}
          <Link
            href="/registro"
            className="text-[#C8AA6E] font-bold hover:underline transition"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-[#C8AA6E]">
          Cargando portal...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
