'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Crown,
  Sparkles,
  Check,
  Calendar,
  Clock,
  Users,
  Target,
  Laptop,
  BookOpen,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '@/lib/academicData';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function ProgramasAcademicosPage() {
  const { formatPrice, currency } = useLocaleCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');

  const filteredPrograms =
    selectedCategory === 'TODOS'
      ? ACADEMIC_PROGRAMS
      : ACADEMIC_PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* Hero de Sección Académica */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Crown className="w-3.5 h-3.5" />
            <span>Oferta Académica Integral • Academia Alekhins</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            PROGRAMAS DE FORMACIÓN EN AJEDREZ
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Estructurados por niveles de juego, objetivos competitivos y edades. Desde la iniciación infantil y formativa hasta la alta competencia y titulación internacional FIDE.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#C5A46D] font-semibold pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Dirección: MI Roberto Martín del Campo
            </span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4" /> Plataforma Chessgora.com Incluida
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Sin Plazos Forzosos
            </span>
          </div>
        </section>

        {/* Filtros por Categoría */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-[#1C3454]">
          <span className="text-xs text-[#9CA3AF] uppercase font-bold mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {[
            { id: 'TODOS', label: 'Todos los Programas' },
            { id: 'INICIACION', label: 'Iniciación (Principiantes)' },
            { id: 'DESARROLLO', label: 'Desarrollo' },
            { id: 'INTERMEDIO', label: 'Intermedio' },
            { id: 'ALTO_RENDIMIENTO', label: 'Alto Rendimiento' },
            { id: 'PERSONALIZADO', label: 'Personalizado 1 a 1' },
            { id: 'INSTITUCIONAL', label: 'Escuelas & Clubes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A46D] text-[#0F1D30] font-bold shadow'
                  : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Programas Académicos */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredPrograms.map((program) => {
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hola, deseo información e inscribirme al ${program.name} en Academia Alekhins.`
              )}`;

              const isPersonalizado = program.category === 'PERSONALIZADO';
              const isInstitucional = program.category === 'INSTITUCIONAL';

              return (
                <div
                  key={program.id}
                  id={program.slug}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 border-2 ${
                    isPersonalizado
                      ? 'bg-gradient-to-br from-[#172B46] via-[#1C3454] to-[#0F1D30] border-[#C5A46D] shadow-[0_0_35px_rgba(197,164,109,0.2)]'
                      : 'bg-[#172B46] border-[#233F65] hover:border-[#C5A46D]/70 hover:shadow-xl'
                  }`}
                >
                  {/* Badge Destacado */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#233F65]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] flex items-center gap-1.5">
                      {isPersonalizado ? <Crown className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      {program.level}
                    </span>
                    {program.featuredBadge && (
                      <span className="px-3 py-1 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-[11px] font-extrabold uppercase tracking-wide">
                        {program.featuredBadge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                        {program.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#C5A46D] mt-1 italic">
                        {program.subtitle}
                      </p>
                    </div>

                    {/* Ficha Técnica: Horario, Frecuencia, Edad, Elo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0F1D30] border border-[#233F65] text-xs">
                      <div>
                        <span className="text-[#9CA3AF] uppercase font-bold text-[10px] block">
                          Rating Orientativo:
                        </span>
                        <strong className="text-white">{program.recommendedElo}</strong>
                      </div>
                      <div>
                        <span className="text-[#9CA3AF] uppercase font-bold text-[10px] block">
                          Edades:
                        </span>
                        <strong className="text-white">{program.targetAge}</strong>
                      </div>
                      <div>
                        <span className="text-[#9CA3AF] uppercase font-bold text-[10px] block">
                          Frecuencia & Sesiones:
                        </span>
                        <strong className="text-[#C5A46D]">{program.sessionCount}</strong>
                      </div>
                      <div>
                        <span className="text-[#9CA3AF] uppercase font-bold text-[10px] block">
                          Horario Oficial:
                        </span>
                        <strong className="text-white">{program.schedule}</strong>
                      </div>
                    </div>

                    {/* Precio / Inversión */}
                    <div className="border-y border-[#233F65] py-4 flex items-baseline justify-between">
                      <div>
                        {isInstitucional ? (
                          <div>
                            <span className="text-2xl font-bold text-[#C5A46D]">
                              Convenio a la Medida
                            </span>
                            <span className="text-xs text-[#9CA3AF] block">
                              Cotización por matrícula estudiantil
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-3xl sm:text-4xl font-extrabold text-[#C5A46D]">
                              {formatPrice(program.priceMxn)}
                            </span>
                            <span className="text-xs text-[#9CA3AF] block">
                              / {program.billingPeriod}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded bg-[#0F1D30] text-[#C4CBD4] border border-[#233F65]">
                        {isPersonalizado ? '10 horas 1 a 1' : 'Sin plazos forzosos'}
                      </span>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs sm:text-sm text-[#E5DFD1] leading-relaxed">
                      {program.description}
                    </p>

                    {/* Objetivos Pedagógicos */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                        Objetivos Principales:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#FAF8F2]">
                        {program.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Incluye & Chessgora */}
                    <div className="space-y-2 pt-2 border-t border-[#233F65]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                        Incluye en su Formación:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#C4CBD4]">
                        {program.includes.slice(0, 5).map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C5A46D] font-bold">•</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>

                      {program.chessgoraIncluded && (
                        <div className="mt-3 p-2.5 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-semibold flex items-center gap-2">
                          <Laptop className="w-4 h-4 shrink-0" />
                          <span>Acceso a la plataforma de entrenamiento Chessgora.com incluido.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="pt-4 space-y-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dorado w-full text-center text-xs uppercase tracking-wider py-3.5 font-bold flex items-center justify-center gap-2 shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isInstitucional ? 'SOLICITAR COTIZACIÓN INSTITUCIONAL' : 'INSCRIBIRME AL PROGRAMA'}
                    </a>

                    <p className="text-[11px] text-[#9CA3AF] text-center">
                      Atención inmediata vía WhatsApp oficial • +52 999 102 0078
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tabla Comparativa entre Planes */}
        <section className="space-y-6 pt-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Comparativa General
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Compara los programas académicos de un vistazo
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#233F65] bg-[#172B46] shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#233F65] bg-[#0F1D30] text-[#C5A46D] uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-5">Programa</th>
                  <th className="py-4 px-4">Nivel / Elo</th>
                  <th className="py-4 px-4">Frecuencia</th>
                  <th className="py-4 px-4">Modalidad</th>
                  <th className="py-4 px-4">Chessgora</th>
                  <th className="py-4 px-5">Inversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#233F65] text-[#FAF8F2]">
                {ACADEMIC_PROGRAMS.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1C3454]/50 transition">
                    <td className="py-4 px-5 font-bold text-white">
                      <div className="font-serif-editorial">{p.name}</div>
                      <span className="text-[11px] text-[#9CA3AF] font-normal">{p.subtitle}</span>
                    </td>
                    <td className="py-4 px-4 text-[#C4CBD4]">{p.recommendedElo}</td>
                    <td className="py-4 px-4">{p.sessionCount}</td>
                    <td className="py-4 px-4 text-[#C5A46D] font-medium">{p.modality}</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">✓ Incluido</td>
                    <td className="py-4 px-5 font-bold text-[#C5A46D]">
                      {p.priceMxn > 0 ? formatPrice(p.priceMxn) : 'Cotización'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

