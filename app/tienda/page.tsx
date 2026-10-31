import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { Filter, ShoppingBag, Star, CheckCircle, Search, ShieldCheck } from 'lucide-react';
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
                      {product.isAcademyRecommended && (
                        <span className="absolute top-2 left-2 bg-[#0F1D30]/90 border border-[#C5A46D] text-[#C5A46D] text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                          Recomendado Alekhins
                        </span>
                      )}
                      <WishlistButton productId={product.id} productName={product.name} />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider block">
                        {product.category?.name || 'Ajedrez Oficial'}
                      </span>
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
                      <span className="text-base font-extrabold text-[#C5A46D]">
                        ${product.price.toFixed(0)} MXN
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-[#9CA3AF] line-through block">
                          ${product.compareAtPrice.toFixed(0)} MXN
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
