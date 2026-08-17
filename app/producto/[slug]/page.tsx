import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: `${product.name} | Tienda Alekhins`,
    description: product.shortDescription || product.description.slice(0, 150),
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      category: true,
    },
  });

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
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
