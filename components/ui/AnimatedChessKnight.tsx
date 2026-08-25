'use client';

import React from 'react';

/**
 * AnimatedChessKnight
 * Caballo de ajedrez (♞) animado en SVG puro con movimiento en L,
 * efecto de flotación, glows dorados y trayectoria de casillas.
 * Se usa como elemento visual en el Hero de la landing page.
 */
export function AnimatedChessKnight() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden="true">
      {/* Estilo de animaciones CSS inlineadas */}
      <style>{`
        @keyframes knight-float {
          0%   { transform: translateY(0px) rotate(-2deg); }
          25%  { transform: translateY(-12px) rotate(2deg); }
          50%  { transform: translateY(-22px) rotate(-1deg); }
          75%  { transform: translateY(-10px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }
        @keyframes knight-shadow-pulse {
          0%, 100% { transform: scaleX(1); opacity: 0.35; }
          50%       { transform: scaleX(0.75); opacity: 0.15; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; filter: blur(18px); }
          50%       { opacity: 1;   filter: blur(28px); }
        }
        @keyframes board-tile-fade {
          0%, 100% { opacity: 0.06; }
          50%       { opacity: 0.14; }
        }
        @keyframes trail-draw {
          0%   { stroke-dashoffset: 320; opacity: 0; }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ring-expand {
          0%   { r: 4; opacity: 0.9; }
          100% { r: 24; opacity: 0; }
        }
        @keyframes particle-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-40px) scale(0); opacity: 0; }
        }
        .knight-piece {
          animation: knight-float 3.6s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(216,177,85,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.7));
        }
        .knight-shadow {
          animation: knight-shadow-pulse 3.6s ease-in-out infinite;
        }
        .glow-orb {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .tile-flicker {
          animation: board-tile-fade 3.6s ease-in-out infinite;
        }
        .l-trail {
          animation: trail-draw 4s ease-in-out infinite;
        }
        .ring-anim {
          animation: ring-expand 2.4s ease-out infinite;
        }
        .particle-1 { animation: particle-rise 2s ease-out infinite 0.2s; }
        .particle-2 { animation: particle-rise 2s ease-out infinite 0.8s; }
        .particle-3 { animation: particle-rise 2s ease-out infinite 1.4s; }
      `}</style>

      <svg
        viewBox="0 0 300 320"
        className="w-full max-w-[420px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── TABLERO DE FONDO ──────────────────────────────────── */}
        <g opacity="0.45">
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const isLight = (row + col) % 2 === 0;
              const x = 22 + col * 52;
              const y = 180 + row * 26 - row * 6;
              if (!isLight) return null;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width={50}
                  height={24}
                  rx={3}
                  fill="#C8AA6E"
                  className="tile-flicker"
                  style={{ animationDelay: `${(row + col) * 0.18}s` }}
                />
              );
            })
          )}
        </g>

        {/* ── TRAYECTORIA EN L (movimiento del caballo) ─────────── */}
        {/* Línea horizontal del movimiento en L */}
        <polyline
          points="150,260 230,260 230,200"
          fill="none"
          stroke="#C8AA6E"
          strokeWidth="2"
          strokeDasharray="320"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="l-trail"
        />
        {/* Puntos destino del movimiento */}
        <circle cx="230" cy="200" r="5" fill="#C8AA6E" opacity="0">
          <animate attributeName="opacity" values="0;0;1;0" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="200" r="5" fill="transparent" stroke="#C8AA6E" strokeWidth="1.5" className="ring-anim" />

        {/* ── BRILLO / GLOW ORBE CENTRAL ────────────────────────── */}
        <ellipse cx="150" cy="220" rx="60" ry="20" fill="#C8AA6E" opacity="0" className="glow-orb" />

        {/* ── SOMBRA DEL CABALLO ────────────────────────────────── */}
        <ellipse
          cx="148"
          cy="262"
          rx="52"
          ry="9"
          fill="#000"
          opacity="0.4"
          className="knight-shadow"
        />

        {/* ── PARTÍCULAS DORADAS ────────────────────────────────── */}
        <circle cx="120" cy="220" r="3" fill="#C8AA6E" className="particle-1" opacity="0.7" />
        <circle cx="170" cy="215" r="2" fill="#E8C865" className="particle-2" opacity="0.7" />
        <circle cx="145" cy="225" r="2.5" fill="#C8AA6E" className="particle-3" opacity="0.7" />

        {/* ── CABALLO DE AJEDREZ (SVG path) ─────────────────────── */}
        <g className="knight-piece" transform="translate(80, 60)">
          {/* Base del caballo */}
          <rect x="25" y="143" width="86" height="13" rx="6" fill="#1B3A2E" />
          <rect x="18" y="152" width="100" height="8" rx="4" fill="#152D24" />

          {/* Cuerpo y pecho */}
          <path
            d="M68,140 C68,140 50,130 42,110 C36,96 38,76 44,64 C50,52 60,44 65,35
               C68,29 68,22 66,16 C74,20 80,28 84,38 C90,52 92,70 88,84
               C86,92 80,100 78,108 C76,116 76,128 76,140 Z"
            fill="#C8AA6E"
          />
          {/* Cabeza del caballo */}
          <path
            d="M66,16 C66,16 62,8 68,4 C74,0 82,2 86,8
               C90,14 90,22 88,28 C86,34 82,38 78,40
               C74,42 70,40 68,36 C64,30 66,22 66,16 Z"
            fill="#C8AA6E"
          />
          {/* Oreja */}
          <path
            d="M74,4 C76,0 80,-2 84,2 C86,6 84,10 80,12 C76,14 72,12 74,4 Z"
            fill="#D8C080"
          />
          {/* Crin */}
          <path
            d="M66,16 C60,22 56,32 58,42 C60,52 66,58 68,68
               C70,78 68,88 66,96 C68,92 74,84 76,74
               C78,64 76,54 74,44 C72,34 72,24 74,16 Z"
            fill="#A8863A"
            opacity="0.8"
          />
          {/* Ojo */}
          <circle cx="80" cy="16" r="3.5" fill="#0B1510" />
          <circle cx="81.2" cy="15" r="1.2" fill="white" opacity="0.9" />
          {/* Fosa nasal */}
          <ellipse cx="88" cy="26" rx="2.5" ry="1.8" fill="#8B6A2A" opacity="0.7" />
          {/* Boca / mandíbula */}
          <path
            d="M84,34 C87,30 91,28 90,32 C89,36 84,38 84,34 Z"
            fill="#A8863A"
            opacity="0.6"
          />
          {/* Líneas de detalle del cuello */}
          <path d="M60,80 C56,84 54,90 56,94" stroke="#A8863A" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M58,100 C54,104 54,110 56,114" stroke="#A8863A" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />

          {/* Reflejo dorado en el cuerpo */}
          <path
            d="M74,40 C78,46 80,56 80,68 C80,80 78,92 76,102"
            stroke="#E8D090"
            strokeWidth="2"
            fill="none"
            opacity="0.35"
            strokeLinecap="round"
          />
        </g>

        {/* ── ICONO ♞ FANTASMA (decorativo) ─────────────────────── */}
        <text
          x="240"
          y="100"
          fontSize="32"
          fill="#C8AA6E"
          opacity="0.07"
          fontFamily="serif"
          transform="rotate(15, 240, 100)"
        >
          ♞
        </text>
        <text
          x="30"
          y="200"
          fontSize="24"
          fill="#C8AA6E"
          opacity="0.06"
          fontFamily="serif"
          transform="rotate(-10, 30, 200)"
        >
          ♞
        </text>
      </svg>
    </div>
  );
}
