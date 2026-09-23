'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Users,
  RefreshCw,
  Plus,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  FileSpreadsheet,
  Wallet,
  Receipt,
  Scale,
  PieChart as PieIcon,
  Tag,
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
  BarChart,
  Bar,
  Legend,
} from 'recharts';

interface FinanceKPIs {
  totalIngresos: number;
  totalEgresos: number;
  balanceNeto: number;
  margenOperativo: number;
  totalTienda: number;
  totalAcademia: number;
  totalManualIngresos: number;
  totalManualEgresos: number;
  ticketPromedio: number;
  ordersCount: number;
}

interface MonthlyDataItem {
  mes: string;
  tienda: number;
  academias: number;
  manualIngresos: number;
  egresos: number;
  totalIngresos: number;
  balance: number;
}

interface CategoryDataItem {
  name: string;
  value: number;
  color: string;
}

interface ManualEntry {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  concept: string;
  amount: number;
  date: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
}

interface TransactionItem {
  id: string;
  tipoMovimiento: string;
  origen: string;
  cliente: string;
  tipo: string;
  metodo: string;
  monto: number;
  fecha: string;
  estado: string;
}

const CATEGORIAS_INGRESOS = [
  'Venta Tienda / Mostrador',
  'Colegiatura / Membresía Academia',
  'Clase Privada Magistral',
  'Inscripción a Torneo / Simultánea',
  'Patrocinio / Donación',
  'Convenio Institucional / Escolar',
  'Otros Ingresos',
];

const CATEGORIAS_EGRESOS = [
  'Material Ajedrez (Inventario Sets / Tableros)',
  'Relojes DGT & Accesorios',
  'Honorarios Maestros / Ponentes',
  'Envíos & Logística Paquetería',
  'Publicidad & Marketing (Meta / Google)',
  'Software, Plataforma & Hosting',
  'Comisiones Bancarias / Stripe',
  'Alquiler de Sala / Eventos',
  'Otros Gastos Operativos',
];

const METODOS_PAGO = [
  'Transferencia / SPEI',
  'Efectivo',
  'Stripe / Tarjeta',
  'Terminal Bancaria',
  'Depósito en OXXO',
  'Otro',
];

export default function AdminFinanzasPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<FinanceKPIs>({
    totalIngresos: 0,
    totalEgresos: 0,
    balanceNeto: 0,
    margenOperativo: 0,
    totalTienda: 0,
    totalAcademia: 0,
    totalManualIngresos: 0,
    totalManualEgresos: 0,
    ticketPromedio: 0,
    ordersCount: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyDataItem[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState<CategoryDataItem[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([]);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);

  // Filtros & Tabs
  const [activeTab, setActiveTab] = useState<'todos' | 'manuales' | 'tienda'>('todos');
  const [filtroTipo, setFiltroTipo] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [busqueda, setBusqueda] = useState('');

  // Modal para nuevo movimiento
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [formType, setFormType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [formCategory, setFormCategory] = useState(CATEGORIAS_INGRESOS[0]);
  const [formConcept, setFormConcept] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formMethod, setFormMethod] = useState(METODOS_PAGO[0]);
  const [formNotes, setFormNotes] = useState('');

  // Estado para eliminar
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        if (data.expenseCategoryData) setExpenseCategoryData(data.expenseCategoryData);
        if (data.recentTransactions) setRecentTransactions(data.recentTransactions);
        if (data.manualEntries) setManualEntries(data.manualEntries);
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

  // Cambiar categoría automática al cambiar tipo
  const handleTypeChange = (newType: 'INCOME' | 'EXPENSE') => {
    setFormType(newType);
    setFormCategory(newType === 'INCOME' ? CATEGORIAS_INGRESOS[0] : CATEGORIAS_EGRESOS[0]);
  };

  // Enviar nuevo movimiento
  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formConcept.trim()) {
      setFormError('Por favor ingresa un concepto o descripción.');
      return;
    }

    const numAmount = parseFloat(formAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setFormError('Por favor ingresa un monto válido mayor a 0.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/finanzas/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formType,
          category: formCategory,
          concept: formConcept.trim(),
          amount: numAmount,
          date: formDate ? new Date(formDate).toISOString() : new Date().toISOString(),
          paymentMethod: formMethod,
          notes: formNotes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar el movimiento.');
      }

      setFormSuccess(formType === 'INCOME' ? '✅ Ingreso registrado exitosamente.' : '✅ Egreso registrado exitosamente.');
      setFormConcept('');
      setFormAmount('');
      setFormNotes('');
      fetchFinanceData();

      setTimeout(() => {
        setShowModal(false);
        setFormSuccess('');
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || 'Error de conexión.');
    } finally {
      setSubmitting(false);
    }
  };

  // Eliminar movimiento manual
  const handleDeleteEntry = async (id: string, concept: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar este registro?\n"${concept}"`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/finanzas/entries?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al eliminar registro.');
        return;
      }

      fetchFinanceData();
    } catch (err) {
      console.error('Error al eliminar movimiento:', err);
      alert('Error al conectar con el servidor.');
    } finally {
      setDeletingId(null);
    }
  };

  // Exportar CSV Consolidado
  const handleExportCSV = () => {
    const rows: string[][] = [];
    const headers = ['Tipo', 'Origen / ID', 'Concepto', 'Categoría', 'Método de Pago', 'Monto (MXN)', 'Fecha'];

    // 1. Agregar órdenes de tienda
    recentTransactions.forEach((tx) => {
      rows.push([
        'INGRESO',
        `"${tx.id}"`,
        `"${tx.tipo.replace(/"/g, '""')}"`,
        'Venta Tienda Online',
        `"${tx.metodo.replace(/"/g, '""')}"`,
        tx.monto.toString(),
        `"${tx.fecha}"`,
      ]);
    });

    // 2. Agregar movimientos manuales
    manualEntries.forEach((entry) => {
      rows.push([
        entry.type === 'INCOME' ? 'INGRESO' : 'EGRESO',
        `"MANUAL-${entry.id.slice(0, 6).toUpperCase()}"`,
        `"${entry.concept.replace(/"/g, '""')}"`,
        `"${entry.category.replace(/"/g, '""')}"`,
        `"${entry.paymentMethod}"`,
        (entry.type === 'EXPENSE' ? -entry.amount : entry.amount).toString(),
        `"${new Date(entry.date).toLocaleDateString('es-MX')}"`,
      ]);
    });

    if (rows.length === 0) {
      alert('No hay movimientos disponibles para exportar.');
      return;
    }

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte-financiero-alekhins-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formato de moneda
  const formatMXN = (val: number) => {
    return `$${Number(val || 0).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} MXN`;
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando finanzas...</div>;
  }

  if (!['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para administradores de Academia Alekhins.</p>
      </div>
    );
  }

  // Filtrado de movimientos manuales
  const filteredManualEntries = manualEntries.filter((item) => {
    if (filtroTipo !== 'ALL' && item.type !== filtroTipo) return false;
    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      return (
        item.concept.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.paymentMethod.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2B3E34] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Sistema de Gestión Contable & Flujo de Caja
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-[#F6F3EC]">
            Panel Financiero & Control de Ingresos / Egresos
          </h1>
          <p className="text-xs text-[#A8B2A6] mt-1">
            Consolidado integral de cobros automáticos (Stripe / Tienda / Academia) y registro manual de gastos e ingresos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              handleTypeChange('INCOME');
              setShowModal(true);
            }}
            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Movimiento</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155] text-xs font-semibold text-[#D8B155] transition flex items-center gap-1.5 cursor-pointer"
            title="Descargar libro contable en CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>

          <button
            onClick={fetchFinanceData}
            className="p-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#D8B155] hover:border-[#D8B155] transition flex items-center justify-center cursor-pointer"
            title="Recargar datos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/admin"
            className="px-3.5 py-2.5 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/30 text-xs font-bold transition"
          >
            ← Admin
          </Link>
        </div>
      </div>

      {/* KPI Cards: Flujo de Caja & Rentabilidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Ingresos */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Ingresos Brutos</span>
            <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-white">{formatMXN(kpis.totalIngresos)}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Tienda (${Math.round(kpis.totalTienda).toLocaleString()}) + Academia (${Math.round(kpis.totalAcademia + kpis.totalManualIngresos).toLocaleString()})</span>
          </div>
        </div>

        {/* Total Egresos */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Gastos & Egresos</span>
            <div className="w-7 h-7 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-red-400">{formatMXN(kpis.totalEgresos)}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-red-400 font-semibold pt-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>{kpis.totalManualEgresos > 0 ? `${manualEntries.filter((e) => e.type === 'EXPENSE').length} egresos registrados` : 'Sin gastos manuales cargados'}</span>
          </div>
        </div>

        {/* Balance Neto / Ganancia Real */}
        <div
          className={`border rounded-xl p-5 space-y-2 relative overflow-hidden ${
            kpis.balanceNeto >= 0
              ? 'bg-[#121E17] border-emerald-800/60 shadow-lg shadow-emerald-950/20'
              : 'bg-[#121E17] border-red-800/60 shadow-lg shadow-red-950/20'
          }`}
        >
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Balance Neto (Flujo)</span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                kpis.balanceNeto >= 0
                  ? 'bg-emerald-900/60 border border-emerald-600 text-emerald-300'
                  : 'bg-red-900/60 border border-red-600 text-red-300'
              }`}
            >
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <p
            className={`text-2xl font-serif font-bold ${
              kpis.balanceNeto >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {formatMXN(kpis.balanceNeto)}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-[#A8B2A6]">Margen operativo:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                kpis.margenOperativo >= 0
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                  : 'bg-red-950 text-red-300 border border-red-700/50'
              }`}
            >
              {kpis.margenOperativo}%
            </span>
          </div>
        </div>

        {/* Ticket Promedio & Métricas */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#A8B2A6] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Ticket Promedio Tienda</span>
            <div className="w-7 h-7 rounded-full bg-[#1B4D3E]/80 border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155]">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-[#D8B155]">{formatMXN(kpis.ticketPromedio)}</p>
          <div className="flex items-center justify-between text-[11px] text-[#A8B2A6] pt-1">
            <span>{kpis.ordersCount} pedidos completados</span>
            <span className="text-[#D8B155] font-semibold">{manualEntries.length} mov. manuales</span>
          </div>
        </div>
      </div>

      {/* Gráficas: Ingresos vs Egresos + Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfica de Barras / Áreas Comparativa */}
        <div className="lg:col-span-2 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif-editorial text-lg font-bold text-white">Evolución Financiera Mensual (2026)</h2>
              <p className="text-xs text-[#A8B2A6]">Comparación de Ingresos Totales vs Gastos y Balance Neto</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">● Ingresos</span>
              <span className="flex items-center gap-1 text-red-400 font-semibold">● Egresos</span>
              <span className="flex items-center gap-1 text-[#D8B155] font-semibold">● Balance</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <Bar dataKey="totalIngresos" name="Ingresos" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="egresos" name="Egresos" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="balance" name="Balance Neto" fill="#D8B155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Desglose por Línea de Negocio */}
        <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-serif-editorial text-lg font-bold text-white">Líneas de Ingreso</h2>
            <p className="text-xs text-[#A8B2A6]">Origen y distribución de ingresos</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            {categoryData.some((c) => c.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter((c) => c.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
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
              <p className="text-xs text-[#A8B2A6] text-center">Sin transacciones registradas</p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2B3E34] text-xs max-h-44 overflow-y-auto">
            {categoryData
              .filter((cat) => cat.value > 0)
              .map((cat, i) => (
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

      {/* Tabs & Tabla de Gestión Contable */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden p-6 space-y-6 shadow-xl">
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2B3E34] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-[#1B4D3E] text-[#D8B155] border border-[#D8B155]/40'
                  : 'text-[#A8B2A6] hover:text-white hover:bg-[#1C3328]'
              }`}
            >
              Libro Diario (Todos)
            </button>
            <button
              onClick={() => setActiveTab('manuales')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'manuales'
                  ? 'bg-[#1B4D3E] text-[#D8B155] border border-[#D8B155]/40'
                  : 'text-[#A8B2A6] hover:text-white hover:bg-[#1C3328]'
              }`}
            >
              <span>Ingresos & Egresos Manuales</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#0B1510] text-[#D8B155] font-mono">
                {manualEntries.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('tienda')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'tienda'
                  ? 'bg-[#1B4D3E] text-[#D8B155] border border-[#D8B155]/40'
                  : 'text-[#A8B2A6] hover:text-white hover:bg-[#1C3328]'
              }`}
            >
              Ventas Tienda (Stripe)
            </button>
          </div>

          {/* Filtros rápidos */}
          <div className="flex items-center gap-2">
            {activeTab === 'manuales' && (
              <div className="flex items-center gap-1 bg-[#0B1510] border border-[#2B3E34] rounded-lg p-1">
                <button
                  onClick={() => setFiltroTipo('ALL')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                    filtroTipo === 'ALL' ? 'bg-[#1B4D3E] text-white' : 'text-[#A8B2A6]'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroTipo('INCOME')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                    filtroTipo === 'INCOME' ? 'bg-emerald-900 text-emerald-200' : 'text-[#A8B2A6]'
                  }`}
                >
                  + Ingresos
                </button>
                <button
                  onClick={() => setFiltroTipo('EXPENSE')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                    filtroTipo === 'EXPENSE' ? 'bg-red-900 text-red-200' : 'text-[#A8B2A6]'
                  }`}
                >
                  - Egresos
                </button>
              </div>
            )}

            <input
              type="text"
              placeholder="Buscar por concepto o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white placeholder-[#A8B2A6] focus:border-[#D8B155] focus:outline-none w-56"
            />
          </div>
        </div>

        {/* TAB 1: LIBRO DIARIO CONSOLIDADO */}
        {activeTab === 'todos' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]/50">
                  <th className="text-left py-3 px-3">Tipo</th>
                  <th className="text-left py-3 px-3">Folio / Referencia</th>
                  <th className="text-left py-3 px-3">Concepto / Detalle</th>
                  <th className="text-left py-3 px-3">Canal / Método</th>
                  <th className="text-right py-3 px-3">Monto</th>
                  <th className="text-left py-3 px-3">Fecha</th>
                  <th className="text-left py-3 px-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {/* Listar tanto órdenes de tienda como manuales ordenados */}
                {recentTransactions.map((tx, idx) => (
                  <tr key={`tx-${idx}`} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        + INGRESO
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#D8B155] font-bold">{tx.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-white">{tx.cliente}</div>
                      <div className="text-[#A8B2A6] text-[11px] truncate max-w-xs">{tx.tipo}</div>
                    </td>
                    <td className="py-3 px-3 text-[#D2DBD0]">{tx.metodo}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">
                      +${tx.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-[#A8B2A6]">{tx.fecha}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/70 border border-emerald-800 text-emerald-300">
                        ✓ {tx.estado}
                      </span>
                    </td>
                  </tr>
                ))}

                {manualEntries.map((entry) => (
                  <tr key={`entry-${entry.id}`} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                    <td className="py-3 px-3">
                      {entry.type === 'INCOME' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          + INGRESO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                          - EGRESO
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-[#A8B2A6] font-semibold">
                      MAN-{entry.id.slice(0, 6).toUpperCase()}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-white">{entry.concept}</div>
                      <div className="text-[#D8B155] text-[10px] uppercase font-bold">{entry.category}</div>
                    </td>
                    <td className="py-3 px-3 text-[#D2DBD0]">{entry.paymentMethod}</td>
                    <td
                      className={`py-3 px-3 text-right font-bold ${
                        entry.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {entry.type === 'INCOME' ? '+' : '-'}$
                      {entry.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-[#A8B2A6]">
                      {new Date(entry.date).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-800 text-[#D2DBD0] border border-stone-700">
                        Manual
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: GESTIÓN DE INGRESOS Y EGRESOS MANUALES (CRUD COMPLETO) */}
        {activeTab === 'manuales' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#0B1510] p-3 rounded-lg border border-[#2B3E34]">
              <span className="text-xs text-[#A8B2A6]">
                Mostrando <strong className="text-white">{filteredManualEntries.length}</strong> movimientos registrados manualmente.
              </span>
              <button
                onClick={() => {
                  handleTypeChange('INCOME');
                  setShowModal(true);
                }}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Nuevo</span>
              </button>
            </div>

            {filteredManualEntries.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-[#0B1510]/30 rounded-xl border border-dashed border-[#2B3E34]">
                <Receipt className="w-8 h-8 text-[#A8B2A6] mx-auto opacity-50" />
                <p className="text-sm font-semibold text-white">No hay movimientos manuales registrados</p>
                <p className="text-xs text-[#A8B2A6] max-w-md mx-auto">
                  Registra gastos operativos (inventario, relojes DGT, honorarios, paquetería) o ingresos fuera de la pasarela online para mantener el balance real de la academia.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Primer Movimiento</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]">
                      <th className="text-left py-3 px-3">Tipo</th>
                      <th className="text-left py-3 px-3">Concepto & Notas</th>
                      <th className="text-left py-3 px-3">Categoría</th>
                      <th className="text-left py-3 px-3">Método</th>
                      <th className="text-right py-3 px-3">Monto (MXN)</th>
                      <th className="text-left py-3 px-3">Fecha</th>
                      <th className="text-center py-3 px-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredManualEntries.map((item) => (
                      <tr key={item.id} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                        <td className="py-3 px-3">
                          {item.type === 'INCOME' ? (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              + INGRESO
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                              - EGRESO
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{item.concept}</div>
                          {item.notes && <div className="text-[11px] text-[#A8B2A6] italic">{item.notes}</div>}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0B1510] text-[#D8B155] border border-[#2B3E34]">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#D2DBD0]">{item.paymentMethod}</td>
                        <td
                          className={`py-3 px-3 text-right font-bold font-mono text-sm ${
                            item.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {item.type === 'INCOME' ? '+' : '-'}${item.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-[#A8B2A6]">
                          {new Date(item.date).toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleDeleteEntry(item.id, item.concept)}
                            disabled={deletingId === item.id}
                            className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition cursor-pointer"
                            title="Borrar movimiento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VENTAS TIENDA Y CHECKOUT STRIPE */}
        {activeTab === 'tienda' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]">
                  <th className="text-left py-3 px-3">Pedido Stripe</th>
                  <th className="text-left py-3 px-3">Cliente</th>
                  <th className="text-left py-3 px-3">Productos / Concepto</th>
                  <th className="text-left py-3 px-3">Método</th>
                  <th className="text-right py-3 px-3">Monto</th>
                  <th className="text-left py-3 px-3">Fecha</th>
                  <th className="text-left py-3 px-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition">
                    <td className="py-3 px-3 font-mono text-[#D8B155] font-bold">{tx.id}</td>
                    <td className="py-3 px-3 font-medium text-white">{tx.cliente}</td>
                    <td className="py-3 px-3 text-[#D2DBD0] max-w-xs truncate">{tx.tipo}</td>
                    <td className="py-3 px-3 text-[#A8B2A6]">{tx.metodo}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">
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
          </div>
        )}
      </div>

      {/* MODAL REGISTRAR MOVIMIENTO (INGRESO / EGRESO) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#2B3E34] pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#D8B155] block">
                  Contabilidad Alekhins
                </span>
                <h3 className="font-serif-editorial text-xl font-bold text-white">
                  Registrar Movimiento Financiero
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-[#A8B2A6] hover:text-white hover:bg-[#1C3328] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateEntry} className="space-y-4">
              {/* Selector de Tipo: Ingreso vs Egreso */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTypeChange('INCOME')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                    formType === 'INCOME'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50'
                      : 'bg-[#0B1510] border-[#2B3E34] text-[#A8B2A6] hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>+ Ingreso (Entrada)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('EXPENSE')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                    formType === 'EXPENSE'
                      ? 'bg-red-950 border-red-500 text-red-300 shadow-md shadow-red-950/50'
                      : 'bg-[#0B1510] border-[#2B3E34] text-[#A8B2A6] hover:text-white'
                  }`}
                >
                  <TrendingDown className="w-4 h-4" />
                  <span>- Egreso (Gasto)</span>
                </button>
              </div>

              {/* Concepto */}
              <div>
                <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">
                  Concepto o Descripción *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    formType === 'INCOME'
                      ? 'Ej. Colegiatura alumno particular, venta mostrador set DGT...'
                      : 'Ej. Compra lote 10 tableros de madera, Honorarios maestro...'
                  }
                  value={formConcept}
                  onChange={(e) => setFormConcept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white placeholder-[#A8B2A6] focus:border-[#D8B155] focus:outline-none"
                />
              </div>

              {/* Monto y Categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">
                    Monto (MXN) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-[#A8B2A6] font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      className="w-full pl-7 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white placeholder-[#A8B2A6] focus:border-[#D8B155] focus:outline-none font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">Categoría</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white focus:border-[#D8B155] focus:outline-none cursor-pointer"
                  >
                    {(formType === 'INCOME' ? CATEGORIAS_INGRESOS : CATEGORIAS_EGRESOS).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Método de Pago y Fecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">Método de Pago</label>
                  <select
                    value={formMethod}
                    onChange={(e) => setFormMethod(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white focus:border-[#D8B155] focus:outline-none cursor-pointer"
                  >
                    {METODOS_PAGO.map((met) => (
                      <option key={met} value={met}>
                        {met}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white focus:border-[#D8B155] focus:outline-none"
                  />
                </div>
              </div>

              {/* Notas opcionales */}
              <div>
                <label className="block text-xs font-semibold text-[#D2DBD0] mb-1">
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Número de factura, comprobante bancario, proveedor o comentarios..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs text-white placeholder-[#A8B2A6] focus:border-[#D8B155] focus:outline-none"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2B3E34]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#A8B2A6] hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer ${
                    formType === 'INCOME'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {submitting ? 'Guardando...' : formType === 'INCOME' ? 'Guardar Ingreso' : 'Guardar Egreso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
