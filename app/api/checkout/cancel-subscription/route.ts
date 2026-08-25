import { NextResponse } from 'next/server';
import { stripe, isStripeMockMode } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para gestionar tu suscripción.' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Buscar suscripción activa del usuario
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: { in: ['ACTIVE', 'active', 'trialing'] },
      },
      include: { plan: true },
    });

    if (!subscription) {
      // Si no tiene suscripción formal pero tiene enrolamiento
      return NextResponse.redirect(`${siteUrl}/mi-cuenta/suscripciones?notice=no_active_subscription`, 303);
    }

    if (!isStripeMockMode && subscription.stripeSubscriptionId && !subscription.stripeSubscriptionId.startsWith('mock_')) {
      try {
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });
        console.log(`[Stripe Subscription] Cancelación programada para sub ${subscription.stripeSubscriptionId}`);
      } catch (stripeErr: any) {
        console.error('[Stripe Cancel Error]:', stripeErr.message);
      }
    }

    // Actualizar registro en BD
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: true,
        status: 'CANCELLATION_PENDING',
      },
    });

    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(`${siteUrl}/mi-cuenta/suscripciones?cancelled=true`, 303);
    }

    return NextResponse.json({
      message: 'Tu suscripción no se renovará al final del período actual.',
      subscription,
    });
  } catch (error: any) {
    console.error('[Cancel Subscription Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Error al cancelar la suscripción.' },
      { status: 500 }
    );
  }
}
