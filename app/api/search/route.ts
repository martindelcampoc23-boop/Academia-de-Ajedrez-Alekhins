import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const q = query.trim();

  const [products, plans, videos, articles] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { sku: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
        isPublished: true,
      },
      take: 5,
    }),
    prisma.trainingPlan.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { level: { contains: q, mode: 'insensitive' } },
        ],
        isPublished: true,
      },
      take: 3,
    }),
    prisma.video.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { tags: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 3,
    }),
    prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
        ],
        isPublished: true,
      },
      take: 3,
    }),
  ]);

  const results = [
    ...products.map((p) => ({
      type: 'PRODUCT' as const,
      id: p.id,
      title: p.name,
      subtitle: `SKU: ${p.sku}`,
      url: `/producto/${p.slug}`,
      price: p.price,
    })),
    ...plans.map((p) => ({
      type: 'PLAN' as const,
      id: p.id,
      title: p.name,
      subtitle: `Nivel: ${p.level}`,
      url: `/entrenamiento/${p.slug}`,
      price: p.price,
    })),
    ...videos.map((v) => ({
      type: 'VIDEO' as const,
      id: v.id,
      title: v.title,
      subtitle: `Profesor: ${v.instructorName}`,
      url: `/videos`,
    })),
    ...articles.map((a) => ({
      type: 'ARTICLE' as const,
      id: a.id,
      title: a.title,
      subtitle: a.excerpt.slice(0, 50) + '...',
      url: `/articulos/${a.slug}`,
    })),
  ];

  return NextResponse.json({ results });
}
