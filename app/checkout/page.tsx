'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { createOrderAction } from '@/lib/actions';
import { Lock, ShieldCheck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [completedOrder, setCompletedOrder] = useState<{ orderNumber: string; totalAmount: number } | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    neighborhood: '',
    city: '',
    state: 'Ciudad de México',
    postalCode: '',
    country: 'México',
    references: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const result = await createOrderAction({
        customer: formData,
        cartItems: cart.items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        couponCode: cart.appliedCoupon || undefined,
      });

      if (result.success && result.orderNumber) {
        clearCart();
        setCompletedOrder({
          orderNumber: result.orderNumber,
          totalAmount: result.totalAmount || cart.total,
        });
      } else {
        setErrorMsg(result.error || 'Error al procesar la compra.');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          ¡Gracias por tu compra!
        </span>

        <h1 className="font-serif-editorial text-3xl md:text-4xl font-bold text-ivory">
          Pedido Confirmado #{completedOrder.orderNumber}
        </h1>

        <p className="text-sm text-ivory-muted max-w-xl mx-auto leading-relaxed">
          Hemos recibido tu pago de <strong className="text-champagne">${completedOrder.totalAmount.toFixed(2)} MXN</strong> correctamente. Te enviamos un correo electrónico de confirmación con los detalles de tu guía de rastreo.
        </p>

        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <Link href={`/rastrear-pedido`} className="btn-champagne text-xs px-6 py-3">
            Rastrear Estado de Envío
          </Link>
          <Link href="/tienda" className="btn-outline-gold text-xs px-6 py-3">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-editorial text-2xl font-bold text-ivory">No tienes productos en el carrito</h1>
        <Link href="/tienda" className="btn-champagne text-xs px-6 py-3">
          Explorar Tienda de Ajedrez
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-stone-border pb-4">
        <h1 className="font-serif-editorial text-3xl font-bold text-ivory">Checkout & Pago Seguro</h1>
        <p className="text-xs text-ivory-dim">Ingresa tus datos de envío para finalizar la compra.</p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/60 border border-red-800 rounded text-xs text-red-300 font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Shipping Form Left */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card-carbon p-6 space-y-4">
            <h2 className="font-serif-editorial text-lg font-bold text-ivory border-b border-stone-border pb-2">
              1. Datos de Contacto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-ivory-muted block mb-1">Nombre(s) *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Apellido(s) *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Teléfono (WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
            </div>
          </div>

          <div className="card-carbon p-6 space-y-4">
            <h2 className="font-serif-editorial text-lg font-bold text-ivory border-b border-stone-border pb-2">
              2. Dirección de Envío
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="text-ivory-muted block mb-1">Calle y Número *</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Colonia *</label>
                <input
                  type="text"
                  name="neighborhood"
                  required
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Código Postal *</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Ciudad *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Estado *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-ivory-muted block mb-1">Referencias de entrega (opcional)</label>
                <input
                  type="text"
                  name="references"
                  placeholder="Ej. Entre calle A y B, fachada color crema"
                  value={formData.references}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Right */}
        <div className="lg:col-span-5">
          <div className="card-carbon p-6 space-y-4 border-champagne shadow-gold sticky top-28">
            <h2 className="font-serif-editorial text-lg font-bold text-ivory border-b border-stone-border pb-2">
              Resumen de Compra
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div key={item.variantId} className="flex justify-between text-xs text-ivory-muted">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-bold text-ivory">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-stone-border">
              <div className="flex justify-between text-ivory-muted">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)} MXN</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento ({cart.appliedCoupon})</span>
                  <span>-${cart.discount.toFixed(2)} MXN</span>
                </div>
              )}
              <div className="flex justify-between text-ivory-muted">
                <span>Envío</span>
                <span>{cart.shipping === 0 ? '¡GRATIS!' : `$${cart.shipping.toFixed(2)} MXN`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-ivory pt-3 border-t border-stone-border">
                <span>Total Final</span>
                <span className="text-champagne">${cart.total.toFixed(2)} MXN</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-champagne w-full py-3.5 text-sm shadow-gold disabled:opacity-50"
            >
              {loading ? 'Procesando Pago Seguro...' : `Pagar $${cart.total.toFixed(2)} MXN`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ivory-dim pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Procesado por Stripe Checkout de forma cifrada.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
