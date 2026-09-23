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
  ArrowRight,
  Target,
  Shield,
  Flame,
  MessageCircle,
  Video,
  Star,
  Quote
} from 'lucide-react';
import { buildPersonLD, buildBreadcrumbLD } from '@/lib/jsonld';

export const metadata = {
  title: 'MI Roberto Abel Martín del Campo Cárdenas | Fundador & Director Técnico',
  description:
    'Perfil oficial, trayectoria magistral y biografía del Maestro Internacional Roberto Martín del Campo Cárdenas, Medallista de Oro Olímpico en Novi Sad 1990 y Director de la Academia Alekhins.',
};

export default function FounderPage() {
  const personLD = buildPersonLD();
  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'MI Roberto Martín del Campo', url: '/roberto-martin-del-campo' },
  ]);

  return (
    <div className="space-y-20 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* 1. HERO MASTER SECTION */}
      <section className="relative overflow-hidden pt-4 pb-8">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#1B4D3E]/30 to-[#D8B155]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badges de Título */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B155]/60 bg-[#122A1E]/80 text-[#D8B155] text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                <Crown className="w-3.5 h-3.5 text-[#D8B155] animate-pulse" />
                Maestro Internacional FIDE (1987)
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/50 text-amber-300 text-xs font-semibold shadow-md">
                <Medal className="w-3.5 h-3.5 text-amber-400" />
                🥇 Oro Olímpico Novi Sad 1990
              </div>
            </div>

            {/* Nombre y Título */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8B155] font-semibold block">
                Fundador & Director Técnico de la Academia Alekhins
              </span>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F6F3EC] leading-[1.15] tracking-tight">
                Roberto Abel <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6F3EC] via-[#E8C865] to-[#D8B155]">
                  Martín del Campo
                </span>
              </h1>
            </div>

            {/* Biografía ejecutiva */}
            <p className="text-sm sm:text-base text-[#C2CCC0] leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
              Protagonista histórico del ajedrez en Iberoamérica y una de las mentes analíticas más distinguidas de México. Conquistó la <strong className="text-white font-semibold">Medalla de Oro Olímpica Individual</strong> en la 29ª Olimpiada Mundial de la FIDE en Novi Sad 1990. Formador de múltiples generaciones de maestros, campeones nacionales y medallistas panamericanos.
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/roberto-martin-del-campo/curriculum"
                className="btn-champagne text-xs px-6 py-3.5 flex items-center gap-2.5 shadow-xl font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
              >
                <Trophy className="w-4 h-4 text-[#0B1510]" />
                <span>Palmarés Deportivo Completo</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0B1510]" />
              </Link>
              <Link
                href="/entrenamiento"
                className="btn-outline-gold text-xs px-5 py-3.5 flex items-center gap-2 font-bold uppercase tracking-wider backdrop-blur-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#D8B155]" />
                <span>Entrena con el Maestro</span>
              </Link>
              <a
                href="https://wa.me/529991020078?text=Hola%20MI%20Roberto,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20clases%20de%20ajedrez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Personal</span>
              </a>
            </div>
          </div>

          {/* Tarjeta de Fotografía y Credenciales FIDE */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#1C2C23] via-[#121E17] to-[#0D1611] rounded-2xl border-2 border-[#D8B155]/60 shadow-[0_0_50px_rgba(216,177,85,0.2)] p-6 space-y-6 relative overflow-hidden">
              {/* Decoración de esquina */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8B155]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#D8B155]/40 relative shadow-2xl bg-[#080E0B]">
                <Image
                  src="/maestro-roberto.jpg"
                  alt="MI Roberto Martín del Campo Cárdenas — Maestro Internacional de Ajedrez"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B1510] via-[#0B1510]/60 to-transparent p-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D8B155] tracking-widest block">Federación Oficial</span>
                    <span className="text-white text-sm font-bold flex items-center gap-1.5">
                      🇲🇽 México (FIDE)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-[#D8B155] text-[#0B1510] text-[11px] font-black uppercase tracking-wide">
                    FIDE ID: 5100046
                  </span>
                </div>
              </div>

              {/* Sello Oficial Academia Alekhins */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F2E1E]/60 border border-[#D8B155]/30">
                <img
                  src="/alekhins-logo-vector.svg"
                  alt="Academia de Ajedrez Alekhins"
                  className="h-7 w-auto brightness-110"
                />
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8B155]">
                  Director Técnico
                </span>
              </div>

              {/* Ficha Técnica Rápida */}
              <div className="space-y-2 text-xs text-[#A8B2A6] border-t border-[#2B3E34] pt-4">
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Nacimiento:</span>
                  <strong className="text-white font-medium">26 de mayo de 1967 (CDMX)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Título Oficial FIDE:</span>
                  <strong className="text-white font-medium">Maestro Internacional (1987)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Elo Máximo FIDE:</span>
                  <strong className="text-emerald-400 font-mono font-bold">2485 FIDE (Julio 1997)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Mayor Logro Histórico:</span>
                  <strong className="text-[#D8B155] font-bold">🥇 Oro Olímpico Novi Sad 1990 (75% ef.)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Memorial Carlos Torre:</span>
                  <strong className="text-white font-medium">Bicampeón (1987 y 1996)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Capablanca in Memoriam:</span>
                  <strong className="text-white font-medium">1º Lugar Maestros (1993, Cuba)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1C2C23]">
                  <span className="text-[#8E9B8C]">Campeonato Nacional:</span>
                  <strong className="text-white font-medium">Campeón Nacional Abierto (1994)</strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#8E9B8C]">Especialidad Metodológica:</span>
                  <strong className="text-emerald-400 font-semibold">Cálculo Profundo & Posicional</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & IMPACTO METRIC GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition-all rounded-xl p-5 space-y-2 text-center shadow-lg group">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
              <Medal className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">1º Lugar</p>
            <p className="text-xs text-[#D8B155] font-bold uppercase tracking-wider">Oro Olímpico FIDE</p>
            <p className="text-[11px] text-[#8E9B8C]">Novi Sad 1990</p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition-all rounded-xl p-5 space-y-2 text-center shadow-lg group">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[#1B4D3E] text-emerald-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">4 Olimpiadas</p>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Seleccionado Nacional</p>
            <p className="text-[11px] text-[#8E9B8C]">Salónica 1988, Novi Sad 1990, Manila 1992, Elista 1998</p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition-all rounded-xl p-5 space-y-2 text-center shadow-lg group">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[#1B4D3E] text-amber-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">+35 Años</p>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Trayectoria Docente</p>
            <p className="text-[11px] text-[#8E9B8C]">Pedagogía de alto nivel y competición</p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition-all rounded-xl p-5 space-y-2 text-center shadow-lg group">
            <div className="w-10 h-10 mx-auto rounded-lg bg-[#1B4D3E] text-blue-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">+100</p>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Campeones Formados</p>
            <p className="text-[11px] text-[#8E9B8C]">Maestros FIDE y campeones infantiles/juveniles</p>
          </div>
        </div>
      </section>

      {/* 3. LÍNEA DE TIEMPO: HITOS CONSAGRATORIOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/80 border border-[#D8B155]/40 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Cronología de Éxitos
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#F6F3EC]">
            Momentos Clave de una Leyenda del Ajedrez
          </h2>
          <p className="text-xs sm:text-sm text-[#A8B2A6] max-w-xl mx-auto">
            Un recorrido por los hitos deportivos más destacados que han forjado el prestigio y la autoridad del MI Roberto Martín del Campo.
          </p>
        </div>

        <div className="relative border-l-2 border-[#2B3E34] ml-4 md:ml-32 space-y-10 py-4">
          {/* Hito 1: 1985 - 1987 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#D8B155]">1985 – 1987</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                Título de Maestro Internacional FIDE & Campeón Panamericano Juvenil
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Tras coronarse Campeón Nacional Juvenil Sub-20 (1985) y Bicampeón Sub-26 (1986, 1987), conquista el <strong className="text-white">Campeonato Panamericano Juvenil en Asunción (Paraguay, 1987)</strong>, obteniendo con solo 20 años el título oficial de Maestro Internacional concedido por la FIDE.
            </p>
          </div>

          {/* Hito 2: 1987 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D3E] border border-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#D8B155]">1987</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                🏆 Campeón Inaugural del Memorial Carlos Torre Repetto
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Inscribe su nombre en los anales del ajedrez continental al proclamarse <strong className="text-white">primer campeón en la historia</strong> de la I edición del Memorial Carlos Torre Repetto en Mérida, Yucatán.
            </p>
          </div>

          {/* Hito 3: 1988 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D3E] border border-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#8E9B8C]">1988</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                28ª Olimpiada Mundial de Salónica (Grecia)
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Primera participación como Seleccionado Nacional de México en la máxima cita mundial del ajedrez por equipos, representando a su país en la histórica ciudad griega de Salónica.
            </p>
          </div>

          {/* Hito 4: 1990 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 ring-4 ring-[#0B1510] shadow-[0_0_12px_rgba(251,191,36,0.8)] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-amber-400">1990</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white flex items-center gap-2">
                🥇 Medalla de Oro Olímpica Individual en Novi Sad
              </h3>
            </div>
            <p className="text-xs text-[#C2CCC0] leading-relaxed max-w-2xl bg-[#122A1E]/60 p-4 rounded-xl border border-amber-500/40">
              Máxima hazaña del ajedrez mexicano en la 29ª Olimpiada Mundial FIDE (Yugoslavia). Conquistó la medalla de oro individual al mejor tablero del planeta, consagrándose como el ajedrecista mexicano más destacado en la historia de las olimpiadas.
            </p>
          </div>

          {/* Hito 5: 1992 - 1993 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D3E] border border-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#8E9B8C]">1992 – 1993</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                Olimpiada de Manila & Campeón del Torneo Capablanca in Memoriam
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Pilar de la selección olímpica mexicana en Filipinas 1992 y, un año más tarde, conquista el 1º lugar del selecto grupo Maestros en el prestigioso <strong className="text-white">Torneo Internacional Capablanca in Memoriam (Matanzas, Cuba, 1993)</strong>.
            </p>
          </div>

          {/* Hito 5: 1994 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#D8B155]">1994</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                🏆 Campeón Nacional Abierto de México
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Se corona Campeón Absoluto del Campeonato Nacional Abierto Mexicano y triunfa en el Magistral Internacional de la Ciudad de México, reafirmando su supremacía nacional.
            </p>
          </div>

          {/* Hito 6: 1996 - 1997 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#D8B155]">1996 – 1997</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                🏆 Bicampeón del Carlos Torre & Cúspide de Rating (2485 Elo FIDE)
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Conquista por segunda vez el Memorial Carlos Torre Repetto (IX edición) y en julio de 1997 alcanza su <strong className="text-emerald-400">máximo rating oficial FIDE de 2485 puntos</strong>, situándose en el vértice del ajedrez iberoamericano.
            </p>
          </div>

          {/* Hito 7: 1998 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D3E] border border-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#8E9B8C]">1998</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                33ª Olimpiada Mundial de Elista (Rusia)
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Defiende con autoridad el segundo tablero nacional en la emblemática City Chess de Kalmukia frente a maestros de la escuela rusa y la élite mundial.
            </p>
          </div>

          {/* Hito 8: 1995 - 2021 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D3E] border border-[#D8B155] ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-[#8E9B8C]">1995 – 2021</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                Conquista de Circuitos en Estados Unidos (Chicago, Miami, Charlotte)
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Campeón del Chicago Midwest Masters (1995, 1996), Abierto Internacional de Miami (2005) y certámenes magistrales en Charlotte Chess Center (2016, 2021).
            </p>
          </div>

          {/* Hito 6: Actualidad */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-[#0B1510] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              <span className="font-mono text-sm font-black text-emerald-400">Presente</span>
              <h3 className="font-serif-editorial text-lg font-bold text-white">
                Dirección Pedagógica y Fundación de la Academia Alekhins
              </h3>
            </div>
            <p className="text-xs text-[#A8B2A6] leading-relaxed max-w-2xl">
              Liderazgo del proyecto educativo digital para elevar el nivel del ajedrez de habla hispana, combinando metodología clásica, análisis asistido por software y mentoría personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* 4. EL MÉTODO MARTÍN DEL CAMPO (FILOSOFÍA Y DOCENCIA) */}
      <section className="bg-gradient-to-b from-[#0F261B] via-[#0B1510] to-[#0F261B] border-y border-[#1C3328] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#D8B155]">
              Metodología de Alto Rendimiento
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#F6F3EC]">
              Los 4 Pilares del Método Martín del Campo
            </h2>
            <p className="text-xs sm:text-sm text-[#A8B2A6] max-w-xl mx-auto">
              Principios pedagógicos perfeccionados durante más de tres décadas de competición y entrenamiento de élite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pilar 1 */}
            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#1B4D3E] text-[#D8B155]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial text-lg font-bold text-white">
                  1. Rigor en el Cálculo Posicional
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B2A6] leading-relaxed">
                El ajedrez moderno no se aprende memorizando líneas de computadora sin entender el porqué. El método enseña al alumno a encontrar las jugadas candidatas clave y a estructurar árboles de variantes de manera limpia, ordenada y precisa.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#1B4D3E] text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial text-lg font-bold text-white">
                  2. Dominio Estructural & Técnica de Finales
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B2A6] leading-relaxed">
                Comprensión intuitiva de las cadenas de peones, casillas débiles y profilaxis posicional. La técnica de finales garantiza transformar pequeñas ventajas tácticas en victorias contundentes.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#1B4D3E] text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial text-lg font-bold text-white">
                  3. Psicología Competitiva y Manejo del Reloj
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B2A6] leading-relaxed">
                El torneo se gana tanto en la mente como en el tablero. Se trabaja la resiliencia en posiciones difíciles, la toma de decisiones bajo presión de tiempo y el control emocional en momentos críticos.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#1B4D3E] text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif-editorial text-lg font-bold text-white">
                  4. Diagnóstico Clínico de Errores Propios
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8B2A6] leading-relaxed">
                Análisis exhaustivo de las partidas del propio estudiante para erradicar patrones erróneos recurrentes, corrigiendo lagunas de apertura y malos hábitos posicionales.
              </p>
            </div>
          </div>

          {/* Cita del Maestro */}
          <div className="bg-[#0B1510] border border-[#D8B155]/40 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            <Quote className="w-16 h-16 text-[#D8B155]/15 absolute top-4 right-6 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
              <p className="font-serif-editorial text-lg sm:text-xl text-[#F6F3EC] italic leading-relaxed">
                «El ajedrez es una escuela inigualable del pensamiento y del carácter. En cada partida el jugador debe asumir la total responsabilidad de sus decisiones, aprender de la derrota con serenidad y buscar incansablemente la verdad en la posición.»
              </p>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#D8B155] uppercase tracking-wider">
                  MI Roberto Abel Martín del Campo Cárdenas
                </p>
                <p className="text-[11px] text-[#8E9B8C]">
                  Medallista de Oro Olímpico • Director Técnico
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA INVITACIÓN A CLASES Y CONTACTO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#1A3D2B] via-[#122A1E] to-[#1A3D2B] border-2 border-[#D8B155]/50 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#D8B155] text-[#0B1510] text-[10px] font-black uppercase tracking-widest inline-block">
              Capacitación Exclusiva
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Lleva tu ajedrez al siguiente nivel con la guía del Maestro
            </h2>
            <p className="text-xs sm:text-sm text-[#D2DBD0] max-w-xl mx-auto">
              Accede a clases en vivo, planes de entrenamiento estructurados y asesoría directa impartida por el MI Roberto Martín del Campo.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/entrenamiento"
              className="btn-champagne text-xs px-8 py-3.5 font-bold uppercase tracking-wider shadow-xl"
            >
              Ver Planes de Entrenamiento
            </Link>
            <a
              href="https://wa.me/529991020078?text=Hola%20MI%20Roberto,%20quiero%20informaci%C3%B3n%20sobre%20clases%20y%20entrenamiento"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg bg-[#0B1510] hover:bg-[#121E17] border border-[#D8B155] text-[#D8B155] text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
