'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  Download,
  Users,
  RefreshCw,
  PieChart as PieIcon,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FinanceKPIs {
  totalIngresos: number;
  totalTienda: number;
  totalAcademia: number;
  ticketPromedio: number;
  ordersCount: number;
}

interface MonthlyDataItem {
  mes: string;
  tienda: number;
  academias: number;
  total: number;
}

interface CategoryDataItem {
  name: string;
  value: number;
  color: string;
}

interface TransactionItem {
  id: string;
  cliente: string;
  tipo: string;
  metodo: string;
  monto: number;
  fecha: string;
  estado: string;
}

export default function AdminFinanzasPage() {
  const { data: session, status } = useSession();
  const [periodo, setPeriodo] = useState('2026');
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<FinanceKPIs>({
    totalIngresos: 0,
    totalTienda: 0,
    totalAcademia: 0,
    ticketPromedio: 0,
    ordersCount: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyDataItem[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([]);

  const role = (session?.user as any)?.role;

  const fetchFinanceData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/finanzas');
      if (res.ok) {
        const data = await res.json();
        if (data.kpis) setKpis(data.kpis);
        if (data.monthlyData) setMonthlyData(data.monthlyData);
        if (data.categoryData) setCategoryData(data.categoryData);
        if (data.recentTransactions) setRecentTransactions(data.recentTransactions);
      }
    } catch (err) {
      console.error('Error cargando finanzas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchFinanceData();
    }
  }, [status, fetchFinanceData]);

  const handleExportCSV = () => {
    if (recentTransactions.length === 0) {
      alert('No hay transacciones disponibles para exportar.');
      return;
    }

    const headers = ['ID Transaccion', 'Cliente', 'Concepto', 'Metodo', 'Monto (MXN)', 'Fecha', 'Estado'];
    const rows = recentTransactions.map((tx) => [
      `"${tx.id}"`,
      `"${tx.cliente.replace(/"/g, '""')}"`,
      `"${tx.tipo.replace(/"/g, '""')}"`,
      `"${tx.metodo.replace(/"/g, '""')}"`,
      tx.monto,
      `"${tx.fecha}"`,
      `"${tx.estado}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte-financiero-alekhins-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando finanzas...</div>;
  }

  if (!['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para administradores.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B3E34] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Módulo Contable & Métricas
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-[#F6F3EC]">
            Panel Financiero & Análisis de Ingresos
          </h1>
          <p className="text-xs text-[#A8B2A6] mt-1">
            Consolidado verídico de ventas de tienda oficial, inscripciones y suscripciones mensuales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchFinanceData}
            className="p-2 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#D8B155] hover:border-[#D8B155] transition flex items-center gap-1.5 text-xs font-semibold"
            title="Actualizar datos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/30 text-xs font-bold transition"
          >
            ← Volver a Admin
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Ingresos Totales Brutos</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-white">
            ${kpis.totalIngresos.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Ingresos consolidados en BD</span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Colegiaturas & Membresías</span>
            <Users className="w-4 h-4 text-[#D8B155]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#D8B155]">
            ${kpis.totalAcademia.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#A8B2A6]">
            <span>
              {kpis.totalIngresos > 0
                ? `${Math.round((kpis.totalAcademia / kpis.totalIngresos) * 100)}% del ingreso total`
                : 'Suscripciones activas'}
            </span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Ventas Tienda de Ajedrez</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-white">
            ${kpis.totalTienda.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#A8B2A6]">
            <span>{kpis.ordersCount} pedidos registrados</span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Ticket Promedio</span>
            <CreditCard className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-white">
            ${kpis.ticketPromedio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#A8B2A6]">
            <span>Por orden de compra</span>
          </div>
        </div>
      </div>

      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfica de Evolución */}
        <div className="lg:col-span-2 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-editorial text-lg font-bold text-white">Evolución de Ingresos Mensuales</h2>
              <p className="text-xs text-[#A8B2A6]">Comparativa de Academia vs Tienda Oficial ({periodo})</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#D8B155]">● Academia</span>
              <span className="flex items-center gap-1 text-[#10B981]">● Tienda</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcademias" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D8B155" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D8B155" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTienda" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C3328" vertical={false} />
                <XAxis dataKey="mes" stroke="#A8B2A6" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#A8B2A6"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1510',
                    borderColor: '#2B3E34',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F6F3EC',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString('es-MX')} MXN`]}
                />
                <Area
                  type="monotone"
                  dataKey="academias"
                  stroke="#D8B155"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAcademias)"
                  name="Academia"
                />
                <Area
                  type="monotone"
                  dataKey="tienda"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTienda)"
                  name="Tienda"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Categoría */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-serif-editorial text-lg font-bold text-white">Distribución de Ingresos</h2>
            <p className="text-xs text-[#A8B2A6]">Porcentajes por línea de negocio</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            {categoryData.some((c) => c.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter((c) => c.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1510',
                      borderColor: '#2B3E34',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString('es-MX')} MXN`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-[#A8B2A6] text-center">Sin transacciones registradas para graficar</p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2B3E34] text-xs">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#D2DBD0]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-bold text-white">${cat.value.toLocaleString('es-MX')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de Transacciones Recientes */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden space-y-4 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-editorial text-lg font-bold text-white">Transacciones Recientes</h2>
            <p className="text-xs text-[#A8B2A6]">Pagos registrados vía Stripe Checkout y órdenes de la tienda</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B1510] border border-[#2B3E34] hover:border-[#D8B155] text-xs font-semibold text-[#D8B155] transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#A8B2A6]">
              No hay transacciones registradas en la base de datos actualmente.
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]/40">
                  <th className="text-left py-3 px-3">ID Pedido / Ref</th>
                  <th className="text-left py-3 px-3">Cliente</th>
                  <th className="text-left py-3 px-3">Concepto</th>
                  <th className="text-left py-3 px-3">Método</th>
                  <th className="text-left py-3 px-3">Monto</th>
                  <th className="text-left py-3 px-3">Fecha</th>
                  <th className="text-left py-3 px-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                    <td className="py-3 px-3 font-mono text-[#D8B155] font-bold">{tx.id}</td>
                    <td className="py-3 px-3 font-medium text-white">{tx.cliente}</td>
                    <td className="py-3 px-3 text-[#D2DBD0] max-w-[200px] truncate">{tx.tipo}</td>
                    <td className="py-3 px-3 text-[#A8B2A6]">{tx.metodo}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">
                      ${tx.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                    </td>
                    <td className="py-3 px-3 text-[#A8B2A6]">{tx.fecha}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 border border-emerald-800 text-emerald-300">
                        ✓ {tx.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
