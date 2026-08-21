import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  BookOpen,
  Crown,
  ChevronRight,
  Calendar,
  GraduationCap,
  Trophy,
  Sparkles,
  Medal,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'MI Roberto Abel Martín del Campo Cárdenas | Fundador & Director Técnico',
  description:
    'Perfil profesional, biografía y trayectoria del Maestro Internacional Roberto Martín del Campo Cárdenas, Medallista de Oro Olímpico en Novi Sad 1990 y fundador de la Academia de Ajedrez Alekhins.',
};

export default function FounderPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8B155]/50 bg-[#1B4D3E] text-[#D8B155] text-xs font-bold uppercase tracking-wider shadow-md">
            <Crown className="w-3.5 h-3.5" />
            Maestro Internacional FIDE • Medalla de Oro Olímpica 🥇
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F6F3EC] leading-tight">
            MI Roberto Abel Martín del Campo Cárdenas
          </h1>

          <p className="text-sm sm:text-base text-[#A8B2A6] leading-relaxed font-sans">
            Fundador y Director Técnico de la <strong>Academia de Ajedrez Alekhins</strong>. Una de las leyendas vivas del ajedrez mexicano, protagonista histórico al conquistar la <strong>Medalla de Oro Olímpica Individual en la 29ª Olimpiada Mundial de Ajedrez (Novi Sad 1990)</strong>, Campeón Panamericano Juvenil y formador de generaciones de maestros y campeones nacionales.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/roberto-martin-del-campo/curriculum" className="btn-champagne text-xs px-6 py-3 flex items-center gap-2 shadow-lg">
              <Trophy className="w-4 h-4" />
              <span>Ver Currículum & Palmarés Deportivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/entrenamiento" className="btn-outline-gold text-xs px-5 py-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Conoce sus Clases en Vivo</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="card-carbon p-6 space-y-6 border-[#D8B155]/40 shadow-2xl relative overflow-hidden">
            <div className="w-full aspect-[4/5] bg-carbon-dark rounded-xl border border-stone-border overflow-hidden relative shadow-inner">
              <Image
                src="/maestro-roberto.jpg"
                alt="MI Roberto Martín del Campo Cárdenas — Maestro Internacional de Ajedrez"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="space-y-2.5 text-xs text-[#A8B2A6] border-t border-stone-border pt-4">
              <div className="flex justify-between">
                <span>Título Oficial:</span>
                <strong className="text-white">Maestro Internacional (FIDE, 1987)</strong>
              </div>
              <div className="flex justify-between">
                <span>Mayor Hito Deportivo:</span>
                <strong className="text-[#D8B155] font-bold">🥇 Oro Olímpico Novi Sad 1990 (75% ef.)</strong>
              </div>
              <div className="flex justify-between">
                <span>FIDE ID:</span>
                <strong className="text-white font-mono">5100046</strong>
              </div>
              <div className="flex justify-between">
                <span>Especialidad Docente:</span>
                <strong className="text-emerald-400">Cálculo & Estrategia Posicional</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logros Destacados Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-carbon p-5 space-y-2 border-emerald-900/60">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <Medal className="w-4 h-4" />
              <span>Olimpiadas FIDE</span>
            </div>
            <p className="font-serif-editorial text-lg font-bold text-white">3 Olimpiadas Mundiales</p>
            <p className="text-[11px] text-[#A8B2A6]">Novi Sad 1990 (Oro), Manila 1992 y Elista 1998.</p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-[#D8B155]/60">
            <div className="flex items-center gap-2 text-[#D8B155] font-bold text-xs uppercase">
              <Trophy className="w-4 h-4" />
              <span>Memorial Torre</span>
            </div>
            <p className="font-serif-editorial text-lg font-bold text-white">Campeón Carlos Torre</p>
            <p className="text-[11px] text-[#A8B2A6]">Ganador de la edición 1996 del torneo más prestigioso de México.</p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-blue-900/60">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
              <Award className="w-4 h-4" />
              <span>Internacional</span>
            </div>
            <p className="font-serif-editorial text-lg font-bold text-white">Campeón en EE.UU.</p>
            <p className="text-[11px] text-[#A8B2A6]">Torneos ganados en Chicago, Miami, Charlotte y Managua.</p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-purple-900/60">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Docencia FIDE</span>
            </div>
            <p className="font-serif-editorial text-lg font-bold text-white">+35 Años de Experiencia</p>
            <p className="text-[11px] text-[#A8B2A6]">Entrenador de campeones nacionales, juveniles y maestros.</p>
          </div>
        </div>
      </section>

      {/* Filosofía Docente */}
      <section className="bg-carbon-surface border-y border-stone-border py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155]">Metodología Pedagógica</span>
            <h2 className="font-serif-editorial text-2xl md:text-3xl font-bold text-[#F6F3EC]">
              Filosofía Docente del Maestro
            </h2>
            <p className="text-xs text-[#A8B2A6] max-w-xl mx-auto">
              Fundamentos probados en la alta competición para construir una visión ajedrecística profunda y duradera.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-ivory-muted">
            <div className="card-carbon p-6 space-y-3">
              <h3 className="font-serif-editorial text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#D8B155]" />
                Rigores del Cálculo Posicional
              </h3>
              <p className="text-xs text-[#A8B2A6] leading-relaxed">
                El verdadero perfeccionamiento ajedrecístico no surge de memorizar jugadas mecánicamente, sino de comprender la estructura profunda de peones, la actividad de las piezas menores y la toma de decisiones basada en la lógica y el cálculo riguroso.
              </p>
            </div>

            <div className="card-carbon p-6 space-y-3">
              <h3 className="font-serif-editorial text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D8B155]" />
                Formación Integral del Carácter
              </h3>
              <p className="text-xs text-[#A8B2A6] leading-relaxed">
                Frente al tablero, el estudiante aprende a tomar decisiones de forma autónoma, a mantener la serenidad bajo presión y a analizar sus errores de forma objetiva, virtudes indispensables dentro y fuera del juego.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
