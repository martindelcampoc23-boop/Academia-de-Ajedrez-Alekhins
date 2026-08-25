import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(user.role)) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
    }

    const currentYear = new Date().getFullYear();

    // 1. Consultar todas las órdenes válidas
    const [orders, payments, subscriptions] = await Promise.all([
      prisma.order.findMany({
        where: {
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
        include: {
          user: { select: { name: true, email: true } },
          items: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.findMany({
        where: {
          status: { in: ['PAID', 'COMPLETED', 'SUCCEEDED', 'succeeded'] },
        },
        include: {
          order: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.subscription.findMany({
        include: {
          plan: true,
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    // 2. Calcular KPIs
    let totalTienda = 0;
    orders.forEach((o) => {
      totalTienda += o.totalAmount;
    });

    let totalAcademia = 0;
    subscriptions.forEach((s) => {
      totalAcademia += s.plan.price;
    });

    const totalIngresos = totalTienda + totalAcademia;
    const ordersCount = orders.length;
    const ticketPromedio = ordersCount > 0 ? totalTienda / ordersCount : 0;

    // 3. Agregación Mensual (Año actual)
    const monthlyMap: Record<number, { mes: string; tienda: number; academias: number; total: number }> = {};
    for (let i = 0; i < 12; i++) {
      monthlyMap[i] = {
        mes: MONTH_NAMES[i],
        tienda: 0,
        academias: 0,
        total: 0,
      };
    }

    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        monthlyMap[m].tienda += o.totalAmount;
        monthlyMap[m].total += o.totalAmount;
      }
    });

    subscriptions.forEach((s) => {
      const d = new Date(s.createdAt);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        monthlyMap[m].academias += s.plan.price;
        monthlyMap[m].total += s.plan.price;
      }
    });

    const monthlyData = Object.values(monthlyMap);

    // 4. Distribución por Categorías
    let catMembresias = totalAcademia;
    let catSets = 0;
    let catRelojes = 0;
    let catLibros = 0;

    orders.forEach((o) => {
      o.items.forEach((item) => {
        const name = item.productName.toLowerCase();
        if (name.includes('reloj') || name.includes('dgt')) {
          catRelojes += item.totalPrice;
        } else if (name.includes('libro') || name.includes('curso') || name.includes('estrategia')) {
          catLibros += item.totalPrice;
        } else {
          catSets += item.totalPrice;
        }
      });
    });

    const categoryData = [
      { name: 'Membresías Academia', value: Math.round(catMembresias), color: '#D8B155' },
      { name: 'Sets y Tableros', value: Math.round(catSets), color: '#1B4D3E' },
      { name: 'Relojes DGT', value: Math.round(catRelojes), color: '#3B82F6' },
      { name: 'Libros y Cursos', value: Math.round(catLibros), color: '#10B981' },
    ];

    // 5. Transacciones Recientes Consolidadas
    const recentTransactions = orders.slice(0, 15).map((o) => ({
      id: o.orderNumber || `ORD-${o.id.slice(0, 8).toUpperCase()}`,
      cliente: o.user?.name || o.guestEmail || o.user?.email || 'Cliente Particular',
      tipo: o.items.length > 0 ? o.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ') : 'Compra en Tienda',
      metodo: o.payments?.[0]?.paymentMethod ? `Stripe (${o.payments[0].paymentMethod})` : 'Stripe Checkout',
      monto: o.totalAmount,
      fecha: new Date(o.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      estado: o.status === 'PAID' || o.status === 'DELIVERED' || o.status === 'SHIPPED' ? 'Completado' : o.status,
    }));

    return NextResponse.json({
      kpis: {
        totalIngresos,
        totalTienda,
        totalAcademia,
        ticketPromedio,
        ordersCount,
      },
      monthlyData,
      categoryData,
      recentTransactions,
    });
  } catch (error: any) {
    console.error('Error al generar reporte financiero:', error);
    return NextResponse.json({ error: 'Error al consultar finanzas.' }, { status: 500 });
  }
}
