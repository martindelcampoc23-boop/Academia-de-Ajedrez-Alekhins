import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Crown,
  ShieldCheck,
  CheckCircle2,
  Users,
  Laptop,
  BookOpen,
  ArrowRight,
  Target,
  Sparkles,
  Trophy,
  Phone,
  MessageCircle
} from 'lucide-react';
import { COACHES } from '@/lib/academicData';

export const metadata = {
  title: 'La Academia | Historia, Misión & Metodología | Academia Alekhins',
  description:
    'Conoce la historia, cuerpo técnico y metodología de Academia Alekhins, la institución de ajedrez dirigida por el Maestro Internacional Roberto Martín del Campo Cárdenas.',
};

export default function LaAcademiaPage() {
  const director = COACHES[0];

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">

        {/* Hero Institucional */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Crown className="w-3.5 h-3.5" />
            <span>Institución de Ajedrez Profesional • ajedrezprofesional.com</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            ACADEMIA ALEKHINS
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Formación ajedrecística de excelencia pedagógica, rigor analítico y alto nivel deportivo para niños, jóvenes, jugadores de club y competidores internacionales.
          </p>
        </section>

        {/* Sección 1: Presentación & Dirección Académica */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#C5A46D] shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_35px_rgba(197,164,109,0.2)] bg-[#172B46]">
              <Image
                src="/maestro-roberto.jpg"
                alt="MI Roberto Martín del Campo Cárdenas"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1D30] via-[#0F1D30]/70 to-transparent p-6 text-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C5A46D] block">
                  Director Académico
                </span>
                <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                  MI Roberto Martín del Campo Cárdenas
                </h3>
                <p className="text-xs text-[#C4CBD4] mt-1">
                  Maestro Internacional FIDE (ID: 5100046) • 4 veces representante olímpico
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
              Trayectoria & Prestigio
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Una vida consagrada a la maestría y la enseñanza del ajedrez
            </h2>

            <p className="text-sm sm:text-base text-[#E5DFD1] leading-relaxed font-light">
              Fundada por el Maestro Internacional <strong>Roberto Martín del Campo Cárdenas</strong>, Academia Alekhins nace con el propósito de ofrecer a jugadores de habla hispana un entrenamiento metódico, serio y moderno, libre de improvisaciones.
            </p>

            <p className="text-sm sm:text-base text-[#E5DFD1] leading-relaxed font-light">
              A lo largo de más de tres décadas de trayectoria como jugador de élite y pedagogo, el Maestro Martín del Campo ha representado a México en 4 Olimpiadas Mundiales de Ajedrez, obtenido el Campeonato Nacional Absoluto y formado a decenas de campeones nacionales, maestros FIDE y atletas de selecciones estatales.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1C3454]">
              <div className="p-3 rounded-xl bg-[#172B46] border border-[#233F65] text-center">
                <span className="font-serif-editorial text-2xl font-bold text-[#C5A46D] block">4</span>
                <span className="text-[11px] text-[#C4CBD4] block">Olimpiadas Mundiales</span>
              </div>
              <div className="p-3 rounded-xl bg-[#172B46] border border-[#233F65] text-center">
                <span className="font-serif-editorial text-2xl font-bold text-[#C5A46D] block">30+</span>
                <span className="text-[11px] text-[#C4CBD4] block">Años de Docencia</span>
              </div>
              <div className="p-3 rounded-xl bg-[#172B46] border border-[#233F65] text-center">
                <span className="font-serif-editorial text-2xl font-bold text-[#C5A46D] block">1,500+</span>
                <span className="text-[11px] text-[#C4CBD4] block">Alumnos Formados</span>
              </div>
              <div className="p-3 rounded-xl bg-[#172B46] border border-[#233F65] text-center">
                <span className="font-serif-editorial text-2xl font-bold text-[#C5A46D] block">100%</span>
                <span className="text-[11px] text-[#C4CBD4] block">Rigor Metódico</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/programas" className="btn-dorado text-xs uppercase tracking-wider font-bold">
                Explorar Programas Académicos
              </Link>
              <Link href="/clases-personalizadas" className="btn-navy-outline text-xs uppercase tracking-wider font-bold">
                Clases Personalizadas
              </Link>
            </div>
          </div>
        </section>

        {/* Sección 2: Los 4 Pilares de Nuestra Metodología */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
              Metodología Comprobada
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Cimientos pedagógicos de Academia Alekhins
            </h2>
            <p className="text-xs sm:text-sm text-[#C4CBD4]">
              Combinamos los sólidos principios formativos de la Escuela Clásica Soviética con el análisis asistido por módulos informáticos de última generación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">1. Cálculo Estructurado</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Técnicas rigurosas de visualización, jugadas candidatas y depuración de errores tácticos para calcular con absoluta seguridad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">2. Comprensión Posicional</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Estructuras de peones, planes temáticos de medio juego y técnica de finales para saber qué hacer cuando no hay combinaciones directas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">3. Ecosistema Chessgora</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Integración con la plataforma Chessgora.com para resolver ejercicios diarios, analizar partidas y continuar trabajando entre clases en vivo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">4. Psicología de Torneo</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Control de los nervios, gestión del reloj de competencia y preparación específica del repertorio ante rivales concretos.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Ecosistema Integral */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#172B46] via-[#1C3454] to-[#172B46] border-2 border-[#C5A46D]/50 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
            Una Institución Completa
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
            Todo lo que un ajedrecista y su familia necesitan bajo un mismo sello
          </h2>
          <p className="text-xs sm:text-base text-[#C4CBD4] max-w-3xl mx-auto leading-relaxed">
            Desde la primera lección para un niño que recién aprende el movimiento de las piezas, hasta la preparación de un aspirante a Maestro FIDE; pasando por la adquisición del mejor material reglamentario Staunton en nuestra tienda y la alianza con colegios de todo el país.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link href="/programas" className="btn-dorado py-3 px-6 uppercase tracking-wider">
              Ver Catálogo de Programas
            </Link>
            <Link href="/tienda" className="btn-navy-outline py-3 px-6 uppercase tracking-wider">
              Ir a la Tienda de Ajedrez
            </Link>
            <Link href="/contacto" className="btn-navy-outline py-3 px-6 uppercase tracking-wider">
              Contactar con un Asesor
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
