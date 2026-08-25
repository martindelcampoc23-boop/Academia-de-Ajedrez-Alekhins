'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight, ShieldCheck, Truck, Mail } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ALE-2026-CONFIRMADO';
  const sessionId = searchParams.get('session_id');
  const isMock = searchParams.get('mock') === 'true';
  const { clearCart } = useCart();

  useEffect(() => {
    // Vaciar el carrito tras compra exitosa
    clearCart();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Icono de Confirmación */}
      <div className="relative inline-block">
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block">
          ¡Pago Confirmado Exitosamente!
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-[#F6F3EC]">
          Pedido #{orderNumber}
        </h1>
        <p className="text-sm text-[#A8B2A6] max-w-lg mx-auto leading-relaxed">
          Tu pago ha sido procesado de forma segura. Hemos enviado un correo de confirmación con el desglose de tu compra y tu comprobante.
        </p>
      </div>

      {isMock && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs max-w-lg mx-auto text-left space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <span>ℹ️ Modo de Demostración Activo</span>
          </div>
          <p>
            El sistema procesó el pedido en modo de prueba porque no se han configurado las claves reales de Stripe (<code>STRIPE_SECRET_KEY</code>). Para cobrar tarjetas reales, configura tus credenciales de Stripe en Vercel.
          </p>
        </div>
      )}

      {/* Tarjeta de Detalles del Envío */}
      <div className="card-carbon p-6 text-left space-y-4 max-w-lg mx-auto border-[#2B3E34]">
        <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2 border-b border-[#2B3E34] pb-3">
          <Truck className="w-4 h-4 text-[#D8B155]" />
          Próximos Pasos de tu Envío
        </h3>
        <ul className="space-y-2.5 text-xs text-[#A8B2A6]">
          <li className="flex items-start gap-2">
            <span className="text-[#D8B155] font-bold">1.</span>
            <span>Empacamos cuidadosamente tu material de ajedrez en almacén.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D8B155] font-bold">2.</span>
            <span>Generamos tu número de guía de paquetería (FedEx, Estafeta o DHL).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D8B155] font-bold">3.</span>
            <span>Podrás consultar el avance de tu entrega en tiempo real desde la sección de rastreo.</span>
          </li>
        </ul>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href={`/rastrear-pedido`}
          className="btn-champagne text-xs px-6 py-3 flex items-center gap-2 shadow-lg"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Rastrear Estado del Envío</span>
        </Link>
        <Link
          href="/tienda"
          className="btn-outline-gold text-xs px-6 py-3 flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Seguir Explorando la Tienda</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-[#D8B155] text-sm">
          Cargando confirmación de pedido...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
