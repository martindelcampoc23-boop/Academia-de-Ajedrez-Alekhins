import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { ACADEMIC_PROGRAMS, COACHES } from '@/lib/academicData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com';

  let products: { slug: string; updatedAt: Date }[] = [];
  let articles: { slug: string; publishedAt: Date }[] = [];

  try {
    const [pList, articleList] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.article.findMany({
        where: { isPublished: true },
        select: { slug: true, publishedAt: true },
      }),
    ]);
    products = pList;
    articles = articleList;
  } catch (error) {
    console.warn('⚠️ [Sitemap] Could not query database during sitemap build:', error);
  }

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const programUrls: MetadataRoute.Sitemap = ACADEMIC_PROGRAMS.map((p) => ({
    url: `${baseUrl}/programas#${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/articulos/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Rutas estáticas principales de la institución
  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/la-academia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/programas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/clases-personalizadas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/entrenadores`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/tienda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/clubes-y-escuelas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/aula-virtual`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/articulos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/legal/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/legal/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/legal/envios`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ];

  return [...staticUrls, ...programUrls, ...productUrls, ...articleUrls];
}
