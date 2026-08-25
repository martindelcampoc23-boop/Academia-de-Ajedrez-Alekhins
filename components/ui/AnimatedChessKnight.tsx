'use client';

import React from 'react';
import Image from 'next/image';

/**
 * AnimatedChessKnight
 * Caballo de ajedrez 3D real animado con CSS keyframes:
 * - Flotación suave con leve balanceo
 * - Brillo dorado pulsante alrededor
 * - Sombra dinámica que se encoge/crece
 * - Partículas de luz doradas ascendentes
 * - Trayectoria en L decorativa
 */
export function AnimatedChessKnight() {
  return (
    <div className="relative flex items-center justify-center w-full h-full" aria-hidden="true">
      <style>{`
        @keyframes knight-float {
          0%   { transform: translateY(0px) rotate(-1.5deg) scale(1); }
          30%  { transform: translateY(-16px) rotate(1.5deg) scale(1.02); }
          60%  { transform: translateY(-26px) rotate(-1deg) scale(1.03); }
          80%  { transform: translateY(-12px) rotate(2deg) scale(1.01); }
          100% { transform: translateY(0px) rotate(-1.5deg) scale(1); }
        }
        @keyframes shadow-breathe {
          0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.5; }
          60%       { transform: scaleX(0.6) scaleY(0.6); opacity: 0.15; }
        }
        @keyframes glow-ring {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50%       { opacity: 0.75; transform: scale(1.05); }
        }
        @keyframes glow-outer {
          0%, 100% { opacity: 0.1; transform: scale(0.9); }
          50%       { opacity: 0.28; transform: scale(1.1); }
        }
        @keyframes particle-a {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
          100% { transform: translate(-8px, -48px) scale(0); opacity: 0; }
        }
        @keyframes particle-b {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
          100% { transform: translate(10px, -52px) scale(0); opacity: 0; }
        }
        @keyframes particle-c {
          0%   { transform: translate(0px, 0px) scale(1); opacity: 0.7; }
          100% { transform: translate(-4px, -38px) scale(0); opacity: 0; }
        }
        @keyframes l-trail-h {
          0%   { width: 0%; opacity: 0; }
          20%  { opacity: 1; }
          60%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes l-trail-v {
          0%, 55%  { height: 0%; opacity: 0; }
          65%      { opacity: 1; }
          90%      { height: 100%; opacity: 1; }
          100%     { height: 100%; opacity: 0; }
        }
        @keyframes dot-pop {
          0%, 60%  { transform: scale(0); opacity: 0; }
          75%      { transform: scale(1.4); opacity: 1; }
          100%     { transform: scale(1); opacity: 0.8; }
        }
        @keyframes shimmer-sweep {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .knight-floating {
          animation: knight-float 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .knight-shadow-el {
          animation: shadow-breathe 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .glow-ring-el {
          animation: glow-ring 3s ease-in-out infinite;
        }
        .glow-outer-el {
          animation: glow-outer 3s ease-in-out infinite 0.5s;
        }
        .pt-a { animation: particle-a 2.2s ease-out infinite 0.3s; }
        .pt-b { animation: particle-b 2.2s ease-out infinite 1s; }
        .pt-c { animation: particle-c 2.2s ease-out infinite 1.7s; }
        .trail-h { animation: l-trail-h 3.5s ease-in-out infinite 0.5s; }
        .trail-v { animation: l-trail-v 3.5s ease-in-out infinite 0.5s; }
        .trail-dot { animation: dot-pop 3.5s ease-in-out infinite 0.5s; }
        .knight-shimmer {
          background: linear-gradient(105deg, transparent 30%, rgba(216,177,85,0.15) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer-sweep 3s linear infinite;
        }
      `}</style>

      {/* Contenedor principal de la animación */}
      <div className="relative w-80 h-96 flex items-end justify-center">

        {/* ── BRILLO EXTERIOR DIFUSO ─────────────────────────── */}
        <div
          className="absolute inset-0 rounded-full glow-outer-el pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 50% 55%, rgba(216,177,85,0.25) 0%, transparent 70%)',
          }}
        />

        {/* ── BRILLO DORADO INTERNO (ring) ──────────────────── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full glow-ring-el pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(216,177,85,0.22) 0%, transparent 65%)',
            filter: 'blur(12px)',
          }}
        />

        {/* ── TRAYECTORIA EN L (movimiento del caballo) ─────── */}
        <div className="absolute bottom-20 right-6 w-20 h-16 pointer-events-none">
          {/* Línea horizontal */}
          <div
            className="absolute bottom-0 right-0 h-0.5 trail-h origin-right"
            style={{ background: 'linear-gradient(to left, #C8AA6E, transparent)', width: '100%' }}
          />
          {/* Línea vertical */}
          <div
            className="absolute top-0 right-0 w-0.5 trail-v origin-bottom"
            style={{ background: 'linear-gradient(to top, #C8AA6E, transparent)', height: '100%' }}
          />
          {/* Punto de destino */}
          <div
            className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C8AA6E] trail-dot"
            style={{ boxShadow: '0 0 8px 2px rgba(200,170,110,0.8)' }}
          />
        </div>

        {/* ── PARTÍCULAS DORADAS ─────────────────────────────── */}
        <div className="absolute left-1/2 top-1/3 pointer-events-none">
          <div className="absolute -left-8 -top-2 w-2.5 h-2.5 rounded-full bg-[#C8AA6E] pt-a"
            style={{ boxShadow: '0 0 6px 1px rgba(200,170,110,0.7)' }} />
          <div className="absolute left-10 top-0 w-2 h-2 rounded-full bg-[#E8D080] pt-b"
            style={{ boxShadow: '0 0 5px 1px rgba(232,208,128,0.7)' }} />
          <div className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-[#C8AA6E] pt-c"
            style={{ boxShadow: '0 0 4px 1px rgba(200,170,110,0.6)' }} />
        </div>

        {/* ── IMAGEN DEL CABALLO + ANIMACIÓN ─────────────────── */}
        <div className="knight-floating relative z-10 w-64 h-80 flex items-end justify-center">
          {/* Overlay shimmer encima de la imagen */}
          <div className="absolute inset-0 rounded-2xl knight-shimmer z-20 pointer-events-none" />

          <Image
            src="/chess-knight.jpg"
            alt="Caballo de Ajedrez — Academia Alekhins"
            width={320}
            height={400}
            className="object-contain w-full h-full drop-shadow-[0_0_32px_rgba(216,177,85,0.55)]"
            style={{
              filter: 'drop-shadow(0 0 24px rgba(216,177,85,0.5)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
            }}
            priority
          />
        </div>

        {/* ── SOMBRA DINÁMICA DEBAJO ─────────────────────────── */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-5 rounded-full knight-shadow-el"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, transparent 75%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Halo de suelo dorado */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-36 h-3 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(216,177,85,0.3) 0%, transparent 75%)',
            filter: 'blur(6px)',
            animation: 'shadow-breathe 4s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
