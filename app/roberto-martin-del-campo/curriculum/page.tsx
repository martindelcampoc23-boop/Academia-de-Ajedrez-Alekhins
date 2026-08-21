import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Trophy,
  GraduationCap,
  Calendar,
  Medal,
  Globe,
  Star,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Crown,
  Sparkles,
  Target,
  Shield
} from 'lucide-react';

export const metadata = {
  title: 'Currículum Vitae Oficial | MI Roberto Abel Martín del Campo Cárdenas',
  description:
    'Currículum profesional, palmarés deportivo, medalla de oro olímpica en Novi Sad 1990, títulos FIDE y trayectoria pedagógica del Maestro Internacional Roberto Martín del Campo Cárdenas.',
};

export default function CurriculumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/roberto-martin-del-campo"
          className="inline-flex items-center gap-1.5 text-xs text-[#D8B155] hover:underline font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al perfil del fundador
        </Link>
      </div>

      {/* Hero Profile Header */}
      <div className="card-carbon p-8 border-[#D8B155]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D8B155]/5 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left">
            <div className="w-44 h-56 mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-[#D8B155] shadow-xl relative">
              <Image
                src="/maestro-roberto.jpg"
                alt="MI Roberto Abel Martín del Campo Cárdenas"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E] border border-[#D8B155]/50 text-[#D8B155] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              Maestro Internacional FIDE • FIDE ID: 5100046
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#F6F3EC]">
              Roberto Abel Martín del Campo Cárdenas
            </h1>

            <p className="text-xs sm:text-sm text-[#A8B2A6] leading-relaxed">
              Gran exponente del ajedrez mexicano contemporáneo. Medallista de Oro Olímpico Individual (Novi Sad 1990), Campeón Panamericano Juvenil, ganador del Memorial Carlos Torre Repetto y pedagogo con más de 35 años de experiencia formando campeones y maestros.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#A8B2A6] block text-[10px] uppercase font-bold">Título Máximo</span>
                <span className="font-bold text-[#D8B155]">Maestro Internacional (1987)</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#A8B2A6] block text-[10px] uppercase font-bold">Hito Histórico</span>
                <span className="font-bold text-emerald-400">🥇 Oro Olímpico (1990)</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#A8B2A6] block text-[10px] uppercase font-bold">Federación</span>
                <span className="font-bold text-white">México (FIDE)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. PALMARÉS OLÍMPICO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-3">
          <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300">
            <Medal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#F6F3EC]">
              Representación en Olimpiadas Mundiales de Ajedrez (FIDE)
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Seleccionado Nacional de México en las máximas justas del ajedrez internacional por equipos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Novi Sad 1990 */}
          <div className="card-carbon p-6 space-y-4 border-[#D8B155] relative overflow-hidden bg-gradient-to-b from-[#1A3D2B]/40 to-[#121E17]">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#D8B155] text-[#0B1510] text-[10px] font-extrabold uppercase">
                🥇 Medalla de Oro Individual
              </span>
              <span className="text-xs font-mono text-[#D8B155] font-bold">1990</span>
            </div>

            <h3 className="font-serif-editorial text-lg font-bold text-white">
              29ª Olimpiada de Novi Sad
            </h3>
            <p className="text-xs text-[#A8B2A6]">Yugoslavia • Tablero 4 de México</p>

            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Rendimiento:</span>
                <strong className="text-emerald-400 font-bold">75.0% de efectividad</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Récord individual:</span>
                <strong className="text-white">+6 =3 -1 (7.5 / 10 pts)</strong>
              </div>
            </div>

            <p className="text-[11px] text-gray-300 italic leading-relaxed">
              Una de las actuaciones más brillantes en la historia del ajedrez mexicano, superando a maestros y grandes maestros de todo el planeta.
            </p>
          </div>

          {/* Manila 1992 */}
          <div className="card-carbon p-6 space-y-4 border-[#2B3E34]">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3E] text-[#D8B155] text-[10px] font-bold uppercase">
                Seleccionado Olímpico
              </span>
              <span className="text-xs font-mono text-[#A8B2A6] font-bold">1992</span>
            </div>

            <h3 className="font-serif-editorial text-lg font-bold text-white">
              30ª Olimpiada de Manila
            </h3>
            <p className="text-xs text-[#A8B2A6]">Filipinas • Tablero 3 de México</p>

            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Partidas disputadas:</span>
                <strong className="text-white">14 rondas oficiales</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Récord individual:</span>
                <strong className="text-white">+6 =5 -3 (8.5 / 14 pts)</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#A8B2A6] leading-relaxed">
              Consolidación como pilar indiscutible del equipo olímpico mexicano en los tableros principales.
            </p>
          </div>

          {/* Elista 1998 */}
          <div className="card-carbon p-6 space-y-4 border-[#2B3E34]">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3E] text-[#D8B155] text-[10px] font-bold uppercase">
                Seleccionado Olímpico
              </span>
              <span className="text-xs font-mono text-[#A8B2A6] font-bold">1998</span>
            </div>

            <h3 className="font-serif-editorial text-lg font-bold text-white">
              33ª Olimpiada de Elista
            </h3>
            <p className="text-xs text-[#A8B2A6]">Rusia (Kalmukia) • Tablero 2 de México</p>

            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Posición en equipo:</span>
                <strong className="text-white">2º Tablero Nacional</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8B2A6]">Récord individual:</span>
                <strong className="text-white">+2 =3 -4</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#A8B2A6] leading-relaxed">
              Enfrentamiento directo contra la élite mundial del ajedrez soviético y europeo en la capital del ajedrez.
            </p>
          </div>
        </div>
      </div>

      {/* 2. LOGROS INTERNACIONALES Y NACIONALES */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#F6F3EC]">
              Torneos Magistrales e Internacionales Ganados
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Palmarés deportivo en eventos de norma internacional y campeonatos abiertos de prestigio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-carbon p-5 space-y-2 border-stone-border">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase">Torneo Magistral Continental</span>
              <span className="text-xs font-mono text-[#A8B2A6]">1996</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              🏆 Campeón del Memorial Carlos Torre Repetto
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              El torneo internacional de mayor prestigio en México y América Latina, reuniendo a Grandes Maestros de todo el mundo.
            </p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-stone-border">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase">Campeonato Continental</span>
              <span className="text-xs font-mono text-[#A8B2A6]">1987</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              🏆 Campeón Panamericano Juvenil
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Título continental que consagró su obtención oficial de la titulación de Maestro Internacional por la FIDE a los 20 años.
            </p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-stone-border">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase">Torneos en Estados Unidos</span>
              <span className="text-xs font-mono text-[#A8B2A6]">1995 - 2021</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              🏆 Campeón en Chicago, Miami y Charlotte
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Ganador de los torneos abiertos de Chicago (1995, 1996), Abierto Internacional de Miami (2005) y torneos magistrales en Charlotte (2016, 2021).
            </p>
          </div>

          <div className="card-carbon p-5 space-y-2 border-stone-border">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase">Campeonatos Nacionales</span>
              <span className="text-xs font-mono text-[#A8B2A6]">1985 - 1988</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              🏆 Campeón Nacional Juvenil y Medallista Absoluto
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Campeón Nacional Sub-20 (1985), Bi-campeón Nacional Sub-26 (1986, 1987) y medallista de plata (1987) y bronce (1988) en el Campeonato Nacional Absoluto de México.
            </p>
          </div>
        </div>
      </div>

      {/* 3. TRAYECTORIA DOCENTE Y METODOLOGÍA */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-3">
          <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#F6F3EC]">
              Trayectoria Docente y Dirección Técnica
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Más de 35 años consagrados a la pedagogía de alto nivel y la formación de ajedrecistas de competencia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-carbon p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Fundador de la Academia Alekhins
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Dirección metodológica integral, selección de material bibliográfico de vanguardia y programas estructurados por niveles de ELO.
            </p>
          </div>

          <div className="card-carbon p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Entrenador de Talentos y Titulados
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Formador directo de múltiples campeones nacionales infantiles y juveniles, Maestros FIDE y seleccionados estatales en torneos de la FENAMAC.
            </p>
          </div>

          <div className="card-carbon p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Escuela Clásica & Análisis Riguroso
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Especialista en cálculo de variantes sin sesgos, comprensión profunda de estructuras de peones y la técnica del medio juego y finales.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="card-carbon p-8 text-center space-y-4 border-[#D8B155]/40 bg-gradient-to-b from-[#121E17] to-[#0B1510]">
        <h3 className="font-serif-editorial text-2xl font-bold text-[#F6F3EC]">
          ¿Listo para entrenar con el Maestro Internacional?
        </h3>
        <p className="text-xs sm:text-sm text-[#A8B2A6] max-w-xl mx-auto">
          Conoce los planes de estudio disponibles y únete a las clases en vivo impartidas y supervisadas por el MI Roberto Martín del Campo.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/entrenamiento" className="btn-champagne text-xs px-6 py-3">
            Ver Planes de Entrenamiento
          </Link>
          <Link href="/contacto" className="btn-outline-gold text-xs px-6 py-3">
            Contactar para Asesoría
          </Link>
        </div>
      </div>
    </div>
  );
}
