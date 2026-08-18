import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  Crown,
  ChevronRight,
  Award,
  BookOpen,
  ShoppingBag,
  Video,
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
  ShieldCheck,
  Flame,
  Clock,
  HelpCircle,
  ExternalLink,
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
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1510] border-b border-[#1C3328] pt-14 pb-20 md:pt-20 md:pb-32">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-25 bg-chessboard-grid" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#0F2E1E]/50 via-[#0F2E1E]/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3D2B]/80 border border-[#D8B155]/50 text-[#D8B155] text-xs font-semibold shadow-md">
              <Crown className="w-3.5 h-3.5" />
              <span>Academia de Alto Nivel • Dirigida por el MI Roberto Martín del Campo</span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white block">Domina el juego.</span>
              <span className="text-[#D8B155] block">Aprende, compite y</span>
              <span className="text-[#D8B155] block">equipa tu pasión.</span>
            </h1>

            {/* Gold Accent Line */}
            <div className="w-20 h-1 bg-[#D8B155] rounded mx-auto lg:mx-0" />

            <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Formación estructurada para niños, jóvenes y adultos. Desde tus primeros movimientos hasta el alto rendimiento y la maestría, con la mejor tienda especializada de ajedrez en México.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/entrenamiento" className="btn-forest-outline w-full sm:w-auto text-sm px-6 py-3.5 flex items-center justify-center gap-2">
                <span>Ver programas de clases</span>
                <ChevronRight className="w-4 h-4 text-[#D8B155]" />
              </Link>

              <Link href="/tienda" className="btn-gold-solid w-full sm:w-auto text-sm px-6 py-3.5 flex items-center justify-center gap-2">
                <span>Explorar tienda oficial</span>
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>

            {/* Auth CTA — siempre visible como HTML estático */}
            <div className="flex items-center gap-3 pt-3 justify-center lg:justify-start">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#D8B155] underline underline-offset-2 transition"
              >
                <User className="w-3.5 h-3.5" />
                Iniciar sesión
              </Link>
              <span className="text-gray-600 text-xs">·</span>
              <Link
                href="/registro"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D8B155] hover:text-[#E8C865] transition"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Crear cuenta de alumno →
              </Link>
            </div>

            {/* Trust Badges Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-[11px] text-[#A8B2A6]">
              <span className="flex items-center gap-1 bg-[#121E17] border border-[#2B3E34] px-3 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-[#D8B155]" /> +500 Alumnos Formados
              </span>
              <span className="flex items-center gap-1 bg-[#121E17] border border-[#2B3E34] px-3 py-1 rounded-full">
                <Star className="w-3 h-3 text-[#D8B155] fill-[#D8B155]" /> 4.9/5 Satisfacción
              </span>
              <span className="flex items-center gap-1 bg-[#121E17] border border-[#2B3E34] px-3 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3 text-[#D8B155]" /> Material FIDE Oficial
              </span>
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
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Entrenadores Titulados</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Maestros Internacionales (MI) y entrenadores certificados por la FIDE con décadas de trayectoria.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Aula Virtual Interactiva</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Clases en vivo, tableros interactivos, análisis de partidas con motores y tareas calificadas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Progreso Medible</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Metodología por niveles claros: desde iniciación y club hasta competencia nacional y rating FIDE.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-12 h-12 rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-editorial text-sm font-bold text-[#0F1713]">Tienda Especializada</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Material reglamentario, relojes digitales DGT, tableros Staunton y envíos rápidos a todo México.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METODOLOGÍA ALEKHINS (Los 4 Pilares del Ajedrez Moderno) */}
      <section className="bg-[#0B1510] py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Sparkles className="w-4 h-4" />
              <span>METODOLOGÍA EXCLUSIVA</span>
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-white">
              Los 4 Pilares del Ajedrez Moderno
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Nuestro sistema de entrenamiento combina la tradición clásica con el análisis moderno por computadora.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] font-serif font-bold text-lg">
                I
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Repertorio & Aperturas</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Construcción de un repertorio sólido y adaptado a tu estilo de juego, entendiendo los planes típicos en lugar de memorizar variantes mecánicas.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] font-serif font-bold text-lg">
                II
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Táctica & Cálculo Profundo</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Entrenamiento diario de visión combinativa, reconocimiento de patrones de mate, clavadas, horquillas y cálculo preciso de variantes.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] font-serif font-bold text-lg">
                III
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Estrategia & Medio Juego</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Dominio de estructuras de peones, casillas débiles, piezas activas versus pasivas y formulación de planes a largo plazo.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155]/60 transition rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center text-[#D8B155] font-serif font-bold text-lg">
                IV
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Técnica en Finales</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Estudio riguroso de finales teóricos de torres, piezas menores y peones para convertir ventajas mínimas en victorias contundentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NUESTROS PROGRAMAS */}
      <section className="bg-[#0B1510] py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-white">
              NUESTROS PROGRAMAS DE ENTRENAMIENTO
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              Grupos reducidos por nivel y edad con sesiones dinámicas, material de estudio y soporte continuo del entrenador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: INICIACIÓN */}
            <div className="bg-[#F9F8F3] rounded-xl overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg"
                    alt="Iniciación al Ajedrez"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#0F2E1E] text-[#D8B155] text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                    Desde 5 años
                  </span>
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    INICIACIÓN (PEONES DEL FUTURO)
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Aprende las reglas, tácticas básicas y fundamentos del juego de forma divertida, estructurada e interactiva.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Movimiento de piezas y leyes del juego
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Patrones básicos de jaque mate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Desarrollo de concentración y memoria
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
            <div className="bg-[#F9F8F3] rounded-xl overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/dgt1500-grey-blue-chess-clock-home.avif"
                    alt="Desarrollo Competitivo"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#D8B155] text-[#0B1510] text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                    Intermedio / Avanzado
                  </span>
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    DESARROLLO & TÁCTICA AVANZADA
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Desarrolla tu estrategia, tácticas complejas y preparación específica para torneos locales, estatales y nacionales.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Repertorio estructurado de aperturas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Análisis de partidas y preparación de rivales
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Manejo de reloj y control del tiempo
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
            <div className="bg-[#F9F8F3] rounded-xl overflow-hidden border border-[#E2DDD2] text-[#0F1713] flex flex-col justify-between shadow-xl group">
              <div>
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  <img
                    src="/713QtLhmJiL._AC_SX679_.jpg"
                    alt="Alto Rendimiento"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#1A3D2B] text-[#D8B155] text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                    Elo 1800+ FIDE
                  </span>
                </div>
                <div className="p-6 space-y-4 text-center">
                  <h3 className="font-serif-editorial text-xl font-bold tracking-wider text-[#0F1713]">
                    ALTO RENDIMIENTO & COMPETICIÓN
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    Entrenamiento intensivo para jugadores que buscan normas de maestro, incremento sostenido de Elo FIDE y títulos oficiales.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-2 text-left pt-2 border-t border-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Mentoría directa con el MI Roberto Martín del Campo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Bases de datos magistrales y novedades teóricas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F2E1E]">♟</span> Preparación psicológica de alta competencia
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
              <span>Ver todos los planes de entrenamiento</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN DEL FUNDADOR / MI ROBERTO MARTÍN DEL CAMPO */}
      <section className="bg-gradient-to-b from-[#0F261B] to-[#0B1510] py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-center">
            <div className="relative inline-block">
              <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D8B155] shadow-2xl mx-auto bg-[#0B1510] flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-[#1A3D2B] border-2 border-[#D8B155] flex items-center justify-center font-serif text-[#D8B155] text-3xl font-bold shadow-xl">
                    MI
                  </div>
                  <div>
                    <h3 className="font-serif-editorial font-bold text-white text-xl">
                      Roberto Martín del Campo
                    </h3>
                    <p className="text-xs text-[#D8B155] font-semibold mt-1">Maestro Internacional FIDE</p>
                    <p className="text-[11px] text-gray-400 mt-2">Fundador & Director Técnico</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 sm:right-4 bg-[#D8B155] text-[#0B1510] font-bold text-xs px-4 py-2 rounded-lg shadow-xl uppercase tracking-wider">
                👑 Maestro Internacional
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Dirección Técnica y Pedagógica</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              MI Roberto Martín del Campo Cárdenas
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Uno de los ajedrecistas y pedagogos más respetados de México. Con más de 30 años de trayectoria competitiva internacional, ha representado a México en múltiples Olimpiadas Mundiales de Ajedrez y ha sido formador de decenas de campeones nacionales, maestros FIDE y atletas de alto rendimiento.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-[#121E17] border border-[#2B3E34] rounded-lg">
                <span className="text-[#D8B155] font-bold text-lg block">Campeón</span>
                <span className="text-[11px] text-gray-400">Nacional de México</span>
              </div>
              <div className="p-3 bg-[#121E17] border border-[#2B3E34] rounded-lg">
                <span className="text-[#D8B155] font-bold text-lg block">Olímpico</span>
                <span className="text-[11px] text-gray-400">Seleccionado Nacional</span>
              </div>
              <div className="p-3 bg-[#121E17] border border-[#2B3E34] rounded-lg col-span-2 sm:col-span-1">
                <span className="text-[#D8B155] font-bold text-lg block">FIDE Trainer</span>
                <span className="text-[11px] text-gray-400">Entrenador Oficial</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/roberto-martin-del-campo"
                className="btn-gold-solid text-xs px-6 py-3 inline-flex items-center gap-2 shadow-lg"
              >
                <span>Conoce su biografía y trayectoria completa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ECOSISTEMA DIGITAL (CÓMO FUNCIONA EL PORTAL DEL ALUMNO) */}
      <section className="bg-[#0B1510] py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <Laptop className="w-4 h-4" />
              <span>TECNOLOGÍA APLICADA AL AJEDREZ</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
              Tu Aula Virtual de Ajedrez
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Una plataforma diseñada para acelerar tu aprendizaje antes, durante y después de cada clase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Tareas y Ejercicios FEN</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Recibe ejercicios tácticos semanales directamente en tu cuenta. Analízalos en tableros interactivos integrados con Lichess y entrega tu solución por escrito.
              </p>
              <span className="text-[11px] text-[#D8B155] font-semibold block">✓ Calificadas con retroalimentación del maestro</span>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Videoteca de Repaso HD</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                ¿Te perdiste una clase o quieres repasar una variante? Todas las clases magistrales se graban y quedan archivadas en tu panel personal con acceso 24/7.
              </p>
              <span className="text-[11px] text-[#D8B155] font-semibold block">✓ Acceso ilimitado durante tu suscripción</span>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E] text-[#D8B155] flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-white">Torneos Internos & Ránking</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Participa en torneos cerrados entre alumnos de la academia con control de tiempo oficial, análisis post-partida y premiación con material de ajedrez.
              </p>
              <span className="text-[11px] text-[#D8B155] font-semibold block">✓ Práctica competitiva periódica</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRODUCTOS DESTACADOS (Light Cream #F6F3EC) */}
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
              PRODUCTOS DESTACADOS DE LA TIENDA
            </h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Material reglamentario avalado por la FIDE y seleccionado para la mejor experiencia de juego.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((p: any) => {
              const image = p.images?.[0]?.url || '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg';
              return (
                <div key={p.id} className="bg-white rounded-xl p-4 border border-[#E2DDD2] flex flex-col justify-between shadow-sm hover:shadow-md transition group">
                  <div className="space-y-3 text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                      <img src={image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>

                    <h4 className="font-serif-editorial text-xs font-bold text-[#0F1713] line-clamp-2 min-h-[32px]">
                      {p.name}
                    </h4>

                    <span className="text-sm font-extrabold text-[#0F1713] block">
                      ${p.price.toFixed(0)} MXN
                    </span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href={`/producto/${p.slug}`}
                      className="btn-forest-solid text-[11px] py-2 px-3 rounded w-full flex items-center justify-center gap-1.5"
                    >
                      <CartIcon className="w-3.5 h-3.5" />
                      Ver detalles
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link href="/tienda" className="btn-forest-outline text-xs px-8 py-3.5 inline-flex items-center gap-2">
              <span>Ir a la tienda completa</span>
              <ShoppingBag className="w-4 h-4 text-[#D8B155]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. MEMBRESÍAS Y CLASES PROMO BANNER (Dark Green #0F261B) */}
      <section className="bg-[#0F261B] text-white py-12 border-y border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-[#1A3D2B] text-[#D8B155] flex items-center justify-center shrink-0 border border-[#D8B155] shadow-lg">
              <Crown className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8B155] block">MEMBRESÍAS MENSUALES</span>
              <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white">
                Planes desde <span className="text-[#D8B155]">699 MXN</span> al mes
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">Sin plazos forzosos. Cancela en cualquier momento.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/entrenamiento" className="btn-gold-solid text-xs px-6 py-3.5 shadow-md">
              Explorar planes de estudio &gt;
            </Link>
          </div>
        </div>
      </section>

      {/* 9. POR QUÉ ELEGIRNOS */}
      <section className="bg-[#F6F3EC] text-[#0F1713] py-20 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-[#0F1713]">
              NUESTROS RESULTADOS EN NÚMEROS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3 p-4 bg-white rounded-xl border border-[#E2DDD2] shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-3xl font-bold text-[#0F1713]">+500</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">ALUMNOS ACTIVOS</span>
              <p className="text-xs text-gray-600">Niños, jóvenes y adultos formados con pasión y disciplina.</p>
            </div>

            <div className="text-center space-y-3 p-4 bg-white rounded-xl border border-[#E2DDD2] shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <User className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-3xl font-bold text-[#0F1713]">+10</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">COACHES FIDE</span>
              <p className="text-xs text-gray-600">Maestros Internacionales y entrenadores con certificación oficial.</p>
            </div>

            <div className="text-center space-y-3 p-4 bg-white rounded-xl border border-[#E2DDD2] shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <PackageCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-3xl font-bold text-[#0F1713]">+120</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">PRODUCTOS OFICIALES</span>
              <p className="text-xs text-gray-600">Sets, relojes DGT, tableros y bibliografía de ajedrez en catálogo.</p>
            </div>

            <div className="text-center space-y-3 p-4 bg-white rounded-xl border border-[#E2DDD2] shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0F2E1E] text-[#D8B155] flex items-center justify-center shadow-md">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-3xl font-bold text-[#0F1713]">+30</h3>
              <span className="text-xs font-bold uppercase text-[#0F1713] block">TORNEOS REALIZADOS</span>
              <p className="text-xs text-gray-600">Competencias internas, festivales infantiles y torneos abiertos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIOS */}
      <section className="bg-[#0B1510] text-white py-20 border-b border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#D8B155]" />
              <Crown className="w-4 h-4" />
              <span className="w-8 h-[1px] bg-[#D8B155]" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold tracking-wider text-white">
              HISTORIAS DE ÉXITO DE NUESTRA COMUNIDAD
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Conoce las experiencias de nuestros alumnos y familias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#13221B] border border-[#21392D] rounded-xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  MR
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Mateo R. (11 años)</h4>
                  <p className="text-[11px] text-gray-400">Campeón Estatal Sub-12</p>
                  <div className="flex text-[#D8B155] text-xs mt-0.5">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;Las clases con el MI Roberto cambiaron mi visión del ajedrez. Antes jugaba por intuición, ahora tengo planes claros y aumenté 200 puntos de rating en 6 meses.&quot;
              </p>
            </div>

            <div className="bg-[#13221B] border border-[#21392D] rounded-xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  AG
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Ana Gabriela S.</h4>
                  <p className="text-[11px] text-gray-400">Mamá de alumno en Iniciación</p>
                  <div className="flex text-[#D8B155] text-xs mt-0.5">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;La paciencia y pedagogía para niños pequeños es impresionante. Mi hijo espera emocionado cada sábado su clase y el portal de tareas es súper interactivo.&quot;
              </p>
            </div>

            <div className="bg-[#13221B] border border-[#21392D] rounded-xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1E] border border-[#D8B155] flex items-center justify-center font-bold text-[#D8B155]">
                  CD
                </div>
                <div>
                  <h4 className="font-serif-editorial text-sm font-bold text-white">Carlos D.</h4>
                  <p className="text-[11px] text-gray-400">Jugador de Club (Adulto)</p>
                  <div className="flex text-[#D8B155] text-xs mt-0.5">★★★★★</div>
                </div>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                &quot;Excelente material en la videoteca y los sets de ajedrez que compré llegaron impecables y súper rápido. 100% recomendado para cualquier apasionado del ajedrez.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ RÁPIDO EN PORTADA */}
      <section className="bg-[#0F261B] py-20 border-b border-[#1C3328]">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#D8B155] text-xs font-bold uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              <span>PREGUNTAS FRECUENTES</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
              ¿Tienes dudas antes de comenzar?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
              <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#D8B155]">♟</span> ¿A partir de qué edad pueden tomar clases?
              </h3>
              <p className="text-xs text-gray-300 pl-5 leading-relaxed">
                Recibimos alumnos desde los 5 años en el programa de Iniciación hasta jóvenes y adultos en niveles avanzados y de maestría.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
              <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#D8B155]">♟</span> ¿Qué pasa si no puedo asistir a una clase en vivo?
              </h3>
              <p className="text-xs text-gray-300 pl-5 leading-relaxed">
                Todas las clases quedan grabadas en alta definición y se suben a tu videoteca privada para que las repases cuando quieras.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
              <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#D8B155]">♟</span> ¿Realizan envíos de material a todo México?
              </h3>
              <p className="text-xs text-gray-300 pl-5 leading-relaxed">
                Sí, enviamos con FedEx, DHL y Estafeta con número de guía rastreable y empaque de alta protección para relojes y piezas.
              </p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
              <h3 className="font-serif-editorial text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#D8B155]">♟</span> ¿Hay contratos forzosos en las mensualidades?
              </h3>
              <p className="text-xs text-gray-300 pl-5 leading-relaxed">
                Ninguno. Puedes cancelar o pausar tu suscripción mensual en cualquier momento directamente desde tu panel de usuario.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link href="/faq" className="text-xs text-[#D8B155] hover:underline inline-flex items-center gap-1 font-semibold">
              Ver todas las preguntas frecuentes (FAQ) →
            </Link>
          </div>
        </div>
      </section>

      {/* 12. PRE-FOOTER CTA BANNER */}
      <section className="bg-gradient-to-r from-[#0B1510] via-[#0F2E1E] to-[#0B1510] text-white py-16 border-t border-[#1C3328]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">
              <span className="text-white block">Lleva tu ajedrez</span>
              <span className="text-[#D8B155] block">al siguiente nivel</span>
            </h2>
            <p className="text-xs text-gray-300">Agenda una clase diagnóstica y descubre tu potencial.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/entrenamiento" className="btn-gold-solid text-sm px-8 py-4 shadow-xl">
              <GraduationCap className="w-4 h-4" />
              Ver Planes de Entrenamiento
            </Link>
            <Link href="/clubes-y-escuelas" className="btn-forest-outline text-sm px-6 py-4">
              <span>Contacto y Convenios</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
