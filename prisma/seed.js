const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database for Academia de Ajedrez Alekhins...');

  // 1. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTitle: 'Lleva tu ajedrez al siguiente nivel',
      heroSubtitle: 'Entrenamiento especializado, conocimiento de alto nivel y material seleccionado para jugadores, familias, clubes y escuelas.',
      heroCtaPrimary: 'Conoce nuestros planes',
      heroCtaSecondary: 'Comprar material de ajedrez',
      whatsappNumber: '529991020078',
      contactEmail: 'contacto@alekhins.com',
      footerLegalText: '© 2026 Academia de Ajedrez Alekhins. Todos los derechos reservados.'
    }
  });

  // 2. Demo Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@alekhins.com' },
    update: {},
    create: {
      email: 'admin@alekhins.com',
      name: 'Administrador Alekhins',
      passwordHash: 'admin123_hash',
      role: 'SUPERADMIN'
    }
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'alumno@alekhins.com' },
    update: {},
    create: {
      email: 'alumno@alekhins.com',
      name: 'Carlos Mendoza',
      passwordHash: 'alumno123_hash',
      role: 'STUDENT',
      student: {
        create: {
          level: 'Desarrollo (1400 ELO)',
          notes: 'Interesado en repertorio e4 de blancas'
        }
      }
    }
  });

  // 3. Categories
  const catSets = await prisma.category.upsert({
    where: { slug: 'sets' },
    update: {},
    create: { name: 'Sets de Ajedrez', slug: 'sets', description: 'Sets completos de ajedrez para torneo, escuela y colección.' }
  });

  const catTableros = await prisma.category.upsert({
    where: { slug: 'tableros' },
    update: {},
    create: { name: 'Tableros', slug: 'tableros', description: 'Tableros de madera noble, vinil reglamentario, silicona y electrónicos.' }
  });

  const catPiezas = await prisma.category.upsert({
    where: { slug: 'piezas' },
    update: {},
    create: { name: 'Piezas', slug: 'piezas', description: 'Piezas Staunton reglamentarias, lastradas y de exhibición.' }
  });

  const catRelojes = await prisma.category.upsert({
    where: { slug: 'relojes' },
    update: {},
    create: { name: 'Relojes de Ajedrez', slug: 'relojes', description: 'Relojes digitales y analógicos certificados para competición FIDE/USCF.' }
  });

  const catLibros = await prisma.category.upsert({
    where: { slug: 'libros' },
    update: {},
    create: { name: 'Libros de Ajedrez', slug: 'libros', description: 'Literatura especializada de aperturas, táctica, estrategia y finales.' }
  });

  const catClubes = await prisma.category.upsert({
    where: { slug: 'clubes-y-escuelas' },
    update: {},
    create: { name: 'Clubes y Escuelas', slug: 'clubes-y-escuelas', description: 'Paquetes institucionales por volumen para colegios y clubes.' }
  });

  // 4. Products Demo (20 Products)
  const productsData = [
    {
      name: 'Set de Torneo Profesional Alekhins Staunton #6',
      slug: 'set-torneo-profesional-alekhins-staunton-6',
      sku: 'SET-TOR-001',
      description: 'El set estándar preferido por Grandes Maestros y torneos oficiales. Incluye piezas de plástico pesado triple-weighted Staunton #6 (Rey 9.5cm con 2 reinas extra), tablero de vinil verde/crema enrolable de 51cm y bolsa con cierre reforzado.',
      shortDescription: 'Piezas triples pesadas Staunton #6 + Tablero Vinil 51cm + Funda de transporte.',
      price: 899.00,
      compareAtPrice: 1199.00,
      isAcademyRecommended: true,
      masterComment: 'El set indispensable para cualquier jugador de competición. Equilibrio perfecto entre estabilidad física y durabilidad.',
      categoryId: catSets.id,
      images: [
        { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Set de Torneo Profesional' },
        { url: '/713QtLhmJiL._AC_SX679_.jpg', alt: 'Piezas y tablero de cerca' }
      ],
      variants: [
        { sku: 'SET-TOR-001-GRN', name: 'Tablero Verde / Crema', price: 899.00, stock: 45, color: 'Verde' },
        { sku: 'SET-TOR-001-BLK', name: 'Tablero Negro / Crema', price: 899.00, stock: 30, color: 'Negro' },
        { sku: 'SET-TOR-001-BLU', name: 'Tablero Azul / Crema', price: 899.00, stock: 20, color: 'Azul' }
      ]
    },
    {
      name: 'Reloj Digital DGT 2010 Oficial FIDE',
      slug: 'reloj-digital-dgt-2010-oficial-fide',
      sku: 'REL-DGT-2010',
      description: 'El reloj oficial de la Federación Internacional de Ajedrez (FIDE). Admite incrementos Fischer, demoras Byo-yomi, tiempo fijo y periodos múltiples de juego.',
      shortDescription: 'Reloj oficial FIDE con ritmos Fischer, incremento y voz/beep configurable.',
      price: 1850.00,
      compareAtPrice: 2100.00,
      isAcademyRecommended: true,
      masterComment: 'Usado en las olimpiadas y torneos internacionales. Indispensable para acostumbrarse al control del tiempo en competición.',
      categoryId: catRelojes.id,
      images: [
        { url: '/dgt1500-grey-blue-chess-clock-home.avif', alt: 'Reloj DGT 2010' },
        { url: '/10104-DGT-Easy-Plus-with-Gift-Box-2014-fill-400x284-1-300x284.jpg', alt: 'Detalle de pantalla DGT' }
      ],
      variants: [
        { sku: 'REL-DGT-2010-STD', name: 'DGT 2010 Edición Estándar', price: 1850.00, stock: 18 }
      ]
    },
    {
      name: 'Reloj Electrónico DGT 3000 con Conexión DGT Board',
      slug: 'reloj-electronico-dgt-3000',
      sku: 'REL-DGT-3000',
      description: 'El reloj digital más avanzado del mundo. Conexión directa a tableros electrónicos DGT e información en tiempo real de segundos y movimientos.',
      shortDescription: 'Máxima tecnología DGT, pantalla gigante de alta precisión.',
      price: 2950.00,
      compareAtPrice: 3200.00,
      isAcademyRecommended: true,
      masterComment: 'Utilizado en los Campeonatos del Mundo. Excelente legibilidad desde cualquier ángulo del tablero.',
      categoryId: catRelojes.id,
      images: [
        { url: '/D_NQ_NP_682553-CBT69004443717_042023-O-reloj-de-ajedrez-dgt-3000-temporizador-color-rojo.webp', alt: 'Reloj DGT 3000 Rojo' }
      ],
      variants: [
        { sku: 'REL-DGT-3000-RED', name: 'DGT 3000 Rojo', price: 2950.00, stock: 12 }
      ]
    },
    {
      name: 'Tablero Electrónico DGT Centaur Autónomo',
      slug: 'tablero-electronico-dgt-centaur',
      sku: 'TAB-DGT-CENTAUR',
      description: 'El compañero de entrenamiento definitivo. Se adapta automáticamente a tu nivel de juego gracias a su inteligencia artificial integrada sin necesidad de pantallas o aplicaciones externas. Escaque iluminado por leds.',
      shortDescription: 'Tablero e-board con IA adaptativa e iluminación de jugadas por led.',
      price: 9800.00,
      compareAtPrice: 10500.00,
      isAcademyRecommended: true,
      masterComment: 'Mi recomendación personal para entrenar en casa sin distracciones de pantallas. Simula perfectamente un oponente humano.',
      categoryId: catTableros.id,
      images: [
        { url: '/DGT-Centaur-1.jpg', alt: 'DGT Centaur con piezas' },
        { url: '/DGT-Centaur-Bag-1.jpg', alt: 'Bolso DGT Centaur' }
      ],
      variants: [
        { sku: 'TAB-DGT-CENTAUR-SYS', name: 'DGT Centaur + Maletín Oficial', price: 9800.00, stock: 5 }
      ]
    },
    {
      name: 'Libro: El Método Yusupov 1 - Fundamentos',
      slug: 'libro-el-metodo-yusupov-1-fundamentos',
      sku: 'LIB-YUS-001',
      description: 'Obra maestra del Gran Maestro Artur Yusupov galardonada con la medalla Boleslavsky de la FIDE. Un programa estructurado de 24 lecciones con ejercicios prácticos y soluciones detalladas.',
      shortDescription: 'Libro de entrenamiento sistemático de táctica, estrategia y finales.',
      price: 680.00,
      compareAtPrice: 750.00,
      isAcademyRecommended: true,
      masterComment: 'Columna vertebral de nuestra Academia para alumnos que buscan pasar de 1400 a 1800 ELO.',
      categoryId: catLibros.id,
      images: [
        { url: '/-El-M-todo-Yusupov-Fundamentos-4-Revisi-n-.jpg', alt: 'El Método Yusupov 1' },
        { url: '/el-metodo-yusupov.jpg', alt: 'Detalle de portada' }
      ],
      variants: [
        { sku: 'LIB-YUS-001-VOL1', name: 'Tomo 1 Fundamentos (Español)', price: 680.00, stock: 25 }
      ]
    },
    {
      name: 'Libro: Pensar dentro de la caja - Jacob Aagaard',
      slug: 'libro-pensar-dentro-de-la-caja-aagaard',
      sku: 'LIB-AAG-005',
      description: 'El culmination de la famosa serie Gran Maestro de Jacob Aagaard. Explora la toma de decisiones, cálculo de variantes y psicología en el tablero.',
      shortDescription: 'Análisis avanzado del proceso de pensamiento en el ajedrez moderno.',
      price: 820.00,
      compareAtPrice: 900.00,
      isAcademyRecommended: true,
      masterComment: 'Lectura imprescindible para jugadores de club avanzados y aspirantes a titulados.',
      categoryId: catLibros.id,
      images: [
        { url: '/1545-PENSAR-DENTRO-DE-LA-CAJA.jpg', alt: 'Pensar dentro de la caja' }
      ],
      variants: [
        { sku: 'LIB-AAG-005-ESP', name: 'Edición Tapa Blanda (Español)', price: 820.00, stock: 15 }
      ]
    },
    {
      name: 'Libro: Secretos de la Estrategia de la Escuela Soviética',
      slug: 'libro-secretos-estrategia-escuela-sovietica',
      sku: 'LIB-SOV-002',
      description: 'Un análisis histórico y técnico de los principios estratégicos que dominaron el ajedrez mundial durante 50 años.',
      shortDescription: 'Estrategia posicional soviética comentada jugada a jugada.',
      price: 740.00,
      compareAtPrice: 800.00,
      isAcademyRecommended: true,
      masterComment: 'Fundamentos sólidos de piezas menores, estructura de peones y columnas abiertas.',
      categoryId: catLibros.id,
      images: [
        { url: '/1204-Secretos-de-la-estrategia-de-la-Escuela-Sovietica-del-Ajedrez.jpg', alt: 'Escuela Soviética' }
      ],
      variants: [
        { sku: 'LIB-SOV-002-ESP', name: 'Edición Ilustrada', price: 740.00, stock: 20 }
      ]
    },
    {
      name: 'Paquete Escolar / Club (10 Sets de Ajedrez Completos)',
      slug: 'paquete-escolar-club-10-sets',
      sku: 'PAK-ESC-010',
      description: 'Equipamiento completo para 20 jugadores (10 tableros de vinil enrolable + 10 juegos de piezas Staunton pesadas + 10 bolsas de transporte + 1 maletín institucional).',
      shortDescription: 'Paquete especial para instituciones educativas y escuelas de ajedrez.',
      price: 7990.00,
      compareAtPrice: 9500.00,
      isAcademyRecommended: true,
      masterComment: 'Diseñado para soportar el uso diario intenso en colegios y centros de entrenamiento.',
      categoryId: catClubes.id,
      images: [
        { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Paquete Escolar 10 Sets' }
      ],
      variants: [
        { sku: 'PAK-ESC-010-MIX', name: 'Paquete 10 Equipos Mixto (Verde / Negro)', price: 7990.00, stock: 10 }
      ]
    },
    {
      name: 'Reloj Analógico de Ajedrez Leap de Madera Classic',
      slug: 'reloj-analogico-leap-madera',
      sku: 'REL-LEA-ANA',
      description: 'Reloj de cuerda tradicional en caja de madera noble. Sistema de bandera clásica para caída de tiempo.',
      shortDescription: 'Mecanismo analógico de cuerda tradicional con caja de madera.',
      price: 890.00,
      compareAtPrice: 1050.00,
      isAcademyRecommended: false,
      masterComment: 'Elegancia nostálgica para partidas amistosas y coleccionistas.',
      categoryId: catRelojes.id,
      images: [
        { url: '/Reloj-Leap-300x300.jpg', alt: 'Reloj Leap Madera' },
        { url: '/basic-wood-clock__40667.1515189224_2.webp', alt: 'Vista posterior' }
      ],
      variants: [
        { sku: 'REL-LEA-ANA-WOD', name: 'Madera Natural', price: 890.00, stock: 14 }
      ]
    },
    {
      name: 'Tablero Mural Magnético para Clases y Conferencias (90x90cm)',
      slug: 'tablero-mural-magnetico-clases-90cm',
      sku: 'TAB-MUR-090',
      description: 'Tablero demostrativo gigante para profesores y entrenadores. Piezas magnéticas de alto agarre visibilidad 360 grados.',
      shortDescription: 'Tablero de demostración con piezas magnéticas y estuche.',
      price: 3450.00,
      compareAtPrice: 3900.00,
      isAcademyRecommended: true,
      masterComment: 'Herramienta vital para explicaciones grupales en aulas y seminarios.',
      categoryId: catTableros.id,
      images: [
        { url: '/3000LE.png', alt: 'Tablero Mural Magnético' }
      ],
      variants: [
        { sku: 'TAB-MUR-090-STD', name: 'Tablero 90x90cm Magnético', price: 3450.00, stock: 8 }
      ]
    }
  ];

  for (const p of productsData) {
    const { images, variants, ...productInfo } = p;
    const createdProduct = await prisma.product.upsert({
      where: { slug: productInfo.slug },
      update: {},
      create: {
        ...productInfo,
        images: {
          create: images
        },
        variants: {
          create: variants
        }
      }
    });
  }

  // 5. Training Plans (Academia)
  const plansData = [
    {
      name: 'Iniciación al Ajedrez',
      slug: 'iniciacion-al-ajedrez',
      description: 'Diseñado para niños, jóvenes y adultos que inician en el ajedrez. Aprende táctica fundamental, visión geométrica del tablero, apertura básica y mates elementales.',
      level: 'Principiante (0 - 1200 ELO)',
      ageGroup: 'Niños, Jóvenes y Adultos',
      modality: 'Online en vivo (Zoom / Lichess)',
      duration: 'Mensual renovable',
      classCount: 4,
      syllabus: '1. Movimiento, coordinación y valor relativo de piezas. 2. Jaques, jaque mate y recursos de tablas (ahogado, repetición). 3. Motivos tácticos esenciales (doble, clavada, descubierta). 4. Principios rectores de apertura. 5. Mates elementales de rey y dama, rey y torre.',
      benefits: 'Desarrollo de memoria, pensamiento abstracto, paciencia y concentración bajo la metodología de un Maestro Internacional.',
      price: 699.00,
      billingPeriod: 'MONTHLY',
      maxCapacity: 15,
      includes: '4 clases mensuales en vivo de 60 min (1 por semana) + Guías didácticas en PDF + Acceso a videoteca de iniciación + Torneos sabatinos internos en plataforma'
    },
    {
      name: 'Desarrollo y Táctica Avanzada',
      slug: 'desarrollo-y-tactica-avanzada',
      description: 'Orientado a jugadores de club y entusiastas que buscan estructurar su repertorio, dominar planes estratégicos de medio juego y cálculo táctico profundo.',
      level: 'Intermedio (1200 - 1700 ELO)',
      ageGroup: 'Juvenil y Adultos',
      modality: 'Online en vivo + Análisis PGN',
      duration: 'Mensual renovable',
      classCount: 8,
      syllabus: '1. Metodología de cálculo y árboles de variantes. 2. Estructuras de peones centrales y planes típicos. 3. Repertorio activo contra 1.e4 y 1.d4. 4. Finales prácticos esenciales de torres y piezas menores. 5. Manejo del tiempo en el reloj y psicología competitiva.',
      benefits: 'Incremento medible de rating oficial (FIDE/FENAMAC), solidez estratégica y comprensión posicional avanzada.',
      price: 1199.00,
      billingPeriod: 'MONTHLY',
      maxCapacity: 12,
      includes: '8 clases mensuales en vivo (2 por semana) + Revisión y análisis PGN de partidas de alumnos + Acceso total a videoteca premium + Test mensual de rendimiento táctico'
    },
    {
      name: 'Alto Rendimiento y Maestría',
      slug: 'alto-rendimiento-y-competicion',
      description: 'Programa de élite para jugadores federados, seleccionados estatales y aspirantes a titulación FIDE. Supervisión directa y cátedra del MI Roberto Martín del Campo.',
      level: 'Avanzado y Competidores (1700+ ELO)',
      ageGroup: 'Competidores y Federados',
      modality: 'Online en vivo + Laboratorio de Aperturas',
      duration: 'Mensual renovable',
      classCount: 12,
      syllabus: '1. Diagnóstico y preparación de laboratorio contra rivales específicos. 2. Repertorio de aperturas a nivel Magistral con bases ChessBase. 3. Técnica depurada en finales complejos y profilaxis posicional. 4. Análisis crítico de partidas de Grandes Maestros contemporáneos. 5. Preparación física, emocional y competitiva para torneos oficiales.',
      benefits: 'Cátedra y mentoría de élite con el MI Roberto Martín del Campo, 4 veces representante olímpico de México y Campeón Nacional.',
      price: 1899.00,
      billingPeriod: 'MONTHLY',
      maxCapacity: 8,
      includes: '12 sesiones mensuales en vivo + Acceso ilimitado a toda la plataforma y videoteca + Bases PGN magistrales personalizadas + Asesoría personalizada en torneos y soporte directo vía WhatsApp'
    }
  ];

  for (const plan of plansData) {
    await prisma.trainingPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  // 6. Video Categories & Videos Demo
  const catTactica = await prisma.videoCategory.upsert({
    where: { slug: 'tactica' },
    update: {},
    create: { name: 'Táctica y Cálculo', slug: 'tactica' }
  });

  const catAperturas = await prisma.videoCategory.upsert({
    where: { slug: 'aperturas' },
    update: {},
    create: { name: 'Aperturas y Repertorio', slug: 'aperturas' }
  });

  const videosData = [
    {
      title: 'Cómo calcular variantes largas sin cometer errores',
      slug: 'como-calcular-variantes-largas',
      thumbnail: '/apertura italiana.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catTactica.id,
      level: 'Intermedio / Avanzado',
      durationMinutes: 45,
      description: 'En esta clase magistral, el MI Roberto Martín del Campo enseña la técnica de jugadas candidatas y visualización ciega del tablero.',
      tags: 'táctica, cálculo, combinaciones, maestría',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isPremium: false
    },
    {
      title: 'Dominando la Defensa Siciliana Variante Najdorf',
      slug: 'dominando-la-defensa-siciliana-najdorf',
      thumbnail: '/disculpen_las_aperturas_2.jpg',
      instructorName: 'MI Roberto Martín del Campo',
      categoryId: catAperturas.id,
      level: 'Avanzado',
      durationMinutes: 60,
      description: 'Estructuras de peones clave, ideas temáticas de ruptura d5 y f5, y planes en el flanco de rey.',
      tags: 'aperturas, siciliana, najdorf, e4',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isPremium: true
    }
  ];

  for (const v of videosData) {
    await prisma.video.upsert({
      where: { slug: v.slug },
      update: {},
      create: v
    });
  }

  // 7. Demo Coupons
  await prisma.coupon.upsert({
    where: { code: 'ALEKHINS10' },
    update: {},
    create: {
      code: 'ALEKHINS10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minPurchase: 500,
      isActive: true
    }
  });

  await prisma.coupon.upsert({
    where: { code: 'MAESTRO200' },
    update: {},
    create: {
      code: 'MAESTRO200',
      discountType: 'FIXED',
      discountValue: 200,
      minPurchase: 1500,
      isActive: true
    }
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
