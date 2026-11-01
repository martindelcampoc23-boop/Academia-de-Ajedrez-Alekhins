'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
  RefreshCw,
  Clock,
  Radio,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DrEnvioCarrierRate } from '@/lib/drenvio';

// Tarifas iniciales de respaldo para DrEnvío
const INITIAL_DRENVIO_RATES: DrEnvioCarrierRate[] = [
  {
    id: 'drenvio-estafeta-terrestre',
    carrier: 'Estafeta',
    service: 'Terrestre Asegurado',
    description: 'Envío estándar con guía de rastreo y seguro contra daños.',
    estimatedDays: '3 a 5 días hábiles',
    deliveryRange: '3 a 5 días hábiles',
    baseCost: 150,
    finalCost: 150,
    isFreeEligible: true,
    isRecommended: true,
    badge: 'Recomendado',
  },
  {
    id: 'drenvio-fedex-nacional',
    carrier: 'FedEx',
    service: 'Nacional Económico',
    description: 'Cobertura nacional de alta confiabilidad y entregas a domicilio.',
    estimatedDays: '2 a 4 días hábiles',
    deliveryRange: '2 a 4 días hábiles',
    baseCost: 175,
    finalCost: 175,
    isFreeEligible: false,
    badge: 'Popular',
  },
  {
    id: 'drenvio-dhl-express',
    carrier: 'DHL Express',
    service: 'Express Aéreo Día Siguiente',
    description: 'Prioridad máxima de despacho y entrega rápida garantizada.',
    estimatedDays: '24 a 48 hrs hábiles',
    deliveryRange: '1 a 2 días hábiles',
    baseCost: 220,
    finalCost: 220,
    isFreeEligible: false,
    badge: 'Más Rápido',
  },
  {
    id: 'drenvio-paquetexpress',
    carrier: 'Paquetexpress',
    service: 'Servicio Terrestre Regional',
    description: 'Excelente para pedidos pesados de tableros de madera y relojes.',
    estimatedDays: '3 a 5 días hábiles',
    deliveryRange: '3 a 5 días hábiles',
    baseCost: 150,
    finalCost: 150,
    isFreeEligible: true,
  },
];

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

  // Estado para la integración de DrEnvío
  const [shippingRates, setShippingRates] = useState<DrEnvioCarrierRate[]>(INITIAL_DRENVIO_RATES);
  const [selectedRateId, setSelectedRateId] = useState<string>('drenvio-estafeta-terrestre');
  const [isQuoting, setIsQuoting] = useState<boolean>(false);

  // Efecto para cotizar dinámicamente con DrEnvío según el C.P. y subtotal
  useEffect(() => {
    let isMounted = true;
    const fetchDrEnvioRates = async () => {
      setIsQuoting(true);
      try {
        const response = await fetch('/api/shipping/drenvio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postalCode: formData.postalCode.length === 5 ? formData.postalCode : '03100',
            subtotal: cart.subtotal,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted && Array.isArray(data.rates) && data.rates.length > 0) {
            setShippingRates(data.rates);
            // Conservar la opción seleccionada si sigue existiendo
            if (!data.rates.some((r: DrEnvioCarrierRate) => r.id === selectedRateId)) {
              setSelectedRateId(data.rates[0].id);
            }
          }
        }
      } catch (err) {
        console.warn('Error al consultar tarifas de DrEnvío:', err);
      } finally {
        if (isMounted) setIsQuoting(false);
      }
    };

    fetchDrEnvioRates();
    return () => {
      isMounted = false;
    };
  }, [formData.postalCode, cart.subtotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cálculo de tarifa seleccionada de DrEnvío
  const selectedRate = shippingRates.find((r) => r.id === selectedRateId) || shippingRates[0];
  const currentShippingCost = selectedRate ? selectedRate.finalCost : (cart.subtotal >= 1500 ? 0 : 150);
  const subtotalAfterDiscount = Math.max(0, cart.subtotal - cart.discount);
  const finalTotalAmount = subtotalAfterDiscount + currentShippingCost;

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
          shippingMethod: selectedRate
            ? {
                id: selectedRate.id,
                carrier: selectedRate.carrier,
                service: selectedRate.service,
                cost: selectedRate.finalCost,
                estimatedDays: selectedRate.estimatedDays,
              }
            : undefined,
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
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A46D] block">
              Transacción Cifrada 256-Bit
            </span>
            <span className="text-[10px] bg-[#172B46] border border-[#233F65] text-[#C4CBD4] px-2 py-0.5 rounded-full font-semibold">
              Logística por DrEnvío®
            </span>
          </div>
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
                <label className="text-[#C4CBD4] block mb-1 font-medium flex items-center justify-between">
                  <span>Código Postal (5 dígitos) *</span>
                  {isQuoting && (
                    <span className="text-[10px] text-[#C5A46D] flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Cotizando DrEnvío...
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  maxLength={5}
                  placeholder="03100"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-lg text-white outline-none focus:border-[#C5A46D] transition font-mono tracking-wider"
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

          {/* 3. Selección de Paquetería con DrEnvío Logistics Hub */}
          <div className="bg-[#172B46] border border-[#233F65] rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
            <div className="border-b border-[#233F65] pb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif-editorial text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0F1D30] border border-[#C5A46D] text-[#C5A46D] text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Método de Envío (con DrEnvío® Logistics)
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-[#C5A46D] bg-[#0F1D30] px-2.5 py-1 rounded-full border border-[#C5A46D]/30 font-semibold">
                <Truck className="w-3.5 h-3.5" />
                <span>Multicotizador DrEnvío Activo</span>
              </div>
            </div>

            <p className="text-xs text-[#C4CBD4]">
              Selecciona la paquetería de tu preferencia cotizada a través de la red oficial de <strong>DrEnvío</strong> (Estafeta, FedEx, DHL y Paquetexpress). Todas las opciones incluyen seguro y guía de rastreo nacional.
            </p>

            {/* Opciones de Paqueterías DrEnvío */}
            <div className="space-y-3 pt-1">
              {shippingRates.map((rate) => {
                const isSelected = selectedRateId === rate.id;

                return (
                  <div
                    key={rate.id}
                    onClick={() => setSelectedRateId(rate.id)}
                    className={`cursor-pointer rounded-xl p-4 border transition duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#1C3454] border-[#C5A46D] shadow-lg ring-1 ring-[#C5A46D]/50'
                        : 'bg-[#0F1D30] border-[#233F65] hover:border-[#C5A46D]/60'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 sm:mt-0 shrink-0 transition ${
                          isSelected
                            ? 'border-[#C5A46D] bg-[#C5A46D] text-[#0F1D30]'
                            : 'border-[#233F65] bg-[#172B46]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-white text-xs sm:text-sm font-bold">
                            {rate.carrier}
                          </strong>
                          <span className="text-[11px] text-[#C4CBD4]">• {rate.service}</span>
                          {rate.badge && (
                            <span
                              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow ${
                                rate.finalCost === 0
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#C5A46D] text-[#0F1D30]'
                              }`}
                            >
                              {rate.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
                          <span className="flex items-center gap-1 text-[#C4CBD4]">
                            <Clock className="w-3 h-3 text-[#C5A46D]" />
                            {rate.estimatedDays}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">Entrega: {rate.deliveryRange}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:shrink-0 self-end sm:self-center pl-8 sm:pl-0">
                      {rate.finalCost === 0 ? (
                        <div className="flex flex-col items-end">
                          <span className="text-emerald-400 font-extrabold text-sm sm:text-base flex items-center gap-1">
                            <Check className="w-4 h-4" /> ¡GRATIS!
                          </span>
                          <span className="text-[10px] text-[#9CA3AF] line-through">
                            ${rate.baseCost} MXN
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-[#C5A46D] font-extrabold text-sm sm:text-base">
                            ${rate.finalCost} MXN
                          </span>
                          {rate.baseCost > rate.finalCost && (
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              Subsidio DrEnvío aplicado
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Aviso de Guía DrEnvío */}
            <div className="p-3 rounded-xl bg-[#0F1D30]/80 border border-[#233F65] flex items-center gap-2.5 text-[11px] text-[#C4CBD4]">
              <PackageCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>
                Al completar tu pago, la guía de envío oficial se emite mediante <strong>DrEnvío® API</strong> y te llegará a tu correo con el enlace de seguimiento.
              </span>
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
                  Te faltan <strong className="text-white">${missingForFreeShipping.toFixed(0)} MXN</strong> para obtener envío sin costo a todo México con DrEnvío.
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
                <span className="flex items-center gap-1">
                  <span>Envío ({selectedRate?.carrier || 'DrEnvío'})</span>
                </span>
                {currentShippingCost === 0 ? (
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> ¡GRATIS!
                  </span>
                ) : (
                  <span className="text-white font-medium">${currentShippingCost.toFixed(0)} MXN</span>
                )}
              </div>

              <div className="flex justify-between items-baseline text-base font-bold text-white pt-3 border-t border-[#233F65]">
                <span>Total a Pagar</span>
                <span className="text-2xl font-extrabold text-[#C5A46D]">${finalTotalAmount.toFixed(0)} MXN</span>
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
                  <span>Pagar Ahora • ${finalTotalAmount.toFixed(0)} MXN</span>
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
                Tus datos bancarios se procesan con Stripe. La logística de paquetería se gestiona con la red nacional de <strong>DrEnvío®</strong>.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[#C5A46D]">
                <PackageCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Rastreo activo 24/7 y seguro de paquete incluido.</span>
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
