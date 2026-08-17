import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { CheckCircle, ShieldCheck, Calendar, Clock, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = await prisma.trainingPlan.findUnique({ where: { slug: params.slug } });
  if (!plan) return { title: 'Plan no encontrado' };
  return {
    title: `${plan.name} | Academia Alekhins`,
    description: plan.description,
  };
}

export default async function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = await prisma.trainingPlan.findUnique({
    where: { slug: params.slug },
  });

  if (!plan) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <Link href="/entrenamiento" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a todos los planes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Plan Content & Syllabus */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase px-2.5 py-1 bg-stone-gray text-ivory-muted rounded inline-block">
              Nivel: {plan.level}
            </span>
            <h1 className="font-serif-editorial text-3xl md:text-4xl font-bold text-ivory">{plan.name}</h1>
            <p className="text-sm text-ivory-muted leading-relaxed">{plan.description}</p>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-stone-border py-4 text-xs">
            <div>
              <span className="text-ivory-dim block">Modalidad:</span>
              <strong className="text-ivory">{plan.modality}</strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Clases Mensuales:</span>
              <strong className="text-champagne">{plan.classCount} lecciones</strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Duración:</span>
              <strong className="text-ivory">{plan.duration}</strong>
            </div>
          </div>

          {/* Syllabus */}
          <div className="space-y-4">
            <h2 className="font-serif-editorial text-xl font-bold text-ivory">Temario & Programa de Estudio</h2>
            <div className="card-carbon p-6 space-y-3 text-xs text-ivory-muted leading-relaxed">
              {plan.syllabus.split('.').filter(Boolean).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-champagne shrink-0">{idx + 1}.</span>
                  <span>{item.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Card */}
        <div className="lg:col-span-5">
          <div className="card-carbon p-6 space-y-6 border-champagne shadow-gold sticky top-28">
            <div className="space-y-2 border-b border-stone-border pb-4">
              <span className="text-xs text-ivory-dim uppercase tracking-wider block">Suscripción Mensual</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-champagne">${plan.price.toFixed(2)} MXN</span>
                <span className="text-xs text-ivory-muted">/ mes</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-ivory-muted">
              <p className="font-semibold text-ivory">Resumen de Contratación:</p>
              <div className="flex justify-between">
                <span>Renovación:</span>
                <strong className="text-ivory">Mensual Automática</strong>
              </div>
              <div className="flex justify-between">
                <span>Cancelación:</span>
                <strong className="text-emerald-400">En 1-clic sin penalizaciones</strong>
              </div>
              <div className="flex justify-between">
                <span>Acceso Inmediato:</span>
                <strong className="text-ivory">Videoteca + Grupos en vivo</strong>
              </div>
            </div>

            <form action="/api/checkout/subscription" method="POST" className="space-y-3">
              <input type="hidden" name="planId" value={plan.id} />
              <button type="submit" className="btn-champagne w-full py-3.5 text-sm shadow-gold">
                <CreditCard className="w-4 h-4" />
                Inscribirme Ahora (${plan.price.toFixed(2)} MXN)
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ivory-dim border-t border-stone-border pt-3">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Procesado de forma segura con Stripe. Transparencia total.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
