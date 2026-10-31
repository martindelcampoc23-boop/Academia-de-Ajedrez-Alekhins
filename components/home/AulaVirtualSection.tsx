'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Laptop,
  Video,
  Brain,
  BookOpen,
  CheckCircle2,
  Users,
  Target,
  FileCheck,
  ShieldCheck,
  ExternalLink,
  Crown,
  PlayCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';

export function AulaVirtualSection() {
  const [activeTab, setActiveTab] = useState<'AULA' | 'ESTUDIO' | 'TAREAS' | 'BENEFICIOS'>('AULA');

  return (
    <section id="aula-virtual" className="scroll-mt-24 py-16 md:py-24 bg-[#0F1D30] border-t border-[#1C3454]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/60 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow-md">
            <Laptop className="w-4 h-4" />
            <span>Plataforma Tecnológica Asociada • chessgora.com</span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            AULA VIRTUAL ALEKHINS &amp; CHESSGORA
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Todo el entrenamiento y contenido de nuestros alumnos centralizado en un solo lugar. Clases en vivo interactivas, bases de datos personales, ejercicios tácticos y seguimiento continuo sin necesidad de alternar entre múltiples aplicaciones externas.
          </p>
        </div>

        {/* Pestañas Interactivas de Contenido y Beneficios */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#172B46] border border-[#233F65]">
            <button
              onClick={() => setActiveTab('AULA')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'AULA'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-md'
                  : 'text-[#FAF8F2] hover:bg-[#1C3454] hover:text-[#C5A46D]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Aula en Vivo</span>
            </button>

            <button
              onClick={() => setActiveTab('ESTUDIO')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'ESTUDIO'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-md'
                  : 'text-[#FAF8F2] hover:bg-[#1C3454] hover:text-[#C5A46D]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>&quot;Mi Estudio&quot; &amp; PGN</span>
            </button>

            <button
              onClick={() => setActiveTab('TAREAS')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'TAREAS'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-md'
                  : 'text-[#FAF8F2] hover:bg-[#1C3454] hover:text-[#C5A46D]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Tareas &amp; Táctica</span>
            </button>

            <button
              onClick={() => setActiveTab('BENEFICIOS')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'BENEFICIOS'
                  ? 'bg-[#C5A46D] text-[#0F1D30] shadow-md'
                  : 'text-[#FAF8F2] hover:bg-[#1C3454] hover:text-[#C5A46D]'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Beneficios Alumnos</span>
            </button>
          </div>
        </div>

        {/* Contenido Dinámico de la Pestaña Activa */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#172B46] border-2 border-[#233F65] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Fondo sutil de luz */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A46D]/5 rounded-full blur-3xl pointer-events-none" />

          {/* TAB 1: AULA EN VIVO INTERACTIVA */}
          {activeTab === 'AULA' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                  Videoconferencia &amp; Tablero Integrado
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                  Clases interactivas con visión de todos los tableros en tiempo real
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
                  A diferencia de plataformas genéricas, en el aula virtual de <strong>Chessgora</strong> el profesor (MI Roberto Martín del Campo y cuerpo docente) puede lanzar preguntas o posiciones y <strong>visualizar los tableros de todos los alumnos simultáneamente en su pantalla</strong>.
                </p>

                <div className="space-y-2 text-xs text-[#FAF8F2] pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Participación activa:</strong> Cada alumno piensa y mueve de forma independiente sin interferencias.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Sin cortes ni aplicaciones externas:</strong> Tablero, audio y video integrados en un único enlace.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Grabación de sesiones:</strong> Accede a las clases grabadas para repasar análisis y conceptos en cualquier momento.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1C3454] text-xs font-bold text-[#C5A46D]">
                  <Video className="w-4 h-4" />
                  <span>Experiencia del Alumno en Vivo</span>
                </div>
                <div className="space-y-2 text-xs text-[#C4CBD4]">
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    🎯 <strong className="text-white">Preguntas interactivas:</strong> El maestro formula una jugada candidata y evalúa tu respuesta en segundos.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    🔊 <strong className="text-white">Interacción por voz y chat:</strong> Pregunta dudas en vivo con el Maestro Internacional.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    💻 <strong className="text-white">100% Web:</strong> Funciona directamente en tu navegador sin instalar programas complicados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MI ESTUDIO & BASES PGN */}
          {activeTab === 'ESTUDIO' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                  Bases de Datos &amp; Repertorio Personal
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                  &quot;Mi Estudio&quot;: Tu biblioteca privada de ajedrez
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
                  Chessgora incorpora una base de datos privada donde podrás confeccionar y organizar tu repertorio de aperturas con blancas y negras, guardar árboles de variantes comentados y acceder al material magistral impartido en la Academia.
                </p>

                <div className="space-y-2 text-xs text-[#FAF8F2] pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Árboles de variantes estructurados:</strong> Organiza tus líneas principales y defensas sin perderte en notas dispersas.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Importación y Exportación PGN:</strong> Carga tus partidas jugadas en torneos presenciales o plataformas de juego.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Análisis asistido con módulos:</strong> Comprueba la precisión táctica de cada jugada con motores de análisis.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1C3454] text-xs font-bold text-[#C5A46D]">
                  <Database className="w-4 h-4" />
                  <span>Tu Laboratorio de Aperturas</span>
                </div>
                <div className="space-y-2 text-xs text-[#C4CBD4]">
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    ♟️ <strong className="text-white">Repertorio a la medida:</strong> Sigue las variantes recomendadas por el MI Roberto Martín del Campo.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    📁 <strong className="text-white">Carpetas por temáticas:</strong> Separa aperturas, finales teóricos y partidas modelo.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    🔒 <strong className="text-white">Privacidad total:</strong> Tus análisis y preparaciones secretas sólo son accesibles para ti y tu profesor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TAREAS & TÁCTICA */}
          {activeTab === 'TAREAS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                  Rutinas de Entrenamiento &amp; Deberes
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                  Entrena los 7 días de la semana con retroalimentación docente
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
                  El verdadero progreso se consolida entre clase y clase. A través de Chessgora, los alumnos reciben deberes semanales, ejercicios tácticos adaptados a su nivel y corrección detallada para no quedarse estancados.
                </p>

                <div className="space-y-2 text-xs text-[#FAF8F2] pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Baterías tácticas progresivas:</strong> Resuelve problemas enfocados en los temas vistos durante la semana.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Corrección dentro de la plataforma:</strong> El profesor califica tus soluciones y te señala errores conceptuales.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Métricas de avance:</strong> Visualiza tu porcentaje de acierto, tiempo de respuesta y evolución de rating.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1C3454] text-xs font-bold text-[#C5A46D]">
                  <Target className="w-4 h-4" />
                  <span>Ciclo de Aprendizaje Activo</span>
                </div>
                <div className="space-y-2 text-xs text-[#C4CBD4]">
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    1️⃣ <strong className="text-white">Clase en vivo:</strong> Cátedra teórica y práctica en el aula interactiva.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    2️⃣ <strong className="text-white">Tarea semanal:</strong> 10 a 20 ejercicios en Chessgora para fijar los patrones.
                  </p>
                  <p className="p-2.5 rounded-lg bg-[#172B46] border border-[#233F65]">
                    3️⃣ <strong className="text-white">Revisión docente:</strong> Tu entrenador evalúa y aclara dudas en la siguiente sesión.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BENEFICIOS EXCLUSIVOS PARA ALUMNOS */}
          {activeTab === 'BENEFICIOS' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A46D] block">
                  Ventajas de Ser Alumno Alekhins
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                  Todo incluido en tu inscripción, sin cuotas sorpresa
                </h3>
                <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
                  Como alumno activo de la Academia Alekhins en cualquiera de nuestras modalidades (Inicial, Competitivo, Alto Rendimiento o Clases Personalizadas), disfrutas de acceso pleno a Chessgora.com incluido en tu mensualidad.
                </p>

                <div className="space-y-2 text-xs text-[#FAF8F2] pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Ahorro en licencias externas:</strong> No requieres pagar suscripciones mensuales adicionales.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Acceso móvil y de escritorio:</strong> Entrena desde tu laptop, tableta o smartphone.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                    <span><strong>Comunicación directa con tu maestro:</strong> Mensajes y consultas pedagógicas en un entorno seguro.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1C3454] text-xs font-bold text-[#C5A46D]">
                  <Crown className="w-4 h-4" />
                  <span>Membresía Integral</span>
                </div>
                <div className="space-y-2 text-xs text-[#C4CBD4]">
                  <div className="p-3 rounded-lg bg-[#172B46] border border-[#C5A46D]/40 space-y-1">
                    <strong className="text-white block font-bold text-sm">✓ Chessgora.com Incluido</strong>
                    <p className="text-[11px] text-[#C5A46D]">
                      Activación inmediata tras registrarte en cualquiera de nuestros programas formativos.
                    </p>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                    Diseñado por Grandes Maestros y educadores titulados FIDE para llevar tu nivel al siguiente escalón deportivo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de Acción al Pie del Tab */}
          <div className="mt-8 pt-6 border-t border-[#233F65] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#C4CBD4]">
              <span>¿Ya eres alumno de la Academia?</span>{' '}
              <strong className="text-white">Ingresa directamente con tus credenciales de alumno.</strong>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://chessgora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado text-xs uppercase tracking-wider font-extrabold py-3 px-6 flex items-center gap-2 shadow"
              >
                <span>INGRESAR AL AULA VIRTUAL (CHESSGORA.COM)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/programas"
                className="btn-navy-outline text-xs uppercase tracking-wider font-bold py-3 px-5"
              >
                Ver Programas con Acceso
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

