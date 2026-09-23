'use client';

import React from 'react';

/**
 * AnimatedLogoHero
 * Presentación animada premium del logotipo oficial vectorizado de Alekhins
 * - Efecto de levitación 3D suave y continuo
 * - Resplandor áurico esmeralda y oro (luz volumétrica)
 * - Reflejo / brillo de luz (shimmer) sobre el acabado plateado
 * - Sombra dinámica que reacciona a la altura
 * - Micropartículas flotantes doradas
 */
export function AnimatedLogoHero() {
  return (
    <div className="relative flex items-center justify-center w-full py-4 select-none" aria-hidden="true">
      <style>{`
        @keyframes hero-logo-levitate {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          30% {
            transform: translateY(-10px) rotate(-0.8deg) scale(1.015);
          }
          70% {
            transform: translateY(-16px) rotate(0.8deg) scale(1.025);
          }
        }

        @keyframes hero-logo-shadow {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.55;
          }
          50% {
            transform: scaleX(0.75) scaleY(0.7);
            opacity: 0.22;
          }
        }

        @keyframes hero-aura-breathe {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.06);
          }
        }

        @keyframes hero-light-sheen {
          0% {
            transform: translateX(-150%) skewX(-25deg);
            opacity: 0;
          }
          30% {
            opacity: 0.7;
          }
          60%, 100% {
            transform: translateX(250%) skewX(-25deg);
            opacity: 0;
          }
        }

        @keyframes hero-spark-float-1 {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          40% {
            opacity: 1;
            transform: translate(-14px, -28px) scale(1.1);
          }
          100% {
            transform: translate(-26px, -55px) scale(0);
            opacity: 0;
          }
        }

        @keyframes hero-spark-float-2 {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          40% {
            opacity: 1;
            transform: translate(16px, -32px) scale(1.2);
          }
          100% {
            transform: translate(30px, -60px) scale(0);
            opacity: 0;
          }
        }

        .anim-hero-logo {
          animation: hero-logo-levitate 3.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .anim-hero-shadow {
          animation: hero-logo-shadow 3.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .anim-hero-aura {
          animation: hero-aura-breathe 2.8s ease-in-out infinite;
        }

        .anim-hero-sheen {
          animation: hero-light-sheen 4.2s ease-in-out infinite 0.8s;
        }

        .anim-spark-1 {
          animation: hero-spark-float-1 2.2s ease-out infinite 0.2s;
        }

        .anim-spark-2 {
          animation: hero-spark-float-2 2.6s ease-out infinite 1.1s;
        }
      `}</style>

      {/* Contenedor central con proporciones premium */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] flex flex-col items-center justify-center p-4">

        {/* Resplandor áurico multicapa (Oro + Esmeralda) */}
        <div
          className="absolute inset-0 m-auto w-64 h-32 sm:w-80 sm:h-44 rounded-full anim-hero-aura pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(216,177,85,0.28) 0%, rgba(27,77,62,0.35) 45%, transparent 75%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Halo de luz puntual central */}
        <div
          className="absolute inset-0 m-auto w-40 h-20 rounded-full anim-hero-aura pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(216,177,85,0.15) 50%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Partículas de energía dorada */}
        <div className="absolute top-1/3 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute -left-36 -top-8 w-2 h-2 rounded-full bg-[#E8C865] anim-spark-1"
            style={{ boxShadow: '0 0 10px 3px rgba(232,200,101,0.95)' }}
          />
          <div
            className="absolute left-32 -top-6 w-2.5 h-2.5 rounded-full bg-[#D8B155] anim-spark-2"
            style={{ boxShadow: '0 0 12px 4px rgba(216,177,85,0.9)' }}
          />
          <div
            className="absolute -left-12 -top-14 w-1.5 h-1.5 rounded-full bg-[#FFF5DB] anim-spark-2"
            style={{ boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)' }}
          />
        </div>

        {/* ── LOGOTIPO VECTORIAL CON LEVITACIÓN 3D Y DESTELLO ── */}
        <div className="anim-hero-logo relative z-10 w-full flex items-center justify-center group cursor-pointer">
          <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-transform duration-500 hover:scale-[1.03]">
            {/* Destello de luz transversal (Sheen) */}
            <div
              className="absolute inset-0 w-1/3 h-full anim-hero-sheen pointer-events-none z-20"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
              }}
            />

            {/* Logotipo SVG oficial con filtros de sombra y resplandor */}
            <img
              src="/alekhins-logo-vector.svg"
              alt="Alekhins Academia de Ajedrez — Logotipo Oficial"
              className="w-full h-auto max-h-36 sm:max-h-44 object-contain brightness-115 contrast-105 transition-all duration-300 group-hover:brightness-130"
              style={{
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.65)) drop-shadow(0 0 20px rgba(216,177,85,0.35))',
              }}
            />
          </div>
        </div>

        {/* ── Sombra elíptica dinámica en la base ── */}
        <div className="relative -mt-3 sm:-mt-4 w-3/4 flex justify-center pointer-events-none">
          <div
            className="anim-hero-shadow w-52 sm:w-64 h-4 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(11,21,16,0.5) 55%, transparent 75%)',
              filter: 'blur(5px)',
            }}
          />
        </div>

        {/* Sello de Autenticidad debajo del logo animado */}
        <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-[#D8B155]/90 border border-[#D8B155]/30 bg-[#0F2E1E]/60 px-3.5 py-1 rounded-full backdrop-blur-sm shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8B155] animate-pulse" />
          <span>Sello Oficial de Excelencia FIDE</span>
        </div>
      </div>
    </div>
  );
}
