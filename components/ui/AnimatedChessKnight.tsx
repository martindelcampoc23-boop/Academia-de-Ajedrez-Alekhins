'use client';

import React from 'react';

/**
 * AnimatedChessKnight
 * Caballo blanco Staunton de torneo (Vectorial SVG 3D puro, transparente, sin fondo cuadrado)
 * - Animación ágil, rápida y fluida (ciclo de 2.0s)
 * - Totalmente responsivo en móvil y escritorio
 * - Acabados marfil/blanco con resplandor dorado
 */
export function AnimatedChessKnight() {
  return (
    <div className="relative flex items-center justify-center w-full" aria-hidden="true">
      <style>{`
        @keyframes quick-knight-float {
          0% {
            transform: translateY(0px) rotate(-1deg);
          }
          35% {
            transform: translateY(-16px) rotate(1.5deg) scale(1.02);
          }
          65% {
            transform: translateY(-26px) rotate(-1deg) scale(1.03);
          }
          85% {
            transform: translateY(-10px) rotate(0.8deg) scale(1.01);
          }
          100% {
            transform: translateY(0px) rotate(-1deg);
          }
        }

        @keyframes quick-shadow-pulse {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.7;
          }
          65% {
            transform: scaleX(0.6) scaleY(0.6);
            opacity: 0.2;
          }
        }

        @keyframes quick-aura-glow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.08);
          }
        }

        @keyframes gold-spark-1 {
          0%   { transform: translate(0, 0) scale(0.7); opacity: 0; }
          40%  { opacity: 1; transform: translate(-12px, -32px) scale(1.1); }
          100% { transform: translate(-22px, -65px) scale(0); opacity: 0; }
        }

        @keyframes gold-spark-2 {
          0%   { transform: translate(0, 0) scale(0.7); opacity: 0; }
          40%  { opacity: 1; transform: translate(14px, -36px) scale(1.1); }
          100% { transform: translate(26px, -70px) scale(0); opacity: 0; }
        }

        .knight-float-fast {
          animation: quick-knight-float 2.0s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .knight-shadow-fast {
          animation: quick-shadow-pulse 2.0s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .knight-glow-fast {
          animation: quick-aura-glow 1.8s ease-in-out infinite;
        }

        .sparkle-a { animation: gold-spark-1 1.5s ease-out infinite 0.1s; }
        .sparkle-b { animation: gold-spark-2 1.5s ease-out infinite 0.7s; }
      `}</style>

      {/* Contenedor principal con tamaño explícito y seguro */}
      <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex flex-col items-center justify-end">

        {/* Resplandor áurico dorado en el fondo (100% difuminado y suave) */}
        <div
          className="absolute inset-0 m-auto w-56 h-56 rounded-full knight-glow-fast pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(216,177,85,0.3) 0%, rgba(216,177,85,0.08) 50%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />

        {/* Partículas doradas de energía */}
        <div className="absolute top-1/4 left-1/2 pointer-events-none">
          <div
            className="absolute -left-14 -top-6 w-2 h-2 rounded-full bg-[#E8C865] sparkle-a"
            style={{ boxShadow: '0 0 8px 2px rgba(232,200,101,0.9)' }}
          />
          <div
            className="absolute left-12 -top-10 w-2.5 h-2.5 rounded-full bg-[#D8B155] sparkle-b"
            style={{ boxShadow: '0 0 10px 3px rgba(216,177,85,0.9)' }}
          />
        </div>

        {/* ── PIEZA DE AJEDREZ: CABALLO BLANCO 3D VECTORIAL ── */}
        <div className="knight-float-fast relative z-10 w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center">
          <svg
            viewBox="0 0 200 250"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 18px rgba(216,177,85,0.45))' }}
          >
            <defs>
              {/* Gradiente del cuerpo marfil / blanco */}
              <linearGradient id="knightWhiteBody" x1="30" y1="20" x2="180" y2="230" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FAF7F0" />
                <stop offset="55%" stopColor="#EDE2CB" />
                <stop offset="85%" stopColor="#D4C298" />
                <stop offset="100%" stopColor="#A89466" />
              </linearGradient>

              {/* Gradiente de luz frontal */}
              <linearGradient id="knightLight" x1="100" y1="20" x2="50" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FAF5E8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EDE2CB" stopOpacity="0" />
              </linearGradient>

              {/* Gradiente de sombras y volumen posterior */}
              <linearGradient id="knightShade" x1="160" y1="60" x2="90" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5E4B28" stopOpacity="0.65" />
                <stop offset="60%" stopColor="#8C7342" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D4C298" stopOpacity="0" />
              </linearGradient>

              {/* Gradiente dorado del pedestal */}
              <linearGradient id="knightGoldBase" x1="40" y1="210" x2="160" y2="245" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="40%" stopColor="#D8B155" />
                <stop offset="80%" stopColor="#A6822C" />
                <stop offset="100%" stopColor="#5E4612" />
              </linearGradient>
            </defs>

            {/* 1. BASE STAUNTON */}
            <g id="base-pedestal">
              {/* Zócalo inferior */}
              <ellipse cx="100" cy="232" rx="60" ry="14" fill="url(#knightGoldBase)" />
              <path
                d="M42 230 C42 220 58 212 100 212 C142 212 158 220 158 230 L155 235 C155 242 135 246 100 246 C65 246 45 242 45 235 Z"
                fill="url(#knightWhiteBody)"
              />
              {/* Anillo de moldura media */}
              <ellipse cx="100" cy="214" rx="48" ry="9" fill="url(#knightGoldBase)" />
              <path
                d="M54 212 C54 206 68 200 100 200 C132 200 146 206 146 212 L142 216 C142 220 126 223 100 223 C74 223 58 220 58 216 Z"
                fill="url(#knightWhiteBody)"
              />
              {/* Collarín superior del cuello */}
              <ellipse cx="100" cy="201" rx="38" ry="6" fill="url(#knightGoldBase)" />
            </g>

            {/* 2. CABALLO BLANCO (CUELLO, CABEZA, CRIN, HOCICO) */}
            <g id="knight-body">
              {/* Cuerpo principal del caballo */}
              <path
                d="M66 200
                   C62 174 56 145 50 125
                   C44 104 40 92 45 84
                   C50 75 62 72 74 78
                   C82 82 90 94 96 98
                   C94 88 92 72 88 52
                   C85 34 92 18 100 14
                   C108 10 116 14 118 24
                   C120 30 118 40 122 46
                   C126 52 136 52 146 60
                   C156 68 162 82 160 98
                   C158 112 152 124 146 132
                   C152 144 158 162 160 185
                   C161 194 158 198 150 201
                   Z"
                fill="url(#knightWhiteBody)"
                stroke="#D8B155"
                strokeWidth="2"
              />

              {/* Luz y brillo en el pecho y cuello frontal */}
              <path
                d="M66 200
                   C62 174 56 145 50 125
                   C44 104 40 92 45 84
                   C50 75 62 72 74 78
                   C82 82 90 94 96 98
                   C88 114 84 144 86 200
                   Z"
                fill="url(#knightLight)"
              />

              {/* Sombra de relieve en el dorso/espalda */}
              <path
                d="M118 24
                   C120 30 118 40 122 46
                   C126 52 136 52 146 60
                   C156 68 162 82 160 98
                   C158 112 152 124 146 132
                   C152 144 158 162 160 185
                   C161 194 158 198 150 201
                   C130 188 115 140 110 105
                   C108 70 115 40 118 24 Z"
                fill="url(#knightShade)"
              />

              {/* Crin tallada (Mane carvings) */}
              <path d="M120 28 C130 36 138 46 134 54 C128 50 122 44 120 36 Z" fill="#8C7342" />
              <path d="M125 52 C140 60 148 72 142 82 C134 76 128 70 125 60 Z" fill="#8C7342" />
              <path d="M134 80 C150 90 158 104 152 116 C144 110 138 102 134 90 Z" fill="#8C7342" />
              <path d="M140 114 C155 128 160 148 156 165 C150 154 144 142 140 126 Z" fill="#8C7342" />

              {/* Oreja erguida */}
              <path
                d="M100 14 C96 4 102 -2 110 2 C114 6 112 14 108 22 Z"
                fill="url(#knightWhiteBody)"
                stroke="#D8B155"
                strokeWidth="1.5"
              />
              <path d="M104 14 C102 6 106 2 109 4 C111 7 110 12 107 16 Z" fill="#8C7342" />

              {/* Ojo expresivo Staunton */}
              <ellipse cx="80" cy="58" rx="5.5" ry="3.8" transform="rotate(-15 80 58)" fill="#241B0D" />
              <circle cx="81.5" cy="56.5" r="1.8" fill="#FFFFFF" />
              <path d="M72 52 C76 48 84 49 89 54" stroke="#8C7342" strokeWidth="2" strokeLinecap="round" />

              {/* Hocico y orificio nasal */}
              <path d="M50 84 C54 80 62 80 68 86" stroke="#665026" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="58" cy="85" rx="3" ry="1.8" transform="rotate(-20 58 85)" fill="#241B0D" />

              {/* Mandíbula y labio */}
              <path d="M60 96 C66 98 74 97 80 92" stroke="#665026" strokeWidth="1.8" strokeLinecap="round" />

              {/* Músculo facial de la mejilla */}
              <path
                d="M76 68 C88 74 94 88 90 100 C85 106 75 102 70 94"
                stroke="#BFA977"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Reflejo de brillo brillante en el cuello */}
              <path
                d="M72 115 C70 145 74 175 80 198"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>
          </svg>
        </div>

        {/* Sombra elíptica dinámica en el suelo */}
        <div
          className="w-44 h-5 rounded-full knight-shadow-fast pointer-events-none -mt-3"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 50%, transparent 75%)',
            filter: 'blur(5px)',
          }}
        />
      </div>
    </div>
  );
}
