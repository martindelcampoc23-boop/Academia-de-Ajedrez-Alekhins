'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Crown,
  Trophy,
  Award,
  Medal,
  Calendar,
  CheckCircle2,
  Users,
  ShieldCheck,
  Star,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Globe
} from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function DirectorCurriculumPage() {
  const [activeTab, setActiveTab] = useState<'JUGADOR' | 'ENTRENADOR' | 'PALMARES'>('JUGADOR');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('/maestro-roberto-tablero.jpg');

  const photos = [
    {
      src: '/maestro-roberto-tablero.jpg',
      label: 'Frente al Tablero',
      caption: 'MI Roberto Martín del Campo — Cátedra y Maestría en Tablero',
    },
    {
      src: '/maestro-roberto-partida.jpg',
      label: 'En Torneo',
      caption: 'MI Roberto Martín del Campo en plena concentración competitiva',
    },
    {
      src: '/maestro-roberto.jpg',
      label: 'Retrato FIDE',
      caption: 'Director Académico de Academia Alekhins (FIDE ID: 5100046)',
    },
  ];

  const currentPhoto = photos.find((p) => p.src === selectedPhoto) || photos[0];

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola Maestro Roberto Martín del Campo, he revisado su currículum y deseo solicitar información para entrenar con usted en Academia Alekhins.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* =========================================================
            1. HERO PRINCIPAL CON FOTOGRAFÍA EN COMPETENCIA
        ========================================================= */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#172B46] via-[#1C3454] to-[#0F1D30] border-2 border-[#C5A46D] p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden">
          {/* Fondo sutil de luz */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Foto del Maestro en Torneo & Tablero */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-[#C5A46D] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(197,164,109,0.3)] bg-[#0F1D30] group">
                <Image
                  key={currentPhoto.src}
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1D30] via-[#0F1D30]/85 to-transparent p-5 text-center">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#C5A46D] block">
                    Fotografía Oficial
                  </span>
                  <p className="text-xs text-[#FAF8F2] font-semibold">
                    {currentPhoto.caption}
                  </p>
                </div>
              </div>

              {/* Selector de Fotografía */}
              <div className="flex items-center justify-center gap-2">
                {photos.map((p) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setSelectedPhoto(p.src)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedPhoto === p.src
                        ? 'bg-[#C5A46D] text-[#0F1D30] shadow'
                        : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
                    }`}
                  >
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Ficha Rápida FIDE */}
              <div className="p-3.5 rounded-2xl bg-[#0F1D30]/90 border border-[#233F65] text-xs flex items-center justify-between">
                <div>
                  <span className="text-[#9CA3AF] text-[10px] uppercase font-bold block">FIDE ID Oficial:</span>
                  <strong className="text-white font-mono text-sm">5100046</strong>
                </div>
                <div>
                  <span className="text-[#9CA3AF] text-[10px] uppercase font-bold block">Rating FIDE Máximo:</span>
                  <strong className="text-[#C5A46D] font-mono text-sm">2485 Elo</strong>
                </div>
                <div>
                  <span className="text-[#9CA3AF] text-[10px] uppercase font-bold block">Federación:</span>
                  <strong className="text-white">México (MEX)</strong>
                </div>
              </div>
            </div>

            {/* Texto & Títulos Principales */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
                <Crown className="w-4 h-4" />
                <span>Director Académico • Academia Alekhins</span>
              </div>

              <div>
                <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Roberto Abel Martín del Campo Cárdenas
                </h1>
                <p className="text-sm sm:text-base text-[#C5A46D] font-semibold mt-2">
                  Maestro Internacional &amp; Entrenador de la Federación Internacional de Ajedrez (FIDE Trainer)
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#C4CBD4] leading-relaxed font-light">
                Una de las figuras más condecoradas y respetadas en la historia del ajedrez contemporáneo en México y América Latina. Medallista de Oro en la Olimpiada Mundial de Novi Sad 1990, cuatro veces representante olímpico de México, Campeón Panamericano y forjador de generaciones de atletas con podio mundial.
              </p>

              {/* Grid de Distinciones Principales */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-2xl bg-[#0F1D30] border border-[#233F65]">
                  <Medal className="w-5 h-5 text-[#C5A46D] mx-auto mb-1" />
                  <strong className="text-white block font-serif-editorial text-base">Oro Olímpico</strong>
                  <span className="text-[10px] text-[#9CA3AF]">Novi Sad 1990</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F1D30] border border-[#233F65]">
                  <Globe className="w-5 h-5 text-[#C5A46D] mx-auto mb-1" />
                  <strong className="text-white block font-serif-editorial text-base">4 Olimpiadas</strong>
                  <span className="text-[10px] text-[#9CA3AF]">Mundiales FIDE</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F1D30] border border-[#233F65]">
                  <GraduationCap className="w-5 h-5 text-[#C5A46D] mx-auto mb-1" />
                  <strong className="text-white block font-serif-editorial text-base">FIDE Trainer</strong>
                  <span className="text-[10px] text-[#9CA3AF]">Título Oficial 2005</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F1D30] border border-[#233F65]">
                  <Star className="w-5 h-5 text-[#C5A46D] mx-auto mb-1" />
                  <strong className="text-white block font-serif-editorial text-base">2485 Elo</strong>
                  <span className="text-[10px] text-[#9CA3AF]">Rating FIDE Peak</span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-6 shadow-lg flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Solicitar Entrenamiento con el Maestro
                </a>
                <Link
                  href="/clases-personalizadas"
                  className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-5"
                >
                  Planes de Clases 1 a 1
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
            2. PESTAÑAS INTERACTIVAS: JUGADOR | ENTRENADOR | PALMARÉS
        ========================================================= */}
        <section className="space-y-8">
          
          {/* Navegador de Pestañas */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-[#1C3454] pb-4">
            <button
              onClick={() => setActiveTab('JUGADOR')}
              className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'JUGADOR'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-lg'
                  : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Actuación como Deportista (Jugador)</span>
            </button>

            <button
              onClick={() => setActiveTab('ENTRENADOR')}
              className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'ENTRENADOR'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-lg'
                  : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Actuación como Entrenador (FIDE Trainer)</span>
            </button>

            <button
              onClick={() => setActiveTab('PALMARES')}
              className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'PALMARES'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-lg'
                  : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
              }`}
            >
              <Medal className="w-4 h-4" />
              <span>Palmarés Olímpico &amp; Premios de Estado</span>
            </button>
          </div>

          {/* =========================================================
              CONTENIDO 1: ACTUACIÓN COMO DEPORTISTA
          ========================================================= */}
          {activeTab === 'JUGADOR' && (
            <div className="space-y-12 animate-fadeIn">
              
              <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] max-w-4xl mx-auto text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                  Carrera de Élite Internacional
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Más de Cuatro Décadas en la Alta Competición Magistral
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed">
                  Desde sus tempranos triunfos juveniles continentales hasta sus recientes victorias en los US Masters y certámenes FIDE en Estados Unidos y México.
                </p>
              </div>

              {/* Bloque 1: 2015 a 2026 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#C5A46D] text-[#0F1D30] font-black text-xs uppercase tracking-wider">
                    2015 — 2026
                  </span>
                  <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                    Competición Magistral &amp; Circuito Senior Internacional
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2026</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Segundo Lugar</strong> en el Torneo Internacional &quot;Pez Vela&quot;, en la ciudad de Manzanillo, Colima.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2024</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Segundo Lugar</strong> en el prestigioso Torneo Internacional <em>1000 GM/IM Winter Invitational</em> en Nueva York (Enero 2024).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2021 — 2022</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Primer Lugar Senior</strong> en el Torneo <em>US Masters</em> en Charlotte, Estados Unidos (2021).<br />
                      • <strong>Primer Lugar Compartido Senior</strong> en el Torneo <em>US Masters</em> en Charlotte, Estados Unidos (2022).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2019</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Primer Lugar compartido</strong> en el Torneo Internacional de Charlotte, EE. UU.<br />
                      • <strong>Segundo Lugar</strong> en el Torneo Internacional cerrado <em>CCCSA IM Norm Invitational</em> (Charlotte, EE. UU.).<br />
                      • <strong>Segundo Lugar</strong> en el Torneo Internacional Copa Chihuahua.<br />
                      • Primer Lugar Senior en Primera Fuerza en la Copa Progreso.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2016 — 2017</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Primer Lugar</strong> en el Torneo Internacional cerrado: <em>CCCSA IM Norm Invitational</em> en Charlotte, EE. UU. (Marzo 2016).<br />
                      • <strong>Primer Lugar</strong> en el Torneo Internacional Abierto <em>El Paso Open</em>, Texas (Abril 2016).<br />
                      • 7° Lugar Nacional en las listas de Rating FIDE.<br />
                      • Primer Lugar en la Copa Benito Juárez, Oaxaca (2017).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2015</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Segundo mexicano mejor clasificado</strong> en el Campeonato Nacional e Internacional Abierto de Ajedrez (Monterrey, N.L.).<br />
                      • <strong>Segundo Lugar</strong> en el Campeonato Nacional Cerrado organizado por FENAMAC en México D.F.<br />
                      • Primer Lugar en el I Campeonato Nacional Abierto de Verano (Oaxtepec, Morelos) y Campeón Copa Díaz Ordaz (Oaxaca).
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque 2: 2000 a 2014 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#C5A46D] text-[#0F1D30] font-black text-xs uppercase tracking-wider">
                    2000 — 2014
                  </span>
                  <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                    Consolidación Nacional, Miami &amp; Carlos Torre Repetto
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2005</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Primer Lugar</strong> en el Campeonato Nacional Abierto de Ajedrez &quot;Copa Cinco de Mayo&quot;.<br />
                      • <strong>Primer Lugar Compartido</strong> en el Torneo Internacional de Miami 2005 (a sólo medio punto de la norma de Gran Maestro).<br />
                      • Subcampeón en el Torneo Abierto de Ajedrez del Distrito Federal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2008 &amp; 2010</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Miembro de la Selección Mexicana</strong> en el I Campeonato Mundial de Juegos de la Mente (Beijing, China 2008).<br />
                      • <strong>Primer Lugar</strong> en el Torneo &quot;David H. Meir&quot; en El Paso, Texas (Primera Fuerza 2010).<br />
                      • Segundo Lugar en la Copa Nacional Guadalajara y 7° en el Torneo Internacional &quot;UNAM 100 Años&quot;.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2004</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Clasificación a la Etapa Wimbledon</strong> (cuartos de final) y 9° lugar general en el prestigiado Torneo Internacional &quot;Carlos Torre Repetto&quot; en Mérida, Yucatán.<br />
                      • 4° Lugar en el Torneo Internacional de Coamo, Puerto Rico.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">2001 — 2003</strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Primer Lugar</strong> en el Torneo Selectivo &quot;Rumbo a Las Vegas&quot;.<br />
                      • Segundo Lugar en el Torneo Internacional &quot;Baños de Coamo&quot; (Puerto Rico) y 3er lugar en el Internacional de San Lorenzo (Puerto Rico).<br />
                      • Tercer Lugar en el Campeonato Nacional Abierto en Primera Fuerza (Durango).
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque 3: 1990 a 1999 (La Década Dorada) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#C5A46D] text-[#0F1D30] font-black text-xs uppercase tracking-wider">
                    1990 — 1999
                  </span>
                  <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                    Oro Olímpico en Novi Sad, Mundial Sub-26 &amp; Título Nacional Abierto
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#172B46] border-2 border-[#C5A46D] space-y-1.5 relative">
                    <div className="inline-flex items-center gap-1 text-[#C5A46D] font-extrabold uppercase text-[10px]">
                      <Medal className="w-3.5 h-3.5" /> Hito Histórico Olímpico
                    </div>
                    <strong className="text-white block font-bold text-sm">
                      1990 — Medalla de Oro Olímpica (Novi Sad, Yugoslavia)
                    </strong>
                    <p className="text-[#E5DFD1]">
                      Integrante y <strong>Medalla de Oro</strong> con la Selección de México en la Olimpiada Mundial de Ajedrez celebrada en Novi Sad, Yugoslavia. Una de las mayores gestas del deporte ciencia mexicano.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">
                      1993 — Medalla de Plata en Campeonato Mundial Sub-26 (Curitiba, Brasil)
                    </strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Medalla de Plata individual</strong> y 4° lugar por equipos en el Campeonato Mundial para menores de 26 años en Curitiba, Brasil.<br />
                      • <strong>Primer Lugar compartido</strong> en el Torneo Internacional &quot;Capablanca in Memoriam&quot; (Grupo Maestros) en Matanzas, Cuba.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">
                      1994 — 1995 — Bicampeón Nacional Abierto de México
                    </strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Campeón Nacional Abierto de México</strong> (1994 y 1995).<br />
                      • Campeón Nacional Activo en Durango.<br />
                      • Campeón Torneo Internacional &quot;Coronel Araiza in Memoriam&quot; e Internacional ISSSTE.<br />
                      • <strong>Campeón del Campeonato Estatal de Illinois</strong> en Chicago, Estados Unidos (1995).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">
                      1996 — 1998 — Olimpiada de Elista &amp; Carlos Torre Repetto
                    </strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Campeón del Torneo Internacional &quot;Carlos Torre Repetto&quot;</strong> en Mérida, Yucatán (1996).<br />
                      • Bicampeón compartido Estatal de Illinois, Chicago (1996).<br />
                      • Representante de México en la <strong>Olimpiada Mundial de Ajedrez 1998</strong> en Elista, Kalmykia, Rusia.<br />
                      • Campeón Nacional de Ajedrez Activo 1999 (Copa Gobernador, Durango).
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque 4: 1985 a 1989 (Inicios y Título de Maestro Internacional) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#C5A46D] text-[#0F1D30] font-black text-xs uppercase tracking-wider">
                    1985 — 1989
                  </span>
                  <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                    Campeón Panamericano, Título de MI &amp; Distinciones de Estado
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#172B46] border-2 border-[#C5A46D]/70 space-y-1.5">
                    <strong className="text-white block font-bold text-sm">
                      1987 — Campeón Panamericano Juvenil (Título de Maestro Internacional)
                    </strong>
                    <p className="text-[#C4CBD4]">
                      Coronado <strong>Campeón Panamericano Juvenil</strong> en Asunción, Paraguay, obteniendo automáticamente el título oficial de <strong>Maestro Internacional de la FIDE</strong>.<br />
                      Campeón del Torneo &quot;Carlos Torre Repetto&quot; en Mérida, Yucatán.<br />
                      Galardonado con el <strong>Premio &quot;Tlatoani&quot;</strong>, máxima distinción del Departamento del Distrito Federal a los deportistas más sobresalientes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-1.5">
                    <strong className="text-white block font-bold text-sm">
                      1985 — 1986 — Plata Mundial Juvenil &amp; Premio CREA
                    </strong>
                    <p className="text-[#C4CBD4]">
                      • <strong>Medalla de Plata</strong> en el Campeonato Mundial Juvenil por equipos en Mendoza, Argentina (1985).<br />
                      • Campeón Nacional Juvenil Sub-20 en Pachuca y Mundial Juvenil en Emiratos Árabes.<br />
                      • <strong>Medalla de Bronce</strong> en la Olimpiada Mundial Estudiantil en San Juan de Puerto Rico (1986).<br />
                      • Campeón del Torneo Latinoamericano en Salta, Argentina (1986).<br />
                      • Galardonado con el <strong>Premio CREA &quot;Gral. Francisco J. Mújica&quot;</strong> (1986).
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================
              CONTENIDO 2: ACTUACIÓN COMO ENTRENADOR
          ========================================================= */}
          {activeTab === 'ENTRENADOR' && (
            <div className="space-y-12 animate-fadeIn">
              
              <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] max-w-4xl mx-auto text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                  Cátedra, Magisterio &amp; Alto Rendimiento
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Entrenador FIDE Trainer &amp; Forjador de Campeones
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed">
                  Reconocido formalmente como <strong>FIDE Trainer</strong> por la Federación Internacional de Ajedrez en 2005. Cuenta con una trayectoria comprobada dirigiendo selecciones estatales, universitarias y formando atletas con podio panamericano y mundial.
                </p>
              </div>

              {/* DESTACADO ESPECIAL: CASO DE ÉXITO MATÍAS MARTÍNEZ FLORES */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#172B46] via-[#1C3454] to-[#172B46] border-2 border-[#C5A46D] shadow-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#233F65] pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                    <Trophy className="w-4 h-4" />
                    <span>Alumno Forjado en el Alto Rendimiento</span>
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-[10px] font-extrabold uppercase">
                    Podio Mundial FIDE
                  </span>
                </div>

                <div>
                  <h4 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white">
                    Matías Martínez Flores — 3° Lugar en el Campeonato Mundial Escolar Sub-12
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C4CBD4] mt-1 font-light">
                    Entrenado bajo la dirección y metodología del MI Roberto Martín del Campo:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-1">
                    <strong className="text-[#C5A46D] block">🥉 Mundial Escolar (Panamá 2022)</strong>
                    <span className="text-[#C4CBD4]">Tercer Lugar en el Campeonato Mundial Escolar en la Categoría Sub-12.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-1">
                    <strong className="text-[#C5A46D] block">🥇 Campeón Juegos CONADE</strong>
                    <span className="text-[#C4CBD4]">Campeón Nacional Sub-12 en los Juegos Nacionales CONADE y Nacional Abierto Sub-10.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-1">
                    <strong className="text-[#C5A46D] block">🥇 North American Sub-12 (2023)</strong>
                    <span className="text-[#C4CBD4]">Campeón del prestigioso certamen continental North American en CDMX y clasificado al Mundial en Egipto.</span>
                  </div>
                </div>
              </div>

              {/* Bloques de Instituciones & Selecciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* 1. Selecciones de Chihuahua */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                    Selecciones Estatales
                  </span>
                  <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-white">
                    Entrenador en Jefe del Estado de Chihuahua (1999 — 2010)
                  </h4>
                  <p className="text-[#C4CBD4] leading-relaxed">
                    Durante más de una década guio los procesos selectivos de Chihuahua en las Olimpiadas Nacionales Infantiles y Juveniles, acumulando múltiples campeonatos nacionales por equipos, medallas de oro, plata y bronce.
                  </p>
                  <ul className="space-y-1.5 text-[#FAF8F2] pt-2 border-t border-[#233F65]">
                    <li>• Entrenador de <strong>Alan Arreguín Hernández</strong> (Campeón Nacional Activo Olimpiada 2003 y Panamericano en Cuenca, Ecuador).</li>
                    <li>• Entrenador de <strong>Iván Rodríguez Pérez</strong> (Campeón Nacional Abierto Sub-12 2003 y Premio Teporaca de Bronce).</li>
                    <li>• Entrenador de <strong>Iván Mariana Licano Zubiate</strong> (Campeona Nacional Abierto Sub-16 femenil 2003).</li>
                    <li>• Campeón con la Universidad Autónoma de Chihuahua (UACH) en la Universiada Nacional 2000 (Tampico).</li>
                  </ul>
                </div>

                {/* 2. Selección Tabasco & FENAMAC */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                    Olimpiada Nacional &amp; Alto Rendimiento
                  </span>
                  <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-white">
                    Selección Tabasco (Campeón 2005) &amp; FENAMAC
                  </h4>
                  <p className="text-[#C4CBD4] leading-relaxed">
                    • En 2005 llevó a la <strong>Selección de Tabasco a proclamarse Campeona Nacional</strong> en la Olimpiada Nacional Infantil y Juvenil, conquistando 7 medallas individuales.<br />
                    • Entrenador del <strong>Programa de Alto Rendimiento de la FENAMAC</strong> (2020 y 2021).<br />
                    • Entrenador de los equipos representativos de México en los Campeonatos <em>North American</em> Sub-20 (Charlotte 2020) e Infantiles y Juveniles (Chicago 2021).<br />
                    • Entrenador en Jefe del Centro de Alto Rendimiento en Villahermosa, Tabasco (2021).
                  </p>
                </div>

                {/* 3. U.N.A.M. & Museo de Arte Moderno */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                    Cátedra Universitaria &amp; Museos
                  </span>
                  <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-white">
                    U.N.A.M. (1988 — 1998) &amp; Museo de Arte Moderno
                  </h4>
                  <p className="text-[#C4CBD4] leading-relaxed">
                    • Durante 10 años consecutivos dirigió los <strong>Equipos Representativos de la Universidad Nacional Autónoma de México (U.N.A.M.)</strong> en competencias nacionales e internacionales.<br />
                    • Al frente del Taller Permanente de Ajedrez del <strong>Museo de Arte Moderno</strong> (1985 — 1991).<br />
                    • Ponente en el Curso de Postgrado en Ajedrez organizado por la Universidad de Chapingo (1994).
                  </p>
                </div>

                {/* 4. Delegaciones Mundiales & Comunidad Internacional */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                    Delegaciones Oficiales
                  </span>
                  <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-white">
                    Campeonatos Mundiales FIDE &amp; Conferencias Internacionales
                  </h4>
                  <p className="text-[#C4CBD4] leading-relaxed">
                    • Entrenador de los equipos infantiles y juveniles de México en los <strong>Campeonatos Mundiales en Bratislava</strong> (Eslovaquia 1993).<br />
                    • Delegado Nacional en los <strong>Campeonatos Mundiales en Szeged</strong> (Hungría 1994).<br />
                    • Conferencista en Chicago, Illinois (EE. UU.) capacitando a entrenadores y a la comunidad latina en metodologías de entrenamiento soviético.<br />
                    • Director del Club y Escuela Internacional Alexander Alekhine desde 1998.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================
              CONTENIDO 3: PALMARÉS OLÍMPICO & PREMIOS DE ESTADO
          ========================================================= */}
          {activeTab === 'PALMARES' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] max-w-4xl mx-auto text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                  Honores Deportivos
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Condecoraciones Oficiales &amp; Medallero Histórico
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed">
                  Reconocimientos del Comité Olímpico, la FIDE y autoridades civiles a una trayectoria deportiva intachable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                {/* Medallero Olímpico y Mundial */}
                <div className="p-6 rounded-3xl bg-[#172B46] border-2 border-[#C5A46D] space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-[#C5A46D] font-bold uppercase text-xs">
                    <Medal className="w-5 h-5" />
                    <span>Medallas Internacionales</span>
                  </div>
                  <ul className="space-y-3 text-[#C4CBD4]">
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🥇 Medalla de Oro Olímpica</strong>
                      <span>Olimpiada Mundial de Novi Sad, Yugoslavia (1990).</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🥈 Medalla de Plata Mundial Sub-26</strong>
                      <span>Campeonato Mundial en Curitiba, Brasil (1993, Individual).</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🥈 Medalla de Plata Mundial Juvenil</strong>
                      <span>Campeonato Mundial por equipos en Mendoza, Argentina (1985).</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🥉 Medalla de Bronce Mundial Estudiantil</strong>
                      <span>Olimpiada Mundial Estudiantil en San Juan de Puerto Rico (1986).</span>
                    </li>
                  </ul>
                </div>

                {/* Títulos y Campeonatos Continentales */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-4">
                  <div className="flex items-center gap-2 text-[#C5A46D] font-bold uppercase text-xs">
                    <Trophy className="w-5 h-5" />
                    <span>Títulos Continentales &amp; Nacionales</span>
                  </div>
                  <ul className="space-y-3 text-[#C4CBD4]">
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🏆 Campeón Panamericano Juvenil</strong>
                      <span>Asunción, Paraguay (1987) — Adjudicación directa del título de Maestro Internacional FIDE.</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🏆 Campeón Nacional Abierto de México</strong>
                      <span>Ediciones 1994, 1995 y Copa Cinco de Mayo 2005.</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🏆 Bicampeón Carlos Torre Repetto</strong>
                      <span>Mérida, Yucatán (1987 y 1996) y cuartos de final Wimbledon en 2004.</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🏆 Bicampeón Estatal de Illinois</strong>
                      <span>Chicago, Estados Unidos (1995 y 1996).</span>
                    </li>
                  </ul>
                </div>

                {/* Premios de Estado y Civiles */}
                <div className="p-6 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-4">
                  <div className="flex items-center gap-2 text-[#C5A46D] font-bold uppercase text-xs">
                    <Award className="w-5 h-5" />
                    <span>Distinciones de Estado</span>
                  </div>
                  <ul className="space-y-3 text-[#C4CBD4]">
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🎖️ Premio &quot;Tlatoani&quot;</strong>
                      <span>Máxima distinción conferida por el Departamento del Distrito Federal a los deportistas más destacados de la nación (1987).</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🎖️ Premio CREA &quot;Gral. Francisco J. Mújica&quot;</strong>
                      <span>Reconocimiento gubernamental al mérito deportivo juvenil (1986).</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🎖️ Título Oficial FIDE Trainer</strong>
                      <span>Otorgado por la Federación Internacional de Ajedrez (2005) como formador internacional de élite.</span>
                    </li>
                    <li className="p-3 rounded-xl bg-[#0F1D30] border border-[#233F65]">
                      <strong className="text-white block font-bold text-sm">🎖️ US Masters Senior Champion</strong>
                      <span>Charlotte, EE. UU. (2021 y 2022).</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          )}

        </section>

        {/* =========================================================
            4. LLAMADA A LA ACCIÓN FINAL: ENTRENAR CON EL MAESTRO
        ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#172B46] via-[#1C3454] to-[#172B46] border-2 border-[#C5A46D] text-center space-y-6 shadow-2xl">
          <Crown className="w-10 h-10 text-[#C5A46D] mx-auto" />
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Entrena directamente con el MI Roberto Martín del Campo
            </h3>
            <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed">
              Plazas limitadas para entrenamiento personalizado 1 a 1 y asesoría magistral para torneos oficiales.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-8 flex items-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Solicitar Sesión Diagnóstica por WhatsApp
            </a>
            <Link
              href="/clases-personalizadas"
              className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6"
            >
              Consultar Paquetes de 10 Sesiones
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

