'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F1E17] border-l border-[#1C3328] text-white flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-[#1C3328] flex items-center justify-between bg-[#0B1510]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D8B155]" />
              <h2 className="font-serif-editorial text-lg font-bold text-white">Tu Carrito</h2>
              <span className="text-xs bg-[#1C3328] px-2 py-0.5 rounded text-gray-200 font-bold">
                {cart.items.reduce((acc, i) => acc + i.quantity, 0)} ítems
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-3 bg-[#13221B] border-b border-[#1C3328] text-xs">
            <div className="flex items-center gap-2 mb-1 text-gray-300 font-medium">
              <Truck className="w-4 h-4 text-[#D8B155]" />
              {cart.progressToFreeShipping >= 100 ? (
                <span className="text-emerald-400 font-bold">¡Felicidades! Tienes Envío Gratuito</span>
              ) : (
                <span>
                  Agrega <strong className="text-[#D8B155]">${(1500 - (cart.subtotal - cart.discount)).toFixed(2)} MXN</strong> más para <strong>ENVÍO GRATIS</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-[#1C3328] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#D8B155] h-full transition-all duration-300"
                style={{ width: `${Math.min(cart.progressToFreeShipping, 100)}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#1C3328] mx-auto" />
                <p className="text-gray-400 font-medium">Tu carrito está vacío</p>
                <Link href="/tienda" onClick={() => setIsOpen(false)} className="btn-forest-outline inline-flex text-xs px-4 py-2">
                  Explorar Tienda
                </Link>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.variantId} className="flex gap-3 p-3 bg-[#13221B] rounded border border-[#1C3328]">
                  <div className="w-16 h-16 bg-[#0B1510] rounded overflow-hidden shrink-0 border border-[#1C3328]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-gray-400">{item.variantName}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#1C3328] rounded bg-[#0B1510]">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1 hover:text-[#D8B155] transition text-gray-300">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1 hover:text-[#D8B155] transition text-gray-300">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#D8B155]">${(item.price * item.quantity).toFixed(2)} MXN</span>
                        <button onClick={() => removeItem(item.variantId)} className="block text-[10px] text-red-400 hover:text-red-300 ml-auto mt-0.5">
                          <Trash2 className="w-3 h-3 inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="p-4 border-t border-[#1C3328] bg-[#0B1510] space-y-3">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Código de cupón"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 bg-[#13221B] border border-[#1C3328] rounded text-xs text-white uppercase focus:border-[#D8B155] outline-none"
                  />
                </div>
                <button type="submit" className="bg-[#1C3328] hover:bg-[#21392D] text-xs px-3 py-1.5 rounded font-semibold text-white transition">
                  Aplicar
                </button>
              </form>

              {cart.appliedCoupon && (
                <div className="flex justify-between items-center text-xs bg-emerald-950/60 border border-emerald-800 p-2 rounded text-emerald-300">
                  <span>Cupón <strong>{cart.appliedCoupon}</strong> activo</span>
                  <button onClick={removeCoupon} className="text-xs underline">Quitar</button>
                </div>
              )}

              {couponMsg && (
                <p className={`text-[11px] font-semibold ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {couponMsg.text}
                </p>
              )}

              <div className="space-y-1 text-xs pt-2 border-t border-[#1C3328]">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span><span>${cart.subtotal.toFixed(2)} MXN</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Descuento</span><span>-${cart.discount.toFixed(2)} MXN</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Envío</span><span>{cart.shipping === 0 ? '¡GRATIS!' : `$${cart.shipping.toFixed(2)} MXN`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1C3328]">
                  <span>Total</span><span className="text-[#D8B155]">${cart.total.toFixed(2)} MXN</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/carrito" onClick={() => setIsOpen(false)} className="btn-forest-outline text-xs text-center py-2.5">
                  Ver Carrito
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-gold-solid text-xs text-center py-2.5">
                  Pagar Ahora <ArrowRight className="w-3.5 h-3.5 inline" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
