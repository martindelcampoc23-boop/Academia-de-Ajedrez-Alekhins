import React from 'react';
import { prisma } from '@/lib/db';
import { Video as VideoIcon, Play, Lock, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Videoteca & Clases Comentadas | Academia Alekhins',
  description: 'Colección de lecciones en video de táctica, estrategia, aperturas y partidas comentadas por el MI Roberto Martín del Campo.',
};

export const revalidate = 60;

export default async function VideosPage({
  searchParams,
}: {
  searchParams?: { categoria?: string };
}) {
  const selectedCategory = searchParams?.categoria;

  const [categories, videos] = await Promise.all([
    prisma.videoCategory.findMany(),
    prisma.video.findMany({
      where: selectedCategory ? { category: { slug: selectedCategory } } : undefined,
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Formación Audiovisual
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Videoteca Magistral de Ajedrez
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Lecciones magistrales, análisis de partidas históricas y conceptos posicionales explicados paso a paso por el Maestro Internacional Roberto Martín del Campo.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 pt-2 border-b border-stone-border pb-6">
        <Link
          href="/videos"
          className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
            !selectedCategory ? 'bg-champagne text-carbon-dark shadow-gold' : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
          }`}
        >
          Todas las Categorías
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/videos?categoria=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat.slug
                ? 'bg-champagne text-carbon-dark shadow-gold'
                : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="card-carbon p-4 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="aspect-video bg-carbon-dark rounded overflow-hidden relative border border-stone-border group-hover:border-champagne/50 transition">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition">
                  <div className="w-12 h-12 rounded-full bg-champagne text-carbon-dark flex items-center justify-center shadow-gold group-hover:scale-110 transition">
                    {video.isPremium ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-ivory text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.durationMinutes} min
                </span>
                {video.isPremium && (
                  <span className="absolute top-2 left-2 bg-walnut text-champagne text-[9px] font-bold px-2 py-0.5 rounded border border-champagne">
                    Acceso Premium
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-champagne uppercase font-semibold">{video.category.name} • {video.level}</span>
                <h3 className="font-serif-editorial text-base font-bold text-ivory group-hover:text-champagne transition line-clamp-2">
                  {video.title}
                </h3>
              </div>

              <p className="text-xs text-ivory-muted line-clamp-2 leading-relaxed">{video.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-border flex items-center justify-between text-xs text-ivory-dim">
              <span>Prof. {video.instructorName}</span>
              {video.isPremium ? (
                <Link href="/entrenamiento" className="text-champagne font-semibold hover:underline">
                  Ver Planes de Acceso →
                </Link>
              ) : (
                <span className="text-emerald-400 font-semibold">Lección Gratuita</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
