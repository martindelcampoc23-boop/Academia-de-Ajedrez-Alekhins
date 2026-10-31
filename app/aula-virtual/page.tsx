import React from 'react';
import Link from 'next/link';
import {
  Laptop,
  CheckCircle2,
  ExternalLink,
  Crown,
  PlayCircle,
  Brain,
  Video,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const metadata = {
  title: 'Aula Virtual & Plataforma Tecnológica Chessgora | Academia Alekhins',
  description:
    'Conoce el entorno de entrenamiento tecnológico de Academia Alekhins potenciado por Chessgora.com: tableros interactivos, resolución de táctica, tareas y seguimiento.',
};

export default function AulaVirtualPage() {
  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Laptop className="w-3.5 h-3.5" />
            <span>Entorno Tecnológico Oficial • Academia Alekhins</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            AULA VIRTUAL &amp; CHESSGORA.COM
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            En Academia Alekhins combinamos la cátedra magistral en vivo con <strong>Chessgora.com</strong>, la plataforma de entrenamiento ajedrecístico donde podrás reforzar tus conocimientos, resolver ejercicios, practicar posiciones y continuar trabajando fuera de las clases.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://chessgora.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-8 flex items-center gap-2 shadow-lg"
            >
              <span>Acceso Directo al Aula Virtual</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/programas"
              className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6"
            >
              Ver Programas con Acceso Incluido
            </Link>
          </div>
        </section>

        {/* Los 6 Pilares del Ecosistema Chessgora */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Herramientas de Alto Rendimiento
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
              Todo lo que incluye tu espacio tecnológico
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Tableros Interactivos</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Reproduce jugadas, visualiza variantes calculadas y experimenta en posiciones críticas durante y después de tus clases.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Resolución de Táctica</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Batería de problemas graduados por nivel y temática para afinar el golpe de vista y el cálculo de jugadas forzadas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Tareas & Actividades</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Envía tus soluciones y partidas analizadas para que los profesores revisen tus progresos y señalen correcciones clave.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <PlayCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Grabaciones & Videoteca</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Repasa las sesiones magistrales tantas veces como quieras para no perder ningún detalle pedagógico ni conceptual.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Análisis de Partidas</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Laboratorio para subir tus archivos PGN de torneos presenciales u online y recibir diagnósticos de precisión.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Seguimiento Académico</h3>
              <p className="text-xs text-[#C4CBD4] leading-relaxed">
                Métricas de constancia y rendimiento tanto para el alumno como para padres de familia y directores de colegios.
              </p>
            </div>
          </div>
        </section>

        {/* Instrucciones de Acceso para Alumnos */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#172B46] border border-[#233F65] space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
            Guía para Alumnos
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
            ¿Cómo accedo a mi cuenta en Chessgora?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#C5A46D] text-[#0F1D30] font-black flex items-center justify-center text-xs">1</span>
              <strong className="text-white block font-bold">Inscripción Activa</strong>
              <p className="text-[#C4CBD4]">Regístrate en cualquiera de los programas de Academia Alekhins.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#C5A46D] text-[#0F1D30] font-black flex items-center justify-center text-xs">2</span>
              <strong className="text-white block font-bold">Recepción de Credenciales</strong>
              <p className="text-[#C4CBD4]">Nuestro equipo docente te enviará tus accesos directos por correo y WhatsApp oficial.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#C5A46D] text-[#0F1D30] font-black flex items-center justify-center text-xs">3</span>
              <strong className="text-white block font-bold">Ingreso a Chessgora.com</strong>
              <p className="text-[#C4CBD4]">Entra en chessgora.com y comienza a entrenar los 7 días de la semana.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

