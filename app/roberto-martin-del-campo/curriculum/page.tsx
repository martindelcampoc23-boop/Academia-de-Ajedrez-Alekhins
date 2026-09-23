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
  Shield,
  MessageCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

export const metadata = {
  title: 'Currículum Vitae Oficial | MI Roberto Abel Martín del Campo Cárdenas',
  description:
    'Currículum profesional, palmarés deportivo, medalla de oro olímpica en Novi Sad 1990, títulos FIDE y trayectoria pedagógica del Maestro Internacional Roberto Martín del Campo Cárdenas.',
};

export default function CurriculumPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/roberto-martin-del-campo"
          className="inline-flex items-center gap-2 text-xs text-[#D8B155] hover:text-[#E8C865] font-bold uppercase tracking-wider transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al perfil biográfico
        </Link>
        <span className="text-[11px] font-mono text-[#8E9B8C]">
          Documento Oficial • FIDE ID: 5100046
        </span>
      </div>

      {/* 1. HERO PROFILE DOSSIER HEADER */}
      <div className="bg-gradient-to-b from-[#1C2C23] via-[#121E17] to-[#0D1611] rounded-2xl border-2 border-[#D8B155]/60 p-6 sm:p-10 shadow-[0_0_50px_rgba(216,177,85,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8B155]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left flex justify-center md:justify-start">
            <div className="w-48 h-60 rounded-2xl overflow-hidden border-2 border-[#D8B155] shadow-2xl relative bg-[#080E0B]">
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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4D3E] border border-[#D8B155]/60 text-[#D8B155] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                Maestro Internacional FIDE
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-bold">
                🥇 Oro Olímpico Novi Sad 1990
              </div>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-[#F6F3EC] tracking-tight">
              Roberto Abel Martín del Campo Cárdenas
            </h1>

            <p className="text-xs sm:text-sm text-[#C2CCC0] leading-relaxed max-w-2xl">
              Dossier curricular y palmarés deportivo del Maestro Internacional Roberto Martín del Campo. Más de 35 años representando a México en la élite del ajedrez mundial y forjando una reconocida escuela pedagógica de alto rendimiento.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#8E9B8C] block text-[10px] uppercase font-bold">Titulación</span>
                <span className="font-bold text-[#D8B155]">MI (FIDE, 1987)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#8E9B8C] block text-[10px] uppercase font-bold">Elo Máximo FIDE</span>
                <span className="font-bold text-emerald-400 font-mono">2485 Elo</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#8E9B8C] block text-[10px] uppercase font-bold">Récord Oro</span>
                <span className="font-bold text-amber-400">75% Efectividad</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-left">
                <span className="text-[#8E9B8C] block text-[10px] uppercase font-bold">Federación</span>
                <span className="font-bold text-white">México (FIDE)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PALMARÉS OLÍMPICO FIDE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-4">
          <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-700/60 text-amber-300">
            <Medal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
              Representación en Olimpiadas Mundiales de Ajedrez (FIDE)
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Participaciones estelares como Seleccionado Nacional de México en las máximas cumbres del ajedrez por equipos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Novi Sad 1990 */}
          <div className="bg-gradient-to-b from-[#1C3A29] to-[#0F1E16] border-2 border-[#D8B155] rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#D8B155] text-[#0B1510] text-[10px] font-black uppercase tracking-wider">
                🥇 Medalla de Oro Individual
              </span>
              <span className="text-xs font-mono text-[#D8B155] font-bold">1990</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-editorial text-xl font-bold text-white">
                29ª Olimpiada de Novi Sad
              </h3>
              <p className="text-xs text-[#D8B155]">Yugoslavia • Tablero 4 de México</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1510]/80 border border-[#2B3E34] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Rendimiento Histórico:</span>
                <strong className="text-emerald-400 font-bold">75.0% de efectividad</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Score Individual:</span>
                <strong className="text-white font-mono">+6 =3 -1 (7.5 / 10 pts)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Distinción:</span>
                <strong className="text-[#D8B155]">Mejor Tablero del Torneo</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#C2CCC0] italic leading-relaxed">
              Una de las más grandes gestas deportivas en la historia del ajedrez mexicano, superando a maestros y grandes maestros de las principales potencias mundiales.
            </p>
          </div>

          {/* Manila 1992 */}
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#1B4D3E] text-[#D8B155] text-[10px] font-bold uppercase">
                Seleccionado Olímpico
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1992</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-editorial text-xl font-bold text-white">
                30ª Olimpiada de Manila
              </h3>
              <p className="text-xs text-[#A8B2A6]">Filipinas • Tablero 3 de México</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1510] border border-[#2B3E34] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Partidas Oficiales:</span>
                <strong className="text-white font-mono">14 rondas disputadas</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Score Individual:</span>
                <strong className="text-white font-mono">+6 =5 -3 (8.5 / 14 pts)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Desempeño:</span>
                <strong className="text-emerald-400">Pilar del Equipo Nacional</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#8E9B8C] leading-relaxed">
              Consolidación como referente nacional en el circuito olímpico internacional enfrentando a seleccionados de los 5 continentes.
            </p>
          </div>

          {/* Elista 1998 */}
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#1B4D3E] text-[#D8B155] text-[10px] font-bold uppercase">
                Seleccionado Olímpico
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1998</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-editorial text-xl font-bold text-white">
                33ª Olimpiada de Elista
              </h3>
              <p className="text-xs text-[#A8B2A6]">Rusia (Kalmukia) • Tablero 2 de México</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B1510] border border-[#2B3E34] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Jerarquía:</span>
                <strong className="text-white">2º Tablero Nacional</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Competencia:</span>
                <strong className="text-white">Élite FIDE Internacional</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9B8C]">Sede:</span>
                <strong className="text-white">City Chess, Elista</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#8E9B8C] leading-relaxed">
              Enfrentamiento directo contra grandes maestros de la escuela rusa y europea en una de las olimpiadas más exigentes técnicamente.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TORNEOS INTERNACIONALES Y MAGISTRALES GANADOS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
              Torneos Magistrales e Internacionales Ganados
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Palmarés deportivo en eventos con normas internacionales y torneos abiertos de máxima categoría.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Torneo Magistral Continental
              </span>
              <span className="text-xs font-mono text-[#D8B155] font-bold">1987 & 1996</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Bicampeón del Memorial Carlos Torre Repetto
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Logro histórico sin precedentes: <strong className="text-white">Primer campeón en la historia</strong> de la I edición inaugural en 1987 y coronado nuevamente en la IX edición de 1996 en Mérida, Yucatán, venciendo a Grandes Maestros internacionales.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Magistral Élite en Cuba
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1993</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón del Torneo Capablanca in Memoriam
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Primer lugar en el selecto grupo Maestros del certamen más importante de las Antillas (Matanzas, Cuba), imponiéndose con brillantez táctica a la prestigiosa escuela cubana e internacional.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Campeonato Nacional Absoluto
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1994</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón del Nacional Abierto de México
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Monarca absoluto de la máxima justa ajedrecística del país en 1994, además de conquistar ese mismo año el Magistral Internacional de la Ciudad de México de forma contundente.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Campeonato Continental
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1987</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón Panamericano Juvenil
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Triunfo continental que le otorgó oficialmente el título de Maestro Internacional de la FIDE con apenas 20 años de edad.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Circuitos en Estados Unidos
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1995 – 2021</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón en Chicago, Miami y Charlotte
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Ganador de los torneos abiertos de Chicago (1995, 1996), Abierto Internacional de Miami (2005) y torneos magistrales en Charlotte (2016, 2021).
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Torneo Abierto Internacional
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1991 – 1994</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón Internacional de Managua & CDMX
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Primer lugar invicto en el Torneo Internacional de Managua (Nicaragua, 1991) y ganador del Magistral Abierto de la Ciudad de México (1994).
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Campeonatos Nacionales de México
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1985 – 1988</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Campeón Nacional Juvenil y Medallista Absoluto
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Campeón Nacional Sub-20 (1985), Bi-campeón Nacional Sub-26 (1986, 1987) y medallista de plata (1987) y bronce (1988) en el Campeonato Nacional Absoluto de México.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/50 transition-all rounded-xl p-6 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D8B155] text-xs uppercase tracking-wider">
                Campeonatos Continentales & Mundiales por Equipos
              </span>
              <span className="text-xs font-mono text-[#8E9B8C] font-bold">1985 – 1991</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-lg">
              🏆 Panamericanos por Equipos & Mundial Sub-26
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Representante nacional en los Panamericanos por Equipos de Villa Gesell (1987) y Mar del Plata (1991), y en los Mundiales Juveniles Sub-26 de Mendoza (Argentina, 1985) y Curazao (1989).
            </p>
          </div>
        </div>

        {/* TABLA OFICIAL RESUMEN DE PALMARÉS */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl overflow-hidden shadow-xl mt-6">
          <div className="p-4 sm:p-6 bg-[#16271E] border-b border-[#2B3E34] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif-editorial text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#D8B155]" />
                Cuadro de Honor y Campeonatos Principales
              </h3>
              <p className="text-xs text-[#8E9B8C]">Registro histórico verificado de títulos y primeros lugares</p>
            </div>
            <span className="text-[11px] font-mono text-[#D8B155] bg-[#0B1510] px-3 py-1 rounded-full border border-[#D8B155]/30">
              FIDE ID: 5100046
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B1510]/80 text-[#D8B155] uppercase text-[10px] font-bold tracking-wider border-b border-[#2B3E34]">
                <tr>
                  <th className="py-3 px-4">Año</th>
                  <th className="py-3 px-4">Certamen / Torneo</th>
                  <th className="py-3 px-4">Sede / País</th>
                  <th className="py-3 px-4">Resultado / Puesto</th>
                  <th className="py-3 px-4 hidden md:table-cell">Distinción FIDE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2C23] text-gray-300">
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#D8B155]">1990</td>
                  <td className="py-3 px-4 font-semibold text-white">29ª Olimpiada Mundial de Ajedrez</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Novi Sad, Yugoslavia</td>
                  <td className="py-3 px-4"><span className="text-amber-300 font-bold">🥇 Medalla de Oro Individual</span> (7.5/10 pts)</td>
                  <td className="py-3 px-4 hidden md:table-cell text-emerald-400 font-bold">75.0% Efectividad (Mejor Tablero 4)</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1987</td>
                  <td className="py-3 px-4 font-semibold text-white">I Memorial Carlos Torre Repetto</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Mérida, Yucatán, MEX</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 Campeón Inaugural</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">1º Campeón en la Historia del Evento</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1996</td>
                  <td className="py-3 px-4 font-semibold text-white">IX Memorial Carlos Torre Repetto</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Mérida, Yucatán, MEX</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 Campeón Magistral</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Bicampeón del Torneo Magistral</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1987</td>
                  <td className="py-3 px-4 font-semibold text-white">Campeonato Panamericano Juvenil</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Asunción, Paraguay</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 Campeón Panamericano</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-amber-400">Otorga Título de MI FIDE (a los 20 años)</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1993</td>
                  <td className="py-3 px-4 font-semibold text-white">Torneo Capablanca in Memoriam</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Matanzas, Cuba</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 1º Lugar Grupo Maestros</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Magistral Internacional de Élite</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1994</td>
                  <td className="py-3 px-4 font-semibold text-white">Campeonato Nacional Abierto</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">México</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 Campeón Absoluto de México</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Máxima Corona Nacional FENAMAC</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1991</td>
                  <td className="py-3 px-4 font-semibold text-white">Torneo Internacional de Managua</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Managua, Nicaragua</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 1º Lugar Invicto</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Torneo Internacional Abierto</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1995 – 1996</td>
                  <td className="py-3 px-4 font-semibold text-white">Chicago Midwest Masters</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Chicago, Illinois, USA</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 Campeón Biconsagrado</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Circuito Abierto de Maestros USA</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">1997</td>
                  <td className="py-3 px-4 font-semibold text-white">Clasificación Mundial FIDE</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Ranking Oficial FIDE</td>
                  <td className="py-3 px-4"><span className="text-emerald-400 font-mono font-bold">2485 Elo FIDE</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-emerald-400 font-bold">Cúspide de Rating Histórico</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">2005</td>
                  <td className="py-3 px-4 font-semibold text-white">Miami International Chess Open</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Miami, Florida, USA</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 1º Lugar</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Torneo Abierto de Maestros</td>
                </tr>
                <tr className="hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-4 font-mono text-[#D8B155]">2016 – 2021</td>
                  <td className="py-3 px-4 font-semibold text-white">Charlotte Chess Center Invitational</td>
                  <td className="py-3 px-4 text-[#8E9B8C]">Charlotte, NC, USA</td>
                  <td className="py-3 px-4"><span className="text-[#D8B155] font-bold">🏆 1º Lugar Magistral</span></td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-400">Normas y Torneos Magistrales</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. TRAYECTORIA DOCENTE Y DIRECCIÓN TÉCNICA */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#2B3E34] pb-4">
          <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-700/60 text-blue-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
              Trayectoria Docente y Dirección Pedagógica
            </h2>
            <p className="text-xs text-[#A8B2A6]">
              Más de 35 años consagrados a la enseñanza del ajedrez de alto rendimiento y la formación de talento competitivo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Fundador de la Academia Alekhins
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Diseño integral de programas pedagógicos estructurados por niveles de elo (Iniciación, Desarrollo y Alto Rendimiento), con metodologías avaladas en torneos oficiales.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-emerald-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Entrenador de Talentos y Titulados
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Mentor directo de múltiples campeones infantiles y juveniles de México, maestros titulados FIDE y seleccionados estatales en justas de la CONADE y FENAMAC.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-blue-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Entrenador Estatal (CONADE)
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Entrenador y preparador técnico de delegaciones estatales (incluyendo la Selección de Chihuahua) en los Juegos Nacionales CONADE y festivales nacionales.
            </p>
          </div>

          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial font-bold text-white text-base">
              Escuela Clásica & Motores
            </h3>
            <p className="text-xs text-[#A8B2A6] leading-relaxed">
              Combinación armónica del estudio de los clásicos (Alekhine, Capablanca, Fischer) con el análisis moderno de motores y bases de datos para una comprensión profunda.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION & ASESORÍA PERSONALIZADA */}
      <div className="bg-gradient-to-r from-[#122A1E] via-[#0B1510] to-[#122A1E] border-2 border-[#D8B155]/60 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
            Entrena directamente con el Maestro Internacional
          </h3>
          <p className="text-xs sm:text-sm text-[#A8B2A6] max-w-xl mx-auto">
            Únete a las clases en vivo, planes personalizados o solicita una sesión de diagnóstico con el MI Roberto Martín del Campo.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/entrenamiento" className="btn-champagne text-xs px-8 py-3.5 font-bold uppercase tracking-wider shadow-lg">
            Ver Planes de Estudio
          </Link>
          <a
            href="https://wa.me/529991020078?text=Hola%20MI%20Roberto,%20deseo%20asesor%C3%ADa%20personalizada%20de%20ajedrez"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/50 text-emerald-300 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp (+52 999 102 0078)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
