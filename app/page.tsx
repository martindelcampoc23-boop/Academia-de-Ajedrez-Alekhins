import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  Crown,
  ChevronRight,
  ChevronLeft,
  Award,
  BookOpen,
  ShoppingBag,
  Video,
  Building2,
  Users,
  CheckCircle,
  Star,
  Sparkles,
  ArrowRight,
  Laptop,
  TrendingUp,
  Trophy,
  GraduationCap,
  PackageCheck,
  User,
  ShoppingBag as CartIcon
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let featuredPlans: any[] = [];

  try {
    const [products, plans] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        take: 5,
        include: { images: true, variants: true, category: true },
      }),
      prisma.trainingPlan.findMany({
        where: { isPublished: true },
        take: 3,
      }),
    ]);
    featuredProducts = products;
    featuredPlans = plans;
  } catch (error) {
    console.warn('⚠️ [HomePage] Database query fallback:', error);
  }

  return (
    <div className="space-y-0 text-white font-sans">
      {/* 1. HERO SECTION (Exact Screenshot Styling) */}
      <section className="relative overflow-hidden bg-[#0B1510] border-b border-[#1C3328] pt-16 pb-24 md:pt-24 md:pb-36">
        {/* Background Image Overlay simulation */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-chessboard-grid" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0F2E1E]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white block">Domina el juego.</span>
              <span className="text-[#D8B155] block">Aprende, compite y</span>
              <span className="text-[#D8B155] block">equipa tu pasión.</span>
            </h1>

            {/* Gold Accent Line */}
            <div className="w-20 h-1 bg-[#D8B155] rounded mx-auto lg:mx-0" />

            <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Academia de ajedrez para niños, jóvenes y adultos. Formación de alto nivel y la mejor tienda especializada en productos de ajedrez.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/entrenamiento" className="btn-forest-outline w-full sm:w-auto text-sm px-6 py-3.5">
                <span>Ver programas</span>
                <ChevronRight className="w-4 h-4 text-[#D8B155]" />
              </Link>

              <Link href="/tienda" className="btn-gold-solid w-full sm:w-auto text-sm px-6 py-3.5">
                <span>Comprar ahora</span>
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE HIGHLIGHTS BAR (Light Cream Background #F6F3EC) */}
      <section className="bg-[#F6F3EC] text-[#0F1713] py-10 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Entrenadores expertos</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                GM, MI y entrenadores certificados con amplia experiencia competitiva.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Clases online y presenciales</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Modalidades flexibles para aprender donde y cuando quieras.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Programas para todos los niveles</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Desde principiantes hasta jugadores avanzados y competidores.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Tienda especializada</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Productos seleccionados para mejorar tu juego y experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTROS PROGRAMAS (Dark Forest Background #0B1510) */}
      <section className="bg-[#0B1510] py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-white">
              NUESTROS PROGRAMAS
            </h2>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: INICIACIÓN */}
            <div className="bg-[#F9F8F3] rounded-lg overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg"
                    alt="Iniciación"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    INICIACIÓN
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Aprende las reglas, tácticas básicas y fundamentos del juego de forma divertida y estructurada.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Para niños y principiantes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Clases grupales y personalizadas
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0 text-center">
                <Link href="/entrenamiento/iniciacion-al-ajedrez" className="btn-forest-solid text-xs py-2.5 px-6 rounded-full w-full">
                  Más información &gt;
                </Link>
              </div>
            </div>

            {/* Card 2: COMPETITIVO */}
            <div className="bg-[#F9F8F3] rounded-lg overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/dgt1500-grey-blue-chess-clock-home.avif"
                    alt="Competitivo"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    COMPETITIVO
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Desarrolla tu estrategia, tácticas y preparación para torneos locales y nacionales.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Intermedios y avanzados
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Análisis de partidas y torneos
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0 text-center">
                <Link href="/entrenamiento/desarrollo-y-tactica-avanzada" className="btn-forest-solid text-xs py-2.5 px-6 rounded-full w-full">
                  Más información &gt;
                </Link>
              </div>
            </div>

            {/* Card 3: ALTO RENDIMIENTO */}
            <div className="bg-[#F9F8F3] rounded-lg overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/713QtLhmJiL._AC_SX679_.jpg"
                    alt="Alto Rendimiento"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    ALTO RENDIMIENTO
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Entrenamiento intensivo para jugadores que buscan alcanzar su máximo nivel y competir al más alto nivel.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Entrenamiento personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Mentorías con maestros
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0 text-center">
                <Link href="/entrenamiento/alto-rendimiento-y-competicion" className="btn-forest-solid text-xs py-2.5 px-6 rounded-full w-full">
                  Más información &gt;
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/entrenamiento" className="btn-forest-outline text-xs px-8 py-3.5 inline-flex items-center gap-2">
              <span>Ver todos los programas</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTOS DESTACADOS (Light Cream #F6F3EC) */}
      <section className="bg-[#F6F3EC] text-[#0F1713] py-20 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-[#0F1713]">
              PRODUCTOS DESTACADOS
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((p: any) => {
              const image = p.images?.[0]?.url || '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg';
              return (
                <div key={p.id} className="bg-white rounded-lg p-4 border border-[#E2DDD2] flex flex-col justify-between shadow-sm group">
                  <div className="space-y-3 text-center">
                    <div className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                      <img src={image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>

                    <h4 className="font-serif-editorial text-xs font-bold text-[#0F1713] line-clamp-2 min-h-[32px]">
                      {p.name}
                    </h4>

                    <span className="text-xs font-extrabold text-[#0F1713] block">
                      ${p.price.toFixed(0)} MXN
                    </span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href={`/producto/${p.slug}`}
                      className="btn-forest-solid text-[11px] py-2 px-3 rounded w-full flex items-center justify-center gap-1.5"
                    >
                      <CartIcon className="w-3.5 h-3.5" />
                      Agregar al carrito
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MEMBRESÍAS Y CLASES PROMO BANNER (Dark Green #0F261B) */}
      <section className="bg-[#0F261B] text-white py-10 border-y border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#1A3D2B] text-[#D8B155] flex items-center justify-center shrink-0 border border-[#D8B155]">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8B155] block">MEMBRESÍAS Y CLASES</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white">
                Planes desde <span className="text-[#D8B155]">699 MXN</span> al mes
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-300 hidden lg:inline">Solicita información sobre nuestros planes</span>
            <Link href="/entrenamiento" className="btn-gold-solid text-xs px-6 py-3 shadow-md">
              Quiero más información &gt;
            </Link>
          </div>
        </div>
      </section>

      {/* 6. POR QUÉ ELEGIRNOS (Light Cream #F6F3EC) */}
      <section className="bg-[#F6F3EC] text-[#0F1713] py-20 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-[#0F1713]">
              POR QUÉ ELEGIRNOS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3 p-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0F1713]">+500</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">ALUMNOS</span>
              <p className="text-xs text-gray-600">Formados con pasión y disciplina.</p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <User className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0F1713]">+10</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">COACHES</span>
              <p className="text-xs text-gray-600">Grandes maestros y entrenadores certificados.</p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <PackageCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0F1713]">+120</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">PRODUCTOS</span>
              <p className="text-xs text-gray-600">Seleccionados para mejorar tu experiencia.</p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#0F1713]">+30</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">TORNEOS</span>
              <p className="text-xs text-gray-600">Organizados y participaciones en torneos oficiales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LO QUE DICEN NUESTROS ALUMNOS (Dark Carbon #0B1510) */}
      <section className="bg-[#0B1510] text-white py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-white">
              LO QUE DICEN NUESTROS ALUMNOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#13221B] border border-[#21392D] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  MR
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Mateo R.</h4>
                  <div className="flex text-[#D8B155] text-xs">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;Las clases han mejorado mi juego y mi confianza. ¡Ahora disfruto cada partida!&quot;
              </p>
            </div>

            <div className="bg-[#13221B] border border-[#21392D] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  AS
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Ana Sofía G.</h4>
                  <div className="flex text-[#D8B155] text-xs">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;Los entrenadores son increíbles. He aprendido más de lo que imaginé en tan poco tiempo.&quot;
              </p>
            </div>

            <div className="bg-[#13221B] border border-[#21392D] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  CD
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Carlos y Diego</h4>
                  <div className="flex text-[#D8B155] text-xs">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;Excelente academia. Mi hijo ha avanzado muchísimo y se siente motivado cada día.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA BANNER */}
      <section className="bg-gradient-to-r from-[#0B1510] via-[#0F2E1E] to-[#0B1510] text-white py-16 border-t border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              <span className="text-white block">Lleva tu ajedrez</span>
              <span className="text-[#D8B155] block">al siguiente nivel</span>
            </h2>
            <p className="text-xs text-gray-300">Agenda una clase muestra y descubre tu potencial.</p>
          </div>

          <Link href="/entrenamiento" className="btn-gold-solid text-sm px-8 py-4 shadow-xl">
            <ShoppingBag className="w-4 h-4" />
            Agenda una clase muestra
          </Link>
        </div>
      </section>
    </div>
  );
}
