import { NextResponse } from 'next/server';
import { stripe, isStripeMockMode } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    let planId = '';
    let userEmail = '';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      planId = body.planId;
      userEmail = body.email;
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      planId = formData.get('planId') as string;
      userEmail = (formData.get('email') as string) || '';
    }

    if (!planId) {
      return NextResponse.json({ error: 'ID de plan de entrenamiento requerido.' }, { status: 400 });
    }

    // Buscar plan en la base de datos
    const plan = await prisma.trainingPlan.findFirst({
      where: {
        OR: [{ id: planId }, { slug: planId }],
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan de entrenamiento no encontrado.' }, { status: 404 });
    }

    const currentUser = await getCurrentUser();
    const targetEmail = currentUser?.email || userEmail;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 1. Manejo en modo Mock / Desarrollo
    if (isStripeMockMode) {
      console.warn(`⚠️ [Subscription Checkout] Modo Mock activo para el plan ${plan.name}.`);

      if (currentUser?.id) {
        // Enlazar o asegurar registro de estudiante
        let student = await prisma.student.findUnique({
          where: { userId: currentUser.id },
        });

        if (!student) {
          student = await prisma.student.create({
            data: {
              userId: currentUser.id,
              level: plan.level || 'Intermedio',
              status: 'APPROVED',
            },
          });
        }

        // Crear enrollment demo
        await prisma.enrollment.create({
          data: {
            planId: plan.id,
            studentId: student.id,
            status: 'ACTIVE',
            startDate: new Date(),
          },
        });
      }

      const mockSuccessUrl = `${siteUrl}/checkout/success?type=plan&plan=${plan.slug}&order=SUB-MOCK-${Date.now()}&mock=true`;

      // Si fue submit de formulario nativo HTML, redirigir
      if (!contentType.includes('application/json')) {
        return NextResponse.redirect(mockSuccessUrl, 303);
      }

      return NextResponse.json({ url: mockSuccessUrl, isMock: true });
    }

    // 2. Crear sesión de Stripe Checkout para suscripción
    const isRecurring = plan.billingPeriod === 'MONTHLY' || plan.billingPeriod === 'ANNUAL';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isRecurring ? 'subscription' : 'payment',
      customer_email: targetEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: `Membresía Academia: ${plan.name}`,
              description: `${plan.duration} • ${plan.classCount} lecciones mensuales`,
            },
            unit_amount: Math.round(plan.price * 100),
            ...(isRecurring && {
              recurring: {
                interval: plan.billingPeriod === 'ANNUAL' ? 'year' : 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'ACADEMY_SUBSCRIPTION',
        planId: plan.id,
        planSlug: plan.slug,
        userId: currentUser?.id || '',
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=plan&plan=${plan.slug}&order=SUB-${plan.slug}`,
      cancel_url: `${siteUrl}/entrenamiento/${plan.slug}?canceled=true`,
    });

    console.log(`[Subscription Checkout] Sesión de suscripción creada: ${session.id} para plan ${plan.slug}`);

    // Si viene de formulario HTML nativo
    if (!contentType.includes('application/json') && session.url) {
      return NextResponse.redirect(session.url, 303);
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error('[Subscription Checkout Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la inscripción del plan.' },
      { status: 500 }
    );
  }
}
