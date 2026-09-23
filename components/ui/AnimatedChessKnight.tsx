'use client';

import React from 'react';

/**
 * AnimatedChessKnight
 * Caballo blanco Staunton en SVG 3D vectorial puro (sin fondo/transparente)
 * - Animación más rápida y fluida (ciclo de 2.2 segundos)
 * - Efecto de levitación con balanceo táctico
 * - Brillos dorados y reflejos marfil de alta definición
 * - Sombra dinámica reactiva al movimiento
 */
export function AnimatedChessKnight() {
  return (
    <div className="relative flex items-center justify-center w-full h-full" aria-hidden="true">
      <style>{`
        @keyframes fast-knight-float {
          0% {
            transform: translateY(0px) rotate(-1.5deg) scale(1);
          }
          30% {
            transform: translateY(-18px) rotate(2deg) scale(1.02);
          }
          60% {
            transform: translateY(-28px) rotate(-1.5deg) scale(1.035);
          }
          85% {
            transform: translateY(-10px) rotate(1deg) scale(1.01);
          }
          100% {
            transform: translateY(0px) rotate(-1.5deg) scale(1);
          }
        }

        @keyframes fast-shadow-pulse {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.6;
          }
          60% {
            transform: scaleX(0.55) scaleY(0.55);
            opacity: 0.18;
          }
        }

        @keyframes fast-glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.08);
          }
        }

        @keyframes spark-float-1 {
          0%   { transform: translate(0, 0) scale(0.8); opacity: 0; }
          40%  { opacity: 1; transform: translate(-10px, -30px) scale(1.2); }
          100% { transform: translate(-20px, -65px) scale(0); opacity: 0; }
        }

        @keyframes spark-float-2 {
          0%   { transform: translate(0, 0) scale(0.8); opacity: 0; }
          40%  { opacity: 1; transform: translate(12px, -35px) scale(1.2); }
          100% { transform: translate(24px, -70px) scale(0); opacity: 0; }
        }

        @keyframes spark-float-3 {
          0%   { transform: translate(0, 0) scale(0.8); opacity: 0; }
          40%  { opacity: 1; transform: translate(-6px, -25px) scale(1); }
          100% { transform: translate(-12px, -55px) scale(0); opacity: 0; }
        }

        .knight-fast-motion {
          animation: fast-knight-float 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .knight-fast-shadow {
          animation: fast-shadow-pulse 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .knight-fast-glow {
          animation: fast-glow-pulse 1.8s ease-in-out infinite;
        }

        .spark-1 { animation: spark-float-1 1.6s ease-out infinite 0.1s; }
        .spark-2 { animation: spark-float-2 1.6s ease-out infinite 0.6s; }
        .spark-3 { animation: spark-float-3 1.6s ease-out infinite 1.1s; }
      `}</style>

      {/* Contenedor principal */}
      <div className="relative w-80 h-96 flex items-end justify-center">

        {/* ── RESPLANDOR DORADO DE FONDO (SIN BORDES, TOTALMENTE DIFUSO) ── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full knight-fast-glow pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(216,177,85,0.28) 0%, rgba(216,177,85,0.08) 50%, transparent 75%)',
            filter: 'blur(20px)',
          }}
        />

        {/* ── PARTÍCULAS DORADAS FLOTANTES ── */}
        <div className="absolute left-1/2 top-1/3 pointer-events-none">
          <div
            className="absolute -left-12 -top-4 w-2 h-2 rounded-full bg-[#E8C865] spark-1"
            style={{ boxShadow: '0 0 8px 2px rgba(232,200,101,0.9)' }}
          />
          <div
            className="absolute left-14 -top-8 w-2.5 h-2.5 rounded-full bg-[#D8B155] spark-2"
            style={{ boxShadow: '0 0 10px 3px rgba(216,177,85,0.9)' }}
          />
          <div
            className="absolute -left-4 top-10 w-1.5 h-1.5 rounded-full bg-white spark-3"
            style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.9)' }}
          />
        </div>

        {/* ── CABALLO BLANCO 3D VECTORIAL (TRANSPARENTE / SIN FONDO) ── */}
        <div className="knight-fast-motion relative z-10 w-72 h-88 flex items-end justify-center drop-shadow-[0_10px_35px_rgba(216,177,85,0.45)]">
          <svg
            viewBox="0 0 240 290"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradiente principal cuerpo marfil/blanco */}
              <linearGradient id="ivoryBody" x1="40" y1="30" x2="200" y2="260" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FAF7F0" />
                <stop offset="65%" stopColor="#E6DCB8" />
                <stop offset="90%" stopColor="#C9B88E" />
                <stop offset="100%" stopColor="#9C8758" />
              </linearGradient>

              {/* Gradiente de luz especular frontal */}
              <linearGradient id="specularGlow" x1="120" y1="20" x2="60" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#FAF4E6" stopOpacity="0" />
              </linearGradient>

              {/* Gradiente de sombras posicionales */}
              <linearGradient id="darkShadows" x1="180" y1="80" x2="110" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4A3B22" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#735E38" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9C8758" stopOpacity="0" />
              </linearGradient>

              {/* Gradiente dorado del pedestal */}
              <linearGradient id="goldTrim" x1="50" y1="240" x2="190" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="50%" stopColor="#D8B155" />
                <stop offset="100%" stopColor="#8C6D23" />
              </linearGradient>

              {/* Filtro de brillo dorado para el contorno */}
              <filter id="goldAura" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#D8B155" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* 1. BASE Y PEDESTAL STAUNTON */}
            <g filter="url(#goldAura)">
              {/* Base inferior ancha */}
              <ellipse cx="120" cy="265" rx="72" ry="18" fill="url(#goldTrim)" />
              <path
                d="M50 264 C50 252 68 244 120 244 C172 244 190 252 190 264 L186 270 C186 278 160 283 120 283 C80 283 54 278 54 270 Z"
                fill="url(#ivoryBody)"
              />
              {/* Anillo intermedio */}
              <ellipse cx="120" cy="245" rx="58" ry="10" fill="url(#goldTrim)" />
              <path
                d="M64 244 C64 236 80 230 120 230 C160 230 176 236 176 244 L172 248 C172 254 152 257 120 257 C88 257 68 254 68 248 Z"
                fill="url(#ivoryBody)"
              />
              {/* Collarín superior del pedestal */}
              <ellipse cx="120" cy="230" rx="46" ry="7" fill="url(#goldTrim)" />
            </g>

            {/* 2. CUERPO PRINCIPAL DEL CABALLO (STAUNTON KNIGHT) */}
            <g>
              {/* Silueta y masa principal */}
              <path
                d="M78 230 
                   C74 200 68 168 62 145 
                   C56 122 52 110 56 102 
                   C60 94 72 90 85 96 
                   C94 100 102 112 108 116 
                   C107 106 105 88 102 68 
                   C99 48 106 32 116 28 
                   C124 25 132 29 135 38 
                   C137 45 134 56 138 62 
                   C142 68 152 68 162 76 
                   C172 84 178 98 176 114 
                   C174 128 168 140 162 148 
                   C168 160 174 180 176 205 
                   C177 218 174 225 166 230 
                   Z"
                fill="url(#ivoryBody)"
                stroke="#D8B155"
                strokeWidth="2.5"
              />

              {/* Pecho y relieve frontal iluminado */}
              <path
                d="M78 230 
                   C74 200 68 168 62 145 
                   C56 122 52 110 56 102 
                   C60 94 72 90 85 96 
                   C94 100 102 112 108 116 
                   C100 135 96 168 98 230 
                   Z"
                fill="url(#specularGlow)"
              />

              {/* Crin del caballo (Mane carvings) */}
              {/* Mechón 1 superior */}
              <path
                d="M136 40 C146 48 155 58 150 68 C144 64 138 58 136 48 Z"
                fill="#8C7646"
              />
              {/* Mechón 2 */}
              <path
                d="M142 66 C158 74 168 88 162 100 C154 94 146 86 142 76 Z"
                fill="#8C7646"
              />
              {/* Mechón 3 */}
              <path
                d="M152 98 C170 110 178 126 172 140 C164 132 156 122 152 110 Z"
                fill="#8C7646"
              />
              {/* Mechón 4 inferior */}
              <path
                d="M158 138 C174 154 178 176 174 195 C168 182 162 168 158 150 Z"
                fill="#8C7646"
              />

              {/* Orejas talladas */}
              <path
                d="M116 28 C112 18 118 10 126 14 C130 18 128 26 124 35 Z"
                fill="url(#ivoryBody)"
                stroke="#D8B155"
                strokeWidth="1.5"
              />
              <path
                d="M120 28 C118 20 122 15 125 17 C127 20 126 25 123 30 Z"
                fill="#8C7646"
              />

              {/* Ojo expresivo Staunton */}
              <ellipse cx="94" cy="74" rx="6.5" ry="4.5" transform="rotate(-15 94 74)" fill="#2A2012" />
              <circle cx="95.5" cy="72.5" r="2" fill="#FFFFFF" />
              {/* Ceja / Arco orbitario */}
              <path d="M84 68 C88 64 98 65 104 70" stroke="#8C7646" strokeWidth="2.5" strokeLinecap="round" />

              {/* Hocico y orificio nasal */}
              <path
                d="M60 102 C64 98 72 98 78 104"
                stroke="#6B5731"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <ellipse cx="68" cy="103" rx="3.5" ry="2" transform="rotate(-20 68 103)" fill="#2A2012" />

              {/* Línea de la boca / Mandíbula */}
              <path
                d="M72 114 C78 116 86 115 92 110"
                stroke="#6B5731"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Relieve muscular de la mejilla */}
              <path
                d="M90 85 C102 92 108 108 104 122 C98 128 88 124 82 115"
                stroke="#C4AF7A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sombra de volumen en la espalda */}
              <path
                d="M135 38 
                   C137 45 134 56 138 62 
                   C142 68 152 68 162 76 
                   C172 84 178 98 176 114 
                   C174 128 168 140 162 148 
                   C168 160 174 180 176 205 
                   C177 218 174 225 166 230 
                   C142 215 125 160 120 120 
                   C120 80 130 50 135 38 Z"
                fill="url(#darkShadows)"
              />

              {/* Destello de luz en el cuello */}
              <path
                d="M86 130 C84 165 88 198 94 228"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>
          </svg>
        </div>

        {/* ── SOMBRA DINÁMICA DE CONTACTO EN EL SUELO ── */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full knight-fast-shadow pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, transparent 75%)',
            filter: 'blur(6px)',
          }}
        />

        {/* Halo de luz dorada en la base */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-3 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(216,177,85,0.4) 0%, transparent 75%)',
            filter: 'blur(5px)',
          }}
        />
      </div>
    </div>
  );
}
