'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Ocurrió un error al procesar tu solicitud.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setSuccessMessage(data.message || 'Instrucciones enviadas con éxito.');
      setIsLoading(false);
    } catch (err) {
      setErrorMessage('Error de conexión con el servidor. Intenta de nuevo.');
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block">
            Seguridad &amp; Acceso
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F6F3EC]">
            Recuperar Contraseña
          </h1>
          <p className="text-xs text-[#A8B2A6]">
            Ingresa tu correo electrónico registrado y te enviaremos un enlace seguro para restablecer tu acceso.
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
                Solicitud Procesada
              </h3>
              <p className="text-xs text-[#A8B2A6] leading-relaxed">
                {successMessage}
              </p>
            </div>
            <div className="pt-4 border-t border-[#2B3E34]">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs text-[#C8AA6E] hover:underline font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Volver a Iniciar Sesión
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#D2DBD0]">
                Correo Electrónico Registrado
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#A8B2A6] hover:text-[#C8AA6E] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Regresar al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
