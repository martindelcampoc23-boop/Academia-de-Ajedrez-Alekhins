import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { ArrowRight } from 'lucide-react';
import { buildBreadcrumbLD, buildOrganizationLD } from '@/lib/jsonld';

export const metadata = {
  title: 'Artículos & Publicaciones de Ajedrez | Academia Alekhins',
  description:
    'Análisis posicionales, historias de campeonatos mundiales, consejos pedagógicos para padres y artículos sobre la preparación en ajedrez competitivo. Por MI Roberto Martín del Campo.',
  openGraph: {
    title: 'Artículos & Publicaciones | Academia Alekhins',
    description: 'Contenido de alto nivel sobre ajedrez, estrategia y pedagogía del MI Roberto Martín del Campo.',
    type: 'website',
  },
};

export const revalidate = 60;

export default async function ArticlesPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (error) {
    console.warn('⚠️ [ArticlesPage] Database query fallback:', error);
  }

  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'Artículos', url: '/articulos' },
  ]);

  // ItemList para Google Discover
  const itemListLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Artículos de Ajedrez — Academia Alekhins',
    numberOfItems: articles.length,
    itemListElement: articles.slice(0, 10).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com'}/articulos/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLD) }}
      />

      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Divulgación &amp; Estrategia
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Artículos &amp; Publicaciones del Maestro
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Análisis posicionales, historias de campeonatos mundiales, consejos pedagógicos para padres y artículos sobre la preparación en ajedrez competitivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <article key={article.id} className="card-carbon p-6 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="aspect-video bg-carbon-dark rounded overflow-hidden relative border border-stone-border">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <span className="text-[10px] text-champagne uppercase font-bold tracking-wider">{article.category}</span>
              <h2 className="font-serif-editorial text-lg font-bold text-ivory group-hover:text-champagne transition line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs text-ivory-muted line-clamp-3 leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-stone-border flex items-center justify-between text-xs text-ivory-dim">
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {new Date(article.publishedAt).toLocaleDateString('es-MX')}
              </time>
              <Link
                href={`/articulos/${article.slug}`}
                className="text-champagne font-semibold flex items-center gap-1 hover:underline"
              >
                Leer Artículo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
