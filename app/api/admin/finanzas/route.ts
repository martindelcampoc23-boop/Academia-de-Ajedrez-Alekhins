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

    // 1. Consultar órdenes válidas, pagos, suscripciones y movimientos manuales
    const [orders, subscriptions, manualEntries] = await Promise.all([
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
      prisma.subscription.findMany({
        include: {
          plan: true,
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.financeEntry.findMany({
        orderBy: { date: 'desc' },
      }),
    ]);

    // 2. Calcular Totales e Ingresos / Egresos
    let totalTienda = 0;
    orders.forEach((o) => {
      totalTienda += o.totalAmount;
    });

    let totalAcademia = 0;
    subscriptions.forEach((s) => {
      totalAcademia += s.plan.price;
    });

    let totalManualIngresos = 0;
    let totalManualEgresos = 0;

    manualEntries.forEach((entry) => {
      if (entry.type === 'INCOME') {
        totalManualIngresos += entry.amount;
      } else {
        totalManualEgresos += entry.amount;
      }
    });

    const totalIngresos = totalTienda + totalAcademia + totalManualIngresos;
    const totalEgresos = totalManualEgresos;
    const balanceNeto = totalIngresos - totalEgresos;
    const margenOperativo = totalIngresos > 0 ? ((balanceNeto / totalIngresos) * 100) : 0;
    const ordersCount = orders.length;
    const ticketPromedio = ordersCount > 0 ? totalTienda / ordersCount : 0;

    // 3. Agregación Mensual (Año actual)
    const monthlyMap: Record<number, {
      mes: string;
      tienda: number;
      academias: number;
      manualIngresos: number;
      egresos: number;
      totalIngresos: number;
      balance: number;
    }> = {};

    for (let i = 0; i < 12; i++) {
      monthlyMap[i] = {
        mes: MONTH_NAMES[i],
        tienda: 0,
        academias: 0,
        manualIngresos: 0,
        egresos: 0,
        totalIngresos: 0,
        balance: 0,
      };
    }

    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        monthlyMap[m].tienda += o.totalAmount;
        monthlyMap[m].totalIngresos += o.totalAmount;
        monthlyMap[m].balance += o.totalAmount;
      }
    });

    subscriptions.forEach((s) => {
      const d = new Date(s.createdAt);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        monthlyMap[m].academias += s.plan.price;
        monthlyMap[m].totalIngresos += s.plan.price;
        monthlyMap[m].balance += s.plan.price;
      }
    });

    manualEntries.forEach((entry) => {
      const d = new Date(entry.date);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        if (entry.type === 'INCOME') {
          monthlyMap[m].manualIngresos += entry.amount;
          monthlyMap[m].totalIngresos += entry.amount;
          monthlyMap[m].balance += entry.amount;
        } else {
          monthlyMap[m].egresos += entry.amount;
          monthlyMap[m].balance -= entry.amount;
        }
      }
    });

    const monthlyData = Object.values(monthlyMap);

    // 4. Distribución por Categorías
    let catMembresias = totalAcademia;
    let catSets = 0;
    let catRelojes = 0;
    let catLibros = 0;
    let catOtrosIngresos = 0;

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

    manualEntries.forEach((entry) => {
      if (entry.type === 'INCOME') {
        catOtrosIngresos += entry.amount;
      }
    });

    const categoryData = [
      { name: 'Membresías Academia', value: Math.round(catMembresias), color: '#D8B155' },
      { name: 'Sets y Tableros', value: Math.round(catSets), color: '#1B4D3E' },
      { name: 'Relojes DGT', value: Math.round(catRelojes), color: '#3B82F6' },
      { name: 'Libros y Cursos', value: Math.round(catLibros), color: '#10B981' },
      { name: 'Otros Ingresos', value: Math.round(catOtrosIngresos), color: '#F59E0B' },
    ];

    // Desglose de Gastos
    const expenseCategoryMap: Record<string, number> = {};
    manualEntries.filter((e) => e.type === 'EXPENSE').forEach((e) => {
      expenseCategoryMap[e.category] = (expenseCategoryMap[e.category] || 0) + e.amount;
    });

    const expenseCategoryData = Object.entries(expenseCategoryMap).map(([name, value], idx) => {
      const colors = ['#EF4444', '#F87171', '#FB923C', '#FBBF24', '#A855F7', '#EC4899'];
      return {
        name,
        value: Math.round(value),
        color: colors[idx % colors.length],
      };
    });

    // 5. Transacciones Recientes Consolidadas
    const recentOrders = orders.slice(0, 15).map((o) => ({
      id: o.orderNumber || `ORD-${o.id.slice(0, 8).toUpperCase()}`,
      tipoMovimiento: 'INCOME',
      origen: 'TIENDA',
      cliente: o.user?.name || o.guestEmail || o.user?.email || 'Cliente Particular',
      tipo: o.items.length > 0 ? o.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ') : 'Compra en Tienda',
      metodo: o.payments?.[0]?.paymentMethod ? `Stripe (${o.payments[0].paymentMethod})` : 'Stripe Checkout',
      monto: o.totalAmount,
      fecha: new Date(o.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      rawDate: o.createdAt,
      estado: o.status === 'PAID' || o.status === 'DELIVERED' || o.status === 'SHIPPED' ? 'Completado' : o.status,
    }));

    return NextResponse.json({
      kpis: {
        totalIngresos,
        totalEgresos,
        balanceNeto,
        margenOperativo: Math.round(margenOperativo * 10) / 10,
        totalTienda,
        totalAcademia,
        totalManualIngresos,
        totalManualEgresos,
        ticketPromedio,
        ordersCount,
      },
      monthlyData,
      categoryData,
      expenseCategoryData,
      recentTransactions: recentOrders,
      manualEntries,
    });
  } catch (error: any) {
    console.error('Error al generar reporte financiero:', error);
    return NextResponse.json({ error: 'Error al consultar finanzas.' }, { status: 500 });
  }
}
