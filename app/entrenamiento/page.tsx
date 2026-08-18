import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BookOpen, CheckCircle, HelpCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Planes de Entrenamiento | Academia Alekhins',
  description: 'Programas de ajedrez por niveles: Iniciación, Desarrollo y Alto Rendimiento. Entrenamiento especializado con seguimiento personalizado.',
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
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Formación Especializada
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Planes de Entrenamiento de Ajedrez
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed max-w-2xl mx-auto">
          Elige el plan adaptado a tu fuerza de juego actual. Todos nuestros programas incluyen clases semanales en vivo, análisis de partidas y material digital exclusivo.
        </p>
      </div>

      {/* Plans Cards */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card-carbon p-8 flex flex-col justify-between space-y-6 relative ${
              plan.slug.includes('desarrollo') ? 'border-champagne shadow-gold' : ''
            }`}
          >
            {plan.slug.includes('desarrollo') && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-champagne text-carbon-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Más Popular
              </span>
            )}

            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase px-2.5 py-1 bg-stone-gray text-ivory-muted rounded inline-block">
                {plan.level}
              </span>

              <h2 className="font-serif-editorial text-2xl font-bold text-ivory">{plan.name}</h2>
              <p className="text-xs text-ivory-muted leading-relaxed">{plan.description}</p>

              <div className="py-4 border-y border-stone-border space-y-1">
                <span className="text-3xl font-extrabold text-champagne">${plan.price.toFixed(2)} MXN</span>
                <span className="text-xs text-ivory-dim block">Facturación mensual • Cancela cuando quieras</span>
              </div>

              <div className="space-y-2.5 text-xs text-ivory-muted pt-2">
                <p className="font-semibold text-ivory">Qué incluye este plan:</p>
                {(plan.includes || '').split('+').map((inc: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{inc.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href={`/entrenamiento/${plan.slug}`} className="btn-champagne text-xs w-full text-center py-3">
              Seleccionar Plan <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        ))}
      </section>

      {/* Quiz Widget: ¿Qué plan es para mí? */}
      <section id="quiz" className="bg-carbon-surface border-y border-stone-border py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-walnut border border-champagne flex items-center justify-center text-champagne mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="font-serif-editorial text-2xl md:text-3xl font-bold text-ivory">
            ¿Qué plan es ideal para mí?
          </h2>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Responde brevemente a las siguientes preguntas orientativas para descubrir el nivel de entrenamiento recomendado para tus objetivos actuales.
          </p>

          <div className="card-carbon p-6 text-left space-y-4 border-stone-border">
            <h3 className="font-semibold text-sm text-ivory">1. ¿Cuál es tu experiencia actual frente al tablero?</h3>
            <div className="space-y-2 text-xs text-ivory-muted">
              <label className="flex items-center gap-3 p-3 bg-carbon-dark rounded border border-stone-border cursor-pointer hover:border-champagne transition">
                <input type="radio" name="experience" className="accent-champagne" defaultChecked />
                <span>Sé mover las piezas pero apenas empiezo a jugar partidas completas.</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-carbon-dark rounded border border-stone-border cursor-pointer hover:border-champagne transition">
                <input type="radio" name="experience" className="accent-champagne" />
                <span>Juego habitualmente en internet (1000 - 1500 ELO en Chess.com/Lichess).</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-carbon-dark rounded border border-stone-border cursor-pointer hover:border-champagne transition">
                <input type="radio" name="experience" className="accent-champagne" />
                <span>Compite en torneos oficiales FIDE/FENAMAC y tengo rating oficial.</span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
