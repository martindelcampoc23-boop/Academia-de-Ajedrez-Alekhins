import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Crown } from 'lucide-react';
import { buildArticleLD, buildBreadcrumbLD } from '@/lib/jsonld';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) return { title: 'Artículo no encontrado | Academia Alekhins' };

    return {
      title: `${article.title} | Blog Academia Alekhins`,
      description: article.excerpt || article.content.slice(0, 155),
      openGraph: {
        title: `${article.title} | Academia Alekhins`,
        description: article.excerpt || article.content.slice(0, 155),
        images: article.coverImage ? [{ url: article.coverImage }] : [],
        type: 'article',
        publishedTime: new Date(article.publishedAt).toISOString(),
        authors: [article.authorName],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.coverImage ? [article.coverImage] : [],
      },
    };
  } catch (err) {
    return { title: 'Artículos | Academia Alekhins' };
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);

  let article = null;
  let recentArticles: any[] = [];

  try {
    const [art, recent] = await Promise.all([
      prisma.article.findUnique({
        where: { slug },
      }),
      prisma.article.findMany({
        where: { isPublished: true, slug: { not: slug } },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
    ]);
    article = art;
    recentArticles = recent;
  } catch (error) {
    console.error('❌ [ArticleDetailPage] Database error:', error);
  }

  if (!article) {
    notFound();
  }

  const articleLD = buildArticleLD({
    title: article.title,
    excerpt: article.excerpt,
    slug: article.slug,
    coverImage: article.coverImage,
    authorName: article.authorName,
    publishedAt: article.publishedAt,
    category: article.category,
  });

  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'Artículos', url: '/articulos' },
    { name: article.title, url: `/articulos/${article.slug}` },
  ]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Link
        href="/articulos"
        className="text-xs text-champagne hover:underline inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a todos los artículos
      </Link>

      {/* Header */}
      <header className="space-y-4 border-b border-stone-border pb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne px-3 py-1 bg-walnut/40 rounded border border-champagne/40 inline-block">
          {article.category}
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-ivory-dim pt-2">
          <span className="flex items-center gap-1.5 text-champagne font-semibold">
            <User className="w-4 h-4" /> {article.authorName}
          </span>
          <span>•</span>
          <time
            dateTime={new Date(article.publishedAt).toISOString()}
            className="flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />{' '}
            {new Date(article.publishedAt).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden relative border border-stone-border shadow-2xl bg-carbon-dark">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-ivory-muted leading-relaxed text-sm md:text-base space-y-6">
        {article.excerpt && (
          <p className="text-lg text-ivory font-serif italic border-l-2 border-champagne pl-4 py-1 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="space-y-4 whitespace-pre-line text-ivory-muted leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* Author Bio Box */}
      <div className="card-carbon p-6 border-champagne/30 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-walnut/60 border border-champagne flex items-center justify-center text-champagne shrink-0">
          <Crown className="w-8 h-8" />
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif-editorial text-base font-bold text-ivory">
            Sobre el autor: {article.authorName}
          </h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Maestro Internacional de Ajedrez FIDE, Medallista de Oro Olímpico en Novi Sad 1990 y Director Técnico de la Academia Alekhins con más de 30 años de experiencia pedagógica formando campeones nacionales e internacionales.
          </p>
          <Link
            href="/roberto-martin-del-campo"
            className="text-xs text-champagne hover:underline inline-block font-semibold"
          >
            Conocer trayectoria y palmarés →
          </Link>
        </div>
      </div>

      {/* More Articles */}
      {recentArticles.length > 0 && (
        <div className="border-t border-stone-border pt-10 space-y-6">
          <h2 className="font-serif-editorial text-2xl font-bold text-ivory">
            Más Artículos de Estrategia &amp; Pedagogía
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentArticles.map((rec) => (
              <Link
                key={rec.id}
                href={`/articulos/${rec.slug}`}
                className="card-carbon p-4 space-y-3 group hover:border-champagne/50 transition block"
              >
                <div className="aspect-video bg-carbon-dark rounded overflow-hidden relative border border-stone-border">
                  <Image
                    src={rec.coverImage}
                    alt={rec.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <span className="text-[10px] text-champagne uppercase font-bold">{rec.category}</span>
                <h4 className="font-serif-editorial text-sm font-bold text-ivory group-hover:text-champagne transition line-clamp-2">
                  {rec.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
