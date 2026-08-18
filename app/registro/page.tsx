'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ShieldCheck, Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

function RegisterFormContent() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Principiante');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas ingresadas no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          level,
          phone,
          role: 'STUDENT',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Ocurrió un error al registrar tu cuenta.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('¡Cuenta creada con éxito! Iniciando sesión...');

      // Auto login después del registro
      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/mi-cuenta',
      });

      if (loginRes?.error) {
        router.push('/login');
      } else {
        router.push('/mi-cuenta');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage('Ocurrió un error inesperado al conectar con el servidor.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn('google', { callbackUrl: '/mi-cuenta' });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 bg-[#121E17] border border-[#2B3E34] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8AA6E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1B4D3E]/10 rounded-full blur-3xl -z-10" />

        {/* Encabezado */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1B4D3E]/30 border border-[#C8AA6E]/40 text-[#C8AA6E] mb-2 shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block">
            Únete a la Academia
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F6F3EC]">
            Crear Cuenta de Alumno
          </h1>
          <p className="text-xs text-[#A8B2A6]">
            Comienza tu entrenamiento en ajedrez y accede a todas las herramientas.
          </p>
        </div>

        {/* Mensajes de Estado */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Botón de Google OAuth */}
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
          <span>{isGoogleLoading ? 'Conectando...' : 'Registrarse con Google (1-clic)'}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#2B3E34]" />
          <span className="text-[11px] uppercase tracking-wider text-[#A8B2A6]">
            o completa tus datos
          </span>
          <div className="flex-1 h-px bg-[#2B3E34]" />
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#D2DBD0]">
              Nombre Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Roberto Sánchez"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Nivel de Ajedrez
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#C8AA6E] transition"
              >
                <option value="Principiante">Iniciación / Principiante</option>
                <option value="Intermedio">Intermedio (Club)</option>
                <option value="Avanzado">Avanzado (Torneo)</option>
                <option value="Alto Rendimiento">Alto Rendimiento</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Teléfono / WhatsApp (Opcional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="55 1234 5678"
                className="w-full px-3 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mín. 6 caract."
                  className="w-full pl-9 pr-2 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite contras."
                  className="w-full pl-9 pr-2 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
          >
            <span>{isLoading ? 'Creando cuenta...' : 'Registrar mi cuenta'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Pie de login */}
        <div className="text-center pt-2 text-xs text-[#A8B2A6]">
          ¿Ya tienes una cuenta creada?{' '}
          <Link
            href="/login"
            className="text-[#C8AA6E] font-bold hover:underline transition"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-[#C8AA6E]">
          Cargando registro...
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
