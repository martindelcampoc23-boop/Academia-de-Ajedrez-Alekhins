import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { buildProductLD, buildBreadcrumbLD } from '@/lib/jsonld';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });
  if (!product) return { title: 'Producto no encontrado' };
  const image = product.images?.[0]?.url;
  return {
    title: `${product.name} | Tienda Alekhins`,
    description: product.shortDescription || product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} | Tienda Alekhins`,
      description: product.shortDescription || product.description.slice(0, 155),
      images: image ? [{ url: image, width: 800, height: 800, alt: product.name }] : [],
      type: 'og:product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      category: true,
      reviews: { select: { rating: true } },
    },
  });

  if (!product) notFound();

  const productLD = buildProductLD({
    name: product.name,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    slug: product.slug,
    images: product.images,
    category: product.category,
    reviews: product.reviews,
  });

  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'Tienda', url: '/tienda' },
    { name: product.category.name, url: `/tienda?categoria=${product.category.slug ?? ''}` },
    { name: product.name, url: `/producto/${product.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Link href="/tienda" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a la Tienda
      </Link>

      <ProductDetailClient product={product} />

      {/* Extended Product Description */}
      <div className="border-t border-stone-border pt-8 space-y-4">
        <h2 className="font-serif-editorial text-xl font-bold text-ivory">Descripción Detallada del Producto</h2>
        <div className="card-carbon p-6 text-xs text-ivory-muted leading-relaxed space-y-3">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
