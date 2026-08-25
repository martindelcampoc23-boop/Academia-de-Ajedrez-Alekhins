import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { Filter, ShoppingBag, Star, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Tienda de Ajedrez | Sets, Tableros, Piezas & Relojes DGT',
  description: 'Catálogo oficial de material de ajedrez. Sets de torneo, tableros de vinil y madera, piezas Staunton pesadas, relojes DGT y libros.',
};

export const revalidate = 60;

export default async function StorePage({
  searchParams,
}: {
  searchParams?: { categoria?: string; orden?: string };
}) {
  const selectedCategory = searchParams?.categoria;
  const sortOrder = searchParams?.orden || 'popular';

  let categories: any[] = [];
  let products: any[] = [];

  try {
    const [cats, prods] = await Promise.all([
      prisma.category.findMany(),
      prisma.product.findMany({
        where: {
          isPublished: true,
          category: selectedCategory ? { slug: selectedCategory } : undefined,
        },
        include: {
          images: true,
          variants: true,
          category: true,
        },
        orderBy: sortOrder === 'precio-asc' ? { price: 'asc' } : sortOrder === 'precio-desc' ? { price: 'desc' } : { createdAt: 'desc' },
      }),
    ]);
    categories = cats;
    products = prods;
  } catch (error) {
    console.warn('⚠️ [StorePage] Database query fallback:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Catálogo Certificado
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Tienda de Material de Ajedrez
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Material oficial seleccionado para competición, escuelas, clubes y coleccionistas. Garantía de durabilidad y estándares FIDE/USCF.
        </p>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-stone-border py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/tienda"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              !selectedCategory ? 'bg-champagne text-carbon-dark shadow-gold' : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
            }`}
          >
            Todos los Productos
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/tienda?categoria=${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat.slug
                  ? 'bg-champagne text-carbon-dark shadow-gold'
                  : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-ivory-muted">
          <span>Ordenar por:</span>
          <select
            defaultValue={sortOrder}
            className="bg-carbon-card border border-stone-border px-3 py-1.5 rounded text-xs text-ivory outline-none"
          >
            <option value="popular">Recomendados</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => {
          const image = product.images?.[0]?.url || '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg';
          return (
            <div key={product.id} className="card-carbon p-4 flex flex-col justify-between group space-y-4">
              <div className="space-y-3">
                <div className="aspect-square bg-carbon-dark rounded overflow-hidden relative border border-stone-border">
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {product.isAcademyRecommended && (
                    <span className="absolute top-2 left-2 bg-walnut/90 border border-champagne text-champagne text-[9px] font-bold px-2 py-0.5 rounded shadow">
                      Recomendado Alekhins
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] text-ivory-dim uppercase tracking-wider block">{product.category.name}</span>
                  <h3 className="font-serif-editorial text-sm font-bold text-ivory group-hover:text-champagne transition line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {product.masterComment && (
                  <p className="text-[11px] text-ivory-muted italic bg-carbon-dark p-2 rounded border border-stone-border/50 line-clamp-2">
                    &quot;{product.masterComment}&quot;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-border flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-champagne">${product.price.toFixed(2)} MXN</span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-ivory-dim line-through block">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
                <Link href={`/producto/${product.slug}`} className="btn-outline-gold text-xs px-3 py-1.5">
                  Ver Detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
