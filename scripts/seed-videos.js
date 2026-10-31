const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🎥 Actualizando e insertando videos magistrales del MI Roberto Martín del Campo...');

  // Asegurar categorías
  const catClases = await prisma.videoCategory.upsert({
    where: { slug: 'clases-magistrales' },
    update: { name: 'Clases Magistrales & En Vivo' },
    create: { name: 'Clases Magistrales & En Vivo', slug: 'clases-magistrales' }
  });

  const catAperturas = await prisma.videoCategory.upsert({
    where: { slug: 'aperturas' },
    update: { name: 'Aperturas y Repertorio' },
    create: { name: 'Aperturas y Repertorio', slug: 'aperturas' }
  });

  const catTactica = await prisma.videoCategory.upsert({
    where: { slug: 'tactica' },
    update: { name: 'Táctica y Cálculo' },
    create: { name: 'Táctica y Cálculo', slug: 'tactica' }
  });

  const catFinales = await prisma.videoCategory.upsert({
    where: { slug: 'finales' },
    update: { name: 'Finales y Técnica' },
    create: { name: 'Finales y Técnica', slug: 'finales' }
  });

  const videos = [
    {
      title: 'Masterclass Pública de Ajedrez: Cátedra de 4 Horas con el MI Roberto Martín del Campo',
      slug: 'masterclass-publica-4-horas-mi-roberto-martin-del-campo',
      thumbnail: 'https://img.youtube.com/vi/EvJB7hol9JA/maxresdefault.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catClases.id,
      level: 'Todos los Niveles',
      durationMinutes: 245,
      description: 'Clase pública magistral de más de 4 horas impartida por el Maestro Internacional Roberto Martín del Campo. Análisis profundo de partidas, táctica de alto calibre, conceptos posicionales y sesión interactiva en vivo.',
      tags: 'masterclass, en vivo, clase pública, roberto martin del campo, tactica, estrategia, 4 horas',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false
    },
    {
      title: 'Cómo Calcular Variantes Largas sin Cometer Errores Tácticos',
      slug: 'como-calcular-variantes-largas',
      thumbnail: '/apertura italiana.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catTactica.id,
      level: 'Intermedio / Avanzado',
      durationMinutes: 48,
      description: 'En esta clase magistral, el MI Roberto Martín del Campo enseña la técnica de jugadas candidatas, árboles de decisión y visualización ciega del tablero sin equivocarse.',
      tags: 'táctica, cálculo, combinaciones, maestría, candidatos',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false
    },
    {
      title: 'Dominando la Defensa Siciliana Variante Najdorf',
      slug: 'dominando-la-defensa-siciliana-najdorf',
      thumbnail: '/disculpen_las_aperturas_2.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catAperturas.id,
      level: 'Avanzado',
      durationMinutes: 62,
      description: 'Estructuras de peones clave, ideas temáticas de ruptura d5 y f5, contraataque en el flanco de dama y planes dinámicos en el flanco de rey.',
      tags: 'aperturas, siciliana, najdorf, e4, repertorio',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false
    },
    {
      title: 'Técnica de Finales Prácticos: Torres y Peones en Competición',
      slug: 'tecnica-finales-practicos-torres',
      thumbnail: '/713QtLhmJiL._AC_SX679_.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catFinales.id,
      level: 'Intermedio',
      durationMinutes: 55,
      description: 'Cómo ganar finales con ventaja mínima y defender posiciones de tablas teóricas con el método de Philidor y la actividad del rey.',
      tags: 'finales, torres, tarrasch, philidor, tecnica',
      videoUrl: 'https://www.youtube.com/watch?v=EvJB7hol9JA',
      isPremium: false
    }
  ];

  for (const v of videos) {
    const upserted = await prisma.video.upsert({
      where: { slug: v.slug },
      update: v,
      create: v
    });
    console.log(`✅ Video '${upserted.title}' sincronizado.`);
  }

  console.log('✨ Videos actualizados con éxito en PostgreSQL.');
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
