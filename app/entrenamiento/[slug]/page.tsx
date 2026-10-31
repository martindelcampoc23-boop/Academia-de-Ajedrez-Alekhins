import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  CheckCircle,
  ShieldCheck,
  Calendar,
  Clock,
  CreditCard,
  Lock,
  ArrowLeft,
  Laptop,
  Crown,
  Sparkles,
  MessageCircle,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { buildCourseLD, buildBreadcrumbLD } from '@/lib/jsonld';

export const revalidate = 60;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

const STATIC_PLANS: Record<string, any> = {
  'entrenamiento-personalizado': {
    id: 'plan-personalizado',
    name: 'Entrenamiento Personalizado',
    slug: 'entrenamiento-personalizado',
    price: 5000,
    level: 'Todos los niveles (1 a 1)',
    ageGroup: 'Todas las edades',
    modality: 'Online individual en vivo (60 minutos por sesión)',
    duration: 'Paquete de 10 sesiones ($5,000 MXN) o individual ($600 MXN)',
    classCount: 10,
    description:
      'Programa individual de entrenamiento impartido por el Maestro Internacional Roberto Martín del Campo Cárdenas. Cada alumno recibe una preparación adaptada a su nivel, estilo de juego y objetivos competitivos.',
    syllabus:
      'Sesiones individuales de 60 minutos. Plan de entrenamiento personalizado. Material didáctico y ejercicios específicos. Trabajo de aperturas, medio juego y finales. Análisis y corrección de partidas. Tareas y actividades para trabajar en casa. Acceso a la plataforma de entrenamiento Chessgora.com.',
    benefits: 'Atención 100% individualizada con el MI Roberto Martín del Campo Cárdenas.',
    includes: '10 sesiones de 60 min + Plataforma Chessgora.com',
  },
  'entrenamiento-competitivo': {
    id: 'plan-competitivo',
    name: 'Entrenamiento Competitivo',
    slug: 'entrenamiento-competitivo',
    price: 699,
    level: 'Jugadores de menos de 2000 puntos Elo',
    ageGroup: 'Juvenil y Adultos',
    modality: 'Martes a viernes, 6:00 p. m. a 7:00 p. m.',
    duration: 'Mensual renovable (4 días de entrenamiento por semana)',
    classCount: 16,
    description:
      'Programa de entrenamiento grupal para jugadores que desean fortalecer sus conocimientos, mejorar su comprensión estratégica y desarrollar habilidades competitivas mediante un entrenamiento constante y estructurado.',
    syllabus:
      'Clases grupales en vivo. Entrenamiento táctico y cálculo de variantes. Estrategia y planificación. Estudio y construcción de repertorio de aperturas. Análisis de partidas. Técnica de finales. Material de entrenamiento. Acceso a la plataforma Chessgora.com. Actividades interactivas para practicar fuera de clase.',
    benefits: '4 días de entrenamiento por semana (16 horas mensuales).',
    includes: 'Clases en vivo + Plataforma Chessgora.com',
  },
  'ajedrez-inicial': {
    id: 'plan-inicial',
    name: 'Grupo de Ajedrez Inicial',
    slug: 'ajedrez-inicial',
    price: 500,
    level: 'Principiantes',
    ageGroup: 'Niños, jóvenes y adultos',
    modality: 'Lunes, miércoles y jueves, 6:00 p. m. a 7:00 p. m.',
    duration: 'Mensual renovable (3 días de entrenamiento por semana)',
    classCount: 12,
    description:
      'Programa diseñado para niños, jóvenes y adultos que desean aprender ajedrez desde sus fundamentos. Las clases son impartidas por nuestros especialistas en enseñanza inicial, utilizando una metodología didáctica, progresiva y dinámica.',
    syllabus:
      'Clases grupales en vivo. Reglas y fundamentos del ajedrez. Principios básicos de apertura. Táctica y combinaciones. Introducción a la estrategia. Jaque mate y finales básicos. Material didáctico. Actividades y ejercicios para casa. Acceso a la plataforma Chessgora.com.',
    benefits: '3 días de entrenamiento por semana (12 horas mensuales).',
    includes: 'Clases en vivo + Plataforma Chessgora.com',
  },
};

async function getPlan(slug: string) {
  try {
    const dbPlan = await prisma.trainingPlan.findUnique({ where: { slug } });
    if (dbPlan) return dbPlan;
  } catch (err) {
    console.warn(`[PlanDetailPage] Falling back for slug: ${slug}`);
  }
  return STATIC_PLANS[slug] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = await getPlan(params.slug);
  if (!plan) return { title: 'Plan no encontrado | All-In Chess' };
  return {
    title: `${plan.name} | All-In Chess`,
    description: plan.description.slice(0, 155),
    openGraph: {
      title: `${plan.name} | All-In Chess`,
      description: plan.description.slice(0, 155),
      type: 'website',
    },
    twitter: { card: 'summary', title: plan.name },
  };
}

export default async function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = await getPlan(params.slug);

  if (!plan) notFound();

  const courseLD = buildCourseLD({
    name: plan.name,
    description: plan.description,
    slug: plan.slug,
    price: plan.price,
    level: plan.level,
    modality: plan.modality,
    duration: plan.duration,
  });

  const breadcrumbLD = buildBreadcrumbLD([
    { name: 'Inicio', url: '/' },
    { name: 'Clases', url: '/entrenamiento' },
    { name: plan.name, url: `/entrenamiento/${plan.slug}` },
  ]);

  const whatsappMessage = `Hola, deseo solicitar información e inscribirme a ${plan.name} ($${plan.price} MXN) en All-In Chess.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#0B1510] text-[#F6F3EC] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
        />

        <Link
          href="/entrenamiento"
          className="text-xs text-[#D8B155] hover:underline inline-flex items-center gap-1.5 font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a todas las clases
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Plan Content & Syllabus */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase px-3 py-1 bg-[#15261E] text-[#D8B155] border border-[#D8B155]/30 rounded-full inline-block">
                Nivel: {plan.level}
              </span>
              <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-white leading-tight">
                {plan.name}
              </h1>
              <p className="text-sm md:text-base text-[#D0C5AF] leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Key Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-[#1C3328] py-4 text-xs">
              <div>
                <span className="text-[#B5C2B9] block font-medium">Modalidad:</span>
                <strong className="text-white text-sm">{plan.modality}</strong>
              </div>
              <div>
                <span className="text-[#B5C2B9] block font-medium">Carga Horaria:</span>
                <strong className="text-[#D8B155] text-sm">{plan.classCount} lecciones</strong>
              </div>
              <div>
                <span className="text-[#B5C2B9] block font-medium">Duración:</span>
                <strong className="text-white text-sm">{plan.duration}</strong>
              </div>
            </div>

            {/* Syllabus */}
            <div className="space-y-4">
              <h2 className="font-serif-editorial text-xl font-bold text-white">
                Contenido & Puntos del Programa
              </h2>
              <div className="p-6 rounded-2xl bg-[#101E17] border border-[#1C3328] space-y-3 text-xs sm:text-sm text-[#D0C5AF] leading-relaxed">
                {plan.syllabus.split('.').filter(Boolean).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D8B155] shrink-0 mt-0.5" />
                    <span>{item.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chessgora.com Callout */}
            <div className="p-5 rounded-2xl bg-[#0F2E1E]/60 border border-[#D8B155]/40 flex items-start gap-3">
              <Laptop className="w-5 h-5 text-[#D8B155] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <strong className="text-white block font-bold text-sm">
                  CHESSGORA.COM INCLUIDO
                </strong>
                <p className="text-[#B5C2B9]">
                  Una plataforma de entrenamiento ajedrecístico donde podrás reforzar tus conocimientos, resolver ejercicios, practicar posiciones y continuar trabajando fuera de las clases en vivo.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inscription Card */}
          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-3xl bg-[#101E17] border-2 border-[#D8B155] shadow-[0_0_35px_rgba(216,177,85,0.2)] space-y-6 sticky top-28">
              <div className="space-y-2 border-b border-[#1C3328] pb-4">
                <span className="text-xs text-[#B5C2B9] uppercase font-bold tracking-wider block">
                  Inversión Oficial
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#D8B155]">
                    ${plan.price.toLocaleString('es-MX')} MXN
                  </span>
                  <span className="text-xs text-[#B5C2B9]">
                    {plan.slug.includes('personalizado') ? 'por paquete' : '/ mes'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#D0C5AF]">
                <p className="font-semibold text-white">Resumen de Contratación:</p>
                <div className="flex justify-between">
                  <span>Plataforma:</span>
                  <strong className="text-white">Clases en vivo + Chessgora.com</strong>
                </div>
                <div className="flex justify-between">
                  <span>Plazos:</span>
                  <strong className="text-emerald-400">Sin plazos forzosos</strong>
                </div>
                <div className="flex justify-between">
                  <span>Atención:</span>
                  <strong className="text-white">Asesoría directa y personalizada</strong>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid w-full py-4 text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-gold"
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.slug.includes('personalizado')
                    ? 'SOLICITAR ENTRENAMIENTO PERSONALIZADO'
                    : 'INSCRIBIRME AL GRUPO'}
                </a>

                {/* Optional checkout form if Stripe is active */}
                <form action="/api/checkout/subscription" method="POST">
                  <input type="hidden" name="planId" value={plan.id} />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg border border-[#1C3328] bg-[#0B1510] text-[#B5C2B9] hover:text-white hover:border-[#D8B155] transition text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#D8B155]" />
                    Pagar con tarjeta en línea (Stripe)
                  </button>
                </form>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#B5C2B9] border-t border-[#1C3328] pt-3">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inscripción segura con garantía y soporte de All-In Chess.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
