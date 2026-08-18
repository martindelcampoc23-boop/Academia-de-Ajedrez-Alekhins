'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Users,
  PieChart as PieIcon,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const MONTHLY_DATA = [
  { mes: 'Ene', tienda: 18500, academias: 24500, total: 43000 },
  { mes: 'Feb', tienda: 22000, academias: 28000, total: 50000 },
  { mes: 'Mar', tienda: 26400, academias: 31200, total: 57600 },
  { mes: 'Abr', tienda: 31000, academias: 35000, total: 66000 },
  { mes: 'May', tienda: 29500, academias: 38200, total: 67700 },
  { mes: 'Jun', tienda: 36000, academias: 42000, total: 78000 },
  { mes: 'Jul', tienda: 41200, academias: 46500, total: 87700 },
  { mes: 'Ago', tienda: 48000, academias: 52000, total: 100000 },
];

const CATEGORY_DATA = [
  { name: 'Membresías Academia', value: 52000, color: '#D8B155' },
  { name: 'Sets y Tableros', value: 24000, color: '#1B4D3E' },
  { name: 'Relojes DGT', value: 16000, color: '#3B82F6' },
  { name: 'Libros y Cursos', value: 8000, color: '#10B981' },
];

const RECENT_TRANSACTIONS = [
  { id: 'TX-8921', cliente: 'Roberto Gómez', tipo: 'Membresía Pro', monto: 1299, metodo: 'Stripe (Visa)', fecha: 'Hoy, 14:32', estado: 'Completado' },
  { id: 'TX-8920', cliente: 'María Fernanda Ruiz', tipo: 'Set Torneo DGT + Bolso', monto: 2450, metodo: 'PayPal', fecha: 'Hoy, 12:15', estado: 'Completado' },
  { id: 'TX-8919', cliente: 'Club Ajedrez CDMX', tipo: '10x Tableros Vinil', monto: 4990, metodo: 'SPEI', fecha: 'Ayer, 18:40', estado: 'Completado' },
  { id: 'TX-8918', cliente: 'Diego Morales', tipo: 'Plan Iniciación', monto: 699, metodo: 'Stripe (Mastercard)', fecha: 'Ayer, 16:05', estado: 'Completado' },
  { id: 'TX-8917', cliente: 'Héctor Salgado', tipo: 'Reloj DGT 2010', monto: 1850, metodo: 'OXXO Pay', fecha: '16 Ago, 11:20', estado: 'Completado' },
];

export default function AdminFinanzasPage() {
  const { data: session, status } = useSession();
  const [periodo, setPeriodo] = useState('2026');

  const role = (session?.user as any)?.role;

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando finanzas...</div>;
  }

  if (!['SUPERADMIN', 'ADMIN'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para administradores.</p>
      </div>
    );
  }

  const totalIngresos = MONTHLY_DATA.reduce((acc, curr) => acc + curr.total, 0);
  const totalTienda = MONTHLY_DATA.reduce((acc, curr) => acc + curr.tienda, 0);
  const totalAcademia = MONTHLY_DATA.reduce((acc, curr) => acc + curr.academias, 0);
  const ticketPromedio = 1420;

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
            Consolidado de ventas de la tienda, colegiaturas y suscripciones mensuales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#121E17] border border-[#2B3E34] text-xs text-[#F6F3EC] focus:outline-none focus:border-[#D8B155]"
          >
            <option value="2026">Año en curso (2026)</option>
            <option value="Q3">Tercer Trimestre (Q3)</option>
            <option value="MES">Mes Actual (Agosto)</option>
          </select>

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
          <p className="text-2xl font-serif font-bold text-white">${totalIngresos.toLocaleString('es-MX')} MXN</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs periodo anterior</span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Colegiaturas & Membresías</span>
            <Users className="w-4 h-4 text-[#D8B155]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#D8B155]">${totalAcademia.toLocaleString('es-MX')} MXN</p>
          <div className="flex items-center gap-1 text-[11px] text-[#A8B2A6]">
            <span>52.0% del ingreso consolidado</span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Ventas Tienda de Ajedrez</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-white">${totalTienda.toLocaleString('es-MX')} MXN</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+22.1% en sets y relojes</span>
          </div>
        </div>

        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span>Ticket Promedio</span>
            <CreditCard className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-serif font-bold text-white">${ticketPromedio.toLocaleString('es-MX')} MXN</p>
          <div className="flex items-center gap-1 text-[11px] text-[#A8B2A6]">
            <span>Basado en 386 transacciones</span>
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
              <p className="text-xs text-[#A8B2A6]">Comparativa de Academia vs Tienda Oficial en 2026</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#D8B155]">● Academia</span>
              <span className="flex items-center gap-1 text-[#10B981]">● Tienda</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1510', borderColor: '#2B3E34', borderRadius: '8px', fontSize: '12px', color: '#F6F3EC' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString('es-MX')} MXN`]}
                />
                <Area type="monotone" dataKey="academias" stroke="#D8B155" strokeWidth={2} fillOpacity={1} fill="url(#colorAcademias)" name="Academia" />
                <Area type="monotone" dataKey="tienda" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorTienda)" name="Tienda" />
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
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1510', borderColor: '#2B3E34', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString('es-MX')} MXN`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2B3E34] text-xs">
            {CATEGORY_DATA.map((cat, i) => (
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
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-editorial text-lg font-bold text-white">Transacciones Recientes</h2>
            <p className="text-xs text-[#A8B2A6]">Últimos pagos registrados vía Stripe, PayPal y SPEI</p>
          </div>
          <button
            onClick={() => alert('Exportando reporte contable a CSV/Excel...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B1510] border border-[#2B3E34] hover:border-[#D8B155] text-xs font-semibold text-[#D8B155] transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6]">
                <th className="text-left py-3 px-3">ID Transacción</th>
                <th className="text-left py-3 px-3">Cliente</th>
                <th className="text-left py-3 px-3">Concepto</th>
                <th className="text-left py-3 px-3">Método</th>
                <th className="text-left py-3 px-3">Monto</th>
                <th className="text-left py-3 px-3">Fecha</th>
                <th className="text-left py-3 px-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRANSACTIONS.map((tx, idx) => (
                <tr key={idx} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                  <td className="py-3 px-3 font-mono text-[#D8B155] font-bold">{tx.id}</td>
                  <td className="py-3 px-3 font-medium text-white">{tx.cliente}</td>
                  <td className="py-3 px-3 text-[#D2DBD0]">{tx.tipo}</td>
                  <td className="py-3 px-3 text-[#A8B2A6]">{tx.metodo}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">${tx.monto.toLocaleString('es-MX')} MXN</td>
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
        </div>
      </div>
    </div>
  );
}
