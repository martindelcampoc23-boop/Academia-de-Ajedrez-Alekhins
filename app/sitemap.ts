import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alekhins.com';

  const [products, plans, articles] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.trainingPlan.findMany({ select: { slug: true, createdAt: true } }),
    prisma.article.findMany({ select: { slug: true, publishedAt: true } }),
  ]);

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  const planUrls = plans.map((p) => ({
    url: `${baseUrl}/entrenamiento/${p.slug}`,
    lastModified: p.createdAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tienda`, lastModified: new Date() },
    { url: `${baseUrl}/entrenamiento`, lastModified: new Date() },
    { url: `${baseUrl}/roberto-martin-del-campo`, lastModified: new Date() },
    { url: `${baseUrl}/roberto-martin-del-campo/curriculum`, lastModified: new Date() },
    { url: `${baseUrl}/videos`, lastModified: new Date() },
    { url: `${baseUrl}/clubes-y-escuelas`, lastModified: new Date() },
    ...productUrls,
    ...planUrls,
  ];
}
