import React from 'react';
import { LevelAssessmentQuiz } from '@/components/training/LevelAssessmentQuiz';
import { Crown, Sparkles, CheckCircle2, ShieldCheck, Target } from 'lucide-react';

export const metadata = {
  title: 'Evaluación Diagnóstica de Nivel | Academia Alekhins',
  description:
    'Realiza nuestro test interactivo de 60 segundos para evaluar tu nivel ajedrecístico y descubrir cuál es el programa formativo óptimo para ti o tus hijos.',
};

export default function EvaluacionPage() {
  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Cabecera */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/60 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Target className="w-4 h-4" />
            <span>Test Diagnóstico en 60 Segundos</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            ¿Cuál es tu Programa de Ajedrez Ideal?
          </h1>

          <p className="text-sm sm:text-base text-[#C4CBD4] leading-relaxed max-w-2xl mx-auto font-light">
            Responde 5 breves preguntas sobre tu experiencia, objetivos y disponibilidad de tiempo. Nuestro sistema evaluará tu perfil para recomendarte el grupo o modalidad formativa exacta bajo la supervisión del <strong>MI Roberto Martín del Campo</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#C5A46D] font-semibold pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% Gratuito y sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Orientación pedagógica inmediata
            </span>
          </div>
        </div>

        {/* Componente Interactivo del Quiz */}
        <LevelAssessmentQuiz />

      </div>
    </div>
  );
}

