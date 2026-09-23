const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Actualizando planes de entrenamiento con datos y precios reales...');

  const plans = [
    {
      slug: 'iniciacion-al-ajedrez',
      name: 'Iniciación al Ajedrez',
      price: 699,
      level: 'Principiante (0 - 1200 ELO)',
      ageGroup: 'Niños, Jóvenes y Adultos',
      modality: 'Online en vivo (Zoom / Lichess)',
      duration: 'Mensual renovable',
      classCount: 4,
      maxCapacity: 15,
      description: 'Diseñado para niños, jóvenes y adultos que inician en el ajedrez. Aprende táctica fundamental, visión geométrica del tablero, apertura básica y mates elementales.',
      syllabus: '1. Movimiento, coordinación y valor relativo de piezas. 2. Jaques, jaque mate y recursos de tablas (ahogado, repetición). 3. Motivos tácticos esenciales: doble, clavada, descubierta y enfilada. 4. Principios rectores de la apertura y control del centro. 5. Mates elementales de rey y dama, rey y torre.',
      benefits: 'Desarrollo de memoria, pensamiento abstracto, paciencia y concentración bajo la metodología de un Maestro Internacional.',
      includes: '4 clases mensuales en vivo de 60 min (1 por semana) + Guías didácticas en PDF + Acceso a videoteca de iniciación + Torneos sabatinos internos en plataforma'
    },
    {
      slug: 'desarrollo-y-tactica-avanzada',
      name: 'Desarrollo y Táctica Avanzada',
      price: 1199,
      level: 'Intermedio (1200 - 1700 ELO)',
      ageGroup: 'Juvenil y Adultos',
      modality: 'Online en vivo + Análisis PGN',
      duration: 'Mensual renovable',
      classCount: 8,
      maxCapacity: 12,
      description: 'Orientado a jugadores de club y entusiastas que buscan estructurar su repertorio, dominar planes estratégicos de medio juego y cálculo táctico profundo.',
      syllabus: '1. Metodología de cálculo y árboles de variantes. 2. Estructuras de peones centrales y planes típicos. 3. Repertorio activo contra 1.e4 y 1.d4. 4. Finales prácticos esenciales de torres y piezas menores. 5. Manejo del tiempo en el reloj y psicología competitiva.',
      benefits: 'Incremento medible de rating oficial (FIDE/FENAMAC), solidez estratégica y comprensión posicional avanzada.',
      includes: '8 clases mensuales en vivo (2 por semana) + Revisión y análisis PGN de partidas de alumnos + Acceso total a videoteca premium + Test mensual de rendimiento táctico'
    },
    {
      slug: 'alto-rendimiento-y-competicion',
      name: 'Alto Rendimiento y Maestría',
      price: 1899,
      level: 'Avanzado y Competidores (1700+ ELO)',
      ageGroup: 'Competidores y Federados',
      modality: 'Online en vivo + Laboratorio de Aperturas',
      duration: 'Mensual renovable',
      classCount: 12,
      maxCapacity: 8,
      description: 'Programa de élite para jugadores federados, seleccionados estatales y aspirantes a titulación FIDE. Supervisión directa y cátedra del MI Roberto Martín del Campo.',
      syllabus: '1. Diagnóstico y preparación de laboratorio contra rivales específicos. 2. Repertorio de aperturas a nivel Magistral con bases ChessBase. 3. Técnica depurada en finales complejos y profilaxis posicional. 4. Análisis crítico de partidas de Grandes Maestros contemporáneos. 5. Preparación física, emocional y competitiva para torneos oficiales.',
      benefits: 'Cátedra y mentoría de élite con el MI Roberto Martín del Campo, 4 veces representante olímpico de México y Campeón Nacional.',
      includes: '12 sesiones mensuales en vivo + Acceso ilimitado a toda la plataforma y videoteca + Bases PGN magistrales personalizadas + Asesoría personalizada en torneos y soporte directo vía WhatsApp'
    }
  ];

  for (const p of plans) {
    const updated = await prisma.trainingPlan.upsert({
      where: { slug: p.slug },
      update: p,
      create: {
        ...p,
        billingPeriod: 'MONTHLY',
        isPublished: true
      }
    });
    console.log(`✅ Plan '${updated.name}' actualizado con precio: $${updated.price} MXN/mes.`);
  }

  console.log('✨ Todos los planes han sido sincronizados exitosamente.');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error('❌ Error actualizando planes:', e);
  process.exit(1);
});
