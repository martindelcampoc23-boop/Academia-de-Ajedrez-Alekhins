import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { CreditCard, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Gestión de Suscripciones | Academia Alekhins',
};

export default async function SubscriptionsPage() {
  const plans = await prisma.trainingPlan.findMany({ take: 1 });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link href="/mi-cuenta" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a Mi Cuenta
      </Link>

      <div className="border-b border-stone-border pb-4">
        <h1 className="font-serif-editorial text-2xl md:text-3xl font-bold text-ivory">
          Mis Suscripciones de Entrenamiento
        </h1>
        <p className="text-xs text-ivory-dim">
          Consulta el estado de tu plan, fecha de próximo cargo y gestiona la cancelación transparente sin trabas.
        </p>
      </div>

      {plans.length > 0 ? (
        <div className="card-carbon p-6 space-y-6 border-champagne">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-border pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-champagne">Plan Activo</span>
              <h3 className="font-serif-editorial text-xl font-bold text-ivory">{plans[0].name}</h3>
              <p className="text-xs text-ivory-dim">Nivel: {plans[0].level}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-xs font-bold">
              ESTADO: ACTIVA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ivory-muted">
            <div>
              <span className="text-ivory-dim block">Monto Mensual:</span>
              <strong className="text-champagne font-bold">${plans[0].price.toFixed(2)} MXN</strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Próximo Cargo:</span>
              <strong className="text-ivory">16 de Septiembre, 2026</strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Método de Pago:</span>
              <strong className="text-ivory">Tarjeta (Stripe) •••• 4242</strong>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ivory-dim">
              Transparencia Alekhins: Puedes cancelar tu suscripción en cualquier momento antes del próximo ciclo.
            </p>
            <form action="/api/checkout/cancel-subscription" method="POST">
              <button
                type="submit"
                className="text-xs px-4 py-2 border border-red-800 text-red-400 hover:bg-red-950 rounded font-medium transition"
              >
                Cancelar Suscripción
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card-carbon p-8 text-center space-y-4">
          <p className="text-xs text-ivory-dim">No tienes ninguna suscripción de entrenamiento activa actualmente.</p>
          <Link href="/entrenamiento" className="btn-champagne text-xs px-4 py-2">
            Ver Planes de Entrenamiento
          </Link>
        </div>
      )}
    </div>
  );
}
