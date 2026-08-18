import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'OPERACIONES')) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      include: {
        items: true,
        shipments: {
          include: { events: { orderBy: { timestamp: 'desc' } } },
        },
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Error al obtener pedidos:', error);
    return NextResponse.json({ error: 'Error al consultar pedidos.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN' && user.role !== 'OPERACIONES')) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
    }

    const body = await req.json();
    const { orderId, status, carrier, trackingNumber, notes } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'ID de pedido requerido.' }, { status: 400 });
    }

    // Actualizar estado de la orden
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status || undefined,
      },
      include: {
        shipments: true,
      },
    });

    // Si viene información de paquetería o guía
    if (carrier || trackingNumber) {
      let shipment = order.shipments[0];
      if (shipment) {
        shipment = await prisma.shipment.update({
          where: { id: shipment.id },
          data: {
            carrier: carrier || shipment.carrier,
            trackingNumber: trackingNumber || shipment.trackingNumber,
            status: status || shipment.status,
          },
        });
      } else {
        shipment = await prisma.shipment.create({
          data: {
            orderId: order.id,
            carrier: carrier || 'FedEx',
            trackingNumber: trackingNumber || null,
            status: status || 'PREPARING',
          },
        });
      }

      // Crear evento de seguimiento
      await prisma.shipmentEvent.create({
        data: {
          shipmentId: shipment.id,
          status: status || 'ACTUALIZACION',
          description: notes || `El pedido fue actualizado a estado ${status || 'En preparación'}.`,
        },
      });
    }

    return NextResponse.json({ message: 'Pedido actualizado exitosamente.', order });
  } catch (error: any) {
    console.error('Error al actualizar pedido:', error);
    return NextResponse.json({ error: 'Error al actualizar el pedido.' }, { status: 500 });
  }
}
