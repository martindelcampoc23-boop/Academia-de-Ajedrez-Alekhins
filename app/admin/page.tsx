import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import {
  ShoppingBag,
  Users,
  BookOpen,
  DollarSign,
  Package,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Crown,
  Laptop,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Panel de Administración & CRM | Academia Alekhins',
};

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(user.role)) {
    redirect('/login?callbackUrl=/admin');
  }

  let ordersCount = 0;
  let totalRevenue = 0;
  let leadsCount = 0;
  let productsCount = 0;
  let studentsCount = 0;
  let lowStockVariants: any[] = [];

  try {
    const [oCount, ordersSum, lCount, pCount, sCount, lowStock] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.product.count(),
      prisma.student.count(),
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
    studentsCount = sCount;
    lowStockVariants = lowStock;
  } catch (error) {
    console.warn('⚠️ [AdminDashboardPage] Database query fallback:', error);
  }

  const avgTicket = ordersCount > 0 ? totalRevenue / ordersCount : 0;

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Admin */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#233F65] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-[11px] font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Control Central • Academia Alekhins</span>
            </div>
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Panel Administrativo &amp; CRM Comercial
            </h1>
            <p className="text-xs text-[#9CA3AF]">
              ajedrezprofesional.com • Gestión de alumnos, prospectos, catálogo y ventas
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/admin/leads"
              className="bg-[#C5A46D] hover:bg-[#D4B785] text-[#0F1D30] font-extrabold py-2 px-3 rounded-lg flex items-center gap-1.5 shadow"
            >
              <Users className="w-4 h-4" />
              <span>CRM Leads ({leadsCount} nuevos)</span>
            </Link>
            <Link
              href="/admin/alumnos"
              className="bg-[#172B46] hover:bg-[#233F65] text-[#C5A46D] border border-[#C5A46D]/40 font-bold py-2 px-3 rounded-lg flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4" />
              <span>Alumnos ({studentsCount})</span>
            </Link>
            <Link
              href="/admin/productos"
              className="bg-[#172B46] hover:bg-[#233F65] text-white border border-[#233F65] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              <span>Productos ({productsCount})</span>
            </Link>
            <Link
              href="/admin/pedidos"
              className="bg-[#172B46] hover:bg-[#233F65] text-white border border-[#233F65] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos ({ordersCount})</span>
            </Link>
            <Link
              href="/admin/finanzas"
              className="bg-[#172B46] hover:bg-[#233F65] text-white border border-[#233F65] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" />
              <span>Finanzas</span>
            </Link>
          </div>
        </div>

        {/* Tarjetas KPI Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 shadow">
            <div className="flex justify-between items-center text-[#9CA3AF]">
              <span className="text-xs font-semibold uppercase tracking-wider">Ventas Totales</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white block">
              ${totalRevenue.toFixed(2)} MXN
            </span>
            <p className="text-[11px] text-emerald-400 font-medium">Ingresos consolidados</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 shadow">
            <div className="flex justify-between items-center text-[#9CA3AF]">
              <span className="text-xs font-semibold uppercase tracking-wider">Pedidos Procesados</span>
              <ShoppingBag className="w-5 h-5 text-[#C5A46D]" />
            </div>
            <span className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white block">
              {ordersCount}
            </span>
            <p className="text-[11px] text-[#9CA3AF]">
              Ticket promedio: ${avgTicket.toFixed(0)} MXN
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 shadow">
            <div className="flex justify-between items-center text-[#9CA3AF]">
              <span className="text-xs font-semibold uppercase tracking-wider">Prospectos (Leads)</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white block">
              {leadsCount}
            </span>
            <p className="text-[11px] text-blue-400 font-medium">Nuevas solicitudes por atender</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 shadow">
            <div className="flex justify-between items-center text-[#9CA3AF]">
              <span className="text-xs font-semibold uppercase tracking-wider">Alumnos Matriculados</span>
              <Crown className="w-5 h-5 text-[#C5A46D]" />
            </div>
            <span className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white block">
              {studentsCount}
            </span>
            <p className="text-[11px] text-[#C5A46D] font-medium">Inscritos en programas activos</p>
          </div>
        </div>

        {/* Alertas de Stock Bajo */}
        <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-4 shadow">
          <div className="flex items-center justify-between border-b border-[#233F65] pb-3">
            <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Alertas de Inventario Bajo</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold">
              {lowStockVariants.length} variantes con stock menor a 5
            </span>
          </div>

          {lowStockVariants.length > 0 ? (
            <div className="space-y-2 text-xs">
              {lowStockVariants.map((v) => (
                <div
                  key={v.id}
                  className="p-3 bg-[#0F1D30] rounded-xl border border-[#233F65] flex items-center justify-between"
                >
                  <div>
                    <strong className="text-white block">{v.product.name}</strong>
                    <span className="text-[#9CA3AF] text-[11px]">
                      Variante: {v.name} • SKU: {v.sku}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950/80 text-amber-300 border border-amber-800 rounded font-bold">
                    Quedan: {v.stock} unidades
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#9CA3AF]">Todo el inventario de la tienda cuenta con stock saludable.</p>
          )}
        </div>

      </div>
    </div>
  );
}
