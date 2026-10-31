const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Actualizando planes de entrenamiento con las tres modalidades oficiales...');

  const plans = [
    {
      slug: 'entrenamiento-personalizado',
      name: 'Entrenamiento Personalizado',
      price: 5000,
      level: 'Todos los niveles (Atención 1 a 1)',
      ageGroup: 'Todas las edades',
      modality: 'Online individual en vivo (60 min/sesión)',
      duration: 'Paquete de 10 sesiones o sesión individual ($600 MXN)',
      classCount: 10,
      maxCapacity: 1,
      description: 'Programa individual de entrenamiento impartido por el Maestro Internacional Roberto Martín del Campo Cárdenas. Cada alumno recibe una preparación adaptada a su nivel, estilo de juego y objetivos competitivos.',
      syllabus: '1. Diagnóstico exhaustivo de fortalezas y debilidades. 2. Construcción y refinamiento de repertorio de aperturas a la medida. 3. Cálculo táctico avanzado y toma de decisiones posicionales. 4. Técnica depurada en finales prácticos y teóricos. 5. Análisis minucioso de partidas del alumno y corrección de patrones erróneos. 6. Preparación psicológica y competitiva para torneos oficiales.',
      benefits: 'Atención 100% individualizada con el MI Roberto Martín del Campo Cárdenas, 4 veces olímpico por México y Campeón Nacional.',
      includes: 'Sesiones individuales de 60 minutos + Plan de entrenamiento personalizado + Material didáctico y ejercicios específicos + Trabajo de aperturas, medio juego y finales + Análisis y corrección de partidas + Tareas y actividades para trabajar en casa + Acceso a la plataforma de entrenamiento Chessgora.com'
    },
    {
      slug: 'entrenamiento-competitivo',
      name: 'Entrenamiento Competitivo',
      price: 699,
      level: 'Jugadores de menos de 2000 puntos Elo',
      ageGroup: 'Juvenil y Adultos',
      modality: 'Online en vivo (Martes a viernes, 6:00 p. m. a 7:00 p. m.)',
      duration: 'Mensual renovable (4 días por semana)',
      classCount: 16,
      maxCapacity: 20,
      description: 'Programa de entrenamiento grupal para jugadores que desean fortalecer sus conocimientos, mejorar su comprensión estratégica y desarrollar habilidades competitivas mediante un entrenamiento constante y estructurado.',
      syllabus: '1. Entrenamiento táctico y cálculo de variantes complejas. 2. Estrategia y planificación en el medio juego. 3. Estudio y construcción de repertorio de aperturas. 4. Análisis profundo de partidas magistrales y de alumnos. 5. Técnica y conceptos fundamentales de finales.',
      benefits: '4 días de entrenamiento por semana (16 horas mensuales en vivo), acompañamiento continuo y comunidad competitiva activa.',
      includes: 'Clases grupales en vivo + Entrenamiento táctico y cálculo de variantes + Estrategia y planificación + Estudio y construcción de repertorio de aperturas + Análisis de partidas + Técnica de finales + Material de entrenamiento + Acceso a la plataforma Chessgora.com + Actividades interactivas para practicar fuera de clase'
    },
    {
      slug: 'ajedrez-inicial',
      name: 'Grupo de Ajedrez Inicial',
      price: 500,
      level: 'Principiantes',
      ageGroup: 'Niños, jóvenes y adultos',
      modality: 'Online en vivo (Lunes, miércoles y jueves, 6:00 p. m. a 7:00 p. m.)',
      duration: 'Mensual renovable (3 días por semana)',
      classCount: 12,
      maxCapacity: 20,
      description: 'Programa diseñado para niños, jóvenes y adultos que desean aprender ajedrez desde sus fundamentos. Las clases son impartidas por nuestros especialistas en enseñanza inicial, utilizando una metodología didáctica, progresiva y dinámica.',
      syllabus: '1. Reglas básicas, movimiento y valor relativo de piezas. 2. Principios básicos de apertura y control del centro. 3. Motivos tácticos elementales y combinaciones sencillas. 4. Introducción al pensamiento estratégico. 5. Mates básicos y finales elementales.',
      benefits: '3 días de entrenamiento por semana (12 horas mensuales), pedagogía dinámica, progresiva y amena por especialistas en iniciación.',
      includes: 'Clases grupales en vivo + Reglas y fundamentos del ajedrez + Principios básicos de apertura + Táctica y combinaciones + Introducción a la estrategia + Jaque mate y finales básicos + Material didáctico + Actividades y ejercicios para casa + Acceso a la plataforma Chessgora.com'
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
    console.log(`✅ Plan '${updated.name}' sincronizado con éxito (${updated.slug}).`);
  }

  console.log('🎉 Todas las nuevas modalidades han sido registradas.');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error('⚠️ Nota al actualizar base de datos:', e.message);
  process.exit(0);
});
