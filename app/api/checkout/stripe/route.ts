import { NextResponse } from 'next/server';
import { stripe, isStripeMockMode } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const checkoutSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1, 'El nombre es obligatorio.'),
    lastName: z.string().min(1, 'El apellido es obligatorio.'),
    email: z.string().email('Correo electrónico inválido.'),
    phone: z.string().min(8, 'Teléfono de contacto requerido.'),
    street: z.string().min(3, 'Calle y número requeridos.'),
    neighborhood: z.string().optional().default(''),
    city: z.string().min(2, 'Ciudad requerida.'),
    state: z.string().min(2, 'Estado requerido.'),
    postalCode: z.string().min(4, 'Código postal requerido.'),
    country: z.string().optional().default('México'),
    references: z.string().optional().default(''),
  }),
  cartItems: z
    .array(
      z.object({
        variantId: z.string().min(1, 'ID de variante requerido.'),
        quantity: z.number().int().positive('La cantidad debe ser mayor a 0.'),
      })
    )
    .min(1, 'El carrito no puede estar vacío.'),
  couponCode: z.string().optional().nullable(),
  shippingMethod: z
    .object({
      id: z.string().optional(),
      carrier: z.string().optional(),
      service: z.string().optional(),
      cost: z.number().optional(),
      estimatedDays: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = checkoutSchema.safeParse(rawBody);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || 'Datos de formulario incompletos.';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { customer, cartItems, couponCode, shippingMethod } = parsed.data;

    // 1. Obtener variantes reales de la base de datos
    const variantIds = cartItems.map((item) => item.variantId);
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: { include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } },
    });

    if (variants.length === 0) {
      return NextResponse.json({ error: 'Los productos seleccionados no existen en el catálogo.' }, { status: 400 });
    }

    let subtotal = 0;
    const lineItems: any[] = [];
    const orderItemsData: any[] = [];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    for (const item of cartItems) {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json(
          { error: 'Uno de los productos seleccionados ya no está disponible.' },
          { status: 400 }
        );
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Stock insuficiente para ${variant.product.name} (${variant.name}). Disponibles: ${variant.stock} unidades.`,
          },
          { status: 400 }
        );
      }

      const unitPrice = variant.price;
      const totalItemPrice = unitPrice * item.quantity;
      subtotal += totalItemPrice;

      // Imagen para Stripe
      const imgUrl = variant.image || variant.product.images[0]?.url;
      const absoluteImgUrl = imgUrl?.startsWith('http')
        ? imgUrl
        : imgUrl
        ? `${siteUrl}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`
        : undefined;

      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: `${variant.product.name} — ${variant.name}`,
            description: variant.product.shortDescription || `SKU: ${variant.sku}`,
            images: absoluteImgUrl ? [absoluteImgUrl] : [],
          },
          unit_amount: Math.round(unitPrice * 100), // En centavos
        },
        quantity: item.quantity,
      });

      orderItemsData.push({
        variantId: variant.id,
        productName: variant.product.name,
        variantName: variant.name,
        sku: variant.sku,
        unitPrice,
        quantity: item.quantity,
        totalPrice: totalItemPrice,
      });
    }

    // 2. Calcular cupón de descuento si existe
    let discountAmount = 0;
    let validCouponCode: string | null = null;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) >= new Date())) {
        if (subtotal >= coupon.minPurchase) {
          if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
              discountAmount = coupon.maxDiscount;
            }
          } else {
            discountAmount = coupon.discountValue;
          }
          validCouponCode = coupon.code;
        }
      }
    }

    const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
    const isFreeBaseEligible = subtotalAfterDiscount >= 1500 || subtotalAfterDiscount === 0;

    let shippingCost = isFreeBaseEligible ? 0 : 150;
    if (shippingMethod && typeof shippingMethod.cost === 'number') {
      shippingCost = Math.max(0, shippingMethod.cost);
    }
    const totalAmount = subtotalAfterDiscount + shippingCost;

    // Agregar costo de envío como línea si aplica
    if (shippingCost > 0) {
      const carrierDisplay = shippingMethod?.carrier ? `${shippingMethod.carrier} (vía DrEnvío)` : 'Envío DrEnvío Nacional Asegurado';
      const serviceDisplay = shippingMethod?.service ? ` - ${shippingMethod.service}` : '';
      const daysDisplay = shippingMethod?.estimatedDays ? ` • Entrega estimada: ${shippingMethod.estimatedDays}` : '';

      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: `${carrierDisplay}${serviceDisplay}`,
            description: `Logística DrEnvío con guía rastreable nacional${daysDisplay}`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // 3. Generar número de pedido único ALE-2026-XXXXXX
    const count = await prisma.order.count();
    const orderNumber = `ALE-2026-${String(count + 1).padStart(6, '0')}`;

    const carrierNameFinal = shippingMethod?.carrier
      ? `DrEnvío (${shippingMethod.carrier} ${shippingMethod.service || ''})`.trim()
      : 'DrEnvío (Estafeta / DHL Express)';

    const shippingAddressJson = JSON.stringify({
      recipientName: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
      street: customer.street.trim(),
      neighborhood: customer.neighborhood?.trim() || '',
      city: customer.city.trim(),
      state: customer.state.trim(),
      postalCode: customer.postalCode.trim(),
      country: customer.country?.trim() || 'México',
      phone: customer.phone.trim(),
      references: customer.references?.trim() || '',
      shippingProvider: 'DrEnvío Logistics Hub',
      shippingMethod: shippingMethod || {
        carrier: 'Estafeta',
        service: 'Terrestre Asegurado',
        estimatedDays: '3 a 5 días hábiles',
      },
    });

    // 4. Crear la orden en la BD en estado PENDING_PAYMENT
    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: customer.email.trim().toLowerCase(),
        status: 'PENDING_PAYMENT',
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        couponCode: validCouponCode,
        shippingAddress: shippingAddressJson,
        items: {
          create: orderItemsData,
        },
      },
    });

    console.log(`[Stripe Checkout] Orden #${orderNumber} creada en BD con estado PENDING_PAYMENT (Logística: ${carrierNameFinal}).`);

    // 5. Modo Mock / Desarrollo (si no se tienen claves de Stripe configuradas)
    if (isStripeMockMode) {
      console.warn(`⚠️ [Stripe Checkout] Modo Mock activo para la orden #${orderNumber}.`);
      
      // En modo mock, confirmar la orden directamente y descontar inventario
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          stripePaymentIntentId: `mock_pi_${Date.now()}`,
          shipments: {
            create: {
              carrier: carrierNameFinal,
              trackingNumber: `DR-MX-${Math.floor(100000000 + Math.random() * 900000000)}`,
              status: 'PREPARING',
              shippingCost,
              events: {
                create: {
                  status: 'PREPARING',
                  description: 'Pedido confirmado con DrEnvío Logistics Hub (modo demostración).',
                  location: 'Almacén Central CDMX',
                },
              },
            },
          },
        },
      });

      // Descontar inventario en modo demo
      for (const item of cartItems) {
        const v = variants.find((variant) => variant.id === item.variantId);
        if (v) {
          await prisma.productVariant.update({
            where: { id: v.id },
            data: { stock: Math.max(0, v.stock - item.quantity) },
          });
        }
      }

      return NextResponse.json({
        url: `${siteUrl}/checkout/success?order=${order.orderNumber}&mock=true`,
        orderNumber: order.orderNumber,
        isMock: true,
      });
    }

    // 6. Crear la Sesión Oficial de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer.email.trim().toLowerCase(),
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        type: 'STORE_ORDER',
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${order.orderNumber}`,
      cancel_url: `${siteUrl}/checkout?canceled=true&order=${order.orderNumber}`,
    });

    // Guardar referencia del session_id en la orden
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripePaymentIntentId: session.id,
      },
    });

    console.log(`[Stripe Checkout] Sesión de Stripe creada: ${session.id} para orden #${orderNumber}`);

    return NextResponse.json({
      url: session.url,
      orderNumber: order.orderNumber,
      sessionId: session.id,
      isMock: false,
    });
  } catch (error: any) {
    console.error('[Stripe Checkout Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno al comunicarse con Stripe.' },
      { status: 500 }
    );
  }
}
