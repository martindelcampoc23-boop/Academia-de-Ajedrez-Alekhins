import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { Filter, ShoppingBag, Star, CheckCircle, Search, ShieldCheck, Truck, Zap, CreditCard, Award, Flame, PackageCheck } from 'lucide-react';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { STORE_PRODUCTS, STORE_CATEGORIES } from '@/lib/storeData';

export const metadata = {
  title: 'Tienda Oficial de Ajedrez | Academia Alekhins',
  description:
    'Catálogo oficial de material de ajedrez reglamentario: Sets Staunton, tableros de madera y vinil, relojes digitales FIDE, literatura especializada y paquetes institucionales para escuelas y clubes.',
};

export const revalidate = 60;

const OFFICIAL_CATEGORIES = STORE_CATEGORIES.filter((c) => c.slug !== 'todos');

export default async function StorePage({
  searchParams,
}: {
  searchParams?: { categoria?: string; orden?: string; q?: string };
}) {
  const selectedCategory = searchParams?.categoria;
  const sortOrder = searchParams?.orden || 'popular';
  const searchQuery = searchParams?.q?.toLowerCase();

  let categories = OFFICIAL_CATEGORIES;
  let products: any[] = [];

  try {
    const [cats, prods] = await Promise.all([
      prisma.category.findMany(),
      prisma.product.findMany({
        where: {
          isPublished: true,
          category: selectedCategory ? { slug: selectedCategory } : undefined,
          name: searchQuery ? { contains: searchQuery, mode: 'insensitive' } : undefined,
        },
        include: {
          images: true,
          variants: true,
          category: true,
        },
        orderBy:
          sortOrder === 'precio-asc'
            ? { price: 'asc' }
            : sortOrder === 'precio-desc'
            ? { price: 'desc' }
            : { createdAt: 'desc' },
      }),
    ]);
    if (cats && cats.length > 0) categories = cats;
    products = prods;
  } catch (error) {
    console.warn('⚠️ [StorePage] Usando catálogo de respaldo para la tienda:', error);
  }

  // Fallback con catálogo completo de la tienda (20+ productos)
  if (!products || products.length === 0) {
    let list = STORE_PRODUCTS.filter((p) => {
      if (selectedCategory && selectedCategory !== 'todos' && p.category.slug !== selectedCategory) return false;
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery) &&
        !p.description.toLowerCase().includes(searchQuery)
      ) {
        return false;
      }
      return true;
    });

    if (sortOrder === 'precio-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'precio-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    products = list;
  }

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-16 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header de la Tienda */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A46D] block">
            Equipamiento Homologado
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            TIENDA DE AJEDREZ PROFESIONAL
          </h1>
          <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
            Material reglamentario para torneos, escuelas, clubes y coleccionistas. Tableros oficiales, piezas plásticas pesadas y de madera noble, relojes digitales FIDE y bibliografía especializada.
          </p>
        </div>

        {/* Banner de Garantías & Beneficios Comerciales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-[#172B46] border border-[#233F65] text-xs shadow-lg">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F1D30]/60 border border-[#233F65]/50">
            <div className="w-9 h-9 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/60 flex items-center justify-center text-[#C5A46D] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold text-[11px] sm:text-xs">Envío Gratis</strong>
              <span className="text-[10px] text-[#9CA3AF]">En compras desde $1,500 MXN</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F1D30]/60 border border-[#233F65]/50">
            <div className="w-9 h-9 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/60 flex items-center justify-center text-[#C5A46D] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold text-[11px] sm:text-xs">Material Homologado</strong>
              <span className="text-[10px] text-[#9CA3AF]">Estándar FIDE y FENAMAC</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F1D30]/60 border border-[#233F65]/50">
            <div className="w-9 h-9 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/60 flex items-center justify-center text-[#C5A46D] shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold text-[11px] sm:text-xs">Pago 100% Seguro</strong>
              <span className="text-[10px] text-[#9CA3AF]">Stripe, Débito y Crédito</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F1D30]/60 border border-[#233F65]/50">
            <div className="w-9 h-9 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/60 flex items-center justify-center text-[#C5A46D] shrink-0">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold text-[11px] sm:text-xs">Despacho Express</strong>
              <span className="text-[10px] text-[#9CA3AF]">Envíos en 24 a 48 hrs hábiles</span>
            </div>
          </div>
        </div>

        {/* Buscador & Categorías */}
        <div className="space-y-4 border-y border-[#233F65] py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categorías Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/tienda"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  !selectedCategory
                    ? 'bg-[#C5A46D] text-[#0F1D30] font-bold shadow'
                    : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
                }`}
              >
                Todos los Productos
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.slug}
                  href={`/tienda?categoria=${cat.slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat.slug
                      ? 'bg-[#C5A46D] text-[#0F1D30] font-bold shadow'
                      : 'bg-[#172B46] text-[#C4CBD4] hover:text-white border border-[#233F65]'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Selector de Orden */}
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span>Ordenar:</span>
              <select
                defaultValue={sortOrder}
                className="bg-[#172B46] border border-[#233F65] px-3 py-1.5 rounded-lg text-xs text-[#FAF8F2] outline-none"
              >
                <option value="popular">Recomendados</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        {products.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-sm text-[#9CA3AF]">No se encontraron productos en esta categoría.</p>
            <Link href="/tienda" className="btn-dorado text-xs uppercase font-bold py-2 px-5">
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const image =
                product.images?.[0]?.url ||
                '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg';

              const discountPct =
                product.compareAtPrice && product.compareAtPrice > product.price
                  ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                  : null;
              const qualifiesFreeShipping = product.price >= 1500;
              const isUrgent = (discountPct && discountPct >= 15) || product.price >= 3000;

              return (
                <div
                  key={product.id}
                  className="bg-[#172B46] rounded-2xl p-4 border border-[#233F65] flex flex-col justify-between hover:border-[#C5A46D] transition shadow-md group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="aspect-square bg-[#0F1D30] rounded-xl overflow-hidden relative border border-[#233F65]">
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      
                      {/* Insignias superiores */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        {product.isAcademyRecommended && (
                          <span className="bg-[#0F1D30]/95 border border-[#C5A46D] text-[#C5A46D] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                            Recomendado Alekhins
                          </span>
                        )}
                        {discountPct && (
                          <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow flex items-center gap-0.5 w-fit">
                            <Flame className="w-2.5 h-2.5" /> -{discountPct}% AHORRO
                          </span>
                        )}
                      </div>

                      {/* Distintivo de Envío Gratis */}
                      {qualifiesFreeShipping && (
                        <div className="absolute bottom-2 left-2 right-2 z-10">
                          <span className="bg-[#0F1D30]/95 backdrop-blur-xs border border-emerald-500/50 text-emerald-400 text-[9px] font-bold px-2 py-1 rounded shadow flex items-center gap-1 justify-center">
                            <Truck className="w-3 h-3 text-emerald-400" /> Envío Gratis a todo México
                          </span>
                        </div>
                      )}

                      <WishlistButton productId={product.id} productName={product.name} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider block">
                          {product.category?.name || 'Ajedrez Oficial'}
                        </span>
                        {isUrgent ? (
                          <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 shrink-0">
                            <Zap className="w-2.5 h-2.5" /> Pocas unidades
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                            <CheckCircle className="w-2.5 h-2.5" /> En stock
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif-editorial text-sm font-bold text-white group-hover:text-[#C5A46D] transition line-clamp-2 min-h-[38px]">
                        {product.name}
                      </h3>
                    </div>

                    {product.masterComment && (
                      <p className="text-[11px] text-[#C4CBD4] italic bg-[#0F1D30] p-2.5 rounded-lg border border-[#233F65] line-clamp-2">
                        &quot;{product.masterComment}&quot;
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#233F65] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-[#C5A46D]">
                          ${product.price.toFixed(0)} MXN
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-[#9CA3AF] line-through">
                            ${product.compareAtPrice.toFixed(0)}
                          </span>
                        )}
                      </div>
                      {discountPct && product.compareAtPrice && (
                        <span className="text-[10px] text-emerald-400 font-semibold block">
                          Ahorras ${(product.compareAtPrice - product.price).toFixed(0)} MXN
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/producto/${product.slug}`}
                      className="btn-navy-outline text-xs px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-[#C5A46D] hover:text-[#0F1D30] transition"
                    >
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Banner Institucional de la Tienda */}
        <div className="p-8 rounded-3xl bg-[#172B46] border border-[#233F65] text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#C5A46D] mx-auto" />
          <h3 className="font-serif-editorial text-xl font-bold text-white">
            ¿Requieres cotización para tu colegio, club o torneo?
          </h3>
          <p className="text-xs sm:text-sm text-[#C4CBD4] max-w-2xl mx-auto">
            Ofrecemos descuentos escalonados por volumen y paquetes institucionales con envío express asegurado a toda la República Mexicana.
          </p>
          <div className="pt-2">
            <Link href="/clubes-y-escuelas" className="btn-dorado text-xs uppercase font-bold py-2.5 px-6">
              Cotizar Paquetes Institucionales
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
