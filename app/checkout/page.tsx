'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { Lock, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const searchParams = useSearchParams();
  const isCanceled = searchParams.get('canceled') === 'true';

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    isCanceled ? 'El proceso de pago en Stripe no fue completado. Tus artículos siguen en el carrito.' : ''
  );

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
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          cartItems: cart.items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          couponCode: cart.appliedCoupon || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la sesión de pago.');
      }

      if (data.url) {
        // Redirigir a la pasarela de Stripe Checkout oficial (o éxito en modo demo)
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió la URL de pago de Stripe.');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Ocurrió un error inesperado al conectar con la pasarela de pago.');
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-editorial text-2xl font-bold text-ivory">No tienes productos en el carrito</h1>
        <p className="text-xs text-ivory-dim">Agrega libros, tableros o relojes oficiales para continuar con el pedido.</p>
        <Link href="/tienda" className="btn-champagne text-xs px-6 py-3 inline-block">
          Explorar Tienda de Ajedrez
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-stone-border pb-4">
        <h1 className="font-serif-editorial text-3xl font-bold text-ivory">Checkout & Pago Seguro</h1>
        <p className="text-xs text-ivory-dim">Ingresa tus datos de envío para finalizar la compra con Stripe.</p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/70 border border-red-800 rounded-lg text-xs text-red-300 font-medium flex items-center gap-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
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
                  placeholder="Ej. Roberto"
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
                  placeholder="Ej. Martín del Campo"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Correo Electrónico (para tu comprobante) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Teléfono (WhatsApp de contacto) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="55 1234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
            </div>
          </div>

          <div className="card-carbon p-6 space-y-4">
            <h2 className="font-serif-editorial text-lg font-bold text-ivory border-b border-stone-border pb-2">
              2. Dirección de Envío Asegurado
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="text-ivory-muted block mb-1">Calle y Número Exterior / Interior *</label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="Av. Insurgentes Sur 123, Depto 4B"
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
                  placeholder="Col. del Valle"
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
                  placeholder="03100"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory outline-none focus:border-champagne"
                />
              </div>
              <div>
                <label className="text-ivory-muted block mb-1">Ciudad / Municipio *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Benito Juárez"
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
                  placeholder="Ej. Casa blanca con portón café, entre calle 2 y 4"
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
              className="btn-champagne w-full py-3.5 text-sm shadow-gold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Conectando con Stripe Checkout...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pagar ${cart.total.toFixed(2)} MXN</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ivory-dim pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Procesado por Stripe Checkout de forma cifrada 256-bit.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-champagne text-sm">
          Cargando formulario seguro de pago...
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
