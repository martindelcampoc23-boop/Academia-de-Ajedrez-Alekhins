'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Package, Truck, CheckCircle2, RefreshCw, Search, Clock, AlertCircle } from 'lucide-react';

interface PedidoItem {
  id: string;
  productName: string;
  variantName?: string | null;
  sku?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Pedido {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  shippingAddress: string;
  couponCode?: string | null;
  createdAt: string;
  user: { name: string | null; email: string } | null;
  guestEmail: string | null;
  trackingNumber: string | null;
  courier: string | null;
  items: PedidoItem[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:            { label: 'Pendiente',         color: 'bg-yellow-900/50 text-yellow-300 border-yellow-800' },
  PAID:               { label: 'Pagado',            color: 'bg-blue-900/50 text-blue-300 border-blue-800' },
  PREPARING:          { label: 'En Preparación',    color: 'bg-indigo-900/50 text-indigo-300 border-indigo-800' },
  READY_FOR_SHIPMENT: { label: 'Listo para Envío',  color: 'bg-cyan-900/50 text-cyan-300 border-cyan-800' },
  SHIPPED:            { label: 'Enviado',           color: 'bg-purple-900/50 text-purple-300 border-purple-800' },
  DELIVERED:          { label: 'Entregado',         color: 'bg-emerald-900/50 text-emerald-300 border-emerald-800' },
  CANCELLED:          { label: 'Cancelado',         color: 'bg-red-900/50 text-red-300 border-red-800' },
  REFUNDED:           { label: 'Reembolsado',       color: 'bg-orange-900/50 text-orange-300 border-orange-800' },
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
    if (status === 'authenticated') {
      fetchPedidos();
    }
  }, [status]);

  async function fetchPedidos() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pedidos');
      const data = await res.json();
      setPedidos(data.orders || []);
    } catch (err) {
      console.error('Error fetching pedidos:', err);
      setMsg('❌ Error al cargar pedidos del servidor.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(id: string) {
    setSaving(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/pedidos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: id, ...editData }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('✅ Pedido actualizado exitosamente.');
        setEditingId(null);
        fetchPedidos();
      } else {
        setMsg(`❌ ${data.error || 'Error al actualizar el pedido.'}`);
      }
    } catch (err) {
      setMsg('❌ Error de conexión al guardar el pedido.');
    } finally {
      setSaving(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[#C8AA6E] font-medium">
        Cargando gestión de pedidos...
      </div>
    );
  }

  if (!['SUPERADMIN', 'ADMIN', 'OPERACIONES'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-serif font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para el equipo administrativo.</p>
      </div>
    );
  }

  const filtered = pedidos.filter((p) => {
    const userEmail = p.user?.email || p.guestEmail || '';
    const userName = p.user?.name || '';
    const orderNum = p.orderNumber || '';
    const tracking = p.trackingNumber || '';

    const query = search.trim().toLowerCase();
    const matchSearch =
      !query ||
      userEmail.toLowerCase().includes(query) ||
      userName.toLowerCase().includes(query) ||
      orderNum.toLowerCase().includes(query) ||
      tracking.toLowerCase().includes(query);

    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const kpis = {
    total: pedidos.length,
    pending: pedidos.filter((p) => p.status === 'PENDING' || p.status === 'PAID' || p.status === 'PREPARING').length,
    shipped: pedidos.filter((p) => p.status === 'SHIPPED').length,
    delivered: pedidos.filter((p) => p.status === 'DELIVERED').length,
    revenue: pedidos
      .filter((p) => p.status !== 'CANCELLED' && p.status !== 'REFUNDED')
      .reduce((acc, p) => acc + (p.totalAmount || 0), 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#2B3E34] pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block mb-1">
            Panel de Administración
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Gestión de Pedidos &amp; Logística</h1>
          <p className="text-sm text-[#A8B2A6] mt-1">
            Seguimiento de compras, asignación de guías de envío y actualización de estados.
          </p>
        </div>
        <button
          onClick={fetchPedidos}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B4D3E]/30 border border-[#C8AA6E]/40 text-[#C8AA6E] hover:bg-[#1B4D3E]/50 text-xs font-semibold transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Pedidos', value: kpis.total, icon: Package, color: 'text-[#C8AA6E]' },
          { label: 'En Proceso', value: kpis.pending, icon: Clock, color: 'text-yellow-400' },
          { label: 'Enviados', value: kpis.shipped, icon: Truck, color: 'text-purple-400' },
          { label: 'Entregados', value: kpis.delivered, icon: CheckCircle2, color: 'text-emerald-400' },
          {
            label: 'Ingresos Totales',
            value: `$${kpis.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: Package,
            color: 'text-[#C8AA6E]',
            large: true,
          },
        ].map(({ label, value, icon: Icon, color, large }: any) => (
          <div key={label} className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-4 flex flex-col gap-1 shadow-sm">
            <Icon className={`w-4 h-4 ${color}`} />
            <p className={`font-bold text-[#F6F3EC] ${large ? 'text-base' : 'text-2xl'}`}>{value}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#A8B2A6]">{label}</p>
          </div>
        ))}
      </div>

      {msg && (
        <div className="text-xs text-[#F6F3EC] bg-[#121E17] border border-[#2B3E34] rounded-lg px-4 py-3 flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg('')} className="text-[#A8B2A6] hover:text-[#F6F3EC] text-xs">✕</button>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2A6]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por orden (ALE-2026-...), cliente, email o guía..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]"
        >
          <option value="ALL">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-[#A8B2A6] text-sm flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C8AA6E]" />
            <span>Cargando pedidos...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-[#A8B2A6] text-sm space-y-1">
            <p className="font-semibold text-[#F6F3EC]">No se encontraron pedidos</p>
            <p className="text-xs text-[#6E7D73]">Aún no hay compras registradas con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]/50">
                  <th className="text-left px-4 py-3">Orden / Cliente</th>
                  <th className="text-left px-4 py-3">Productos</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Guía / Paquetería</th>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B3E34]/40">
                {filtered.map((pedido) => {
                  const isEditing = editingId === pedido.id;
                  const statusMeta = STATUS_LABELS[pedido.status] || {
                    label: pedido.status,
                    color: 'bg-gray-800 text-gray-300 border-gray-700',
                  };
                  const clientName = pedido.user?.name || 'Cliente Invitado';
                  const clientEmail = pedido.user?.email || pedido.guestEmail || 'Sin correo';

                  return (
                    <tr
                      key={pedido.id}
                      className="hover:bg-[#1B3028]/20 transition"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-[#C8AA6E] font-bold block">
                          {pedido.orderNumber || 'ALE-ORDEN'}
                        </span>
                        <p className="font-medium text-[#F6F3EC] text-xs mt-0.5">{clientName}</p>
                        <p className="text-[11px] text-[#A8B2A6]">{clientEmail}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[220px]">
                        <div className="space-y-1">
                          {pedido.items && pedido.items.length > 0 ? (
                            pedido.items.map((item, i) => (
                              <div key={i} className="text-xs text-[#D2DBD0] truncate">
                                <span className="text-[#C8AA6E] font-semibold">{item.quantity}x</span>{' '}
                                {item.productName || 'Producto'}
                                {item.variantName ? ` (${item.variantName})` : ''}
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-[#6E7D73] italic">Sin artículos desglosados</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#C8AA6E] text-xs whitespace-nowrap">
                        ${(pedido.totalAmount || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={editData.status}
                            onChange={(e) => setEditData((prev) => ({ ...prev, status: e.target.value }))}
                            className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none"
                          >
                            {Object.entries(STATUS_LABELS).map(([k, v]) => (
                              <option key={k} value={k}>{v.label}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusMeta.color}`}>
                            {statusMeta.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex flex-col gap-1.5">
                            <input
                              value={editData.trackingNumber}
                              onChange={(e) => setEditData((prev) => ({ ...prev, trackingNumber: e.target.value }))}
                              placeholder="Número de guía"
                              className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none w-36"
                            />
                            <select
                              value={editData.courier}
                              onChange={(e) => setEditData((prev) => ({ ...prev, courier: e.target.value }))}
                              className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none"
                            >
                              <option value="FedEx">FedEx</option>
                              <option value="DHL">DHL</option>
                              <option value="Estafeta">Estafeta</option>
                              <option value="UPS">UPS</option>
                              <option value="RedPack">RedPack</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            {pedido.trackingNumber ? (
                              <>
                                <span className="text-xs font-mono text-[#D2DBD0] block font-medium">
                                  {pedido.trackingNumber}
                                </span>
                                <span className="text-[10px] text-[#A8B2A6] block">{pedido.courier || 'Paquetería'}</span>
                              </>
                            ) : (
                              <span className="text-[11px] text-[#6E7D73] italic">Sin guía asignada</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#A8B2A6] whitespace-nowrap">
                        {new Date(pedido.createdAt).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleSave(pedido.id)}
                              disabled={saving}
                              className="px-3 py-1 rounded bg-[#C8AA6E] text-[#0B1510] text-xs font-bold hover:bg-[#D8BE85] transition disabled:opacity-60 cursor-pointer"
                            >
                              {saving ? '...' : 'Guardar'}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 rounded bg-[#2B3E34] text-[#F6F3EC] text-xs font-bold hover:bg-[#3B5045] transition cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(pedido.id);
                              setEditData({
                                status: pedido.status,
                                trackingNumber: pedido.trackingNumber || '',
                                courier: pedido.courier || 'FedEx',
                              });
                              setMsg('');
                            }}
                            className="px-3 py-1 rounded bg-[#2B3E34] text-[#F6F3EC] text-xs font-bold hover:bg-[#3B5045] transition cursor-pointer"
                          >
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
