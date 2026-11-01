'use client';

import React, { useState, Suspense } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Truck,
  AlertCircle,
  PackageCheck,
  Sparkles,
  ArrowLeft,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CheckoutForm() {
  const { cart } = useCart();
  const searchParams = useSearchParams();
  const isCanceled = searchParams.get('canceled') === 'true';

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    isCanceled ? 'El proceso de pago en Stripe no fue completado. Tus artículos siguen guardados en el carrito.' : ''
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
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió la URL de pago de Stripe.');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Ocurrió un error inesperado al conectar con la pasarela de pago.');
      setLoading(false);
    }
  };

  // Cálculos de Envío Gratis (umbral $1500)
  const FREE_SHIPPING_THRESHOLD = 1500;
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal);
  const freeShippingProgressPct = Math.min(100, Math.round((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const hasFreeShipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD;

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#172B46] border border-[#233F65] flex items-center justify-center mx-auto text-[#C5A46D]">
          <Truck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
            Tu carrito de compra está vacío
          </h1>
          <p className="text-xs sm:text-sm text-[#C4CBD4] max-w-md mx-auto">
            Explora nuestro catálogo de tableros homologados, relojes digitales FIDE, juegos Staunton y bibliografía del Maestro Roberto Martín del Campo.
          </p>
        </div>
        <Link href="/tienda" className="btn-dorado text-xs uppercase font-bold py-3 px-6 shadow-lg inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Ir a la Tienda de Ajedrez
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Header */}
      <div className="border-b border-[#233F65] pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A46D] block mb-1">
            Transacción Cifrada 256-Bit
          </span>
          <h1 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Finalizar Compra Segura
          </h1>
          <p className="text-xs text-[#C4CBD4] mt-1">
            Ingresa tus datos de envío asegurado para procesar tu pedido oficial de Academia Alekhins.
          </p>
        </div>
        <Link
          href="/tienda"
          className="text-xs text-[#C5A46D] hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Seguir comprando
        </Link>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-950/70 border border-red-700 rounded-xl text-xs text-red-200 font-medium flex items-center gap-3 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form Left */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Datos de Contacto */}
          <div className="bg-[#172B46] border border-[#233F65] rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
            <h2 className="font-serif-editorial text-base sm:text-lg font-bold text-white border-b border-[#233F65] pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-xs flex items-center justify-center font-bold">
                1
              </span>
              Datos de Contacto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Nombre(s) *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Ej. Roberto"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Apellido(s) *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Ej. Martín del Campo"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Correo Electrónico (para tu comprobante y guía) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Teléfono (WhatsApp de contacto de paquetería) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="55 1234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
            </div>
          </div>

          {/* 2. Dirección de Envío */}
          <div className="bg-[#172B46] border border-[#233F65] rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
            <h2 className="font-serif-editorial text-base sm:text-lg font-bold text-white border-b border-[#233F65] pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-xs flex items-center justify-center font-bold">
                2
              </span>
              Dirección de Entrega Asegurada
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="text-[#C4CBD4] block mb-1 font-medium">Calle y Número Exterior / Interior *</label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="Av. Insurgentes Sur 123, Depto 4B"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Colonia *</label>
                <input
                  type="text"
                  name="neighborhood"
                  required
                  placeholder="Col. del Valle"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Código Postal *</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="03100"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Ciudad / Municipio *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Benito Juárez"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div>
                <label className="text-[#C4CBD4] block mb-1 font-medium">Estado *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[#C4CBD4] block mb-1 font-medium">Referencias de Entrega (opcional)</label>
                <input
                  type="text"
                  name="references"
                  placeholder="Ej. Casa blanca con portón café, entre calle 2 y 4"
                  value={formData.references}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Right */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#172B46] border border-[#233F65] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl sticky top-24">
            <h2 className="font-serif-editorial text-lg font-bold text-white border-b border-[#233F65] pb-3 flex items-center justify-between">
              <span>Resumen de Compra</span>
              <span className="text-xs font-sans text-[#C5A46D] font-bold">
                {cart.items.reduce((acc, i) => acc + i.quantity, 0)} {cart.items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'artículo' : 'artículos'}
              </span>
            </h2>

            {/* Barra de Progreso de Envío Gratis */}
            <div className="p-3.5 rounded-xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Truck className="w-4 h-4 text-[#C5A46D]" />
                  {hasFreeShipping ? '¡Envío Gratis Desbloqueado!' : 'Envío Gratis desde $1,500 MXN'}
                </span>
                <span className={`text-[11px] font-bold ${hasFreeShipping ? 'text-emerald-400' : 'text-[#C5A46D]'}`}>
                  {hasFreeShipping ? '✓ 100%' : `${freeShippingProgressPct}%`}
                </span>
              </div>
              
              <div className="w-full bg-[#172B46] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    hasFreeShipping ? 'bg-emerald-500' : 'bg-[#C5A46D]'
                  }`}
                  style={{ width: `${freeShippingProgressPct}%` }}
                />
              </div>

              {!hasFreeShipping && (
                <p className="text-[11px] text-[#C4CBD4]">
                  Te faltan <strong className="text-white">${missingForFreeShipping.toFixed(0)} MXN</strong> para obtener envío sin costo a todo México.
                </p>
              )}
            </div>

            {/* Lista de Artículos */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-[#233F65]/50">
              {cart.items.map((item) => (
                <div key={item.variantId} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 pr-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#0F1D30] border border-[#233F65] shrink-0"
                      />
                    )}
                    <div>
                      <span className="font-semibold text-white block line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-[#9CA3AF]">Cant: {item.quantity} × ${item.price.toFixed(0)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#C5A46D] shrink-0">
                    ${(item.price * item.quantity).toFixed(0)} MXN
                  </span>
                </div>
              ))}
            </div>

            {/* Desglose de Totales */}
            <div className="space-y-2 text-xs pt-3 border-t border-[#233F65]">
              <div className="flex justify-between text-[#C4CBD4]">
                <span>Subtotal</span>
                <span className="text-white font-medium">${cart.subtotal.toFixed(0)} MXN</span>
              </div>

              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Descuento ({cart.appliedCoupon})</span>
                  <span>-${cart.discount.toFixed(0)} MXN</span>
                </div>
              )}

              <div className="flex justify-between text-[#C4CBD4] items-center">
                <span>Costo de Envío Terrestre</span>
                {cart.shipping === 0 ? (
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> ¡GRATIS!
                  </span>
                ) : (
                  <span className="text-white font-medium">${cart.shipping.toFixed(0)} MXN</span>
                )}
              </div>

              <div className="flex justify-between items-baseline text-base font-bold text-white pt-3 border-t border-[#233F65]">
                <span>Total a Pagar</span>
                <span className="text-2xl font-extrabold text-[#C5A46D]">${cart.total.toFixed(0)} MXN</span>
              </div>
            </div>

            {/* Botón Pagar */}
            <button
              type="submit"
              disabled={loading}
              className="btn-dorado w-full py-4 text-xs uppercase font-extrabold tracking-wider shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Conectando con Stripe Seguro...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pagar Ahora • ${cart.total.toFixed(0)} MXN</span>
                </>
              )}
            </button>

            {/* Sellos de Confianza y Seguridad */}
            <div className="space-y-2 pt-2 border-t border-[#233F65] text-[11px] text-[#9CA3AF]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-semibold text-white">Pago Seguro Cifrado SSL 256-Bit</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Tus datos de tarjeta viajan directamente cifrados a Stripe Inc. Academia Alekhins nunca almacena tu información bancaria.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[#C5A46D]">
                <PackageCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Envío asegurado con código de seguimiento nacional.</span>
              </div>
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
        <div className="min-h-[60vh] flex items-center justify-center text-[#C5A46D] text-sm">
          Cargando pasarela segura de pago...
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
