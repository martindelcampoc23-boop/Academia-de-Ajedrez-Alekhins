'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { ShoppingBag, Truck, ShieldCheck, CheckCircle, Award } from 'lucide-react';

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
  
  const fallbackVariants = product.variants && product.variants.length > 0
    ? product.variants
    : [
        {
          id: product.id,
          sku: product.sku || 'ALE-DEFAULT',
          name: product.name,
          price: product.price || 0,
          stock: 10,
          color: null,
        },
      ];

  const defaultImage = product.images?.[0]?.url || '/logo-alekhins.png';

  const [selectedVariantId, setSelectedVariantId] = useState(fallbackVariants[0]?.id || '');
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  const selectedVariant = fallbackVariants.find((v) => v.id === selectedVariantId) || fallbackVariants[0];
  const price = selectedVariant ? selectedVariant.price : (product.price || 0);

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

  const categoryLabel = product.category?.name || 'Material de Ajedrez';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Gallery Left */}
      <div className="lg:col-span-6 space-y-4">
        <div className="aspect-square bg-carbon-dark rounded-lg overflow-hidden border border-stone-border relative">
          <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          {product.isAcademyRecommended && (
            <span className="absolute top-4 left-4 bg-walnut border border-champagne text-champagne text-xs font-bold px-3 py-1 rounded shadow">
              Recomendado por la Academia
            </span>
          )}
        </div>

        {product.images && product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`w-20 h-20 rounded overflow-hidden border-2 shrink-0 transition ${
                  selectedImage === img.url ? 'border-champagne' : 'border-stone-border opacity-70 hover:opacity-100'
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
          <span className="text-xs text-champagne uppercase font-bold tracking-widest block mb-1">
            {categoryLabel} • SKU: {selectedVariant?.sku || product.sku}
          </span>
          <h1 className="font-serif-editorial text-2xl md:text-4xl font-bold text-ivory">{product.name}</h1>
        </div>

        <div className="flex items-baseline gap-3 border-y border-stone-border py-4">
          <span className="text-3xl font-extrabold text-champagne">${price.toFixed(2)} MXN</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ivory-dim line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
          <span className="text-xs text-emerald-400 font-semibold ml-auto flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Stock Disponible ({selectedVariant?.stock || 10} unidades)
          </span>
        </div>

        {/* Master Comment */}
        {product.masterComment && (
          <div className="p-4 bg-walnut/30 border border-champagne/40 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-champagne text-xs font-serif-editorial font-bold">
              <Award className="w-4 h-4" /> Comentario del Maestro Internacional Roberto Martín del Campo:
            </div>
            <blockquote className="text-xs text-ivory-muted italic leading-relaxed">
              &quot;{product.masterComment}&quot;
            </blockquote>
          </div>
        )}

        {/* Short Description */}
        <p className="text-xs text-ivory-muted leading-relaxed">{product.shortDescription || product.description}</p>

        {/* Variant Selector */}
        {fallbackVariants.length > 1 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-ivory block">Seleccionar Variante / Color:</label>
            <div className="flex flex-wrap gap-2">
              {fallbackVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`px-3 py-2 text-xs rounded border transition ${
                    selectedVariantId === v.id
                      ? 'border-champagne bg-walnut/40 text-champagne font-bold'
                      : 'border-stone-border bg-carbon-card text-ivory-muted hover:text-ivory'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center border border-stone-border rounded bg-carbon-dark">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-xs font-bold hover:text-champagne transition"
            >
              -
            </button>
            <span className="px-3 text-xs font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-xs font-bold hover:text-champagne transition"
            >
              +
            </button>
          </div>

          <button onClick={handleAddToCart} className="btn-champagne flex-1 text-xs py-3.5 shadow-gold">
            <ShoppingBag className="w-4 h-4" /> Añadir al Carrito
          </button>
        </div>

        {addedMsg && (
          <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800 text-center font-medium">
            ✓ ¡Producto añadido al carrito con éxito!
          </p>
        )}

        {/* Guarantees */}
        <div className="grid grid-cols-2 gap-4 border-t border-stone-border pt-4 text-xs text-ivory-dim">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-champagne shrink-0" />
            <span>Envío seguro a todo México</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
            <span>Garantía de calidad Alekhins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
