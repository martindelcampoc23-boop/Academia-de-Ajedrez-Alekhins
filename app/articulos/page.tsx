import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Artículos & Publicaciones de Ajedrez | Academia Alekhins',
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Divulgación & Estrategia
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Artículos & Publicaciones del Maestro
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Análisis posicionales, historias de campeonatos mundiales, consejos pedagógicos para padres y artículos sobre la preparación en ajedrez competitivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="card-carbon p-6 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="aspect-video bg-carbon-dark rounded overflow-hidden relative border border-stone-border">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <span className="text-[10px] text-champagne uppercase font-bold tracking-wider">{article.category}</span>
              <h3 className="font-serif-editorial text-lg font-bold text-ivory group-hover:text-champagne transition line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-ivory-muted line-clamp-3 leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-stone-border flex items-center justify-between text-xs text-ivory-dim">
              <span>{new Date(article.publishedAt).toLocaleDateString('es-MX')}</span>
              <span className="text-champagne font-semibold flex items-center gap-1 group-hover:underline">
                Leer Artículo <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
