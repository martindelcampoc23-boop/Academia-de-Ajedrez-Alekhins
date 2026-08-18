import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alekhins.com';

  let products: { slug: string; updatedAt: Date }[] = [];
  let plans: { slug: string; createdAt: Date }[] = [];

  try {
    const [pList, planList] = await Promise.all([
      prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.trainingPlan.findMany({ select: { slug: true, createdAt: true } }),
    ]);
    products = pList;
    plans = planList;
  } catch (error) {
    console.warn('⚠️ [Sitemap] Could not query database during sitemap build, using fallback paths:', error);
  }

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
    { url: `${baseUrl}/articulos`, lastModified: new Date() },
    { url: `${baseUrl}/clubes-y-escuelas`, lastModified: new Date() },
    ...productUrls,
    ...planUrls,
  ];
}
