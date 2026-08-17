'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput);
    if (res.success) {
      setCouponMsg({ type: 'success', text: res.message || 'Cupón aplicado' });
      setCouponInput('');
    } else {
      setCouponMsg({ type: 'error', text: res.error || 'Cupón no válido' });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <ShoppingBag className="w-16 h-16 text-stone-border mx-auto" />
        <h1 className="font-serif-editorial text-2xl font-bold text-ivory">Tu Carrito de Compras está Vacío</h1>
        <p className="text-xs text-ivory-dim max-w-md mx-auto">
          Explora nuestro catálogo certificado de sets de ajedrez, tableros, piezas pesadas, relojes DGT y libros.
        </p>
        <Link href="/tienda" className="btn-champagne text-xs px-6 py-3">
          Explorar la Tienda de Ajedrez
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <h1 className="font-serif-editorial text-3xl font-bold text-ivory">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 bg-carbon-card border border-stone-border rounded text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-ivory-muted">
              <Truck className="w-4 h-4 text-champagne shrink-0" />
              {cart.progressToFreeShipping >= 100 ? (
                <span className="text-emerald-400 font-semibold">¡Felicidades! Tienes Envío Gratuito garantizado</span>
              ) : (
                <span>
                  Agrega <strong className="text-champagne">${(cart.freeShippingThreshold - (cart.subtotal - cart.discount)).toFixed(2)} MXN</strong> más para obtener <strong>ENVÍO GRATIS</strong>
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.variantId} className="card-carbon p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 bg-carbon-dark rounded object-cover border border-stone-border" />
                  <div>
                    <h3 className="font-serif-editorial text-sm font-bold text-ivory">{item.name}</h3>
                    <p className="text-xs text-ivory-dim">{item.variantName} • SKU: {item.sku}</p>
                    <span className="text-xs font-semibold text-champagne mt-1 block">${item.price.toFixed(2)} MXN</span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-stone-border pt-3 sm:pt-0">
                  <div className="flex items-center border border-stone-border rounded bg-carbon-dark">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2 py-1 hover:text-champagne">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 py-1 hover:text-champagne">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-ivory">${(item.price * item.quantity).toFixed(2)} MXN</span>

                  <button onClick={() => removeItem(item.variantId)} className="text-red-400 hover:text-red-300 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="card-carbon p-6 space-y-4 border-stone-border sticky top-28">
            <h2 className="font-serif-editorial text-lg font-bold text-ivory border-b border-stone-border pb-3">Resumen del Pedido</h2>

            {/* Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-ivory-dim" />
                <input
                  type="text"
                  placeholder="CÓDIGO DE CUPÓN"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-carbon-dark border border-stone-border rounded text-xs text-ivory uppercase"
                />
              </div>
              <button type="submit" className="bg-stone-gray hover:bg-stone-border text-xs px-3 py-1.5 rounded font-medium">
                Aplicar
              </button>
            </form>

            {cart.appliedCoupon && (
              <div className="flex justify-between items-center text-xs bg-emerald-950/40 border border-emerald-800/50 p-2 rounded text-emerald-300">
                <span>Cupón <strong>{cart.appliedCoupon}</strong> activo</span>
                <button onClick={removeCoupon} className="text-xs underline text-emerald-400">Quitar</button>
              </div>
            )}

            {couponMsg && (
              <p className={`text-[11px] ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {couponMsg.text}
              </p>
            )}

            <div className="space-y-2 text-xs pt-2 border-t border-stone-border">
              <div className="flex justify-between text-ivory-muted">
                <span>Subtotal productos</span>
                <span>${cart.subtotal.toFixed(2)} MXN</span>
              </div>

              {cart.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento aplicado</span>
                  <span>-${cart.discount.toFixed(2)} MXN</span>
                </div>
              )}

              <div className="flex justify-between text-ivory-muted">
                <span>Envío estimado</span>
                <span>{cart.shipping === 0 ? '¡GRATIS!' : `$${cart.shipping.toFixed(2)} MXN`}</span>
              </div>

              <div className="flex justify-between text-ivory-muted">
                <span>IVA (16% Incluido)</span>
                <span>${cart.tax.toFixed(2)} MXN</span>
              </div>

              <div className="flex justify-between text-base font-bold text-ivory pt-3 border-t border-stone-border">
                <span>Total a Pagar</span>
                <span className="text-champagne">${cart.total.toFixed(2)} MXN</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-champagne w-full text-xs text-center py-3.5 shadow-gold">
              Proceder al Pago Seguro <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ivory-dim pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transacción cifrada y protegida por Stripe.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
