'use client';

import React from 'react';

interface ChessFenViewerProps {
  fen: string;
  size?: 'sm' | 'md' | 'lg';
  caption?: string;
}

// Mapeo de piezas estándar FEN a símbolos visuales estilizados
const PIECE_SYMBOLS: Record<string, { char: string; color: string; name: string }> = {
  K: { char: '♔', color: '#FFFFFF', name: 'Rey Blanco' },
  Q: { char: '♕', color: '#FFFFFF', name: 'Dama Blanca' },
  R: { char: '♖', color: '#FFFFFF', name: 'Torre Blanca' },
  B: { char: '♗', color: '#FFFFFF', name: 'Alfil Blanco' },
  N: { char: '♘', color: '#FFFFFF', name: 'Caballo Blanco' },
  P: { char: '♙', color: '#FFFFFF', name: 'Peón Blanco' },
  k: { char: '♚', color: '#1B241E', name: 'Rey Negro' },
  q: { char: '♛', color: '#1B241E', name: 'Dama Negra' },
  r: { char: '♜', color: '#1B241E', name: 'Torre Negra' },
  b: { char: '♝', color: '#1B241E', name: 'Alfil Negro' },
  n: { char: '♞', color: '#1B241E', name: 'Caballo Negro' },
  p: { char: '♟', color: '#1B241E', name: 'Peón Negro' },
};

export function ChessFenViewer({ fen, size = 'md', caption }: ChessFenViewerProps) {
  if (!fen || !fen.trim()) return null;

  const fenParts = fen.trim().split(' ');
  const position = fenParts[0];
  const turn = fenParts[1] === 'w' ? 'Blancas juegan' : 'Negras juegan';

  const rows = position.split('/');
  if (rows.length !== 8) return null;

  // Reconstruir la matriz 8x8
  const board: (string | null)[][] = [];
  for (let r = 0; r < 8; r++) {
    const rowChars = rows[r];
    const currentRow: (string | null)[] = [];
    for (const ch of rowChars) {
      if (/\d/.test(ch)) {
        const empties = parseInt(ch, 10);
        for (let e = 0; e < empties; e++) currentRow.push(null);
      } else {
        currentRow.push(ch);
      }
    }
    board.push(currentRow);
  }

  const cellSize = size === 'sm' ? 'w-6 h-6 text-sm' : size === 'lg' ? 'w-12 h-12 text-2xl' : 'w-9 h-9 text-xl';
  const boardWidth = size === 'sm' ? 'max-w-[220px]' : size === 'lg' ? 'max-w-[420px]' : 'max-w-[320px]';

  return (
    <div className={`space-y-2 ${boardWidth}`}>
      <div className="flex items-center justify-between text-[11px] font-mono text-[#D8B155] px-1">
        <span className="font-bold flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${fenParts[1] === 'w' ? 'bg-white' : 'bg-black border border-[#D8B155]'}`} />
          {turn}
        </span>
        <span className="text-[10px] text-[#A8B2A6] uppercase tracking-wider">Tablero FEN</span>
      </div>

      <div className="relative rounded-xl overflow-hidden border-2 border-[#D8B155]/70 shadow-xl bg-[#0B1510] p-1.5 ring-1 ring-[#D8B155]/30">
        <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square border border-[#2B3E34] rounded-lg overflow-hidden">
          {board.map((row, rIdx) =>
            row.map((piece, cIdx) => {
              const isDark = (rIdx + cIdx) % 2 === 1;
              const pieceInfo = piece ? PIECE_SYMBOLS[piece] : null;

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`flex items-center justify-center font-bold select-none relative transition-colors ${
                    isDark ? 'bg-[#1B4D3E]/85 text-emerald-100' : 'bg-[#EADECA] text-stone-900'
                  }`}
                >
                  {/* Coordenadas en bordes */}
                  {cIdx === 0 && (
                    <span
                      className={`absolute top-0.5 left-0.5 text-[8px] font-mono leading-none opacity-60 font-bold ${
                        isDark ? 'text-emerald-200' : 'text-stone-700'
                      }`}
                    >
                      {8 - rIdx}
                    </span>
                  )}
                  {rIdx === 7 && (
                    <span
                      className={`absolute bottom-0.5 right-0.5 text-[8px] font-mono leading-none opacity-60 font-bold ${
                        isDark ? 'text-emerald-200' : 'text-stone-700'
                      }`}
                    >
                      {String.fromCharCode(97 + cIdx)}
                    </span>
                  )}

                  {pieceInfo && (
                    <span
                      title={pieceInfo.name}
                      style={{
                        color: pieceInfo.color,
                        textShadow:
                          pieceInfo.color === '#FFFFFF'
                            ? '0 1px 3px rgba(0,0,0,0.9), 0 0 1px #000'
                            : '0 0 2px rgba(255,255,255,0.7)',
                      }}
                      className="cursor-default transform hover:scale-110 transition-transform leading-none font-serif select-none"
                    >
                      {pieceInfo.char}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {caption && (
        <p className="text-[11px] text-[#A8B2A6] italic text-center px-2">
          {caption}
        </p>
      )}
    </div>
  );
}
