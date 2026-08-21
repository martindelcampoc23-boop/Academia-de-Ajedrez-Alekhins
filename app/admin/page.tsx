import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ShoppingBag, Users, BookOpen, DollarSign, Package, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

export const metadata = {
  title: 'Panel de Administración & CRM | Academia Alekhins',
};

export const revalidate = 0; // Fresh admin dashboard

export default async function AdminDashboardPage() {
  let ordersCount = 0;
  let totalRevenue = 0;
  let leadsCount = 0;
  let productsCount = 0;
  let lowStockVariants: any[] = [];

  try {
    const [oCount, ordersSum, lCount, pCount, lowStock] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.product.count(),
      prisma.productVariant.findMany({
        where: { stock: { lte: 5 } },
        include: { product: true },
        take: 5,
      }),
    ]);
    ordersCount = oCount;
    totalRevenue = ordersSum._sum.totalAmount || 0;
    leadsCount = lCount;
    productsCount = pCount;
    lowStockVariants = lowStock;
  } catch (error) {
    console.warn('⚠️ [AdminDashboardPage] Database query fallback:', error);
  }

  const avgTicket = ordersCount > 0 ? totalRevenue / ordersCount : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      {/* Admin Nav Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-border pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
            Gestión Integral
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-ivory">
            Panel de Administración & CMS / CRM
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/admin/productos" className="bg-champagne hover:bg-champagne/90 text-[#0B1510] font-bold py-2 px-3 rounded flex items-center gap-1.5">
            📦 Productos
          </Link>
          <Link href="/admin/alumnos" className="bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 font-bold py-2 px-3 rounded">
            👥 Alumnos & Admisiones
          </Link>
          <Link href="/admin/finanzas" className="bg-carbon-card hover:bg-stone-gray text-ivory border border-stone-border font-bold py-2 px-3 rounded">
            📊 Finanzas
          </Link>
          <Link href="/admin/pedidos" className="btn-outline-gold py-2 px-3">
            Pedidos ({ordersCount})
          </Link>
          <Link href="/admin/leads" className="btn-champagne py-2 px-3">
            CRM Leads ({leadsCount})
          </Link>
          <Link href="/admin/fundador" className="bg-carbon-card hover:bg-stone-gray text-ivory border border-stone-border py-2 px-3 rounded">
            CMS Fundador
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-carbon p-6 space-y-2">
          <div className="flex justify-between items-center text-ivory-dim">
            <span className="text-xs font-semibold">Ventas Totales</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-serif-editorial text-2xl font-bold text-ivory block">${totalRevenue.toFixed(2)} MXN</span>
          <p className="text-[11px] text-emerald-400 font-medium">Ingresos consolidados</p>
        </div>

        <div className="card-carbon p-6 space-y-2">
          <div className="flex justify-between items-center text-ivory-dim">
            <span className="text-xs font-semibold">Pedidos Procesados</span>
            <ShoppingBag className="w-5 h-5 text-champagne" />
          </div>
          <span className="font-serif-editorial text-2xl font-bold text-ivory block">{ordersCount}</span>
          <p className="text-[11px] text-ivory-dim">Ticket promedio: ${avgTicket.toFixed(2)} MXN</p>
        </div>

        <div className="card-carbon p-6 space-y-2">
          <div className="flex justify-between items-center text-ivory-dim">
            <span className="text-xs font-semibold">Leads Nuevos (CRM)</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-serif-editorial text-2xl font-bold text-ivory block">{leadsCount}</span>
          <p className="text-[11px] text-blue-400 font-medium">Pendientes de seguimiento</p>
        </div>

        <div className="card-carbon p-6 space-y-2 hover:border-champagne/40 transition cursor-pointer">
          <Link href="/admin/productos" className="block">
            <div className="flex justify-between items-center text-ivory-dim">
              <span className="text-xs font-semibold">Productos en Catálogo</span>
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-serif-editorial text-2xl font-bold text-ivory block">{productsCount}</span>
            <p className="text-[11px] text-champagne font-semibold">→ Gestionar productos</p>
          </Link>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="card-carbon p-6 space-y-4 border-amber-800/40">
        <div className="flex items-center justify-between border-b border-stone-border pb-3">
          <h3 className="font-serif-editorial text-base font-bold text-ivory flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Alertas de Inventario Bajo
          </h3>
          <span className="text-xs text-amber-400 font-semibold">{lowStockVariants.length} variantes con stock bajo</span>
        </div>

        {lowStockVariants.length > 0 ? (
          <div className="space-y-2 text-xs">
            {lowStockVariants.map((v) => (
              <div key={v.id} className="p-3 bg-carbon-dark rounded border border-stone-border flex items-center justify-between">
                <div>
                  <strong className="text-ivory">{v.product.name}</strong>
                  <span className="text-ivory-dim block">Variante: {v.name} • SKU: {v.sku}</span>
                </div>
                <span className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold">
                  Quedan: {v.stock} unidades
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-ivory-dim">Todo el inventario cuenta con stock suficiente.</p>
        )}
      </div>
    </div>
  );
}
