'use client';

import React, { useState } from 'react';
import { trackOrderAction } from '@/lib/actions';
import { Search, Truck, Clock, Package, CheckCircle2, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    setLoading(true);
    setError('');
    setResult(null);

    const res = await trackOrderAction(orderNumber, email);
    if (res.success && res.order) {
      setResult(res.order);
    } else {
      setError(res.error || 'No se encontró información del pedido.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Logística & Seguimiento
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-4xl font-bold text-ivory">
          Rastrear mi Pedido
        </h1>
        <p className="text-xs text-ivory-muted leading-relaxed">
          Ingresa el número de pedido (ej. ALE-2026-000001) y el correo electrónico utilizado en la compra.
        </p>
      </div>

      <form onSubmit={handleTrack} className="card-carbon p-6 space-y-4 max-w-xl mx-auto">
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-ivory-muted block mb-1">Número de Pedido *</label>
            <input
              type="text"
              placeholder="ALE-2026-000001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory uppercase"
            />
          </div>
          <div>
            <label className="text-ivory-muted block mb-1">Correo Electrónico de la Compra *</label>
            <input
              type="email"
              placeholder="tu-correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-champagne w-full py-3 text-xs">
          {loading ? 'Consultando...' : 'Buscar Pedido'}
        </button>

        {error && <p className="text-xs text-red-400 text-center font-medium">⚠️ {error}</p>}
      </form>

      {/* Result Display */}
      {result && (
        <div className="card-carbon p-6 space-y-6 border-champagne">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-border pb-4 gap-2">
            <div>
              <span className="text-xs text-champagne font-bold block">Pedido #{result.orderNumber}</span>
              <p className="text-xs text-ivory-dim">Fecha: {new Date(result.createdAt).toLocaleDateString('es-MX')}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-xs font-bold self-start sm:self-auto">
              Estado: {result.status}
            </span>
          </div>

          {result.shipments && result.shipments.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif-editorial text-base font-bold text-ivory flex items-center gap-2">
                <Truck className="w-5 h-5 text-champagne" />
                Información de Transporte
              </h3>

              {result.shipments.map((shipment: any) => (
                <div key={shipment.id} className="p-4 bg-carbon-dark rounded border border-stone-border space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-ivory-dim block">Paquetería:</span>
                      <strong className="text-ivory">{shipment.carrier}</strong>
                    </div>
                    <div>
                      <span className="text-ivory-dim block">Número de Guía:</span>
                      <strong className="text-champagne">{shipment.trackingNumber || 'En asignación'}</strong>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-border/50">
                    <span className="font-semibold text-ivory block">Historial de Eventos:</span>
                    {shipment.events && shipment.events.length > 0 ? (
                      shipment.events.map((event: any) => (
                        <div key={event.id} className="flex gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-champagne mt-1.5 shrink-0" />
                          <div>
                            <p className="font-medium text-ivory">{event.description}</p>
                            <p className="text-[11px] text-ivory-dim">
                              {event.location} • {new Date(event.timestamp).toLocaleString('es-MX')}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-ivory-dim text-xs">Sin eventos registrados aún.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
