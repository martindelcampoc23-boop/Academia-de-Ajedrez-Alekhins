/**
 * lib/jsonld.ts
 * Funciones utilitarias para generar datos estructurados JSON-LD (Schema.org)
 * Compatible con Google Rich Results: Product, Article, Person, Organization, BreadcrumbList, WebSite
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com';

// ─── Organization (Alekhins) ──────────────────────────────────────────────────
export function buildOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Academia de Ajedrez Alekhins',
    alternateName: 'Alekhins Chess Academy',
    url: BASE_URL,
    logo: `${BASE_URL}/logo-alekhins.png`,
    sameAs: [
      'https://www.facebook.com/AlekhinsAjedrez',
      'https://www.instagram.com/AlekhinsAjedrez',
      'https://www.youtube.com/@AlekhinsAjedrez',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
      telephone: '+52-55-0000-0000',
      email: 'contacto@alekhins.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
      addressLocality: 'Ciudad de México',
    },
    founder: {
      '@type': 'Person',
      name: 'Roberto Abel Martín del Campo Cárdenas',
      jobTitle: 'Maestro Internacional de Ajedrez FIDE',
      url: `${BASE_URL}/roberto-martin-del-campo`,
    },
  };
}

// ─── WebSite (SearchAction para sitelinks) ────────────────────────────────────
export function buildWebSiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Academia de Ajedrez Alekhins',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/tienda?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function buildBreadcrumbLD(
  crumbs: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
}

// ─── Product ──────────────────────────────────────────────────────────────────
export function buildProductLD(product: {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  slug: string;
  images?: { url: string }[];
  category?: { name: string };
  reviews?: { rating: number }[];
}) {
  const url = `${BASE_URL}/producto/${product.slug}`;
  const image = product.images?.[0]?.url || `${BASE_URL}/logo-alekhins.png`;

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [image],
    url,
    brand: {
      '@type': 'Brand',
      name: 'Academia de Ajedrez Alekhins',
    },
    category: product.category?.name || 'Material de Ajedrez',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'MXN',
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
    ...(avgRating && product.reviews
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating.toFixed(1),
            reviewCount: product.reviews.length,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };
}

// ─── TrainingPlan / Course ────────────────────────────────────────────────────
export function buildCourseLD(plan: {
  name: string;
  description: string;
  slug: string;
  price: number;
  level?: string | null;
  modality?: string | null;
  duration?: string | null;
}) {
  const url = `${BASE_URL}/entrenamiento/${plan.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: plan.name,
    description: plan.description,
    url,
    provider: { '@id': `${BASE_URL}/#organization` },
    educationalLevel: plan.level || 'All Levels',
    courseMode: plan.modality || 'online',
    offers: {
      '@type': 'Offer',
      price: plan.price.toFixed(2),
      priceCurrency: 'MXN',
      url,
      availability: 'https://schema.org/InStock',
    },
  };
}

// ─── Article / BlogPosting ────────────────────────────────────────────────────
export function buildArticleLD(article: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  authorName: string;
  publishedAt: Date | string;
  category: string;
}) {
  const url = `${BASE_URL}/articulos/${article.slug}`;
  const image = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${BASE_URL}${article.coverImage}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [image],
    url,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: article.authorName,
      url: `${BASE_URL}/roberto-martin-del-campo`,
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: article.category,
    inLanguage: 'es-MX',
  };
}

// ─── Person (Roberto) ─────────────────────────────────────────────────────────
export function buildPersonLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/roberto-martin-del-campo#person`,
    name: 'Roberto Abel Martín del Campo Cárdenas',
    alternateName: 'MI Roberto Martín del Campo',
    jobTitle: 'Maestro Internacional de Ajedrez FIDE',
    description:
      'Maestro Internacional de Ajedrez FIDE, Medallista de Oro Olímpico en Novi Sad 1990. Fundador y Director Técnico de la Academia de Ajedrez Alekhins.',
    url: `${BASE_URL}/roberto-martin-del-campo`,
    sameAs: [
      'https://ratings.fide.com/profile/593745',
    ],
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: ['Ajedrez', 'Estrategia de Ajedrez', 'Pedagogía del Ajedrez', 'Aperturas de Ajedrez'],
    award: 'Medalla de Oro Olímpica de Ajedrez — Novi Sad 1990 (Equipo México)',
    nationality: 'Mexican',
  };
}
