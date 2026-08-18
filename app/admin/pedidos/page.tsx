'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, RefreshCw, Search, Filter, ChevronDown, ExternalLink } from 'lucide-react';

interface Pedido {
  id: string;
  status: string;
  total: number;
  trackingNumber: string | null;
  courier: string | null;
  createdAt: string;
  items: { quantity: number; price: number; product: { name: string } }[];
  user: { name: string | null; email: string };
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Pendiente',    color: 'bg-yellow-900/50 text-yellow-300' },
  PROCESSING: { label: 'Procesando',   color: 'bg-blue-900/50 text-blue-300' },
  SHIPPED:    { label: 'Enviado',      color: 'bg-purple-900/50 text-purple-300' },
  DELIVERED:  { label: 'Entregado',    color: 'bg-emerald-900/50 text-emerald-300' },
  CANCELLED:  { label: 'Cancelado',    color: 'bg-red-900/50 text-red-300' },
};

export default function AdminPedidosPage() {
  const { data: session, status } = useSession();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ status: '', trackingNumber: '', courier: 'FedEx' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === 'authenticated') fetchPedidos();
  }, [status]);

  async function fetchPedidos() {
    setLoading(true);
    const res = await fetch('/api/admin/pedidos');
    const data = await res.json();
    setPedidos(data.orders || []);
    setLoading(false);
  }

  async function handleSave(id: string) {
    setSaving(true);
    setMsg('');
    const res = await fetch('/api/admin/pedidos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: id, ...editData }),
    });
    const data = await res.json();
    setMsg(res.ok ? '✅ Pedido actualizado.' : `❌ ${data.error}`);
    setSaving(false);
    if (res.ok) { setEditingId(null); fetchPedidos(); }
  }

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center text-[#C8AA6E]">Cargando...</div>;

  if (!['SUPERADMIN', 'ADMIN'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para administradores.</p>
      </div>
    );
  }

  const filtered = pedidos.filter(p => {
    const matchSearch = !search || p.user.email.includes(search) || (p.user.name || '').toLowerCase().includes(search.toLowerCase()) || (p.trackingNumber || '').includes(search);
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const kpis = {
    total: pedidos.length,
    pending: pedidos.filter(p => p.status === 'PENDING').length,
    shipped: pedidos.filter(p => p.status === 'SHIPPED').length,
    delivered: pedidos.filter(p => p.status === 'DELIVERED').length,
    revenue: pedidos.filter(p => p.status !== 'CANCELLED').reduce((acc, p) => acc + p.total, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#2B3E34] pb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block mb-1">Panel de Administración</span>
        <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Gestión de Pedidos</h1>
        <p className="text-sm text-[#A8B2A6] mt-1">Actualiza estados, guías de rastreo y courier de cada pedido.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Pedidos', value: kpis.total, icon: Package, color: 'text-[#C8AA6E]' },
          { label: 'Pendientes', value: kpis.pending, icon: RefreshCw, color: 'text-yellow-400' },
          { label: 'Enviados', value: kpis.shipped, icon: Truck, color: 'text-purple-400' },
          { label: 'Entregados', value: kpis.delivered, icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Ingresos', value: `$${kpis.revenue.toLocaleString('es-MX')}`, icon: Package, color: 'text-blue-400', large: true },
        ].map(({ label, value, icon: Icon, color, large }: any) => (
          <div key={label} className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-4 flex flex-col gap-1">
            <Icon className={`w-4 h-4 ${color}`} />
            <p className={`font-bold text-[#F6F3EC] ${large ? 'text-lg' : 'text-2xl'}`}>{value}</p>
            <p className="text-[10px] text-[#A8B2A6]">{label}</p>
          </div>
        ))}
      </div>

      {msg && <p className="text-sm text-[#A8B2A6] bg-[#121E17] border border-[#2B3E34] rounded-lg px-4 py-2">{msg}</p>}

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2A6]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email o guía..." 
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]">
          <option value="ALL">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-[#A8B2A6] text-sm">Cargando pedidos...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-[#A8B2A6] text-sm">No se encontraron pedidos.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6]">
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Productos</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Guía / Courier</th>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pedido, idx) => {
                  const isEditing = editingId === pedido.id;
                  const statusMeta = STATUS_LABELS[pedido.status] || { label: pedido.status, color: 'bg-gray-800 text-gray-300' };
                  return (
                    <tr key={pedido.id} className={`border-b border-[#1B3028]/60 hover:bg-[#1B3028]/30 transition ${idx % 2 === 0 ? '' : 'bg-[#0B1510]/30'}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#F6F3EC]">{pedido.user.name || 'Sin nombre'}</p>
                        <p className="text-[10px] text-[#A8B2A6]">{pedido.user.email}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        {pedido.items.map((item, i) => (
                          <span key={i} className="block text-xs text-[#D2DBD0] truncate">
                            {item.quantity}x {item.product.name}
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 font-bold text-[#C8AA6E]">
                        ${pedido.total.toLocaleString('es-MX')}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select value={editData.status} onChange={e => setEditData(p => ({...p, status: e.target.value}))}
                            className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none">
                            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                          </select>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusMeta.color}`}>{statusMeta.label}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex flex-col gap-1.5">
                            <input value={editData.trackingNumber} onChange={e => setEditData(p => ({...p, trackingNumber: e.target.value}))}
                              placeholder="Número de guía" className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none w-36" />
                            <select value={editData.courier} onChange={e => setEditData(p => ({...p, courier: e.target.value}))}
                              className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none">
                              <option>FedEx</option><option>DHL</option><option>Estafeta</option><option>UPS</option><option>Otro</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            {pedido.trackingNumber ? (
                              <>
                                <span className="text-xs font-mono text-[#D2DBD0]">{pedido.trackingNumber}</span>
                                <span className="text-[10px] text-[#A8B2A6] block">{pedido.courier}</span>
                              </>
                            ) : (
                              <span className="text-[10px] text-[#6E7D73] italic">Sin guía</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#A8B2A6]">
                        {new Date(pedido.createdAt).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-1.5">
                            <button onClick={() => handleSave(pedido.id)} disabled={saving}
                              className="px-3 py-1 rounded bg-[#C8AA6E] text-[#0B1510] text-xs font-bold hover:bg-[#D8BE85] transition disabled:opacity-60 cursor-pointer">
                              {saving ? '...' : 'Guardar'}
                            </button>
                            <button onClick={() => setEditingId(null)}
                              className="px-3 py-1 rounded bg-[#2B3E34] text-[#F6F3EC] text-xs font-bold hover:bg-[#3B5045] transition cursor-pointer">
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingId(pedido.id); setEditData({ status: pedido.status, trackingNumber: pedido.trackingNumber || '', courier: pedido.courier || 'FedEx' }); setMsg(''); }}
                            className="px-3 py-1 rounded bg-[#2B3E34] text-[#F6F3EC] text-xs font-bold hover:bg-[#3B5045] transition cursor-pointer">
                            Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
