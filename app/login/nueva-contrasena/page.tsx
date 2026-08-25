'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

function NuevaContrasenaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    !token ? 'Enlace de recuperación inválido o ausente. Por favor solicita uno nuevo.' : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage('Token de recuperación faltante.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe contener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Verifica e intenta de nuevo.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/reset-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'No se pudo actualizar la contraseña.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage('Error al comunicarse con el servidor. Intenta de nuevo.');
      setIsLoading(false);
    }
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
            <KeyRound className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block">
            Seguridad &amp; Acceso
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F6F3EC]">
            Nueva Contraseña
          </h1>
          <p className="text-xs text-[#A8B2A6]">
            Crea una nueva contraseña segura para tu cuenta en la Academia.
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#1B4D3E]/40 border border-[#C8AA6E]/40 flex items-center justify-center text-[#C8AA6E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#F6F3EC]">
                ¡Contraseña Actualizada!
              </h3>
              <p className="text-xs text-[#A8B2A6] leading-relaxed">
                Tu clave de acceso ha sido restablecida exitosamente. Ya puedes iniciar sesión con tus nuevas credenciales.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/login"
                className="w-full py-3 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl"
              >
                <span>Ir al Inicio de Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Nueva Contraseña (mínimo 6 caracteres)
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
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
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
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full py-3 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? 'Actualizando clave...' : 'Guardar Nueva Contraseña'}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center pt-2 text-xs text-[#A8B2A6]">
              <Link href="/login" className="text-[#C8AA6E] hover:underline">
                Cancelar y volver a login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function NuevaContrasenaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-[#C8AA6E]">
          Cargando formulario...
        </div>
      }
    >
      <NuevaContrasenaContent />
    </Suspense>
  );
}
