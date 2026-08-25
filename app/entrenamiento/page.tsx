import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BookOpen, CheckCircle, HelpCircle, Star, ArrowRight, ShieldCheck, Award, BrainCircuit } from 'lucide-react';
import { LevelAssessmentQuiz } from '@/components/training/LevelAssessmentQuiz';

export const metadata = {
  title: 'Planes de Entrenamiento & Evaluación de Nivel | Academia Alekhins',
  description: 'Programas de ajedrez por niveles: Iniciación, Intermedio y Alto Rendimiento. Test diagnóstico de nivel y seguimiento personalizado.',
};

export const revalidate = 60;

export default async function TrainingPlansPage() {
  let plans: any[] = [];
  try {
    plans = await prisma.trainingPlan.findMany({
      where: { isPublished: true },
      orderBy: { price: 'asc' },
    });
  } catch (error) {
    console.warn('⚠️ [TrainingPlansPage] Database query fallback:', error);
  }

  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Metodología de Alto Rendimiento
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Planes de Entrenamiento de Ajedrez
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed max-w-2xl mx-auto">
          Programas pedagógicos diseñados por el Maestro Internacional Roberto Martín del Campo para cada etapa del desarrollo ajedrecístico: desde principiantes hasta aspirantes a titulación FIDE.
        </p>
      </section>

      {/* Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan: any) => (
          <div
            key={plan.id}
            className={`card-carbon p-8 flex flex-col justify-between space-y-6 relative overflow-hidden transition hover:border-champagne ${
              plan.slug.includes('intermedio') ? 'border-champagne shadow-gold' : 'border-stone-border'
            }`}
          >
            {plan.slug.includes('intermedio') && (
              <span className="absolute top-0 right-0 bg-champagne text-carbon-dark text-[10px] font-extrabold uppercase px-4 py-1 rounded-bl shadow">
                Más Popular
              </span>
            )}

            <div className="space-y-4">
              <span className="text-xs text-champagne font-bold uppercase tracking-wider">{plan.level}</span>
              <h3 className="font-serif-editorial text-2xl font-bold text-ivory">{plan.name}</h3>
              <p className="text-xs text-ivory-muted leading-relaxed">{plan.description}</p>

              <div className="border-t border-stone-border pt-4">
                <span className="text-3xl font-extrabold text-champagne">${plan.price} MXN</span>
                <span className="text-xs text-ivory-dim"> / {plan.billingPeriod === 'MONTHLY' ? 'mes' : 'ciclo'}</span>
              </div>

              <div className="space-y-2 text-xs text-ivory-dim pt-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-champagne shrink-0" />
                  <span>{plan.classCount} clases al mes en vivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-champagne shrink-0" />
                  <span>Duración: {plan.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
                  <span>Modalidad: {plan.modality}</span>
                </div>
              </div>
            </div>

            <Link href={`/entrenamiento/${plan.slug}`} className="btn-champagne w-full text-center text-xs py-3.5 shadow-gold block">
              Ver Detalles del Plan
            </Link>
          </div>
        ))}
      </section>

      {/* Quiz Widget: Test Diagnóstico de Nivel */}
      <section id="quiz" className="bg-carbon-surface border-y border-stone-border py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-8 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-walnut border border-champagne flex items-center justify-center text-champagne mx-auto">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
              Diagnóstico Pedagógico
            </span>
            <h2 className="font-serif-editorial text-2xl md:text-4xl font-bold text-ivory">
              ¿Qué plan de entrenamiento es ideal para ti?
            </h2>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Responde a nuestro test de 5 preguntas técnicas y conceptuales. Recibirás una recomendación inmediata y el equipo docente evaluará tus respuestas para orientarte en tu formación.
            </p>
          </div>

          <LevelAssessmentQuiz />
        </div>
      </section>
    </div>
  );
}
