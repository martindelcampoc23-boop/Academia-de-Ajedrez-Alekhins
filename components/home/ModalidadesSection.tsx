'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  Users,
  Award,
  Clock,
  Calendar,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Globe,
  MessageCircle,
  BookOpen
} from 'lucide-react';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export function ModalidadesSection() {
  const { currency, setCurrency, formatPrice } = useLocaleCurrency();

  // Precios adaptados según moneda seleccionada
  const prices = {
    personalizado10: currency === 'USD' ? '$280 USD' : '$5,000 MXN',
    personalizadoIndiv: currency === 'USD' ? '$35 USD' : '$600 MXN',
    competitivo: currency === 'USD' ? '$39 USD' : '$699 MXN',
    inicial: currency === 'USD' ? '$28 USD' : '$500 MXN',
  };

  const getWhatsappUrl = (programa: string, precio: string) => {
    const text = `Hola Maestro Roberto Martín del Campo, deseo inscribirme al ${programa} en Academia Alekhins (${precio} en ${currency}).`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="modalidades" className="py-16 md:py-24 bg-[#172B46] border-b border-[#233F65] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
            Modalidades de Formación
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
            Programas Académicos Destacados
          </h2>
          <p className="text-sm text-[#C4CBD4] leading-relaxed">
            Planes diseñados para cada etapa del ajedrecista: atención individual de maestría o grupos estructurados con acceso completo a la plataforma Chessgora.com.
          </p>
        </div>

        {/* SWITCH DE MONEDA INTERACTIVO (MXN / USD) */}
        <div className="max-w-3xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-[#0F1D30] border-2 border-[#233F65] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-xs text-[#FAF8F2] text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-[#172B46] border border-[#C5A46D]/60 flex items-center justify-center shrink-0 text-[#C5A46D]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">
                ¿Te inscribes desde fuera de México o prefieres pagar en dólares?
              </span>
              <span className="text-[11px] text-[#9CA3AF]">
                Selecciona tu moneda para ver las tarifas en Pesos Mexicanos (MXN) o Dólares (USD):
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#172B46] border border-[#233F65] shrink-0">
            <button
              onClick={() => setCurrency('MXN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currency === 'MXN'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow'
                  : 'text-[#C4CBD4] hover:text-white'
              }`}
            >
              <span>🇲🇽 MXN</span>
              <span className="text-[10px] font-normal opacity-80">($ Pesos)</span>
            </button>

            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow'
                  : 'text-[#C4CBD4] hover:text-white'
              }`}
            >
              <span>🇺🇸 USD</span>
              <span className="text-[10px] font-normal opacity-80">($ Dólares)</span>
            </button>
          </div>
        </div>

        {/* Grid de las 3 Modalidades */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* =========================================================
              1. ENTRENAMIENTO PERSONALIZADO (DESTACADO)
          ========================================================= */}
          <div className="bg-[#0F1D30] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A46D] flex flex-col justify-between space-y-6 shadow-2xl relative order-1 lg:order-1 hover:border-[#DFCBA0] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] flex items-center gap-1.5">
                  <Crown className="w-4 h-4" /> Servicio de Máxima Atención
                </span>
                <span className="bg-[#C5A46D] text-[#0F1D30] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                  Recomendado
                </span>
              </div>

              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ENTRENAMIENTO PERSONALIZADO
                </h3>
                <p className="text-xs text-[#C5A46D] font-semibold mt-0.5">
                  Tu entrenamiento. Tu ritmo. Tus objetivos.
                </p>
              </div>

              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Programa individual impartido directamente por el <strong>Maestro Internacional Roberto Martín del Campo Cárdenas</strong>. Preparación adaptada a tu estilo, nivel y metas competitivas.
              </p>

              {/* Precios Destacados con Switch de Moneda */}
              <div className="border-t border-[#233F65] pt-4 space-y-2">
                <div className="p-3 rounded-xl bg-[#172B46] border border-[#C5A46D]/60 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#C5A46D]">
                      Paquete de 10 sesiones (Recomendado)
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0F1D30] text-[#FAF8F2] border border-[#233F65]">
                      60 min c/u
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#C5A46D]">
                      {prices.personalizado10}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      ({currency === 'USD' ? '$28 USD' : '$500 MXN'} / sesión)
                    </span>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-[#0F1D30] border border-[#233F65] flex items-center justify-between text-xs">
                  <span className="text-[#C4CBD4]">Sesión individual:</span>
                  <strong className="text-white font-bold">{prices.personalizadoIndiv} / hora</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#FAF8F2]">
                <strong className="text-[#C5A46D] block font-semibold uppercase text-[11px] tracking-wide">
                  Incluye:
                </strong>
                <ul className="space-y-1.5 text-[#C4CBD4]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Sesiones individuales de 60 minutos en vivo.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Plan de entrenamiento personalizado a largo plazo.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Material didáctico y ejercicios específicos.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Análisis y corrección profunda de partidas.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Acceso a la plataforma Chessgora.com.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsappUrl('Entrenamiento Personalizado', prices.personalizado10)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado w-full text-center text-xs uppercase font-extrabold py-3.5 block shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>SOLICITAR ENTRENAMIENTO PERSONALIZADO</span>
              </a>
              <Link
                href="/clases-personalizadas"
                className="text-center text-xs text-[#C5A46D] hover:underline block font-semibold pt-1"
              >
                Ver detalles completos y formulario de PGN →
              </Link>
            </div>
          </div>

          {/* =========================================================
              2. GRUPO DE ENTRENAMIENTO COMPETITIVO
          ========================================================= */}
          <div className="bg-[#0F1D30] rounded-3xl p-6 sm:p-8 border border-[#233F65] flex flex-col justify-between space-y-6 shadow-xl hover:border-[#C5A46D] transition-all duration-300 order-2 lg:order-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Menos de 2000 Elo
                </span>
                <span className="bg-[#172B46] text-[#C5A46D] border border-[#C5A46D]/60 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  4 Días / Semana
                </span>
              </div>

              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ENTRENAMIENTO COMPETITIVO
                </h3>
                <p className="text-xs text-[#C5A46D] font-semibold mt-0.5">
                  Lleva tu ajedrez al siguiente nivel.
                </p>
              </div>

              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Entrenamiento grupal para jugadores que desean fortalecer su comprensión estratégica, cálculo de variantes y repertorio competitivo constante.
              </p>

              {/* Horario y Precio */}
              <div className="p-3.5 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#C4CBD4]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" /> Martes a viernes
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> 6:00 a 7:00 p. m.
                  </span>
                </div>
                <div className="border-t border-[#233F65] pt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C5A46D]">
                    {prices.competitivo}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">mensuales (sin plazos forzosos)</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#FAF8F2]">
                <strong className="text-[#C5A46D] block font-semibold uppercase text-[11px] tracking-wide">
                  Incluye:
                </strong>
                <ul className="space-y-1.5 text-[#C4CBD4]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Clases grupales en vivo (4 sesiones semanales).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Cálculo táctico y variantes forzadas.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Estudio de aperturas y técnica de finales.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Acceso a la plataforma Chessgora.com.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsappUrl('Grupo de Entrenamiento Competitivo', prices.competitivo)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado w-full text-center text-xs uppercase font-extrabold py-3.5 block shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INSCRIBIRME AL GRUPO COMPETITIVO</span>
              </a>
              <Link
                href="/programas#desarrollo"
                className="text-center text-xs text-[#C4CBD4] hover:text-[#C5A46D] block font-semibold pt-1"
              >
                Ver temario completo del programa →
              </Link>
            </div>
          </div>

          {/* =========================================================
              3. GRUPO DE AJEDREZ INICIAL
          ========================================================= */}
          <div className="bg-[#0F1D30] rounded-3xl p-6 sm:p-8 border border-[#233F65] flex flex-col justify-between space-y-6 shadow-xl hover:border-[#C5A46D] transition-all duration-300 order-3 lg:order-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Principiantes
                </span>
                <span className="bg-[#172B46] text-[#C5A46D] border border-[#C5A46D]/60 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  3 Días / Semana
                </span>
              </div>

              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  GRUPO DE AJEDREZ INICIAL
                </h3>
                <p className="text-xs text-[#C5A46D] font-semibold mt-0.5">
                  Aprende ajedrez desde cero y construye una base sólida.
                </p>
              </div>

              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Diseñado para niños (desde 6 años), jóvenes y adultos. Metodología didáctica y progresiva impartida por pedagogos especialistas en enseñanza inicial.
              </p>

              {/* Horario y Precio */}
              <div className="p-3.5 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#C4CBD4]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" /> Lunes, miérc. y jueves
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> 6:00 a 7:00 p. m.
                  </span>
                </div>
                <div className="border-t border-[#233F65] pt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C5A46D]">
                    {prices.inicial}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">mensuales (sin plazos forzosos)</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#FAF8F2]">
                <strong className="text-[#C5A46D] block font-semibold uppercase text-[11px] tracking-wide">
                  Incluye:
                </strong>
                <ul className="space-y-1.5 text-[#C4CBD4]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Clases grupales en vivo (3 sesiones semanales).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Fundamentos, reglas y geometría del tablero.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Táctica básica, combinaciones y jaque mate.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" /> Acceso a la plataforma Chessgora.com.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsappUrl('Grupo de Ajedrez Inicial', prices.inicial)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado w-full text-center text-xs uppercase font-extrabold py-3.5 block shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INSCRIBIRME AL GRUPO INICIAL</span>
              </a>
              <Link
                href="/programas#iniciacion"
                className="text-center text-xs text-[#C4CBD4] hover:text-[#C5A46D] block font-semibold pt-1"
              >
                Ver temario completo del programa →
              </Link>
            </div>
          </div>

        </div>

        {/* Banner de Ayuda & Test Diagnóstico */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-[#0F1D30] border-2 border-[#233F65] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A46D] block">
              ¿Dudas sobre cuál modalidad elegir?
            </span>
            <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
              Realiza nuestro Test Diagnóstico de Nivel en 60 segundos
            </h4>
            <p className="text-xs text-[#C4CBD4] font-light">
              Responde 5 preguntas breves y recibe la recomendación pedagógica exacta para ti o tu familia.
            </p>
          </div>

          <Link
            href="/evaluacion"
            className="btn-dorado text-xs uppercase font-extrabold tracking-wider py-3.5 px-6 shrink-0 flex items-center gap-2 shadow"
          >
            <span>Iniciar Test Diagnóstico</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

