import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { AnimatedLogoHero } from '@/components/ui/AnimatedLogoHero';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FloatingBanner } from '@/components/ui/FloatingBanner';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { AulaVirtualSection } from '@/components/home/AulaVirtualSection';
import { ModalidadesSection } from '@/components/home/ModalidadesSection';
import { getFeaturedStoreProducts } from '@/lib/storeData';
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
  Medal,
  MessageCircle,
  Target,
  Check
} from 'lucide-react';

export const revalidate = 60;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default async function HomePage() {
  let featuredProducts: any[] = [];

  try {
    featuredProducts = await prisma.product.findMany({
      where: { isPublished: true },
      take: 4,
      include: { images: true, variants: true, category: true },
    });
  } catch (error) {
    console.warn('⚠️ [HomePage] Database query fallback:', error);
  }

  // Fallback de productos si la base de datos está offline
  if (!featuredProducts || featuredProducts.length === 0) {
    featuredProducts = getFeaturedStoreProducts(4);
  }

  return (
    <div className="space-y-0 text-[#FAF8F2] font-sans selection:bg-[#C5A46D] selection:text-[#0F1D30]">

      {/* =========================================================
          1. HERO PRINCIPAL: INSTITUCIÓN INTERNACIONAL DE AJEDREZ
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F1D30] via-[#172B46] to-[#0F1D30] border-b border-[#1C3454] pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
            {/* Texto y Propuesta de Valor */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F1D30] border border-[#C5A46D]/60 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
                <Crown className="w-3.5 h-3.5" />
                <span>Institución de Ajedrez Profesional • ajedrezprofesional.com</span>
              </div>

              <h1 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                ACADEMIA ALEKHINS
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Formación ajedrecística de alto nivel para niños, jóvenes y competidores internacionales. Metodología probada bajo la dirección académica del <strong>Maestro Internacional Roberto Martín del Campo Cárdenas</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/programas"
                  className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-7 shadow-lg"
                >
                  Conocer Programas Académicos
                </Link>
                <Link
                  href="/clases-personalizadas"
                  className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6"
                >
                  Clases Personalizadas 1 a 1
                </Link>
                <a
                  href="#aula-virtual"
                  className="text-xs sm:text-sm text-[#C5A46D] hover:text-white font-bold inline-flex items-center gap-2 py-3 px-4 rounded-xl bg-[#172B46]/80 border border-[#233F65] hover:border-[#C5A46D] transition"
                >
                  <Laptop className="w-4 h-4 text-[#C5A46D]" />
                  <span>Aula Virtual Chessgora</span>
                </a>
              </div>

              {/* Sellos de Confianza */}
              <div className="pt-6 border-t border-[#1C3454] grid grid-cols-3 gap-4 text-center lg:text-left text-xs text-[#C4CBD4]">
                <div>
                  <strong className="text-white block text-sm sm:text-base font-serif-editorial text-[#C5A46D]">
                    4 Olimpiadas
                  </strong>
                  <span>Representación de México</span>
                </div>
                <div>
                  <strong className="text-white block text-sm sm:text-base font-serif-editorial text-[#C5A46D]">
                    Chessgora.com
                  </strong>
                  <span>Aula Virtual Integrada</span>
                </div>
                <div>
                  <strong className="text-white block text-sm sm:text-base font-serif-editorial text-[#C5A46D]">
                    Material FIDE
                  </strong>
                  <span>Tienda Especializada</span>
                </div>
              </div>
            </div>

            {/* Imagen Principal del Maestro Roberto Martín del Campo */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-[#C5A46D] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(197,164,109,0.25)] bg-[#172B46]">
                <Image
                  src="/maestro-roberto.jpg"
                  alt="MI Roberto Martín del Campo Cárdenas — Director Académico de Academia Alekhins"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1D30] via-[#0F1D30]/80 to-transparent p-6 text-center">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#C5A46D] block">
                    Director Académico
                  </span>
                  <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-white">
                    MI Roberto Martín del Campo Cárdenas
                  </h3>
                  <p className="text-xs text-[#C4CBD4]">
                    FIDE ID: 5100046 • Peak Elo 2485 • Oro Olímpico Novi Sad 1990
                  </p>
                  <Link
                    href="/la-academia/director"
                    className="text-[11px] text-[#C5A46D] hover:underline font-bold inline-block mt-2"
                  >
                    Ver Currículum Deportivo Completo →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          2. PRESENTACIÓN DE ACADEMIA ALEKHINS & TRAYECTORIA
      ========================================================= */}
      <section className="py-16 md:py-24 bg-[#0F1D30] border-b border-[#1C3454]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Institución & Trayectoria
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
              Cátedra, Metodología y Tradición Ajedrecística
            </h2>
            <p className="text-sm text-[#C4CBD4] leading-relaxed">
              Academia Alekhins es una institución dedicada a formar mentes analíticas, estratégicas y competitivas mediante la metodología clásica perfeccionada por Grandes Maestros y tecnología interactiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-base font-bold text-white">
                Dirección Titulada FIDE
              </h3>
              <p className="text-[#C4CBD4] leading-relaxed">
                Cada programa pedagógico está supervisado directamente por el MI Roberto Martín del Campo, garantizando que el contenido enseñado responda a los más altos estándares mundiales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-base font-bold text-white">
                Progresión Garantizada
              </h3>
              <p className="text-[#C4CBD4] leading-relaxed">
                Niveles ordenados desde los fundamentos hasta el alto rendimiento. Cada etapa cuenta con temarios medibles y evaluaciones continuas para certificar el avance del alumno.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3 hover:border-[#C5A46D] transition">
              <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-base font-bold text-white">
                Aula Virtual Chessgora
              </h3>
              <p className="text-[#C4CBD4] leading-relaxed">
                Nuestra plataforma tecnológica oficial permite resolver ejercicios diarios, analizar partidas con módulos y acceder a grabaciones sin costo adicional.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/la-academia/director"
              className="text-xs sm:text-sm text-[#C5A46D] hover:underline font-bold inline-flex items-center gap-1.5 p-2 rounded-xl hover:bg-[#172B46] transition"
            >
              <span>Conoce la trayectoria y currículum deportivo completo del MI Roberto Martín del Campo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. MODALIDADES FORMATIVAS CON SWITCH DE MONEDA (MXN / USD)
      ========================================================= */}
      <ModalidadesSection />

      {/* =========================================================
          4. TIENDA DE MATERIAL ESPECIALIZADO DE AJEDREZ
      ========================================================= */}
      <section className="py-16 md:py-24 bg-[#172B46] border-b border-[#233F65]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                Comercio Especializado
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white mt-1">
                Material de Competición & Estudio
              </h2>
            </div>
            <Link
              href="/tienda"
              className="text-xs text-[#C5A46D] hover:underline font-bold inline-flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Ver catálogo completo de la tienda</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p: any) => {
              const image = p.images?.[0]?.url || '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg';
              return (
                <div
                  key={p.id}
                  className="bg-[#0F1D30] rounded-2xl p-5 border border-[#233F65] flex flex-col justify-between hover:border-[#C5A46D] transition shadow-lg group"
                >
                  <div className="space-y-4">
                    <div className="aspect-square bg-[#172B46] rounded-xl overflow-hidden relative border border-[#233F65]">
                      <img
                        src={image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <WishlistButton productId={p.id} productName={p.name} />
                    </div>

                    <h4 className="font-serif-editorial text-sm font-bold text-white line-clamp-2 min-h-[40px] group-hover:text-[#C5A46D] transition">
                      {p.name}
                    </h4>

                    <span className="text-lg font-extrabold text-[#C5A46D] block">
                      ${p.price.toFixed(0)} MXN
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#1C3454] mt-4">
                    <Link
                      href={`/producto/${p.slug}`}
                      className="btn-navy-outline w-full text-center text-xs uppercase font-bold py-2.5 block hover:bg-[#C5A46D] hover:text-[#0F1D30] transition"
                    >
                      Ver Producto
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ESCUELAS, CLUBES Y CONVENIOS INSTITUCIONALES
      ========================================================= */}
      <section className="py-16 md:py-24 bg-[#0F1D30] border-b border-[#1C3454]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
                Convenios Educativos
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
                Ajedrez para Colegios, Universidades y Clubes
              </h2>
              <p className="text-xs sm:text-sm text-[#C4CBD4] leading-relaxed max-w-2xl font-light">
                Implementamos programas de ajedrez curricular y extracurricular en instituciones educativas. Capacitación a profesores, dotación de material homologado y torneos intercolegiales con aval académico.
              </p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right">
              <Link
                href="/clubes-y-escuelas"
                className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-6"
              >
                Solicitar Cotización Escolar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. AULA VIRTUAL & BENEFICIOS PARA ALUMNOS (CHESSGORA.COM)
      ========================================================= */}
      <AulaVirtualSection />

      {/* =========================================================
          7. PREGUNTAS FRECUENTES (FAQ)
      ========================================================= */}
      <section className="py-16 md:py-24 bg-[#172B46] border-b border-[#233F65]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Resolución de Dudas
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A46D] shrink-0" />
                ¿A partir de qué edad se puede ingresar?
              </h4>
              <p className="text-[#C4CBD4] leading-relaxed">
                Aceptamos alumnos desde los 6 años en nuestro Grupo de Ajedrez Inicial, así como jóvenes y adultos en todas las modalidades.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A46D] shrink-0" />
                ¿Qué necesito para tomar las clases en línea?
              </h4>
              <p className="text-[#C4CBD4] leading-relaxed">
                Una computadora o tableta con conexión a internet estable. Las sesiones se transmiten con tableros interactivos en vivo y videoconferencia.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A46D] shrink-0" />
                ¿Cómo recibo el acceso a Chessgora.com?
              </h4>
              <p className="text-[#C4CBD4] leading-relaxed">
                Al confirmar tu inscripción en cualquiera de nuestros programas, te habilitamos tu cuenta de alumno para acceder de forma ilimitada.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1D30] border border-[#233F65] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A46D] shrink-0" />
                ¿Hacen envíos de material a todo México y el mundo?
              </h4>
              <p className="text-[#C4CBD4] leading-relaxed">
                Sí. Nuestra tienda despacha pedidos con paquetería express rastreable a cualquier estado de la República Mexicana y cotizamos envíos internacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. LLAMADA A LA ACCIÓN FINAL & CONTACTO DIRECTO
      ========================================================= */}
      <section className="py-16 md:py-24 bg-[#0F1D30] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <Crown className="w-10 h-10 text-[#C5A46D] mx-auto" />
          <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-white">
            Comienza tu camino hacia la maestría ajedrecística
          </h2>
          <p className="text-sm text-[#C4CBD4] leading-relaxed">
            Ponte en contacto con nuestro equipo docente para evaluar tu nivel y orientarte sobre el programa más adecuado para ti o tu familia.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola, deseo asesoría para inscribirme a Academia Alekhins.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-8 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Atención Inmediata por WhatsApp (+52 999 102 0078)
            </a>
            <Link
              href="/contacto"
              className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6"
            >
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Banner flotante */}
      <FloatingBanner />

    </div>
  );
}
