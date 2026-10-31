'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';

interface PlanCurrencyToggleProps {
  className?: string;
}

export function PlanCurrencyToggle({ className = '' }: PlanCurrencyToggleProps) {
  const { currency, setCurrency } = useLocaleCurrency();

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl bg-[#0F1D30] border-2 border-[#233F65] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${className}`}
    >
      <div className="flex items-center gap-3 text-xs text-[#FAF8F2] text-center sm:text-left">
        <div className="w-8 h-8 rounded-full bg-[#172B46] border border-[#C5A46D]/60 flex items-center justify-center shrink-0 text-[#C5A46D]">
          <Globe className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-white block">
            ¿Consultas desde el extranjero o prefieres pagar en dólares (USD)?
          </span>
          <span className="text-[11px] text-[#9CA3AF]">
            Alterna entre moneda nacional y dólares americanos para alumnos internacionales:
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#172B46] border border-[#233F65] shrink-0">
        <button
          onClick={() => setCurrency('MXN')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currency === 'MXN'
              ? 'bg-[#C5A46D] text-[#0F1D30] shadow'
              : 'text-[#C4CBD4] hover:text-white'
          }`}
        >
          <span>🇲🇽 MXN</span>
          <span className="text-[10px] font-normal opacity-80">($ Pesos)</span>
        </button>

        <button
          onClick={() => setCurrency('USD')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currency === 'USD'
              ? 'bg-[#C5A46D] text-[#0F1D30] shadow'
              : 'text-[#C4CBD4] hover:text-white'
          }`}
        >
          <span>🇺🇸 USD</span>
          <span className="text-[10px] font-normal opacity-80">($ Dólares)</span>
        </button>
      </div>
    </div>
  );
}

