import React from 'react';
import Link from 'next/link';
import { Award, Trophy, GraduationCap, Calendar, Download, FileText, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Currículum Vitae | MI Roberto Martín del Campo Cárdenas',
  description:
    'Trayectoria profesional, logros competitivos, experiencia docente y certificaciones del Maestro Internacional Roberto Martín del Campo Cárdenas.',
};

export default function CurriculumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-border pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block mb-1">
            Trayectoria Profesional
          </span>
          <h1 className="font-serif-editorial text-3xl md:text-4xl font-bold text-ivory">
            Currículum Vitae & Logros
          </h1>
          <p className="text-sm text-ivory-dim mt-1">
            MI Roberto Martín del Campo Cárdenas • Director Técnico Academia Alekhins
          </p>
        </div>

        <a
          href="/admin/fundador"
          className="btn-outline-gold text-xs px-4 py-2.5 inline-flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          Descargar CV en PDF
        </a>
      </div>

      {/* Timeline Section */}
      <div className="space-y-10">
        {/* Section 1: Títulos & Certificaciones */}
        <div className="space-y-4">
          <h2 className="font-serif-editorial text-xl font-bold text-champagne flex items-center gap-2 border-b border-stone-border pb-2">
            <Trophy className="w-5 h-5" />
            Títulos & Afiliaciones Oficiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-carbon p-4 space-y-1">
              <span className="text-xs font-bold text-ivory">Maestro Internacional (MI)</span>
              <p className="text-xs text-ivory-dim">Otorgado por la Federación Internacional de Ajedrez (FIDE).</p>
            </div>
            <div className="card-carbon p-4 space-y-1">
              <span className="text-xs font-bold text-ivory">Entrenador Titulado</span>
              <p className="text-xs text-ivory-dim">Especialista en desarrollo pedagógico de competidores juveniles y adultos.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Experiencia Competitiva */}
        <div className="space-y-4">
          <h2 className="font-serif-editorial text-xl font-bold text-champagne flex items-center gap-2 border-b border-stone-border pb-2">
            <Award className="w-5 h-5" />
            Experiencia Competitiva & Torneos
          </h2>
          <div className="space-y-4 text-xs text-ivory-muted pl-4 border-l-2 border-champagne/40">
            <div className="space-y-1">
              <span className="font-bold text-ivory block text-sm">Representación Internacional en Torneos Magistrales</span>
              <p className="text-ivory-dim">Participación en campeonatos zonales, torneos cerrados de norma y torneos abiertos internacionales.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-ivory block text-sm">Campeonatos Nacionales & Abiertos de Máxima Categórica</span>
              <p className="text-ivory-dim">Múltiples actuaciones destacadas en el circuito nacional de ajedrez de alto nivel.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Experiencia Docente */}
        <div className="space-y-4">
          <h2 className="font-serif-editorial text-xl font-bold text-champagne flex items-center gap-2 border-b border-stone-border pb-2">
            <GraduationCap className="w-5 h-5" />
            Experiencia Docente & Entrenamiento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-carbon p-4 space-y-2">
              <h3 className="font-bold text-ivory text-xs">Director de Academia Alekhins</h3>
              <p className="text-[11px] text-ivory-dim">Diseño de planes de estudio, supervisión pedagógica y selección de repertorio.</p>
            </div>
            <div className="card-carbon p-4 space-y-2">
              <h3 className="font-bold text-ivory text-xs">Entrenamiento de Talentos</h3>
              <p className="text-[11px] text-ivory-dim">Formación de campeones estatales y clasificados a torneos nacionales.</p>
            </div>
            <div className="card-carbon p-4 space-y-2">
              <h3 className="font-bold text-ivory text-xs">Conferencias & Seminarios</h3>
              <p className="text-[11px] text-ivory-dim">Impartición de clases magistrales sobre estrategia y finales para universidades y clubes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
