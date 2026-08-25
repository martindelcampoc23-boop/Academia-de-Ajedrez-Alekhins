'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { sendOrderConfirmationEmail, sendContactConfirmationEmail } from '@/lib/email';

// 1. Coupon Validation
export async function validateCouponAction(code: string, subtotal: number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return { success: false, error: 'Cupón no válido o expirado.' };
    }

    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return { success: false, error: 'El cupón ha vencido.' };
    }

    if (subtotal < coupon.minPurchase) {
      return {
        success: false,
        error: `El monto mínimo para aplicar este cupón es $${coupon.minPurchase} MXN.`,
      };
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    return {
      success: true,
      code: coupon.code,
      discountAmount,
      message: `Cupón ${coupon.code} aplicado con éxito (-$${discountAmount.toFixed(2)} MXN).`,
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { success: false, error: 'Error al procesar el cupón.' };
  }
}

// 2. Order Creation & Checkout (Server Side Price Recalculation)
export async function createOrderAction(formData: {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    references?: string;
  };
  cartItems: { variantId: string; quantity: number }[];
  couponCode?: string;
}) {
  try {
    if (!formData.cartItems || formData.cartItems.length === 0) {
      return { success: false, error: 'El carrito está vacío.' };
    }

    // Fetch real variants from DB
    const variantIds = formData.cartItems.map((item) => item.variantId);
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    });

    let subtotal = 0;
    const orderItemsToCreate = [];

    for (const cartItem of formData.cartItems) {
      const variant = variants.find((v) => v.id === cartItem.variantId);
      if (!variant) {
        return { success: false, error: 'Uno de los productos seleccionados ya no está disponible.' };
      }

      if (variant.stock < cartItem.quantity) {
        return {
          success: false,
          error: `Stock insuficiente para ${variant.product.name} (${variant.name}). Disponible: ${variant.stock}.`,
        };
      }

      const itemPrice = variant.price;
      const itemTotal = itemPrice * cartItem.quantity;
      subtotal += itemTotal;

      orderItemsToCreate.push({
        variantId: variant.id,
        productName: variant.product.name,
        variantName: variant.name,
        sku: variant.sku,
        unitPrice: itemPrice,
        quantity: cartItem.quantity,
        totalPrice: itemTotal,
      });
    }

    // Calculate coupon
    let discountAmount = 0;
    let validCouponCode = null;
    if (formData.couponCode) {
      const couponRes = await validateCouponAction(formData.couponCode, subtotal);
      if (couponRes.success) {
        discountAmount = couponRes.discountAmount || 0;
        validCouponCode = couponRes.code || null;
      }
    }

    const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
    const shippingCost = subtotalAfterDiscount >= 1500 || subtotalAfterDiscount === 0 ? 0 : 150;
    const totalAmount = subtotalAfterDiscount + shippingCost;

    // Generate Order Number ALE-2026-XXXXXX
    const count = await prisma.order.count();
    const orderNumber = `ALE-2026-${String(count + 1).padStart(6, '0')}`;

    const shippingAddressJson = JSON.stringify({
      recipientName: `${formData.customer.firstName} ${formData.customer.lastName}`,
      street: formData.customer.street,
      neighborhood: formData.customer.neighborhood,
      city: formData.customer.city,
      state: formData.customer.state,
      postalCode: formData.customer.postalCode,
      country: formData.customer.country,
      phone: formData.customer.phone,
      references: formData.customer.references || '',
    });

    // Create Order in DB
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: formData.customer.email,
        status: 'PAID', // Demo mode assumes immediate payment confirmation
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        shippingAddress: shippingAddressJson,
        couponCode: validCouponCode,
        stripePaymentIntentId: `pi_mock_${Date.now()}`,
        items: {
          create: orderItemsToCreate,
        },
        shipments: {
          create: {
            carrier: 'Estafeta / DHL Express',
            trackingNumber: `TRACK-${Math.floor(100000000 + Math.random() * 900000000)}`,
            status: 'PREPARING',
            shippingCost,
            events: {
              create: {
                status: 'PREPARING',
                description: 'Pedido pagado y confirmado. En proceso de empaque en almacén.',
                location: 'Almacén Central Alekhins - CDMX',
              },
            },
          },
        },
      },
    });

    // Update Inventory Stock
    for (const item of formData.cartItems) {
      const variant = variants.find((v) => v.id === item.variantId);
      if (variant) {
        const previousStock = variant.stock;
        const newStock = Math.max(0, previousStock - item.quantity);
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: { stock: newStock },
        });

        await prisma.inventoryTransaction.create({
          data: {
            variantId: item.variantId,
            quantityChange: -item.quantity,
            previousStock,
            newStock,
            reason: `Venta Pedido #${orderNumber}`,
          },
        });
      }
    }

    revalidatePath('/admin');
    revalidatePath('/admin/pedidos');

    // Enviar correo de confirmación de compra al cliente
    sendOrderConfirmationEmail({
      to: formData.customer.email,
      orderNumber: newOrder.orderNumber,
      customerName: `${formData.customer.firstName} ${formData.customer.lastName}`,
      items: orderItemsToCreate,
      subtotal,
      shippingCost,
      discountAmount,
      totalAmount,
      shippingAddress: shippingAddressJson,
    }).catch((err) => console.error('⚠️ Error enviando correo de pedido:', err));

    return {
      success: true,
      orderNumber: newOrder.orderNumber,
      orderId: newOrder.id,
      totalAmount: newOrder.totalAmount,
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message || 'Error al procesar el pedido.' };
  }
}

// 3. Lead Registration (Clubs, Schools & Coaching)
export async function submitLeadAction(formData: {
  name: string;
  email: string;
  phone: string;
  entityType?: string;
  studentAge?: string;
  institutionName?: string;
  playerCount?: number;
  notes?: string;
}) {
  try {
    const newLead = await prisma.lead.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        entityType: formData.entityType || 'INDIVIDUAL',
        studentAge: formData.studentAge || null,
        notes: formData.notes || null,
        status: 'NEW',
      },
    });

    if (formData.institutionName && formData.playerCount) {
      await prisma.institutionalQuote.create({
        data: {
          leadId: newLead.id,
          institutionName: formData.institutionName,
          playerCount: formData.playerCount,
          requestedItems: formData.notes || 'Equipamiento escolar / clases institucionales',
          status: 'PENDING',
        },
      });
    }

    // Enviar confirmación por correo al interesado
    sendContactConfirmationEmail(formData.email, formData.name).catch((err) =>
      console.error('⚠️ Error enviando correo de contacto:', err)
    );

    revalidatePath('/admin/leads');
    return { success: true, message: '¡Gracias por contactarnos! Un asesor pedagógico se comunicará a la brevedad.' };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: 'Error al enviar la solicitud.' };
  }
}

// 4. Track Order Lookup
export async function trackOrderAction(orderNumber: string, email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanOrderNumber = orderNumber.trim().toUpperCase();

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: cleanOrderNumber,
        OR: [
          { guestEmail: { equals: cleanEmail, mode: 'insensitive' } },
          { user: { email: { equals: cleanEmail, mode: 'insensitive' } } },
        ],
      },
      include: {
        items: true,
        user: { select: { name: true, email: true } },
        shipments: {
          include: {
            events: {
              orderBy: { timestamp: 'desc' },
            },
          },
        },
      },
    });

    if (!order) {
      return { success: false, error: 'No se encontró ningún pedido con esa combinación de número y correo.' };
    }

    return { success: true, order };
  } catch (error) {
    console.error('Error tracking order:', error);
    return { success: false, error: 'Error al consultar el envío.' };
  }
}
