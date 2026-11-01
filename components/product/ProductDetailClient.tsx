'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle,
  Award,
  Flame,
  Zap,
  MessageCircle,
  PackageCheck,
  CreditCard,
  RotateCcw,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    description: string;
    shortDescription: string | null;
    price: number;
    compareAtPrice: number | null;
    isAcademyRecommended: boolean;
    masterComment: string | null;
    category?: { name: string; slug: string } | null;
    images: { url: string; alt: string | null }[];
    variants: {
      id: string;
      sku: string;
      name: string;
      price: number;
      stock: number;
      color: string | null;
    }[];
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();

  const fallbackVariants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [
          {
            id: product.id,
            sku: product.sku || 'ALE-DEFAULT',
            name: product.name,
            price: product.price || 0,
            stock: 12,
            color: null,
          },
        ];

  const defaultImage = product.images?.[0]?.url || '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg';

  const [selectedVariantId, setSelectedVariantId] = useState(fallbackVariants[0]?.id || '');
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  const selectedVariant = fallbackVariants.find((v) => v.id === selectedVariantId) || fallbackVariants[0];
  const price = selectedVariant ? selectedVariant.price : product.price || 0;
  const compareAtPrice = product.compareAtPrice;

  const discountPct =
    compareAtPrice && compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : null;
  const savings = compareAtPrice && compareAtPrice > price ? compareAtPrice - price : 0;
  const qualifiesFreeShipping = price >= 1500;
  const isUrgent = (discountPct && discountPct >= 15) || price >= 3000;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      variantName: selectedVariant.name,
      sku: selectedVariant.sku,
      price: selectedVariant.price,
      image: selectedImage,
      quantity,
    });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 3000);
  };

  const categoryLabel = product.category?.name || 'Material Reglamentario FIDE';

  const whatsappMessage = encodeURIComponent(
    `Hola Academia Alekhins, me interesa el producto "${product.name}" (SKU: ${selectedVariant?.sku || product.sku}). ¿Tienen disponibilidad y asesoría sobre este material?`
  );
  const whatsappUrl = `https://wa.me/529991020078?text=${whatsappMessage}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Gallery Left */}
      <div className="lg:col-span-6 space-y-4">
        <div className="aspect-square bg-[#0F1D30] rounded-2xl overflow-hidden border border-[#233F65] relative shadow-xl">
          <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />

          {/* Badges Flotantes */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isAcademyRecommended && (
              <span className="bg-[#0F1D30]/95 border border-[#C5A46D] text-[#C5A46D] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow">
                Recomendado Alekhins
              </span>
            )}
            {discountPct && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow flex items-center gap-1 w-fit">
                <Flame className="w-3 h-3" /> -{discountPct}% AHORRO
              </span>
            )}
          </div>

          {qualifiesFreeShipping && (
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="bg-[#0F1D30]/95 backdrop-blur-xs border border-emerald-500/60 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 justify-center">
                <Truck className="w-4 h-4 text-emerald-400" /> ¡Envío GRATIS a todo México en este artículo!
              </span>
            </div>
          )}
        </div>

        {product.images && product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                  selectedImage === img.url
                    ? 'border-[#C5A46D] scale-95 shadow'
                    : 'border-[#233F65] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information Right */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="text-xs text-[#C5A46D] uppercase font-bold tracking-widest block mb-1">
            {categoryLabel} • SKU: {selectedVariant?.sku || product.sku}
          </span>
          <h1 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {product.name}
          </h1>
        </div>

        {/* Bloque de Precios y Stock */}
        <div className="border-y border-[#233F65] py-4 space-y-2">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#C5A46D]">
              ${price.toFixed(0)} <span className="text-sm font-semibold text-[#FAF8F2]">MXN</span>
            </span>
            {compareAtPrice && (
              <span className="text-sm sm:text-base text-[#9CA3AF] line-through">
                ${compareAtPrice.toFixed(0)} MXN
              </span>
            )}
            {savings > 0 && (
              <span className="text-xs bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 font-bold px-2.5 py-1 rounded">
                Ahorras ${savings.toFixed(0)} MXN (-{discountPct}%)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs">
            {isUrgent ? (
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Pocas unidades disponibles en bodega ({selectedVariant?.stock || 5} unidades)
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> En stock para despacho inmediato ({selectedVariant?.stock || 12} unidades)
              </span>
            )}
          </div>
        </div>

        {/* Free Shipping Qualification Banner */}
        {qualifiesFreeShipping ? (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <strong className="text-white block font-bold">¡Califica para Envío Terrestre Gratis!</strong>
              <span className="text-[11px] text-emerald-300/90">Ahorras $180 MXN de tarifa de paquetería estándar a cualquier código postal de México.</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#172B46] border border-[#233F65] text-xs">
            <div className="w-8 h-8 rounded-lg bg-[#0F1D30] border border-[#C5A46D]/60 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <div>
              <strong className="text-white block font-bold">Envío Seguro a todo México ($180 MXN)</strong>
              <span className="text-[11px] text-[#C4CBD4]">
                Agrega ${(1500 - price).toFixed(0)} MXN más a tu pedido y obtén <strong>Envío Totalmente Gratis</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Master Comment */}
        {product.masterComment && (
          <div className="p-4 bg-[#172B46] border border-[#C5A46D]/50 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-serif-editorial font-bold">
              <Award className="w-4 h-4" /> Comentario del Maestro Internacional Roberto Martín del Campo:
            </div>
            <blockquote className="text-xs text-[#FAF8F2]/90 italic leading-relaxed">
              &quot;{product.masterComment}&quot;
            </blockquote>
          </div>
        )}

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        {/* Variant Selector */}
        {fallbackVariants.length > 1 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">Seleccionar Variante / Presentación:</label>
            <div className="flex flex-wrap gap-2">
              {fallbackVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`px-3 py-2 text-xs rounded-lg border transition ${
                    selectedVariantId === v.id
                      ? 'border-[#C5A46D] bg-[#C5A46D] text-[#0F1D30] font-bold shadow'
                      : 'border-[#233F65] bg-[#172B46] text-[#C4CBD4] hover:text-white'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#233F65] rounded-xl bg-[#0F1D30]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-3 text-xs font-bold text-[#C4CBD4] hover:text-[#C5A46D] transition"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-white min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-3 text-xs font-bold text-[#C4CBD4] hover:text-[#C5A46D] transition"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-dorado flex-1 text-xs sm:text-sm py-3.5 shadow-lg tracking-wider uppercase font-bold"
            >
              <ShoppingBag className="w-4 h-4" /> Añadir al Carrito
            </button>
          </div>

          {/* Secondary WhatsApp Inquire Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy-outline w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#1C3454] transition rounded-lg"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Consultar dudas sobre este producto por WhatsApp</span>
          </a>
        </div>

        {addedMsg && (
          <p className="text-xs text-emerald-300 bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/60 text-center font-bold flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            ¡Producto añadido al carrito con éxito!
          </p>
        )}

        {/* Guarantees & Trust Grid */}
        <div className="grid grid-cols-2 gap-3 border-t border-[#233F65] pt-4 text-[11px] text-[#C4CBD4]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#172B46]/60 border border-[#233F65]/50">
            <Truck className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Despacho 24-48 hrs con guía de rastreo</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#172B46]/60 border border-[#233F65]/50">
            <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Homologación FIDE y garantía oficial</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#172B46]/60 border border-[#233F65]/50">
            <CreditCard className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Pago seguro con tarjeta o Stripe</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#172B46]/60 border border-[#233F65]/50">
            <RotateCcw className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>Reposición inmediata por daño de envío</span>
          </div>
        </div>
      </div>
    </div>
  );
}
