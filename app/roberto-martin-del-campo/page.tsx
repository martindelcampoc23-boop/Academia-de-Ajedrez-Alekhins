import React from 'react';
import Link from 'next/link';
import { Award, BookOpen, Crown, ChevronRight, Calendar, GraduationCap, Trophy, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'MI Roberto Martín del Campo Cárdenas | Fundador & Director Técnico',
  description:
    'Perfil profesional, biografía y trayectoria del Maestro Internacional Roberto Martín del Campo Cárdenas, fundador de la Academia de Ajedrez Alekhins.',
};

export default function FounderPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-champagne/40 bg-walnut/20 text-champagne text-xs font-semibold uppercase">
            <Crown className="w-3.5 h-3.5" />
            Maestro Internacional de Ajedrez
          </div>

          <h1 className="font-serif-editorial text-3xl md:text-5xl font-extrabold text-ivory">
            MI Roberto Martín del Campo Cárdenas
          </h1>

          <p className="text-base text-ivory-muted leading-relaxed font-sans">
            Fundador y Director Técnico de la <strong>Academia de Ajedrez Alekhins</strong>. Jugador de competición internacional, entrenador titulado y difusor del conocimiento ajedrecístico con más de tres décadas dedicadas al estudio y la enseñanza del ajedrez de alto nivel.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/roberto-martin-del-campo/curriculum" className="btn-champagne text-xs px-5 py-3">
              <Trophy className="w-4 h-4" />
              Ver Currículum Vitae Completo
            </Link>
            <Link href="/videos" className="btn-outline-gold text-xs px-5 py-3">
              <BookOpen className="w-4 h-4" />
              Ver Videoteca & Lecciones
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="card-carbon p-6 space-y-6 border-champagne/40 shadow-2xl relative overflow-hidden">
            <div className="aspect-square bg-carbon-dark rounded border border-stone-border overflow-hidden relative flex items-center justify-center">
              <div className="text-center p-6 space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-walnut border-2 border-champagne flex items-center justify-center font-serif-editorial text-champagne text-2xl font-bold">
                  MI
                </div>
                <h3 className="font-serif-editorial font-bold text-ivory text-lg">
                  Roberto Martín del Campo Cárdenas
                </h3>
                <p className="text-xs text-champagne">Maestro Internacional (FIDE)</p>
                <p className="text-[11px] text-ivory-dim max-w-xs mx-auto">
                  Fotografía oficial y biografía docente disponible para verificación institucional.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-ivory-muted border-t border-stone-border pt-4">
              <div className="flex justify-between">
                <span>Título Oficial:</span>
                <strong className="text-ivory">Maestro Internacional (MI)</strong>
              </div>
              <div className="flex justify-between">
                <span>Especialidad:</span>
                <strong className="text-champagne">Cálculo & Estrategia Posicional</strong>
              </div>
              <div className="flex justify-between">
                <span>Metodología:</span>
                <strong className="text-ivory">Escuela Clásica & Análisis PGN</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía Docente */}
      <section className="bg-carbon-surface border-y border-stone-border py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-champagne">Fundamentos</span>
            <h2 className="font-serif-editorial text-2xl md:text-3xl font-bold text-ivory">
              Filosofía Docente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-ivory-muted">
            <div className="card-carbon p-6 space-y-3">
              <h3 className="font-serif-editorial text-lg font-bold text-ivory flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-champagne" />
                Rigores del Cálculo Posicional
              </h3>
              <p className="text-xs">
                El verdadero perfeccionamiento ajedrecístico no surge de memorizar jugadas mecánicamente, sino de comprender la estructura profunda de peones, la actividad de las piezas menores y la toma de decisiones basada en la lógica y el cálculo riguroso.
              </p>
            </div>

            <div className="card-carbon p-6 space-y-3">
              <h3 className="font-serif-editorial text-lg font-bold text-ivory flex items-center gap-2">
                <Award className="w-5 h-5 text-champagne" />
                Formación Integral del Carácter
              </h3>
              <p className="text-xs">
                Frente al tablero, el estudiante aprende a tomar decisiones de forma autónoma, a mantener la serenidad bajo presión y a analizar sus errores de forma objetiva, virtudes indispensables dentro y fuera del juego.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
