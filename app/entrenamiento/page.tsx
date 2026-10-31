import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Crown,
  Sparkles,
  Users,
  Target,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Laptop,
  Flame,
  Check,
  ExternalLink,
  Brain,
  HelpCircle
} from 'lucide-react';
import { LevelAssessmentQuiz } from '@/components/training/LevelAssessmentQuiz';

export const metadata = {
  title: 'Clases de Ajedrez & Entrenamiento de Alto Nivel | All-In Chess',
  description: 'Programas de entrenamiento individual y grupal con el Maestro Internacional Roberto Martín del Campo. Entrenamiento Personalizado, Grupo Competitivo y Grupo Inicial. Incluye acceso a Chessgora.com.',
};

export const revalidate = 60;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function ClasesPage() {
  const whatsappUrlPersonalizado = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola Maestro Roberto, deseo solicitar información sobre el Entrenamiento Personalizado en All-In Chess.'
  )}`;

  const whatsappUrlCompetitivo = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola, deseo inscribirme al Grupo de Entrenamiento Competitivo (4 días por semana, $699 MXN/mes) en All-In Chess.'
  )}`;

  const whatsappUrlInicial = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola, deseo inscribirme al Grupo de Ajedrez Inicial (3 días por semana, $500 MXN/mes) en All-In Chess.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0B1510] text-[#F6F3EC] py-10 md:py-16 selection:bg-[#D8B155] selection:text-[#0B1510]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">

        {/* =========================================================
            SECCIÓN INTRODUCTORIA: ENCUENTRA TU FORMA DE ENTRENAR
        ========================================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#15261E] border border-[#D8B155]/40 text-[#D8B155] text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(216,177,85,0.15)]">
            <Crown className="w-3.5 h-3.5 text-[#D8B155]" />
            <span>Formación de Alto Rendimiento • All-In Chess</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            ENCUENTRA TU FORMA DE ENTRENAR
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#B5C2B9] leading-relaxed max-w-3xl mx-auto font-light">
            En All-In Chess creemos que cada jugador tiene objetivos y necesidades diferentes. Por eso ofrecemos programas de entrenamiento individual y grupal, diseñados para acompañarte en cada etapa de tu desarrollo ajedrecístico.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#D8B155] font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8B155]" />
              <span>Dirección del MI Roberto Martín del Campo</span>
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#D8B155]" />
              <span>Chessgora.com Incluido al 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D8B155]" />
              <span>Metodología Dinámica y Progresiva</span>
            </div>
          </div>
        </section>


        {/* =========================================================
            PROGRAMA 1: ENTRENAMIENTO PERSONALIZADO (DESTACADO VIP)
        ========================================================= */}
        <section id="entrenamiento-personalizado" className="scroll-mt-24">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#15261E] via-[#101E17] to-[#0B1510] border-2 border-[#D8B155]/60 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_50px_rgba(216,177,85,0.18)] p-6 sm:p-8 md:p-12 overflow-hidden transition-all duration-300 hover:border-[#D8B155]">
            
            {/* Resplandor decorativo de fondo */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#D8B155]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#0F2E1E] rounded-full blur-3xl pointer-events-none" />

            {/* Cintillo Superior */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1C3328]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D8B155]">
                <Crown className="w-4 h-4" />
                <span>Modalidad Individual • Atención Exclusiva 1 a 1</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8B155] text-[#0B1510] text-xs font-extrabold uppercase tracking-wide shadow">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Programa Insignia
              </span>
            </div>

            {/* Contenido Principal en 2 Columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-8 items-center">
              
              {/* Columna Izquierda: Información del Programa & Maestro */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                    ENTRENAMIENTO PERSONALIZADO
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-[#D8B155] mt-1 italic">
                    Tu entrenamiento. Tu ritmo. Tus objetivos.
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#D0C5AF] leading-relaxed">
                  Programa individual de entrenamiento impartido por el Maestro Internacional Roberto Martín del Campo Cárdenas. Cada alumno recibe una preparación adaptada a su nivel, estilo de juego y objetivos competitivos.
                </p>

                {/* Perfil del Profesor */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B1510]/80 border border-[#1C3328]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#D8B155] shrink-0 shadow-md bg-[#101E17]">
                    <Image
                      src="/maestro-roberto.jpg"
                      alt="MI Roberto Martín del Campo Cárdenas"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif-editorial text-base sm:text-lg font-bold text-white">
                        MI Roberto Martín del Campo Cárdenas
                      </span>
                    </div>
                    <p className="text-xs text-[#B5C2B9]">
                      Maestro Internacional de Ajedrez (FIDE ID: 5100046). 4 veces representante olímpico por México y Campeón Nacional.
                    </p>
                    <span className="text-[11px] font-semibold text-[#D8B155] uppercase tracking-wider block">
                      Sesiones de 60 minutos (1 hora completa) 1 a 1
                    </span>
                  </div>
                </div>

                {/* Lista INCLUYE */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-[#D8B155] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D8B155]" />
                    ¿Qué incluye este programa?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#F6F3EC]">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Sesiones individuales de 60 minutos.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Plan de entrenamiento personalizado.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Material didáctico y ejercicios específicos.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Trabajo de aperturas, medio juego y finales.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Análisis y corrección de partidas.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Tareas y actividades para trabajar en casa.</span>
                    </div>
                    <div className="flex items-start gap-2.5 sm:col-span-2 p-2 rounded-lg bg-[#0F2E1E]/50 border border-[#D8B155]/30 text-[#D8B155] font-medium">
                      <Laptop className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Acceso a la plataforma de entrenamiento Chessgora.com.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Tarjetas de Precios & Botón de Contacto */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Opción 1 (Recomendada): Paquete de 10 Sesiones */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1C3328] to-[#101E17] border-2 border-[#D8B155] shadow-[0_0_30px_rgba(216,177,85,0.25)] space-y-4">
                  <div className="absolute -top-3 right-6 bg-[#D8B155] text-[#0B1510] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Opción Recomendada • Mejor Valor
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#D8B155] tracking-wider block">
                        Paquete Completo
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        10 Sesiones Individuales
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-[#D8B155] tracking-tight">
                        $5,000
                      </span>
                      <span className="text-xs text-[#B5C2B9] block font-medium">
                        MXN total
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#D0C5AF] leading-relaxed">
                    Preparación continua y estructurada de 10 horas de trabajo 1 a 1 ($500 MXN por sesión de 60 minutos).
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#E5C066] font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>60 minutos de duración por sesión</span>
                  </div>
                </div>

                {/* Opción 2: Sesión Individual */}
                <div className="p-5 rounded-2xl bg-[#0B1510]/90 border border-[#1C3328] space-y-3 hover:border-[#D8B155]/60 transition-colors">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#B5C2B9] tracking-wider block">
                        Clase Individual
                      </span>
                      <h3 className="text-base font-bold text-white">
                        1 Sesión Individual
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">
                        $600
                      </span>
                      <span className="text-xs text-[#B5C2B9] block">
                        MXN / sesión
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#B5C2B9]">
                    <Clock className="w-3.5 h-3.5 text-[#D8B155] shrink-0" />
                    <span>Duración: 1 hora (60 minutos) de clase personalizada</span>
                  </div>
                </div>

                {/* Botón de Contacto */}
                <div className="pt-2">
                  <a
                    href={whatsappUrlPersonalizado}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-solid w-full text-center text-xs sm:text-sm uppercase tracking-wider py-4 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all font-extrabold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    SOLICITAR ENTRENAMIENTO PERSONALIZADO
                  </a>
                  <p className="text-[11px] text-[#B5C2B9] text-center mt-2.5">
                    Respuesta directa vía WhatsApp oficial • Horarios y agenda a convenir
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =========================================================
            PROGRAMAS GRUPALES: COMPETITIVO & INICIAL (GRID 2 COLUMNAS)
        ========================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8B155] block">
              Programas de Formación Mensual
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              GRUPOS DE ENTRENAMIENTO EN VIVO
            </h2>
            <p className="text-xs sm:text-sm text-[#B5C2B9]">
              Clases en vivo semanales, temarios estructurados y comunidad activa para impulsar tu progreso mes con mes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

            {/* ----------------------------------------------------
                PROGRAMA 2: GRUPO DE ENTRENAMIENTO COMPETITIVO
            ---------------------------------------------------- */}
            <div
              id="entrenamiento-competitivo"
              className="scroll-mt-24 rounded-3xl bg-[#101E17] border-2 border-[#1C3328] hover:border-[#D8B155]/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(216,177,85,0.12)] group"
            >
              {/* Badge destacado superior */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D8B155] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D8B155]" />
                  Grupo Competitivo
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0F2E1E] border border-[#D8B155]/60 text-[#D8B155] text-[11px] font-extrabold uppercase tracking-wide">
                  4 DÍAS DE ENTRENAMIENTO POR SEMANA
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D8B155] transition-colors">
                    ENTRENAMIENTO COMPETITIVO
                  </h3>
                  <p className="text-sm font-semibold text-[#D8B155] mt-1 italic">
                    Lleva tu ajedrez al siguiente nivel.
                  </p>
                </div>

                {/* Categoría & Horario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B1510] border border-[#1C3328] text-xs">
                  <div className="space-y-1">
                    <span className="text-[#B5C2B9] uppercase font-bold text-[10px] tracking-wider block">
                      Categoría:
                    </span>
                    <strong className="text-white font-semibold flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#D8B155]" />
                      Jugadores de menos de 2000 puntos Elo.
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#B5C2B9] uppercase font-bold text-[10px] tracking-wider block">
                      Horario:
                    </span>
                    <div className="text-white font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Martes a viernes.</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#D8B155] mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>6:00 p. m. a 7:00 p. m.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precio */}
                <div className="border-y border-[#1C3328] py-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#D8B155]">
                      $699
                    </span>
                    <span className="text-sm font-bold text-white ml-1.5">MXN</span>
                    <span className="text-xs text-[#B5C2B9] block">mensuales (16 horas de clase al mes)</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#15261E] text-[#B5C2B9] border border-[#1C3328]">
                    Sin plazos forzosos
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-xs sm:text-sm text-[#D0C5AF] leading-relaxed">
                  Programa de entrenamiento grupal para jugadores que desean fortalecer sus conocimientos, mejorar su comprensión estratégica y desarrollar habilidades competitivas mediante un entrenamiento constante y estructurado.
                </p>

                {/* Lista INCLUYE */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D8B155] block">
                    INCLUYE:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#F6F3EC]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Clases grupales en vivo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Entrenamiento táctico y cálculo de variantes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Estrategia y planificación.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Estudio y construcción de repertorio de aperturas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Análisis de partidas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Técnica de finales.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Material de entrenamiento.</span>
                    </li>
                    <li className="flex items-start gap-2 p-1.5 rounded bg-[#0F2E1E]/40 border border-[#D8B155]/30 text-[#D8B155] font-semibold">
                      <Laptop className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Acceso a la plataforma Chessgora.com.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Actividades interactivas para practicar fuera de clase.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Botón */}
              <div className="pt-4">
                <a
                  href={whatsappUrlCompetitivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid w-full text-center text-xs sm:text-sm uppercase tracking-wider py-3.5 shadow-gold font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  INSCRIBIRME AL GRUPO
                </a>
              </div>
            </div>


            {/* ----------------------------------------------------
                PROGRAMA 3: GRUPO DE AJEDREZ INICIAL
            ---------------------------------------------------- */}
            <div
              id="ajedrez-inicial"
              className="scroll-mt-24 rounded-3xl bg-[#101E17] border-2 border-[#1C3328] hover:border-[#D8B155]/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(216,177,85,0.12)] group"
            >
              {/* Badge destacado superior */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D8B155] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#D8B155]" />
                  Grupo de Iniciación
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0F2E1E] border border-[#D8B155]/60 text-[#D8B155] text-[11px] font-extrabold uppercase tracking-wide">
                  3 DÍAS DE ENTRENAMIENTO POR SEMANA
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D8B155] transition-colors">
                    GRUPO DE AJEDREZ INICIAL
                  </h3>
                  <p className="text-sm font-semibold text-[#D8B155] mt-1 italic">
                    Aprende ajedrez desde cero y construye una base sólida.
                  </p>
                </div>

                {/* Categoría & Horario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B1510] border border-[#1C3328] text-xs">
                  <div className="space-y-1">
                    <span className="text-[#B5C2B9] uppercase font-bold text-[10px] tracking-wider block">
                      Categoría:
                    </span>
                    <strong className="text-white font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D8B155]" />
                      Principiantes (niños, jóvenes y adultos).
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#B5C2B9] uppercase font-bold text-[10px] tracking-wider block">
                      Horario:
                    </span>
                    <div className="text-white font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Lunes, miércoles y jueves.</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#D8B155] mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>6:00 p. m. a 7:00 p. m.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precio */}
                <div className="border-y border-[#1C3328] py-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#D8B155]">
                      $500
                    </span>
                    <span className="text-sm font-bold text-white ml-1.5">MXN</span>
                    <span className="text-xs text-[#B5C2B9] block">mensuales (12 horas de clase al mes)</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#15261E] text-[#B5C2B9] border border-[#1C3328]">
                    Sin plazos forzosos
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-xs sm:text-sm text-[#D0C5AF] leading-relaxed">
                  Programa diseñado para niños, jóvenes y adultos que desean aprender ajedrez desde sus fundamentos. Las clases son impartidas por nuestros especialistas en enseñanza inicial, utilizando una metodología didáctica, progresiva y dinámica.
                </p>

                {/* Lista INCLUYE */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D8B155] block">
                    INCLUYE:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#F6F3EC]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Clases grupales en vivo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Reglas y fundamentos del ajedrez.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Principios básicos de apertura.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Táctica y combinaciones.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Introducción a la estrategia.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Jaque mate y finales básicos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Material didáctico.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Actividades y ejercicios para casa.</span>
                    </li>
                    <li className="flex items-start gap-2 p-1.5 rounded bg-[#0F2E1E]/40 border border-[#D8B155]/30 text-[#D8B155] font-semibold">
                      <Laptop className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                      <span>Acceso a la plataforma Chessgora.com.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Botón */}
              <div className="pt-4">
                <a
                  href={whatsappUrlInicial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid w-full text-center text-xs sm:text-sm uppercase tracking-wider py-3.5 shadow-gold font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  INSCRIBIRME AL GRUPO
                </a>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECCIÓN 6: DESTACAR CHESSGORA.COM (MUY IMPORTANTE)
        ========================================================= */}
        <section className="relative rounded-3xl bg-gradient-to-r from-[#101E17] via-[#15261E] to-[#0F2E1E] border-2 border-[#D8B155] p-8 sm:p-10 md:p-14 overflow-hidden shadow-[0_0_40px_rgba(216,177,85,0.2)]">
          {/* Luz decorativa */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D8B155]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center">
            
            {/* Distintivo Superior */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1510] border border-[#D8B155] text-[#D8B155] text-xs font-black uppercase tracking-widest shadow-lg">
              <Laptop className="w-4 h-4 text-[#D8B155]" />
              <span>PLATAFORMA DIGITAL INTEGRADA</span>
            </div>

            {/* Título Principal */}
            <div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide">
                CHESSGORA.COM INCLUIDO
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#D8B155] font-semibold mt-2">
                Todos los programas incluyen acceso completo a nuestra plataforma de entrenamiento
              </p>
            </div>

            {/* Texto Explicativo Obligatorio */}
            <p className="text-sm sm:text-base md:text-lg text-[#F6F3EC] leading-relaxed max-w-3xl mx-auto font-normal">
              Una plataforma de entrenamiento ajedrecístico donde podrás reforzar tus conocimientos, resolver ejercicios, practicar posiciones y continuar trabajando fuera de las clases en vivo.
            </p>

            {/* 4 Pilares Visuales de la Plataforma */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-left">
              <div className="p-4 rounded-xl bg-[#0B1510]/80 border border-[#1C3328] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#15261E] border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155]">
                  <Brain className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                  Resolución de Táctica
                </h4>
                <p className="text-xs text-[#B5C2B9] leading-relaxed">
                  Ejercicios interactivos graduados para afilar tu visión combinatoria día con día.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1510]/80 border border-[#1C3328] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#15261E] border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155]">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                  Práctica de Posiciones
                </h4>
                <p className="text-xs text-[#B5C2B9] leading-relaxed">
                  Entrena estructuras críticas, planes estratégicos y maniobras de finales.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1510]/80 border border-[#1C3328] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#15261E] border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155]">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                  Fuera de Clases en Vivo
                </h4>
                <p className="text-xs text-[#B5C2B9] leading-relaxed">
                  Avanza a tu propio ritmo entre sesión y sesión sin interrupciones.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1510]/80 border border-[#1C3328] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#15261E] border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                  100% Sin Costo Extra
                </h4>
                <p className="text-xs text-[#B5C2B9] leading-relaxed">
                  Tu suscripción activa en cualquier modalidad te da acceso inmediato.
                </p>
              </div>
            </div>

            {/* Enlace o botón para conocer más */}
            <div className="pt-2">
              <a
                href="https://chessgora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-forest-outline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg transition hover:scale-105"
              >
                <span>Explorar Chessgora.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </section>


        {/* =========================================================
            TABLA COMPARATIVA RÁPIDA: LAS 3 MODALIDADES
        ========================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8B155] block">
              Comparativa Resumen
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              ¿Cuál es la modalidad adecuada para ti?
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1C3328] bg-[#101E17] shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-[#1C3328] bg-[#0B1510]/80 text-[#D8B155] uppercase text-[11px] tracking-wider">
                  <th className="py-4 px-5">Modalidad</th>
                  <th className="py-4 px-4">Enfoque / Nivel</th>
                  <th className="py-4 px-4">Frecuencia & Horario</th>
                  <th className="py-4 px-4">Duración</th>
                  <th className="py-4 px-4">Chessgora.com</th>
                  <th className="py-4 px-5">Inversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C3328] text-[#F6F3EC]">
                {/* Fila 1: Personalizado */}
                <tr className="hover:bg-[#15261E]/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-[#D8B155]" />
                      <span>Entrenamiento Personalizado</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#B5C2B9]">
                    1 a 1 adaptado a tus metas
                  </td>
                  <td className="py-4 px-4">
                    Flexible / A convenir
                  </td>
                  <td className="py-4 px-4 text-[#D8B155] font-semibold">
                    60 min por sesión
                  </td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">
                    ✓ Incluido
                  </td>
                  <td className="py-4 px-5">
                    <strong className="text-[#D8B155] block font-bold">$5,000 MXN (10 sesiones)</strong>
                    <span className="text-[11px] text-[#B5C2B9]">$600 MXN individual</span>
                  </td>
                </tr>

                {/* Fila 2: Competitivo */}
                <tr className="hover:bg-[#15261E]/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#D8B155]" />
                      <span>Entrenamiento Competitivo</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#B5C2B9]">
                    Menos de 2000 Elo
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-white block">Martes a viernes</span>
                    <span className="text-[11px] text-[#D8B155]">6:00 p. m. a 7:00 p. m.</span>
                  </td>
                  <td className="py-4 px-4 text-[#D8B155] font-semibold">
                    4 días por semana (16h/mes)
                  </td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">
                    ✓ Incluido
                  </td>
                  <td className="py-4 px-5 font-bold text-[#D8B155]">
                    $699 MXN <span className="text-xs text-[#B5C2B9] font-normal">/ mes</span>
                  </td>
                </tr>

                {/* Fila 3: Inicial */}
                <tr className="hover:bg-[#15261E]/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#D8B155]" />
                      <span>Grupo de Ajedrez Inicial</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#B5C2B9]">
                    Principiantes (desde cero)
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-white block">Lunes, miércoles y jueves</span>
                    <span className="text-[11px] text-[#D8B155]">6:00 p. m. a 7:00 p. m.</span>
                  </td>
                  <td className="py-4 px-4 text-[#D8B155] font-semibold">
                    3 días por semana (12h/mes)
                  </td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">
                    ✓ Incluido
                  </td>
                  <td className="py-4 px-5 font-bold text-[#D8B155]">
                    $500 MXN <span className="text-xs text-[#B5C2B9] font-normal">/ mes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* =========================================================
            PREGUNTAS FRECUENTES SOBRE LAS CLASES (FAQ)
        ========================================================= */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8B155] block">
              Dudas Comunes
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Preguntas Frecuentes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#101E17] border border-[#1C3328] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-[#D8B155] shrink-0" />
                ¿Cómo se imparten las clases en vivo?
              </h4>
              <p className="text-[#B5C2B9] leading-relaxed">
                Todas las sesiones se realizan en tiempo real mediante videoconferencia interactiva y tableros digitales de análisis, con interacción directa entre profesor y alumnos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101E17] border border-[#1C3328] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-[#D8B155] shrink-0" />
                ¿Cómo recibo mi acceso a Chessgora.com?
              </h4>
              <p className="text-[#B5C2B9] leading-relaxed">
                Una vez confirmada tu inscripción en cualquiera de los programas, nuestro equipo te generará y activará tu cuenta en Chessgora.com para que comiences de inmediato.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101E17] border border-[#1C3328] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-[#D8B155] shrink-0" />
                ¿Qué edad se requiere para el Grupo Inicial?
              </h4>
              <p className="text-[#B5C2B9] leading-relaxed">
                El programa está diseñado para niños a partir de 6 años, jóvenes y adultos. Los grupos se organizan de manera armónica para garantizar un aprendizaje motivador.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101E17] border border-[#1C3328] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4 text-[#D8B155] shrink-0" />
                ¿Puedo cambiar de modalidad más adelante?
              </h4>
              <p className="text-[#B5C2B9] leading-relaxed">
                Sí. Al no tener plazos forzosos, puedes transicionar del Grupo Inicial al Competitivo, o complementar tu estudio con sesiones de Entrenamiento Personalizado.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            TEST DIAGNÓSTICO DE NIVEL PEDAGÓGICO
        ========================================================= */}
        <section id="quiz" className="rounded-3xl bg-gradient-to-b from-[#101E17] to-[#0B1510] border border-[#1C3328] py-12 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#15261E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] mx-auto shadow-md">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block">
                Evaluación Personalizada
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                ¿Aún no estás seguro de tu nivel?
              </h3>
              <p className="text-xs sm:text-sm text-[#B5C2B9] leading-relaxed">
                Responde a nuestro test de 5 preguntas técnicas y conceptuales. Recibirás una orientación inmediata sobre si tu programa ideal es el Grupo Inicial, el Competitivo o el Entrenamiento Personalizado.
              </p>
            </div>

            <LevelAssessmentQuiz />
          </div>
        </section>

      </div>
    </div>
  );
}
