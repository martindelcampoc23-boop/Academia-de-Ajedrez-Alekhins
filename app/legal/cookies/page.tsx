import React from 'react';
import Link from 'next/link';
import { Cookie, Shield, CheckCircle, Info } from 'lucide-react';

export const metadata = {
  title: 'Política de Cookies y Aviso Legal | Academia Alekhins',
  description: 'Información sobre el uso de cookies técnicas, analíticas y de personalización en la plataforma de la Academia Alekhins.',
};

export default function CookiesLegalPage() {
  return (
    <div className="bg-[#0B1510] text-[#F6F3EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="border-b border-[#2B3E34] pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/40 border border-[#D8B155]/40 text-[#D8B155] text-xs font-semibold uppercase tracking-wider">
            <Cookie className="w-3.5 h-3.5" />
            Transparencia Digital
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Política de Cookies & Aviso Legal
          </h1>
          <p className="text-sm text-[#A8B2A6]">
            Cómo utilizamos cookies y tecnologías similares para garantizar el funcionamiento del portal del alumno y la tienda.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#D2DBD0] leading-relaxed">
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">1.</span> ¿Qué son las Cookies?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para recordar información sobre tu visita, mantener tu sesión iniciada y optimizar tu experiencia de aprendizaje y compra.
            </p>
          </section>

          <section className="space-y-4 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">2.</span> Tipos de Cookies que Utilizamos
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#0B1510] border border-[#2B3E34]">
                <h3 className="font-bold text-white text-sm">A. Cookies Técnicas y Esenciales (Obligatorias)</h3>
                <p className="text-xs text-[#A8B2A6] mt-1">
                  Permiten el inicio de sesión seguro, la persistencia del carrito de compras, la protección CSRF y la entrega de tareas interactivas. Sin estas cookies, la plataforma no puede funcionar.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0B1510] border border-[#2B3E34]">
                <h3 className="font-bold text-white text-sm">B. Cookies de Rendimiento y Análisis</h3>
                <p className="text-xs text-[#A8B2A6] mt-1">
                  Nos ayudan a comprender cómo interactúan los alumnos con la plataforma, detectar posibles errores de carga y mejorar continuamente la velocidad del sitio.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0B1510] border border-[#2B3E34]">
                <h3 className="font-bold text-white text-sm">C. Cookies de Preferencias</h3>
                <p className="text-xs text-[#A8B2A6] mt-1">
                  Recuerdan tus ajustes visuales del tablero de ajedrez, temas de color y preferencias de notificaciones.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">3.</span> Control y Desactivación de Cookies
            </h2>
            <p>
              Puedes configurar tu navegador web en cualquier momento para rechazar, bloquear o eliminar cookies. Ten en cuenta que si deshabilitas las cookies esenciales, no podrás iniciar sesión en tu portal de alumno ni completar compras en la tienda.
            </p>
          </section>
        </div>

        <div className="p-6 rounded-xl bg-[#121E17] border border-[#2B3E34] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-white">¿Dudas adicionales sobre privacidad o cookies?</p>
            <p className="text-xs text-[#A8B2A6]">Escríbenos a soporte@alekhins.com</p>
          </div>
          <Link
            href="/legal/terminos"
            className="px-4 py-2 rounded bg-[#1B4D3E] hover:bg-[#226350] text-[#D8B155] text-xs font-bold transition shrink-0"
          >
            Volver a Términos →
          </Link>
        </div>
      </div>
    </div>
  );
}
