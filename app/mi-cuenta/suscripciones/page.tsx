import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { CreditCard, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Gestión de Suscripciones | Academia Alekhins',
};

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams?: { cancelled?: string; notice?: string };
}) {
  const user = await getCurrentUser();

  let subscription: any = null;
  let defaultPlan: any = null;

  if (user?.id) {
    subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Fallback para visualización de catálogo si no tiene suscripción activa
  if (!subscription) {
    defaultPlan = await prisma.trainingPlan.findFirst({
      where: { isPublished: true },
    });
  }

  const isCancelledNotice = searchParams?.cancelled === 'true';

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

      {isCancelledNotice && (
        <div className="p-4 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-200 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Tu suscripción ha sido programada para no renovarse al final del período actual.</span>
        </div>
      )}

      {subscription ? (
        <div className="card-carbon p-6 space-y-6 border-champagne">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-border pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-champagne">Plan Contratado</span>
              <h3 className="font-serif-editorial text-xl font-bold text-ivory">{subscription.plan?.name}</h3>
              <p className="text-xs text-ivory-dim">Nivel: {subscription.plan?.level}</p>
            </div>
            <span
              className={`px-3 py-1 rounded text-xs font-bold ${
                subscription.status === 'ACTIVE' || subscription.status === 'active'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              ESTADO: {subscription.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ivory-muted">
            <div>
              <span className="text-ivory-dim block">Monto Mensual:</span>
              <strong className="text-champagne font-bold">${subscription.plan?.price.toFixed(2)} MXN</strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Fin de Período Actual:</span>
              <strong className="text-ivory">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>
            </div>
            <div>
              <span className="text-ivory-dim block">Método de Cobro:</span>
              <strong className="text-ivory">Stripe Payments (Cifrado)</strong>
            </div>
          </div>

          {subscription.status !== 'CANCELLED' && !subscription.cancelAtPeriodEnd && (
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
          )}
        </div>
      ) : (
        <div className="card-carbon p-8 text-center space-y-4 border-stone-border">
          <p className="text-xs text-ivory-dim">No tienes ninguna suscripción de entrenamiento activa actualmente.</p>
          <Link href="/entrenamiento" className="btn-champagne text-xs px-6 py-3 inline-block">
            Ver Planes de Entrenamiento
          </Link>
        </div>
      )}
    </div>
  );
}
