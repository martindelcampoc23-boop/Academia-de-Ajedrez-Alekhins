import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    console.error('❌ [Stripe Webhook] Cabecera stripe-signature ausente.');
    return NextResponse.json({ error: 'Falta cabecera de firma.' }, { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await req.text();

  try {
    if (webhookSecret && !webhookSecret.includes('mock')) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // En modo desarrollo/pruebas locales sin secreto oficial configurado
      event = JSON.parse(rawBody) as Stripe.Event;
      console.warn('⚠️ [Stripe Webhook] Procesando evento en modo de desarrollo sin verificación de firma.');
    }
  } catch (err: any) {
    console.error(`❌ [Stripe Webhook] Error al verificar firma: ${err.message}`);
    return NextResponse.json({ error: `Firma inválida: ${err.message}` }, { status: 400 });
  }

  // 1. Idempotencia: Verificar si el evento ya fue procesado
  try {
    const existingEvent = await prisma.processedWebhookEvent.findUnique({
      where: { eventId: event.id },
    });

    if (existingEvent) {
      console.log(`ℹ️ [Stripe Webhook] Evento ya procesado previamente (${event.id}). Saltando.`);
      return NextResponse.json({ received: true, alreadyProcessed: true });
    }
  } catch (dbError) {
    console.error('⚠️ [Stripe Webhook] Error consultando idempotencia en BD:', dbError);
  }

  console.log(`⚡ [Stripe Webhook] Procesando evento tipo: ${event.type} [ID: ${event.id}]`);

  try {
    switch (event.type) {
      // ----------------------------------------------------
      // 1. SESIÓN DE CHECKOUT COMPLETADA (Tienda y Academia)
      // ----------------------------------------------------
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.id;

        // A) PAGO DE PRODUCTOS DE TIENDA
        if (metadata.type === 'STORE_ORDER' || metadata.orderId || metadata.orderNumber) {
          const orderId = metadata.orderId || session.client_reference_id;
          const orderNumber = metadata.orderNumber;

          const order = await prisma.order.findFirst({
            where: {
              OR: [
                ...(orderId ? [{ id: orderId }] : []),
                ...(orderNumber ? [{ orderNumber }] : []),
                { stripePaymentIntentId: session.id },
              ],
            },
            include: { items: true, shipments: true },
          });

          if (order) {
            // Actualizar Orden a PAGADA
            if (order.status !== 'PAID') {
              await prisma.order.update({
                where: { id: order.id },
                data: {
                  status: 'PAID',
                  stripePaymentIntentId: paymentIntentId,
                },
              });

              // Registrar Pago en la tabla Payment
              await prisma.payment.create({
                data: {
                  orderId: order.id,
                  stripePaymentIntentId: paymentIntentId,
                  amount: (session.amount_total || 0) / 100,
                  currency: session.currency?.toUpperCase() || 'MXN',
                  status: 'COMPLETED',
                  paymentMethod: 'card',
                },
              });

              // Descontar inventario y registrar transacciones
              for (const item of order.items) {
                if (item.variantId) {
                  const variant = await prisma.productVariant.findUnique({
                    where: { id: item.variantId },
                  });

                  if (variant) {
                    const previousStock = variant.stock;
                    const newStock = Math.max(0, previousStock - item.quantity);

                    await prisma.productVariant.update({
                      where: { id: variant.id },
                      data: { stock: newStock },
                    });

                    await prisma.inventoryTransaction.create({
                      data: {
                        variantId: variant.id,
                        quantityChange: -item.quantity,
                        previousStock,
                        newStock,
                        reason: `Venta Stripe Checkout #${order.orderNumber}`,
                      },
                    });
                  }
                }
              }

              // Asegurar envío en preparación
              if (order.shipments.length === 0) {
                await prisma.shipment.create({
                  data: {
                    orderId: order.id,
                    carrier: 'Estafeta / DHL Express',
                    trackingNumber: `STRIPE-${Math.floor(100000000 + Math.random() * 900000000)}`,
                    status: 'PREPARING',
                    shippingCost: order.shippingCost,
                    events: {
                      create: {
                        status: 'PREPARING',
                        description: 'Pago recibido por Stripe Checkout. En preparación en almacén.',
                        location: 'Almacén Central CDMX',
                      },
                    },
                  },
                });
              }

              console.log(`✅ [Stripe Webhook] Orden #${order.orderNumber} confirmada como PAGADA con éxito.`);
            }
          } else {
            console.warn(`⚠️ [Stripe Webhook] No se encontró orden para la sesión ${session.id}`);
          }
        }

        // B) SUSCRIPCIÓN / INSCRIPCIÓN A PLAN DE LA ACADEMIA
        if (metadata.type === 'ACADEMY_SUBSCRIPTION' || metadata.planId) {
          const planId = metadata.planId;
          const planSlug = metadata.planSlug;
          let userId = metadata.userId;

          const plan = await prisma.trainingPlan.findFirst({
            where: {
              OR: [
                ...(planId ? [{ id: planId }] : []),
                ...(planSlug ? [{ slug: planSlug }] : []),
              ],
            },
          });

          if (plan) {
            // Si no tenemos userId, buscar o crear usuario por email
            const customerEmail = session.customer_email || session.customer_details?.email;
            if (!userId && customerEmail) {
              let user = await prisma.user.findUnique({
                where: { email: customerEmail.trim().toLowerCase() },
              });

              if (!user) {
                user = await prisma.user.create({
                  data: {
                    email: customerEmail.trim().toLowerCase(),
                    name: session.customer_details?.name || 'Alumno Alekhins',
                    role: 'STUDENT',
                  },
                });
              }
              userId = user.id;
            }

            if (userId) {
              // Asegurar registro de Student
              let student = await prisma.student.findUnique({
                where: { userId },
              });

              if (!student) {
                student = await prisma.student.create({
                  data: {
                    userId,
                    level: plan.level || 'Intermedio',
                    status: 'APPROVED',
                    approvedAt: new Date(),
                  },
                });
              }

              // Actualizar rol del usuario si era CUSTOMER
              await prisma.user.update({
                where: { id: userId },
                data: { role: 'STUDENT' },
              });

              // Registrar o actualizar Suscripción
              const stripeSubId =
                typeof session.subscription === 'string'
                  ? session.subscription
                  : session.id;

              const now = new Date();
              const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

              await prisma.subscription.upsert({
                where: { stripeSubscriptionId: stripeSubId },
                update: {
                  status: 'ACTIVE',
                  currentPeriodStart: now,
                  currentPeriodEnd: periodEnd,
                  cancelAtPeriodEnd: false,
                },
                create: {
                  userId,
                  planId: plan.id,
                  stripeSubscriptionId: stripeSubId,
                  status: 'ACTIVE',
                  currentPeriodStart: now,
                  currentPeriodEnd: periodEnd,
                  cancelAtPeriodEnd: false,
                },
              });

              // Crear Inscripción activa (Enrollment)
              await prisma.enrollment.create({
                data: {
                  planId: plan.id,
                  studentId: student.id,
                  status: 'ACTIVE',
                  startDate: now,
                  subscriptionId: stripeSubId,
                },
              });

              console.log(`✅ [Stripe Webhook] Suscripción activada para usuario ${userId} en plan ${plan.name}`);
            }
          }
        }

        break;
      }

      // ----------------------------------------------------
      // 2. PAGO EXITOSO DIRECTO (Payment Intent)
      // ----------------------------------------------------
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💳 [Stripe Webhook] PaymentIntent ${paymentIntent.id} exitoso.`);

        const order = await prisma.order.findFirst({
          where: { stripePaymentIntentId: paymentIntent.id },
        });

        if (order && order.status !== 'PAID') {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'PAID' },
          });
        }
        break;
      }

      // ----------------------------------------------------
      // 3. PAGO FALLIDO (Payment Intent Failed)
      // ----------------------------------------------------
      case 'payment_intent.payment_failed': {
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.error(`❌ [Stripe Webhook] Pago fallido para PaymentIntent ${failedIntent.id}: ${failedIntent.last_payment_error?.message}`);

        const order = await prisma.order.findFirst({
          where: { stripePaymentIntentId: failedIntent.id },
        });

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'PAYMENT_FAILED' },
          });
        }
        break;
      }

      // ----------------------------------------------------
      // 4. SUSCRIPCIÓN ACTUALIZADA O CANCELADA
      // ----------------------------------------------------
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status.toUpperCase(),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        console.log(`🔄 [Stripe Webhook] Suscripción ${subscription.id} actualizada: ${subscription.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'CANCELLED',
            cancelAtPeriodEnd: true,
          },
        });

        await prisma.enrollment.updateMany({
          where: { subscriptionId: subscription.id },
          data: { status: 'CANCELLED', endDate: new Date() },
        });

        console.log(`🛑 [Stripe Webhook] Suscripción ${subscription.id} cancelada y enrolamientos desactivados.`);
        break;
      }

      default:
        console.log(`ℹ️ [Stripe Webhook] Evento no manejado específicamente: ${event.type}`);
    }

    // 2. Registrar evento procesado para idempotencia
    await prisma.processedWebhookEvent.create({
      data: {
        eventId: event.id,
        eventType: event.type,
      },
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(`❌ [Stripe Webhook Error]:`, error);
    return NextResponse.json(
      { error: 'Error procesando el evento de Stripe.', details: error.message },
      { status: 500 }
    );
  }
}
