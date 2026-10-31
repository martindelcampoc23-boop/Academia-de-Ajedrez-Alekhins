'use client';

import React, { useState, useEffect } from 'react';
import {
  Video as VideoIcon,
  Play,
  Lock,
  Clock,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  ExternalLink,
  BookOpen,
  Crown,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface VideoItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  instructorName: string;
  categoryId: string;
  category?: { name: string; slug: string };
  level: string;
  durationMinutes: number;
  description: string;
  tags: string;
  videoUrl: string;
  isPremium: boolean;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar videos
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch('/api/search?q=');
        // También podemos consultar directo si hay endpoint o usar los precargados
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Lista estática enriquecida con la masterclass pública de 4 horas
  const defaultVideos: VideoItem[] = [
    {
      id: 'v-masterclass-4h',
      title: 'Masterclass Pública de Ajedrez: Cátedra de 4 Horas con el MI Roberto Martín del Campo',
      slug: 'masterclass-publica-4-horas-mi-roberto-martin-del-campo',
      thumbnail: 'https://img.youtube.com/vi/EvJB7hol9JA/maxresdefault.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: 'clases-magistrales',
      category: { name: 'Clases Magistrales & En Vivo', slug: 'clases-magistrales' },
      level: 'Todos los Niveles (Iniciación a Maestría)',
      durationMinutes: 245,
      description:
        'Cátedra abierta de más de 4 horas impartida por el Maestro Internacional Roberto Martín del Campo. Análisis magistral de posiciones complejas, cálculo de variantes críticas, comprensión de estructuras de peones y sesión interactiva en vivo con la comunidad de ajedrez.',
      tags: 'masterclass, en vivo, clase pública, roberto martin del campo, tactica, 4 horas',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA&t=12613s',
      isPremium: false,
    },
    {
      id: 'v-calculo-variantes',
      title: 'Cómo Calcular Variantes Largas sin Cometer Errores Tácticos',
      slug: 'como-calcular-variantes-largas',
      thumbnail: '/apertura italiana.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: 'tactica',
      category: { name: 'Táctica y Cálculo', slug: 'tactica' },
      level: 'Intermedio / Avanzado',
      durationMinutes: 48,
      description:
        'En esta lección el MI Roberto Martín del Campo desglosa el método de las jugadas candidatas, cómo organizar el árbol de cálculo mental y cómo prevenir despistes en partidas de torneo oficial.',
      tags: 'táctica, cálculo, combinaciones, maestría',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false,
    },
    {
      id: 'v-siciliana-najdorf',
      title: 'Dominando la Defensa Siciliana Variante Najdorf',
      slug: 'dominando-la-defensa-siciliana-najdorf',
      thumbnail: '/disculpen_las_aperturas_2.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: 'aperturas',
      category: { name: 'Aperturas y Repertorio', slug: 'aperturas' },
      level: 'Avanzado',
      durationMinutes: 62,
      description:
        'Estructuras de peones clave, ideas temáticas de ruptura d5 y f5, contraataque por la columna c abierta y profilaxis de las piezas negras frente al Ataque Inglés y 6.Ag5.',
      tags: 'aperturas, siciliana, najdorf, e4',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false,
    },
    {
      id: 'v-finales-torres',
      title: 'Técnica de Finales Prácticos: Torres y Peones en Competición',
      slug: 'tecnica-finales-practicos-torres',
      thumbnail: '/713QtLhmJiL._AC_SX679_.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: 'finales',
      category: { name: 'Finales y Técnica', slug: 'finales' },
      level: 'Intermedio',
      durationMinutes: 55,
      description:
        'Aprende a ganar finales con pequeña ventaja y a salvar partidas inferiores con la técnica de Lucena y Philidor explicadas de forma práctica por un medallista olímpico.',
      tags: 'finales, torres, tarrasch, philidor',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false,
    },
  ];

  const currentVideos = defaultVideos;

  // Extraer ID de YouTube para embed seguro
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      let videoId = 'EvJB7hol9JA';
      if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      }

      // Parámetro de timestamp si existe
      let startParam = '';
      if (url.includes('t=')) {
        const timePart = url.split('t=')[1].replace('s', '');
        if (timePart) startParam = `&start=${parseInt(timePart)}`;
      }

      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${startParam}`;
    } catch {
      return 'https://www.youtube-nocookie.com/embed/EvJB7hol9JA?autoplay=1';
    }
  };

  const filteredVideos =
    selectedCategory === 'all'
      ? currentVideos
      : currentVideos.filter((v) => v.category?.slug === selectedCategory);

  const featuredVideo = currentVideos[0]; // Masterclass 4 horas

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D3E] border border-[#D8B155]/50 text-[#D8B155] text-xs font-bold uppercase tracking-widest shadow-md">
          <Crown className="w-3.5 h-3.5 text-[#D8B155]" />
          <span>Cátedra en Video & Clases Abiertas</span>
        </div>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-white tracking-tight">
          Videoteca del Maestro Roberto Martín del Campo
        </h1>
        <p className="text-sm text-[#C2CCC0] leading-relaxed">
          Accede a lecciones magistrales, análisis de partidas de élite y sesiones públicas completas para reproducir directamente en la plataforma.
        </p>
      </div>

      {/* REPRODUCTOR EN VIVO / DESTACADO: CLASE PÚBLICA DE 4 HORAS */}
      <section className="bg-[#121E17] border-2 border-[#D8B155]/60 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(216,177,85,0.15)] relative">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0F261B] to-[#121E17] border-b border-[#2B3E34] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#D8B155] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Sesión Especial Destacada • Reproductor Web Integrado
            </span>
            <h2 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white">
              {activeVideo ? activeVideo.title : featuredVideo.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-[#2B3E34] text-xs font-mono text-[#D8B155] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D8B155]" />
              {activeVideo ? `${activeVideo.durationMinutes} min` : '4 Horas Completas (245 min)'}
            </span>
            {activeVideo && activeVideo.slug !== featuredVideo.slug && (
              <button
                onClick={() => setActiveVideo(featuredVideo)}
                className="text-xs text-[#D8B155] hover:underline font-semibold cursor-pointer"
              >
                ← Volver a la Masterclass 4h
              </button>
            )}
          </div>
        </div>

        {/* Video Player Iframe */}
        <div className="aspect-video w-full bg-black relative">
          <iframe
            src={getYouTubeEmbedUrl(activeVideo ? activeVideo.videoUrl : featuredVideo.videoUrl)}
            title={activeVideo ? activeVideo.title : featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Metadata de la clase en reproducción */}
        <div className="p-6 bg-[#0B1510] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1C3328] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1B4D3E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] font-serif font-bold">
                MC
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {activeVideo ? activeVideo.instructorName : featuredVideo.instructorName}
                </p>
                <p className="text-xs text-[#A8B2A6]">
                  Maestro Internacional FIDE • Medallista de Oro Olímpico
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/entrenamiento"
                className="px-4 py-2 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Entrenar con el Maestro</span>
              </Link>
              <a
                href={activeVideo ? activeVideo.videoUrl : featuredVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155] text-[#D8B155] text-xs transition"
                title="Abrir en YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#D2DBD0] leading-relaxed">
            {activeVideo ? activeVideo.description : featuredVideo.description}
          </p>
        </div>
      </section>

      {/* Selector de Categorías */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2B3E34] pb-4">
          <div>
            <h3 className="font-serif-editorial text-2xl font-bold text-white">
              Más Clases & Lecciones Disponibles
            </h3>
            <p className="text-xs text-[#A8B2A6]">
              Haz clic en cualquier clase para reproducirla instantáneamente en el visor principal.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#D8B155] text-[#0B1510] shadow-md'
                  : 'bg-[#121E17] border border-[#2B3E34] text-[#A8B2A6] hover:text-white'
              }`}
            >
              Todos los Videos
            </button>
            <button
              onClick={() => setSelectedCategory('clases-magistrales')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'clases-magistrales'
                  ? 'bg-[#D8B155] text-[#0B1510] shadow-md'
                  : 'bg-[#121E17] border border-[#2B3E34] text-[#A8B2A6] hover:text-white'
              }`}
            >
              Clases Magistrales
            </button>
            <button
              onClick={() => setSelectedCategory('tactica')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'tactica'
                  ? 'bg-[#D8B155] text-[#0B1510] shadow-md'
                  : 'bg-[#121E17] border border-[#2B3E34] text-[#A8B2A6] hover:text-white'
              }`}
            >
              Táctica & Cálculo
            </button>
            <button
              onClick={() => setSelectedCategory('aperturas')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'aperturas'
                  ? 'bg-[#D8B155] text-[#0B1510] shadow-md'
                  : 'bg-[#121E17] border border-[#2B3E34] text-[#A8B2A6] hover:text-white'
              }`}
            >
              Aperturas
            </button>
            <button
              onClick={() => setSelectedCategory('finales')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'finales'
                  ? 'bg-[#D8B155] text-[#0B1510] shadow-md'
                  : 'bg-[#121E17] border border-[#2B3E34] text-[#A8B2A6] hover:text-white'
              }`}
            >
              Finales
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isPlaying = activeVideo?.slug === video.slug || (!activeVideo && video.slug === featuredVideo.slug);
            return (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`group bg-[#121E17] border rounded-xl overflow-hidden p-4 space-y-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isPlaying
                    ? 'border-[#D8B155] shadow-lg shadow-[#D8B155]/20 ring-1 ring-[#D8B155]'
                    : 'border-[#2B3E34] hover:border-[#D8B155]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative border border-[#2B3E34]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          isPlaying
                            ? 'bg-emerald-500 text-black'
                            : 'bg-[#D8B155] text-[#0B1510]'
                        }`}
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#D8B155]" />
                      {video.durationMinutes} min
                    </span>

                    {isPlaying && (
                      <span className="absolute top-2 left-2 bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                        ● Reproduciendo
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-[#D8B155] uppercase font-bold tracking-wider">
                      {video.category?.name || 'Ajedrez'} • {video.level}
                    </span>
                    <h4 className="font-serif-editorial text-base font-bold text-white group-hover:text-[#D8B155] transition line-clamp-2 mt-1">
                      {video.title}
                    </h4>
                  </div>

                  <p className="text-xs text-[#A8B2A6] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2B3E34] flex items-center justify-between text-xs">
                  <span className="text-[#D8B155] font-semibold flex items-center gap-1">
                    <Play className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'Viendo ahora' : 'Reproducir Lección'}</span>
                  </span>
                  <span className="text-[#A8B2A6] text-[11px]">Prof. {video.instructorName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
