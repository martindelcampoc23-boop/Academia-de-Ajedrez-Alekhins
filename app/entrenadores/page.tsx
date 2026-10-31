import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Crown,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Laptop,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { COACHES } from '@/lib/academicData';

export const metadata = {
  title: 'Entrenadores & Cuerpo Técnico | Academia Alekhins',
  description:
    'Conoce al cuerpo docente de Academia Alekhins. Dirección del Maestro Internacional Roberto Martín del Campo Cárdenas y entrenadores certificados.',
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function EntrenadoresPage() {
  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Crown className="w-3.5 h-3.5" />
            <span>Cuerpo Docente de Excelencia • Academia Alekhins</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            NUESTROS ENTRENADORES
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Maestros titulados y docentes certificados con trayectoria deportiva contrastada y vocación pedagógica.
          </p>
        </section>

        {/* Perfiles de Entrenadores */}
        <section className="space-y-16">
          {COACHES.map((coach, idx) => (
            <div
              key={coach.id}
              className={`rounded-3xl p-8 sm:p-12 border-2 ${
                idx === 0
                  ? 'bg-gradient-to-br from-[#172B46] via-[#1C3454] to-[#0F1D30] border-[#C5A46D] shadow-[0_0_40px_rgba(197,164,109,0.2)]'
                  : 'bg-[#172B46] border-[#233F65]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* Columna Foto & Título */}
                <div className="lg:col-span-4 space-y-4 text-center">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C5A46D] shadow-xl bg-[#0F1D30]">
                    <Image
                      src={coach.avatarUrl}
                      alt={coach.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-1 text-xs">
                    <span className="text-[#C5A46D] font-extrabold uppercase tracking-wider block">
                      {coach.fideTitle}
                    </span>
                    {coach.fideId && (
                      <span className="text-[#9CA3AF] block font-mono">
                        FIDE ID: {coach.fideId}
                      </span>
                    )}
                    <span className="text-white block font-medium">
                      {coach.nationality} • {coach.experienceYears}+ años de experiencia
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hola, deseo consultar por clases con ${coach.name} en Academia Alekhins.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dorado w-full text-xs uppercase tracking-wider py-3 font-bold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar Disponibilidad
                  </a>
                </div>

                {/* Columna Información Detallada */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                      {coach.role}
                    </span>
                    <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                      {coach.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#E5DFD1] leading-relaxed font-light">
                    {coach.bio}
                  </p>

                  {/* Logros & Trayectoria */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                      Logros Deportivos & Trayectoria Verificada:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#FAF8F2]">
                      {coach.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Especialidades */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                      Áreas de Especialización:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((esp, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-[#0F1D30] border border-[#233F65] text-xs text-[#E5DFD1]"
                        >
                          {esp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Programas que Imparte */}
                  <div className="space-y-2 pt-2 border-t border-[#233F65]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                      Programas Académicos a su Cargo:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {coach.programsTaught.map((prog, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-[#172B46] border border-[#C5A46D]/40 text-xs text-[#C5A46D] font-semibold"
                        >
                          ✓ {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {idx === 0 && (
                      <Link
                        href="/la-academia/director"
                        className="btn-dorado text-xs uppercase tracking-wider font-extrabold py-2.5 px-5 inline-flex items-center gap-1.5 shadow"
                      >
                        <span>Ver Currículum Deportivo &amp; Docente Completo</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href="/clases-personalizadas"
                      className="text-xs text-[#C5A46D] hover:underline font-bold inline-flex items-center gap-1.5"
                    >
                      <span>Solicitar Entrenamiento con este entrenador</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}

