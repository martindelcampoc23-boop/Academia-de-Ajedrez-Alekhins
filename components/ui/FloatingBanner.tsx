'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function FloatingBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('alekhins-banner-dismissed');
    if (wasDismissed) return;
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('alekhins-banner-dismissed', '1');
  };

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-xl transition-all duration-500 ease-out"
    >
      <div className="relative flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#D8B155]/60 bg-gradient-to-r from-[#0F2E1E]/95 via-[#1B4D3E]/95 to-[#0F2E1E]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(216,177,85,0.15)]">
        {/* Glow border animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8B155]/10 to-transparent animate-pulse" />
        </div>

        {/* Icon */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-[#D8B155] flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-[#0B1510]" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[#D8B155] uppercase tracking-widest">
            ¡Inscripciones Abiertas!
          </p>
          <p className="text-xs text-white leading-tight mt-0.5 truncate">
            Nuevos grupos disponibles — Plazas limitadas para el ciclo 2025.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/entrenamiento"
          onClick={dismiss}
          className="shrink-0 inline-flex items-center gap-1 bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-[11px] font-black uppercase tracking-wide px-3.5 py-2 rounded-lg transition-colors shadow-md"
        >
          Ver planes
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>

        {/* Close */}
        <button
          onClick={dismiss}
          className="shrink-0 p-1.5 rounded-full text-[#D8B155]/60 hover:text-[#D8B155] hover:bg-[#D8B155]/10 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
