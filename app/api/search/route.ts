import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const q = query.trim().toLowerCase();

  const [products, plans, videos, articles] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { sku: { contains: q } },
          { description: { contains: q } },
        ],
        isPublished: true,
      },
      take: 5,
    }),
    prisma.trainingPlan.findMany({
      where: {
        OR: [{ name: { contains: q } }, { level: { contains: q } }],
        isPublished: true,
      },
      take: 3,
    }),
    prisma.video.findMany({
      where: {
        OR: [{ title: { contains: q } }, { tags: { contains: q } }],
      },
      take: 3,
    }),
    prisma.article.findMany({
      where: {
        OR: [{ title: { contains: q } }, { content: { contains: q } }],
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
      url: `/articulos`,
    })),
  ];

  return NextResponse.json({ results });
}
