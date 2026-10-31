import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { ArrowRight, BookOpen, Crown, Calendar, User } from 'lucide-react';
import { buildBreadcrumbLD } from '@/lib/jsonld';

export const metadata = {
  title: 'Blog & Artículos de Ajedrez | Academia Alekhins',
  description:
    'Artículos sobre aperturas, medio juego, finales, táctica, estrategia, torneos y pedagogía del ajedrez por el MI Roberto Martín del Campo Cárdenas.',
  openGraph: {
    title: 'Blog & Artículos | Academia Alekhins',
    description: 'Contenido formativo de alto nivel sobre ajedrez, estrategia y pedagogía.',
    type: 'website',
  },
};

export const revalidate = 60;

const FALLBACK_ARTICLES = [
  {
    id: 'art-1',
    slug: 'como-construir-repertorio-aperturas-solido',
    title: 'Cómo Construir un Repertorio de Aperturas Sólido y Dinámico',
    category: 'Aperturas',
    author: 'MI Roberto Martín del Campo',
    coverImage: '/disculpen_las_aperturas_2.jpg',
    excerpt:
      'Aprende a estructurar tus primeras jugadas según tu estilo de juego, comprendiendo los planes típicos de medio juego en lugar de memorizar variantes de forma mecánica.',
    publishedAt: new Date('2026-09-15'),
  },
  {
    id: 'art-2',
    slug: 'el-arte-de-la-profilaxis-en-el-medio-juego',
    title: 'El Arte de la Profilaxis en el Medio Juego: Prevenir Antes de Atacar',
    category: 'Estrategia',
    author: 'MI Roberto Martín del Campo',
    coverImage: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg',
    excerpt:
      'La profilaxis es el sello de los grandes campeones mundiales como Petrosián y Kárpov. Descubre cómo anticipar las amenazas del rival antes de ejecutar tus propios planes.',
    publishedAt: new Date('2026-08-20'),
  },
  {
    id: 'art-3',
    slug: 'tecnica-indispensable-finales-torres-philidor-lucena',
    title: 'Técnica Indispensable en Finales de Torres: La Posición de Lucena y Philidor',
    category: 'Finales',
    author: 'MI Roberto Martín del Campo',
    coverImage: '/713QtLhmJiL._AC_SX679_.jpg',
    excerpt:
      'El 50% de los finales en competición involucran torres. Conoce el puente de Lucena para ganar y el método de Philidor para salvar tablas teóricas con peón de menos.',
    publishedAt: new Date('2026-07-10'),
  },
];

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

  if (!articles || articles.length === 0) {
    articles = FALLBACK_ARTICLES;
  }

  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'Blog', url: '/articulos' },
  ]);

  const itemListLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Artículos de Ajedrez — Academia Alekhins',
    numberOfItems: articles.length,
    itemListElement: articles.slice(0, 10).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.ajedrezprofesional.com/articulos/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLD) }}
        />

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Divulgación &amp; Cátedra Magistral</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            BLOG &amp; ARTÍCULOS DE AJEDREZ
          </h1>
          <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed font-light">
            Análisis tácticos, repertorios de aperturas, estrategia posicional soviética y consejos pedagógicos redactados por el Maestro Internacional Roberto Martín del Campo y nuestro cuerpo técnico.
          </p>
        </div>

        {/* Grid de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <article
              key={article.id}
              className="bg-[#172B46] rounded-2xl p-6 border border-[#233F65] flex flex-col justify-between space-y-4 hover:border-[#C5A46D] transition shadow-lg group"
            >
              <div className="space-y-4">
                <div className="aspect-video bg-[#0F1D30] rounded-xl overflow-hidden relative border border-[#233F65]">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#C5A46D]">
                  <span className="font-bold uppercase tracking-wider">{article.category}</span>
                  <span className="text-[#9CA3AF] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.publishedAt).toLocaleDateString('es-MX')}
                  </span>
                </div>

                <h2 className="font-serif-editorial text-lg font-bold text-white group-hover:text-[#C5A46D] transition line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-xs text-[#C4CBD4] line-clamp-3 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#233F65] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#9CA3AF]">
                  Por {article.author || 'MI Roberto Martín del Campo'}
                </span>
                <Link
                  href={`/articulos/${article.slug}`}
                  className="text-[#C5A46D] font-bold flex items-center gap-1 hover:underline uppercase text-[11px] tracking-wider"
                >
                  Leer Artículo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
