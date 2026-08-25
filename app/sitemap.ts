import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com';

  let products: { slug: string; updatedAt: Date }[] = [];
  let plans: { slug: string; createdAt: Date }[] = [];
  let articles: { slug: string; publishedAt: Date }[] = [];

  try {
    const [pList, planList, articleList] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.trainingPlan.findMany({
        select: { slug: true, createdAt: true },
      }),
      prisma.article.findMany({
        where: { isPublished: true },
        select: { slug: true, publishedAt: true },
      }),
    ]);
    products = pList;
    plans = planList;
    articles = articleList;
  } catch (error) {
    console.warn('⚠️ [Sitemap] Could not query database during sitemap build:', error);
  }

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const planUrls = plans.map((p) => ({
    url: `${baseUrl}/entrenamiento/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const articleUrls = articles.map((a) => ({
    url: `${baseUrl}/articulos/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Rutas estáticas ordenadas por prioridad
  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tienda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/entrenamiento`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/roberto-martin-del-campo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/roberto-martin-del-campo/curriculum`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/articulos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/clubes-y-escuelas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  return [...staticUrls, ...productUrls, ...planUrls, ...articleUrls];
}
