export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  isAcademyRecommended: boolean;
  masterComment?: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: { url: string; alt?: string | null }[];
  shortDescription?: string | null;
  description: string;
  variants?: {
    id: string;
    sku: string;
    name: string;
    price: number;
    stock: number;
    color?: string | null;
  }[];
  reviews?: { rating: number }[];
}

export const STORE_CATEGORIES = [
  { slug: 'todos', name: 'Todos los Productos' },
  { slug: 'sets', name: 'Sets de Ajedrez' },
  { slug: 'tableros', name: 'Tableros' },
  { slug: 'piezas', name: 'Piezas' },
  { slug: 'relojes', name: 'Relojes' },
  { slug: 'libros', name: 'Libros' },
  { slug: 'clubes-y-escuelas', name: 'Clubes & Escuelas' },
  { slug: 'accesorios', name: 'Accesorios' },
];

export const STORE_PRODUCTS: ProductItem[] = [
  // 1. Sets de Ajedrez
  {
    id: 'prod-set-6',
    name: 'Set de Torneo Profesional Alekhins Staunton #6',
    slug: 'set-torneo-profesional-alekhins-staunton-6',
    sku: 'SET-TOR-001',
    price: 899,
    compareAtPrice: 1199,
    isAcademyRecommended: true,
    masterComment: 'El set indispensable para cualquier jugador de competición. Equilibrio perfecto entre estabilidad física, durabilidad y peso reglamentario.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg', alt: 'Set de Torneo Profesional Staunton #6' },
      { url: '/plasticpieces_blackwhite_2.jpg', alt: 'Piezas Staunton #6 triples pesadas' }
    ],
    shortDescription: 'Piezas triples pesadas Staunton #6 + Tablero Vinil 51cm + Funda de transporte con doble reina.',
    description: 'El set preferido en campeonatos oficiales avalado por el MI Roberto Martín del Campo. Incluye piezas de plástico pesado triple-weighted Staunton #6 (altura de rey 9.5 cm con 2 damas adicionales), tablero enrollable de vinil de 51 cm con coordenadas alfanuméricas y bolsa de tela oxford con cremallera reforzada.',
    variants: [
      { id: 'v-set-grn', sku: 'SET-TOR-001-GRN', name: 'Tablero Verde / Crema', price: 899, stock: 45, color: 'Verde' },
      { id: 'v-set-blk', sku: 'SET-TOR-001-BLK', name: 'Tablero Negro / Crema', price: 899, stock: 30, color: 'Negro' },
      { id: 'v-set-blu', sku: 'SET-TOR-001-BLU', name: 'Tablero Azul / Crema', price: 899, stock: 25, color: 'Azul' }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }]
  },
  {
    id: 'prod-set-club-ligero',
    name: 'Set de Ajedrez Club Special Ligero con Bolso',
    slug: 'set-ajedrez-club-special-ligero-bolso',
    sku: 'SET-CLU-002',
    price: 590,
    compareAtPrice: 750,
    isAcademyRecommended: true,
    masterComment: 'Ligero y fácil de transportar en la mochila sin sacrificar las proporciones oficiales FIDE.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Set Club Special Ligero' }
    ],
    shortDescription: 'Set completo ligero ideal para traslados diarios a escuelas, clubes o talleres.',
    description: 'Diseñado especialmente para estudiantes y academias que se desplazan frecuentemente. Piezas Staunton sólidas con base forrada en fieltro verde, tablero de vinil flexible lavable y bolso cilíndrico con asa ajustable para hombro.',
    variants: [
      { id: 'v-clu-std', sku: 'SET-CLU-002-STD', name: 'Estándar Verde Clásico', price: 590, stock: 35, color: 'Verde' }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: 'prod-set-mousepad',
    name: 'Set de Ajedrez Triple Peso con Tablero Mousepad de Neopreno',
    slug: 'set-ajedrez-triple-peso-tablero-mousepad',
    sku: 'SET-MOU-003',
    price: 1150,
    compareAtPrice: 1390,
    isAcademyRecommended: true,
    masterComment: 'El tablero de neopreno jamás se arruga ni guarda memoria, queda perfectamente plano al instante.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/large-mousepad-boards-2.webp', alt: 'Tablero de Neopreno Mousepad' }
    ],
    shortDescription: 'Tablero de mousepad ultrasuave sin arrugas + piezas de 1 kg con centro de plomo.',
    description: 'La máxima comodidad para el jugador exigente. El tablero de mousepad acolchado amortigua el impacto de las piezas en partidas rápidas (Blitz) y permanece completamente liso sobre cualquier superficie sin importar cómo se guarde.',
    variants: [
      { id: 'v-mou-grn', sku: 'SET-MOU-003-GRN', name: 'Verde Foresta', price: 1150, stock: 20, color: 'Verde' },
      { id: 'v-mou-blk', sku: 'SET-MOU-003-BLK', name: 'Negro Carbón', price: 1150, stock: 15, color: 'Negro' }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-set-magnetico',
    name: 'Set Magnético de Viaje y Análisis Portátil',
    slug: 'set-magnetico-viaje-analisis-portatil',
    sku: 'SET-MAG-004',
    price: 490,
    compareAtPrice: 620,
    isAcademyRecommended: false,
    masterComment: 'Perfecto para repasar partidas en trayectos, viajes en avión o pausas de estudio.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/paradix.jpg', alt: 'Set Magnético de Viaje' }
    ],
    shortDescription: 'Tablero plegable tipo caja con fuerte fijación magnética para viajes.',
    description: 'Ajedrez compacto magnético con piezas que permanecen fijas ante cualquier movimiento. La caja plegable almacena todas las piezas en su interior con compartimento seguro.',
    variants: [
      { id: 'v-mag-std', sku: 'SET-MAG-004-STD', name: 'Formato Mediano 25x25cm', price: 490, stock: 28 }
    ],
    reviews: [{ rating: 4 }, { rating: 5 }]
  },

  // 2. Relojes
  {
    id: 'prod-dgt-2010',
    name: 'Reloj Digital de Ajedrez DGT 2010 Oficial FIDE',
    slug: 'reloj-digital-ajedrez-dgt-2010-oficial-fide',
    sku: 'REL-DGT-2010',
    price: 1850,
    compareAtPrice: 2100,
    isAcademyRecommended: true,
    masterComment: 'El reloj oficial avalado por la FIDE para torneos de norma y competiciones internacionales.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/10104-DGT-Easy-Plus-with-Gift-Box-2014-fill-400x284-1-300x284.jpg', alt: 'Reloj DGT 2010 Oficial FIDE' }
    ],
    shortDescription: 'Reloj oficial de la FIDE con incrementos Fischer, Bronstein, delay y modos de torneo.',
    description: 'El estándar mundial de cronometraje ajedrecístico. Cuenta con 36 modos preprogramados y opciones configurables para cualquier ritmo de juego (Blitz, Rápido, Clásico con controles periódicos). Pantalla LCD de gran nitidez y pulsador basculante ergonómico.',
    variants: [
      { id: 'v-dgt-2010', sku: 'REL-DGT-2010-STD', name: 'DGT 2010 Oficial FIDE', price: 1850, stock: 18 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-dgt-3000',
    name: 'Reloj Electrónico DGT 3000 Edición Limitada FIDE',
    slug: 'reloj-electronico-dgt-3000-edicion-limitada',
    sku: 'REL-DGT-3000',
    price: 2950,
    compareAtPrice: 3300,
    isAcademyRecommended: true,
    masterComment: 'El cronómetro más avanzado del circuito profesional, compatible con tableros electrónicos e-Board.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/3000LE.png', alt: 'Reloj DGT 3000 Edición Limitada' }
    ],
    shortDescription: 'Pantalla extra ancha con segundos visibles en todo momento y conexión a e-Boards.',
    description: 'Utilizado en los matches por el Campeonato del Mundo de Ajedrez. Presenta una pantalla ultra legible con información simultánea de tiempo, segundos e incrementos. Compatible con el sistema de retransmisión digital DGT.',
    variants: [
      { id: 'v-dgt-3000', sku: 'REL-DGT-3000-LE', name: 'DGT 3000 Limited Edition', price: 2950, stock: 10 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-reloj-leap',
    name: 'Reloj Digital Leap Profesional para Torneo y Club',
    slug: 'reloj-digital-leap-profesional-torneo',
    sku: 'REL-LEA-001',
    price: 790,
    compareAtPrice: 950,
    isAcademyRecommended: true,
    masterComment: 'Excelente relación calidad-precio para escuelas y entrenamientos cotidianos con ritmos Fischer.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/Reloj-Leap-300x300.jpg', alt: 'Reloj Digital Leap' }
    ],
    shortDescription: 'Cronómetro digital compacto y resistente con incremento por jugada y alarma sonoro/silencio.',
    description: 'El reloj favorito de academias y clubes para prácticas diarias. Compacto, ligero, con soporte completo para tiempo base e incrementos por jugada (Fischer/Delay). Funcionamiento con una sola batería AA de larga duración.',
    variants: [
      { id: 'v-leap-std', sku: 'REL-LEA-001-STD', name: 'Leap Digital Negro', price: 790, stock: 40 }
    ],
    reviews: [{ rating: 4 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-reloj-zmf',
    name: 'Reloj Digital ZMF-II con Sensor Touch LED',
    slug: 'reloj-digital-zmf-ii-sensor-touch',
    sku: 'REL-ZMF-002',
    price: 1650,
    compareAtPrice: 1900,
    isAcademyRecommended: false,
    masterComment: 'Pulsadores táctiles ultrarápidos de acero inoxidable sin partes mecánicas móviles.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/zmf-clocks.webp', alt: 'Reloj Digital ZMF II con pulsador táctil' }
    ],
    shortDescription: 'Pulsadores touch de respuesta instantánea con iluminación LED perimetral.',
    description: 'Reloj de fabricación robusta con sensores táctiles de alta sensibilidad, diseñado para partidas relámpago extremas (Bullet y Blitz) donde la durabilidad mecánica es fundamental.',
    variants: [
      { id: 'v-zmf-red', sku: 'REL-ZMF-002-RED', name: 'ZMF II Dígitos Rojos', price: 1650, stock: 12 },
      { id: 'v-zmf-blu', sku: 'REL-ZMF-002-BLU', name: 'ZMF II Dígitos Azules', price: 1650, stock: 8 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },

  // 3. Libros
  {
    id: 'prod-yusupov',
    name: 'Libro: El Método Yusupov 1 - Fundamentos',
    slug: 'libro-el-metodo-yusupov-1-fundamentos',
    sku: 'LIB-YUS-001',
    price: 680,
    compareAtPrice: 750,
    isAcademyRecommended: true,
    masterComment: 'La obra formativa por excelencia. Columna vertebral del entrenamiento en la Academia Alekhins.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/-El-M-todo-Yusupov-Fundamentos-4-Revisi-n-.jpg', alt: 'El Método Yusupov 1 Fundamentos' }
    ],
    shortDescription: 'Curso estructurado de 24 lecciones con ejercicios prácticos y test evaluativos.',
    description: 'Galardonado con la medalla Boleslavsky de la FIDE. El GM Artur Yusupov recopila el método de la Escuela Rusa en un plan estructurado de entrenamiento para táctica, estrategia, aperturas y técnica de finales.',
    variants: [
      { id: 'v-yus-1', sku: 'LIB-YUS-001-VOL1', name: 'Tomo 1: Fundamentos (Español)', price: 680, stock: 30 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-aagaard-box',
    name: 'Libro: Pensar dentro de la caja - Jacob Aagaard',
    slug: 'libro-pensar-dentro-de-la-caja-aagaard',
    sku: 'LIB-AAG-005',
    price: 820,
    compareAtPrice: 920,
    isAcademyRecommended: true,
    masterComment: 'El libro definitivo sobre psicología, cálculo y método de toma de decisiones del aspirante a GM.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/1545-PENSAR-DENTRO-DE-LA-CAJA.jpg', alt: 'Pensar dentro de la caja Jacob Aagaard' }
    ],
    shortDescription: 'Guía cumbre sobre cómo estructurar el pensamiento y calcular variantes complejas.',
    description: 'El Gran Maestro Jacob Aagaard desglosa los 4 tipos de decisiones en ajedrez, el entrenamiento de la visión combinatoria y cómo vencer las trampas psicológicas en torneos de alto rendimiento.',
    variants: [
      { id: 'v-aag-std', sku: 'LIB-AAG-005-ESP', name: 'Edición en Español Tapa Blanda', price: 820, stock: 15 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-escuela-sovietica',
    name: 'Libro: Secretos de la Estrategia de la Escuela Soviética',
    slug: 'libro-secretos-estrategia-escuela-sovietica',
    sku: 'LIB-SOV-002',
    price: 740,
    compareAtPrice: 820,
    isAcademyRecommended: true,
    masterComment: 'Explicación magistral de planes estratégicos universales comentados jugada a jugada.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/1204-Secretos-de-la-estrategia-de-la-Escuela-Sovietica-del-Ajedrez.jpg', alt: 'Secretos de la Escuela Soviética' }
    ],
    shortDescription: 'Lecciones profundas sobre la ventaja de espacio, casillas débiles y profilaxis.',
    description: 'Un tratado fundamental para comprender la concepción dinámica y posicional que dominó el ajedrez mundial durante el siglo XX. Análisis riguroso de planes típicos y estructuras de peones.',
    variants: [
      { id: 'v-sov-std', sku: 'LIB-SOV-002-ESP', name: 'Edición en Español', price: 740, stock: 20 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: 'prod-mejore-posicional',
    name: 'Libro: Mejore su Ajedrez Posicional - Carsten Hansen',
    slug: 'libro-mejore-su-ajedrez-posicional-hansen',
    sku: 'LIB-HAN-003',
    price: 650,
    compareAtPrice: 720,
    isAcademyRecommended: true,
    masterComment: 'Ideal para jugadores de nivel intermedio que desean dominar el juego de maniobras y piezas menores.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/-Mejore-su-ajedrez-posicional-.jpg', alt: 'Mejore su ajedrez posicional Hansen' }
    ],
    shortDescription: 'Conceptos clave de armonía de piezas, bloqueos y transformación de ventajas.',
    description: 'Guía práctica para entender cómo elaborar planes sin depender exclusivamente de combinaciones tácticas directas. Incluye ejercicios posicionales con explicaciones detalladas.',
    variants: [
      { id: 'v-han-std', sku: 'LIB-HAN-003-ESP', name: 'Edición en Español', price: 650, stock: 18 }
    ],
    reviews: [{ rating: 5 }]
  },
  {
    id: 'prod-aperturas-1e4',
    name: 'Libro: Aprenda Aperturas: Gane con 1.e4 - GM John Watson',
    slug: 'libro-aprenda-aperturas-gane-con-1-e4',
    sku: 'LIB-WAT-004',
    price: 620,
    compareAtPrice: 700,
    isAcademyRecommended: true,
    masterComment: 'Repertorio completo y dinámico con blancas basado en principios claros y planes comprensibles.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/-Aprenda-aperturas-Gane-con-1-e4-.jpg', alt: 'Aprenda aperturas gane con 1.e4' }
    ],
    shortDescription: 'Repertorio completo con 1.e4 contra Siciliana, Francesa, Caro-Kann y abiertas.',
    description: 'El célebre teórico John Watson explica las ideas estratégicas detrás de cada línea sin obligar a memorizar variantes interminables. La base ideal para construir tu repertorio de blancas.',
    variants: [
      { id: 'v-wat-std', sku: 'LIB-WAT-004-ESP', name: 'Edición en Español', price: 620, stock: 22 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-planificacion-final',
    name: 'Libro: Planificación del Final - Mikhail Shereshevsky',
    slug: 'libro-planificacion-del-final-shereshevsky',
    sku: 'LIB-SHE-007',
    price: 690,
    compareAtPrice: 780,
    isAcademyRecommended: true,
    masterComment: 'El clásico indiscutible sobre el paso del medio juego al final. Lectura obligatoria en la Academia.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/portada_Planificacion_del_final_1.jpg', alt: 'Planificación del Final Shereshevsky' }
    ],
    shortDescription: 'Principios rectores del final: no apresurarse, centralización del rey y dos debilidades.',
    description: 'Shereshevsky expone las reglas universales que permiten a los Grandes Maestros ganar posiciones técnicas aparentemente inofensivas. Esencial para cualquier jugador que supere los 1600 Elo.',
    variants: [
      { id: 'v-she-std', sku: 'LIB-SHE-007-ESP', name: 'Edición Oficial en Español', price: 690, stock: 16 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-pack-botvinnik',
    name: 'Pack Especial Trilogía de Maestría Botvinnik (Tapa Dura)',
    slug: 'pack-trilogia-maestria-mikhail-botvinnik-tapa-dura',
    sku: 'LIB-BOT-PACK',
    price: 1950,
    compareAtPrice: 2300,
    isAcademyRecommended: true,
    masterComment: 'Edición de lujo para coleccionistas y estudiosos profundos del Patriarca del Ajedrez.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/pack-estrategia-mikhail-botvinnik-tapa-dura.jpg', alt: 'Trilogía Mikhail Botvinnik Tapa Dura' }
    ],
    shortDescription: 'Colección de 3 tomos encuadernados en tapa dura con las partidas analizadas por el Campeón Mundial.',
    description: 'El legado analítico y metodológico del 6° Campeón Mundial de Ajedrez, Mikhail Botvinnik. Contiene sus partidas más memorables comentadas con rigor científico.',
    variants: [
      { id: 'v-bot-pack', sku: 'LIB-BOT-PACK-HD', name: 'Pack 3 Tomos Tapa Dura', price: 1950, stock: 8 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-mates-esenciales',
    name: 'Libro: Mates Esenciales y Táctica para Niños',
    slug: 'libro-mates-esenciales-tactica-para-ninos',
    sku: 'LIB-MAT-008',
    price: 450,
    compareAtPrice: 520,
    isAcademyRecommended: true,
    masterComment: 'El compañero didáctico perfecto para los alumnos de nuestro Grupo de Ajedrez Inicial.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/1076-Mates-esenciales-Vol.-2.jpg', alt: 'Mates Esenciales Vol. 2' }
    ],
    shortDescription: 'Ejercicios ilustrados y patrones de remate para jóvenes ajedrecistas.',
    description: 'Explicaciones claras y diagramas grandes a todo color para afianzar la visión combinatoria, mates en 1 y 2 jugadas y figuras clásicas de ataque.',
    variants: [
      { id: 'v-mat-std', sku: 'LIB-MAT-008-ESP', name: 'Volumen 2 Didáctico', price: 450, stock: 30 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },

  // 4. Tableros
  {
    id: 'prod-tablero-madera',
    name: 'Tablero de Nogal y Arce Escaques 50mm para Estudio',
    slug: 'tablero-nogal-arce-escaques-50mm',
    sku: 'TAB-NOG-050',
    price: 2200,
    compareAtPrice: 2600,
    isAcademyRecommended: true,
    masterComment: 'Madera de grano fino seleccionada con acabado mate antideslumbrante para largas sesiones de análisis.',
    category: { id: 'cat-tableros', name: 'Tableros', slug: 'tableros' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms (1).jpg', alt: 'Tablero de Nogal y Arce' }
    ],
    shortDescription: 'Tablero rígido de maderas finas nobles con biselado suave y medidas reglamentarias.',
    description: 'Construido artesanalmente con incrustaciones de madera noble de nogal y arce. Su superficie cuenta con un tratamiento protector mate que evita reflejos de luz y ofrece un tacto cálido inigualable.',
    variants: [
      { id: 'v-tab-nog', sku: 'TAB-NOG-050-STD', name: 'Escaques 50 mm (Rey 8.5 a 9.5 cm)', price: 2200, stock: 12 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-tablero-vinil-uscf',
    name: 'Tablero Oficial USCF Vinil Enrollable Escaques 57mm',
    slug: 'tablero-oficial-uscf-vinil-enrollable-57mm',
    sku: 'TAB-USC-057',
    price: 380,
    compareAtPrice: 450,
    isAcademyRecommended: true,
    masterComment: 'El tablero de vinil más resistente y duradero del mercado, no se decolora ni se resquebraja.',
    category: { id: 'cat-tableros', name: 'Tableros', slug: 'tableros' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg', alt: 'Tablero USCF Vinil 57mm' }
    ],
    shortDescription: 'Tablero reglamentario de 57 mm por escaque con coordenadas claras en los cuatro bordes.',
    description: 'Fabricado en vinil de alto calibre resistente al agua y a la abrasión. Confeccionado según las especificaciones técnicas de torneos abiertos y festivales internacionales.',
    variants: [
      { id: 'v-usc-grn', sku: 'TAB-USC-057-GRN', name: 'Verde / Marfil USCF', price: 380, stock: 50, color: 'Verde' },
      { id: 'v-usc-blk', sku: 'TAB-USC-057-BLK', name: 'Negro / Marfil USCF', price: 380, stock: 35, color: 'Negro' }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }]
  },

  // 5. Piezas
  {
    id: 'prod-piezas-madera',
    name: 'Piezas de Ajedrez de Madera Staunton Clásicas Plomadas',
    slug: 'piezas-ajedrez-madera-staunton-clasicas',
    sku: 'PIE-MAD-STA',
    price: 1450,
    compareAtPrice: 1750,
    isAcademyRecommended: true,
    masterComment: 'Equilibrio majestuoso y suave base de paño para no rayar los tableros finos.',
    category: { id: 'cat-piezas', name: 'Piezas', slug: 'piezas' },
    images: [
      { url: '/plasticpieces_blackwhite_2.jpg', alt: 'Piezas Staunton Clásicas' }
    ],
    shortDescription: 'Juego de piezas torneadas a mano con plomado equilibrado y altura de rey 9.5cm.',
    description: 'Piezas de madera noble talladas al estilo clásico Staunton de 1849. Cada pieza cuenta con lastre metálico interno que proporciona un centro de gravedad bajo y una estabilidad excepcional.',
    variants: [
      { id: 'v-pie-mad', sku: 'PIE-MAD-STA-STD', name: 'Madera de Boj Natural y Tintado Negro', price: 1450, stock: 15 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-piezas-plastico-pesado',
    name: 'Piezas Staunton #6 Plástico Pesado Triple Peso con 2 Reinas',
    slug: 'piezas-staunton-6-plastico-pesado-triple-peso',
    sku: 'PIE-PLA-006',
    price: 480,
    compareAtPrice: 580,
    isAcademyRecommended: true,
    masterComment: 'Imposible de derribar accidentalmente en apuros de tiempo por su base plomada.',
    category: { id: 'cat-piezas', name: 'Piezas', slug: 'piezas' },
    images: [
      { url: '/plasticpieces_blackwhite_2.jpg', alt: 'Piezas Plástico Pesado Staunton #6' }
    ],
    shortDescription: 'Casi 1 kg de peso en el set con 34 piezas reglamentarias (2 damas extra para coronación).',
    description: 'Fabricadas en polímero de alta densidad indestructible con núcleos de hierro plomado. Las piezas preferidas para blitz, torneos escolares y partidas de club.',
    variants: [
      { id: 'v-pie-blk', sku: 'PIE-PLA-006-BLK', name: 'Blanco Marfil y Negro', price: 480, stock: 60 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },

  // 6. Clubes & Escuelas
  {
    id: 'prod-pack-escolar',
    name: 'Paquete Escolar / Club (10 Sets de Ajedrez Completos)',
    slug: 'paquete-escolar-club-10-sets',
    sku: 'PAK-ESC-010',
    price: 7990,
    compareAtPrice: 9500,
    isAcademyRecommended: true,
    masterComment: 'El equipamiento predilecto para dotar aulas completas con garantía de durabilidad institucional.',
    category: { id: 'cat-clubes', name: 'Clubes & Escuelas', slug: 'clubes-y-escuelas' },
    images: [
      { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Paquete Escolar 10 Sets' }
    ],
    shortDescription: 'Dotación completa para 20 alumnos simultáneos: 10 tableros, 10 juegos de piezas y 10 bolsos.',
    description: 'Paquete institucional diseñado para colegios, universidades y academias de ajedrez. Incluye 10 tableros de vinil con escaques reglamentarios, 10 juegos de piezas Staunton pesadas con reinas extra y 10 fundas de transporte.',
    variants: [
      { id: 'v-pak-esc', sku: 'PAK-ESC-010-STD', name: 'Paquete 10 Sets Completo', price: 7990, stock: 12 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-mural-demostrativo',
    name: 'Tablero Mural Demostrativo Enrollable 100x100cm Magnético',
    slug: 'tablero-mural-demostrativo-enrollable-magnetico',
    sku: 'PAK-MUR-100',
    price: 1850,
    compareAtPrice: 2200,
    isAcademyRecommended: true,
    masterComment: 'Imprescindible para profesores que imparten cátedras presenciales a grupos numerosos.',
    category: { id: 'cat-clubes', name: 'Clubes & Escuelas', slug: 'clubes-y-escuelas' },
    images: [
      { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Tablero Mural Demostrativo' }
    ],
    shortDescription: 'Tablero gigante de pared con piezas magnéticas y bolsa cilíndrica de viaje.',
    description: 'Mural de 1 metro cuadrado con casillas de alta visibilidad y piezas magnéticas gruesas fácilmente reconocibles desde cualquier rincón del salón. Se enrolla en segundos para facilitar su transporte.',
    variants: [
      { id: 'v-mur-std', sku: 'PAK-MUR-100-MAG', name: 'Mural 100x100cm Magnético', price: 1850, stock: 10 }
    ],
    reviews: [{ rating: 5 }]
  },

  // 7. Accesorios
  {
    id: 'prod-maletin-alekhins',
    name: 'Maletín Oficial de Transporte Reforzado Alekhins',
    slug: 'maletin-oficial-transporte-reforzado-alekhins',
    sku: 'ACC-BAG-001',
    price: 550,
    compareAtPrice: 690,
    isAcademyRecommended: true,
    masterComment: 'Bolsillo acolchado especial para reloj digital, presillas para el tablero y espacio para piezas.',
    category: { id: 'cat-accesorios', name: 'Accesorios', slug: 'accesorios' },
    images: [
      { url: '/2025sn-bag-01.webp', alt: 'Maletín de Transporte Alekhins' }
    ],
    shortDescription: 'Bolsa de torneo reforzada con compartimentos dedicados para reloj, tablero y piezas.',
    description: 'Confeccionado en lona impermeable de grado militar con acolchado antigolpes. Protege tu reloj de torneo, bolígrafos, planillas de anotación y juego de piezas en un formato elegante y profesional.',
    variants: [
      { id: 'v-bag-blk', sku: 'ACC-BAG-001-BLK', name: 'Negro Azabache con Bordado Dorado', price: 550, stock: 35 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },

  // --- PRODUCTOS ADICIONALES AMPLIADOS ---

  // Sets de Ajedrez Adicionales
  {
    id: 'prod-set-palo-rosa',
    name: 'Set de Ajedrez de Lujo Staunton Madera Palo de Rosa 3.75"',
    slug: 'set-ajedrez-lujo-staunton-madera-palo-rosa',
    sku: 'SET-ROSE-LUX',
    price: 3890,
    compareAtPrice: 4500,
    isAcademyRecommended: true,
    masterComment: 'Piezas talladas a mano con maderas nobles seleccionadas. El set definitivo para el coleccionista y el estudio en casa.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms (1).jpg', alt: 'Set de Lujo Palo de Rosa' },
      { url: '/plasticpieces_blackwhite_2.jpg', alt: 'Detalle de piezas talladas' }
    ],
    shortDescription: 'Piezas artesanales de palo de rosa y boj natural de 3.75" plomadas con tablero de madera noble.',
    description: 'Juego de colección para los amantes de la ebanistería ajedrecística. Cada pieza ha sido pulida a mano con paño verde esmeralda y contrapeso de latón para un deslizamiento silencioso y distinguido.',
    variants: [
      { id: 'v-rose-std', sku: 'SET-ROSE-LUX-375', name: 'Madera Palo de Rosa y Boj 3.75"', price: 3890, stock: 6 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-set-silicona-escolar',
    name: 'Set Escolar de Ajedrez con Tablero de Silicona Ultra Flexible',
    slug: 'set-escolar-ajedrez-tablero-silicona-flexible',
    sku: 'SET-SIL-ESC',
    price: 390,
    compareAtPrice: 480,
    isAcademyRecommended: true,
    masterComment: 'El tablero de silicona puede doblarse, estrujarse o lavarse con agua y jabón; jamás pierde su forma.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms.jpg', alt: 'Set de Silicona Escolar' }
    ],
    shortDescription: 'Set irrompible para niños y escuelas con tablero de silicona lavable y piezas plásticas sólidas.',
    description: 'Ideal para los pequeños que inician su aventura en el ajedrez. No se resbala, es resistente a líquidos y alimentos, y las piezas soportan el uso rudo diario.',
    variants: [
      { id: 'v-sil-grn', sku: 'SET-SIL-ESC-GRN', name: 'Silicona Verde y Marfil', price: 390, stock: 40, color: 'Verde' },
      { id: 'v-sil-blu', sku: 'SET-SIL-ESC-BLU', name: 'Silicona Azul y Marfil', price: 390, stock: 30, color: 'Azul' }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: 'prod-set-aleman-knight',
    name: 'Set de Ajedrez Clásico Alemán Knight Staunton #5 en Madera de Boj',
    slug: 'set-ajedrez-aleman-knight-staunton-5-madera-boj',
    sku: 'SET-GER-KNI',
    price: 2190,
    compareAtPrice: 2600,
    isAcademyRecommended: true,
    masterComment: 'El diseño German Knight es el caballo más representativo de los torneos de la Copa del Mundo en Europa.',
    category: { id: 'cat-sets', name: 'Sets de Ajedrez', slug: 'sets' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms (1).jpg', alt: 'Set German Knight' }
    ],
    shortDescription: 'Caballos tallados al estilo clásico alemán de una sola pieza en boj alemán y nogal.',
    description: 'La silueta del caballo German Knight es legendaria por su durabilidad en blitz y su estética limpia. Altura de rey 8.9 cm con base plomada reforzada.',
    variants: [
      { id: 'v-ger-std', sku: 'SET-GER-KNI-STD', name: 'Boj Natural y Ébano Sintético #5', price: 2190, stock: 14 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },

  // Relojes Adicionales
  {
    id: 'prod-dgt-3000-rojo',
    name: 'Reloj Digital DGT 3000 Edición Carmesí / Rojo Oficial',
    slug: 'reloj-digital-dgt-3000-edicion-carmesi-rojo',
    sku: 'REL-DGT-3000-RED',
    price: 3100,
    compareAtPrice: 3450,
    isAcademyRecommended: true,
    masterComment: 'Edición especial de alto contraste para torneos de gala y retransmisiones en vivo.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/D_NQ_NP_682553-CBT69004443717_042023-O-reloj-de-ajedrez-dgt-3000-temporizador-color-rojo.webp', alt: 'Reloj DGT 3000 Rojo' }
    ],
    shortDescription: 'Acabado en rojo deportivo con todas las funciones del DGT 3000 oficial FIDE.',
    description: 'El reloj con mayor presencia visual en el tablero. Permite conectar con e-Boards de retransmisión oficial y visualizar segundos desde la primera jugada.',
    variants: [
      { id: 'v-dgt-red', sku: 'REL-DGT-3000-RED-STD', name: 'Carcasa Roja Brillante FIDE', price: 3100, stock: 9 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-dgt-1500',
    name: 'Reloj Digital DGT 1500 Grey-Blue para Club y Entrenamiento',
    slug: 'reloj-digital-dgt-1500-grey-blue-club',
    sku: 'REL-DGT-1500',
    price: 1490,
    compareAtPrice: 1750,
    isAcademyRecommended: true,
    masterComment: 'Sencillo de programar, display espacioso y excelente durabilidad para clubes escolares.',
    category: { id: 'cat-relojes', name: 'Relojes', slug: 'relojes' },
    images: [
      { url: '/dgt1500-grey-blue-chess-clock-home.avif', alt: 'Reloj DGT 1500 Grey-Blue' }
    ],
    shortDescription: 'Reloj digital accesible con incrementos oficiales de torneo FIDE.',
    description: 'La opción predilecta para jugadores que buscan la precisión DGT a un precio más contenido. Permite configurar ritmos con incremento por jugada y periodos múltiples.',
    variants: [
      { id: 'v-dgt-1500', sku: 'REL-DGT-1500-BLU', name: 'Gris y Azul Marino', price: 1490, stock: 22 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },

  // Tableros Adicionales
  {
    id: 'prod-tablero-dgt-centaur',
    name: 'Tablero Electrónico DGT Centaur Autónomo con IA Adaptativa',
    slug: 'tablero-electronico-dgt-centaur-ia-adaptativa',
    sku: 'TAB-DGT-CENTAUR',
    price: 9800,
    compareAtPrice: 10900,
    isAcademyRecommended: true,
    masterComment: 'El compañero de entrenamiento definitivo. Se adapta automáticamente a tu nivel de juego gracias a su inteligencia artificial integrada sin pantallas.',
    category: { id: 'cat-tableros', name: 'Tableros', slug: 'tableros' },
    images: [
      { url: '/DGT-Centaur-1.jpg', alt: 'DGT Centaur Tablero Autónomo' },
      { url: '/DGT-Centaur-Bag-1.jpg', alt: 'Bolso Oficial DGT Centaur' }
    ],
    shortDescription: 'Tablero e-board con IA adaptativa e iluminación de jugadas por led en los escaques.',
    description: 'Sin cables a la computadora ni necesidad de mirar una pantalla. Sus sensores ópticos y luces LED circulares en cada escaque indican las jugadas de la máquina con total fluidez.',
    variants: [
      { id: 'v-centaur-std', sku: 'TAB-DGT-CENTAUR-SYS', name: 'DGT Centaur + Maletín Oficial', price: 9800, stock: 4 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-tablero-caoba',
    name: 'Tablero de Torneo de Caoba y Sicomoro Artesanal 55mm',
    slug: 'tablero-torneo-caoba-sicomoro-artesanal-55mm',
    sku: 'TAB-CAO-055',
    price: 2650,
    compareAtPrice: 3100,
    isAcademyRecommended: true,
    masterComment: 'Contrastes visuales cálidos que reducen la fatiga ocular durante partidas prolongadas de torneo.',
    category: { id: 'cat-tableros', name: 'Tableros', slug: 'tableros' },
    images: [
      { url: '/tablero-de-ajedrez-con-logotipo-de-la-uscf-escaques-de-57-cms (1).jpg', alt: 'Tablero de Caoba y Sicomoro' }
    ],
    shortDescription: 'Tablero macizo de maderas finas con escaques de 55 mm homologados para piezas Staunton #6.',
    description: 'Acabado poliuretano mate antirreflejos de cinco capas con bordes biselados. Fabricación artesanal de alta durabilidad para salas de estudio y bibliotecas personales.',
    variants: [
      { id: 'v-cao-std', sku: 'TAB-CAO-055-STD', name: 'Escaques de 55 mm para Torneo', price: 2650, stock: 8 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },

  // Piezas Adicionales
  {
    id: 'prod-piezas-cuatro-reinas',
    name: 'Juego de Reinas de Repuesto para Coronación (2 Blancas, 2 Negras)',
    slug: 'juego-reinas-repuesto-coronacion-staunton-6',
    sku: 'PIE-QUE-SET4',
    price: 180,
    compareAtPrice: 240,
    isAcademyRecommended: true,
    masterComment: 'Indispensables para coronar en finales complejos de peones sin tener que voltear una torre al revés.',
    category: { id: 'cat-piezas', name: 'Piezas', slug: 'piezas' },
    images: [
      { url: '/juego-de-reinas.jpg', alt: 'Juego de 4 Reinas Staunton para Coronación' }
    ],
    shortDescription: '4 damas extra reglamentarias Staunton #6 pesadas con base de paño.',
    description: 'Juego reglamentario para complementar sets que no cuentan con doble dama. Compatibles en proporción y peso con cualquier juego Staunton #5 y #6.',
    variants: [
      { id: 'v-que-set4', sku: 'PIE-QUE-SET4-STD', name: '4 Damas Extra (2 Blancas + 2 Negras)', price: 180, stock: 50 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-piezas-escolares',
    name: 'Piezas Staunton Plástico Reglamentario Peso Simple Escolar',
    slug: 'piezas-staunton-plastico-peso-simple-escolar',
    sku: 'PIE-ESC-SMP',
    price: 260,
    compareAtPrice: 320,
    isAcademyRecommended: false,
    masterComment: 'Económicas y ultrarresistentes para aulas escolares multitudinarias y talleres comunitarios.',
    category: { id: 'cat-piezas', name: 'Piezas', slug: 'piezas' },
    images: [
      { url: '/plasticpieces_blackwhite_2.jpg', alt: 'Piezas Escolares Peso Simple' }
    ],
    shortDescription: 'Juego de 32 piezas Staunton de polietileno irrompible con altura de rey 9.5 cm.',
    description: 'La opción más accesible para dotar tableros en escuelas y clubes comunitarios. Lavables, sin aristas cortantes y con fieltro en la base.',
    variants: [
      { id: 'v-esc-smp', sku: 'PIE-ESC-SMP-STD', name: 'Juego 32 Piezas Escolar', price: 260, stock: 75 }
    ],
    reviews: [{ rating: 4 }, { rating: 5 }]
  },

  // Libros y Literatura Adicionales
  {
    id: 'prod-libro-momento-critico',
    name: 'Libro: El Momento Crítico - Mark Dvoretsky',
    slug: 'libro-el-momento-critico-mark-dvoretsky',
    sku: 'LIB-DVO-002',
    price: 780,
    compareAtPrice: 880,
    isAcademyRecommended: true,
    masterComment: 'Dvoretsky enseña cómo detectar el instante exacto en que una jugada decide el desenlace de la partida.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/715-EL-MOMENTO-CRITICO.jpg', alt: 'El Momento Crítico Mark Dvoretsky' }
    ],
    shortDescription: 'El legendario entrenador ruso desglosa la toma de decisiones y el cálculo en momentos cruciales.',
    description: 'Obra cumbre de la pedagogía de élite. Explica cómo identificar jugadas candidatas clave, manejar el tiempo en apuros de reloj y mantener la sangre fría en posiciones de doble filo.',
    variants: [
      { id: 'v-dvo-std', sku: 'LIB-DVO-002-ESP', name: 'Edición en Español', price: 780, stock: 16 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-piezas-atacan',
    name: 'Libro: Todas las Piezas Atacan - GM Lev Alburt',
    slug: 'libro-todas-las-piezas-atacan-lev-alburt',
    sku: 'LIB-ALB-001',
    price: 720,
    compareAtPrice: 800,
    isAcademyRecommended: true,
    masterComment: 'Excelente tratado sobre cómo coordinar el ataque coordinado contra el enroque enemigo.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/719-TODAS-LAS-PIEZAS-ATACAN-Vol.-2.jpg', alt: 'Todas las piezas atacan Lev Alburt' }
    ],
    shortDescription: 'Modelos de ataque directo, sacrificios temáticos y aperturas agresivas para ganar rápido.',
    description: 'El tricampeón de los Estados Unidos Lev Alburt enseña el arte de la iniciativa agresiva y la coordinación de piezas para lanzar ofensivas imparables.',
    variants: [
      { id: 'v-alb-std', sku: 'LIB-ALB-001-ESP', name: 'Volumen 2 Didáctico', price: 720, stock: 18 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-viaje-reino',
    name: 'Libro: Viaje al Reino del Ajedrez - Yuri Averbaj y M. Beilin',
    slug: 'libro-viaje-al-reino-del-ajedrez-averbaj',
    sku: 'LIB-AVE-001',
    price: 580,
    compareAtPrice: 650,
    isAcademyRecommended: true,
    masterComment: 'El libro clásico con el que aprendieron Kasparov y Karpov. Narrativa literaria y rigor didáctico.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/1198-Viaje-al-reino-del-Ajedrez.jpg', alt: 'Viaje al reino del ajedrez Averbaj' }
    ],
    shortDescription: 'El curso clásico de la Escuela Rusa para adentrarse en la belleza del pensamiento ajedrecístico.',
    description: 'Combina historias fascinantes, anécdotas de campeones mundiales y explicaciones progresivas desde las reglas básicas hasta los primeros sacrificios brillantes.',
    variants: [
      { id: 'v-ave-std', sku: 'LIB-AVE-001-ESP', name: 'Edición Ilustrada en Español', price: 580, stock: 25 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-modelos-finales',
    name: 'Libro: 112 Ejercicios de Modelos de Finales',
    slug: 'libro-112-ejercicios-modelos-de-finales',
    sku: 'LIB-FIN-112',
    price: 520,
    compareAtPrice: 600,
    isAcademyRecommended: true,
    masterComment: 'Finales típicos de torres y peones con soluciones comentadas para fijar conceptos clave.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/112-ejercicios-de-modelos-de-finales.jpg', alt: '112 Ejercicios de Modelos de Finales' }
    ],
    shortDescription: 'Cuaderno práctico de ejercicios de finales esenciales para jugadores de 1400 a 2000 Elo.',
    description: 'Un compendio selecto con posiciones de finales de peones, torres y piezas menores que todo jugador de torneo debe conocer de memoria para no dejar escapar medio punto.',
    variants: [
      { id: 'v-fin-std', sku: 'LIB-FIN-112-ESP', name: 'Edición en Español', price: 520, stock: 20 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: 'prod-libro-decisiones-tecnicas',
    name: 'Libro: La Toma de Decisiones Técnicas en Ajedrez - Boris Gelfand',
    slug: 'libro-toma-de-decisiones-tecnicas-boris-gelfand',
    sku: 'LIB-GEL-001',
    price: 850,
    compareAtPrice: 950,
    isAcademyRecommended: true,
    masterComment: 'El subcampeón mundial Boris Gelfand revela el proceso de cálculo de la élite en posiciones cerradas.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/1636-LA-TOMA-DE-DECISIONES-TECNICAS-EN-AJEDREZ.png', alt: 'La Toma de Decisiones Técnicas Boris Gelfand' }
    ],
    shortDescription: 'Tratado de estrategia posicional avanzada con prólogo de Jacob Aagaard.',
    description: 'Gelfand comparte su experiencia personal en matches por la corona mundial contra Anand y Carlsen. Profundiza en el juego posicional, estructura de peones y cómo explotar microventajas.',
    variants: [
      { id: 'v-gel-std', sku: 'LIB-GEL-001-ESP', name: 'Edición Oficial Tapa Blanda', price: 850, stock: 12 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-zlotnik',
    name: 'Libro: Manual de Ajedrez Posicional - Boris Zlotnik',
    slug: 'libro-manual-de-ajedrez-posicional-zlotnik',
    sku: 'LIB-ZLO-001',
    price: 790,
    compareAtPrice: 890,
    isAcademyRecommended: true,
    masterComment: 'El manual con el que se formaron Fabiano Caruana y cientos de titulados internacionales.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/zlotnik_web-3_U6YKWrD.jpg', alt: 'Manual de Ajedrez Posicional Zlotnik' }
    ],
    shortDescription: 'Curso sistemático sobre cómo transformar una posición pasiva en una victoria técnica.',
    description: 'El célebre entrenador de la Escuela de Moscú Boris Zlotnik estructuró este método pedagógico para comprender las dinámicas de casillas débiles, iniciativa y ruptura central.',
    variants: [
      { id: 'v-zlo-std', sku: 'LIB-ZLO-001-ESP', name: 'Edición Completa en Español', price: 790, stock: 14 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-rival-al-frente',
    name: 'Libro: Nunca olvides que tienes un rival al frente - GM Mark Taimanov',
    slug: 'libro-nunca-olvides-que-tienes-un-rival-al-frente-taimanov',
    sku: 'LIB-TAI-001',
    price: 680,
    compareAtPrice: 760,
    isAcademyRecommended: true,
    masterComment: 'Psicología en el tablero y profilaxis activa de la mano de uno de los 10 mejores jugadores del siglo XX.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Nuncaolvidesquetienesunrivalalfrente.webp', alt: 'Nunca olvides que tienes un rival al frente' }
    ],
    shortDescription: 'Lecciones magistrales sobre profilaxis, psicología del adversario y resiliencia en la partida.',
    description: 'El legendario Gran Maestro Mark Taimanov expone las trampas de jugar en solitario y cómo anticiparse a los recursos ocultos del contrincante en partidas tensas.',
    variants: [
      { id: 'v-tai-std', sku: 'LIB-TAI-001-ESP', name: 'Edición en Español', price: 680, stock: 17 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libro-lecciones-medio-juego',
    name: 'Libro: Lecciones Magistrales de Medio Juego: Teoría y Práctica',
    slug: 'libro-lecciones-magistrales-de-medio-juego-teoria-practica',
    sku: 'LIB-MED-003',
    price: 710,
    compareAtPrice: 790,
    isAcademyRecommended: true,
    masterComment: 'Planes estratégicos de ataque, peón aislado y estructuras Carlsbad explicados minuciosamente.',
    category: { id: 'cat-libros', name: 'Libros', slug: 'libros' },
    images: [
      { url: '/Libros/1730-Lecciones-magistrales-de-medio-juego.-Teoria-y-Practica.jpg', alt: 'Lecciones Magistrales de Medio Juego' }
    ],
    shortDescription: 'Un puente sólido entre el fin de la apertura y el inicio del remate técnico.',
    description: 'Analiza más de 100 partidas modelo comentadas en torno a los temas medulares del medio juego moderno: la lucha por la columna abierta, el sacrificio posicional de calidad y la ventaja de espacio.',
    variants: [
      { id: 'v-med-std', sku: 'LIB-MED-003-ESP', name: 'Edición Ilustrada', price: 710, stock: 15 }
    ],
    reviews: [{ rating: 5 }, { rating: 4 }]
  },

  // Clubes & Escuelas Adicionales
  {
    id: 'prod-pack-aula-20',
    name: 'Paquete Magistral de Aula (20 Sets de Ajedrez + Tablero Mural)',
    slug: 'paquete-magistral-aula-20-sets-mural',
    sku: 'PAK-AUL-020',
    price: 16500,
    compareAtPrice: 19800,
    isAcademyRecommended: true,
    masterComment: 'La dotación definitiva para escuelas que buscan equipar un salón completo para 40 alumnos.',
    category: { id: 'cat-clubes', name: 'Clubes & Escuelas', slug: 'clubes-y-escuelas' },
    images: [
      { url: '/ajedrez-club-special-ligero-con-tablero-de-vinil-y-bolso.jpg', alt: 'Paquete de Aula 20 Sets' }
    ],
    shortDescription: '20 sets de torneo completos + 1 tablero mural demostrativo gigante de 100x100 cm magnético.',
    description: 'Paquete diseñado para centros educativos, universidades y casas de la cultura. Incluye 20 tableros de vinil, 20 juegos de piezas plásticas pesadas Staunton #6, 20 bolsos y 1 tablero mural con piezas magnéticas para el profesor.',
    variants: [
      { id: 'v-aul-20', sku: 'PAK-AUL-020-STD', name: 'Paquete 20 Sets + Mural Magnético', price: 16500, stock: 6 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-pack-torneo-club',
    name: 'Paquete Torneo Club (10 Relojes Digitales DGT + 10 Sets Triples)',
    slug: 'paquete-torneo-club-10-relojes-dgt-10-sets-triples',
    sku: 'PAK-TOR-CLUB',
    price: 25900,
    compareAtPrice: 29500,
    isAcademyRecommended: true,
    masterComment: 'Equipamiento de grado olímpico para organizar torneos de norma y festivales homologados FIDE.',
    category: { id: 'cat-clubes', name: 'Clubes & Escuelas', slug: 'clubes-y-escuelas' },
    images: [
      { url: '/10104-DGT-Easy-Plus-with-Gift-Box-2014-fill-400x284-1-300x284.jpg', alt: 'Paquete 10 Relojes DGT y 10 Sets' }
    ],
    shortDescription: '10 relojes digitales DGT oficiales + 10 sets Staunton #6 triples pesados con doble reina.',
    description: 'El combo indispensable para clubes que organizan circuitos oficiales con rating FIDE. Los relojes cuentan con todos los ritmos con incremento Fischer y los sets disponen de doble dama reglamentaria.',
    variants: [
      { id: 'v-tor-club', sku: 'PAK-TOR-CLUB-STD', name: 'Combo 10 Relojes DGT + 10 Sets', price: 25900, stock: 5 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },

  // Accesorios Adicionales
  {
    id: 'prod-funda-reloj-dgt',
    name: 'Funda Acolchada de Protección para Reloj Digital DGT',
    slug: 'funda-acolchada-proteccion-reloj-digital-dgt',
    sku: 'ACC-CAS-DGT',
    price: 320,
    compareAtPrice: 390,
    isAcademyRecommended: true,
    masterComment: 'Evita rayaduras en la pantalla LCD del reloj durante el transporte en la mochila.',
    category: { id: 'cat-accesorios', name: 'Accesorios', slug: 'accesorios' },
    images: [
      { url: '/2025sn-bag-01.webp', alt: 'Funda Acolchada para Reloj DGT' }
    ],
    shortDescription: 'Funda de neopreno con cierre reforzado diseñada a medida para relojes DGT 2010 y DGT 3000.',
    description: 'Protege tu reloj de torneo de golpes, caídas accidentales y polvo. Interior afelpado suave y exterior repelente a salpicaduras.',
    variants: [
      { id: 'v-cas-dgt', sku: 'ACC-CAS-DGT-STD', name: 'Funda Neopreno Negro Alekhins', price: 320, stock: 40 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-libreta-anotacion',
    name: 'Libreta Oficial de Planillas de Anotación FIDE (100 Partidas)',
    slug: 'libreta-oficial-planillas-anotacion-fide-100-partidas',
    sku: 'ACC-NOT-100',
    price: 140,
    compareAtPrice: 180,
    isAcademyRecommended: true,
    masterComment: 'Papel autocopiante de calidad con espacio para hasta 80 jugadas y diagrama para posición final.',
    category: { id: 'cat-accesorios', name: 'Accesorios', slug: 'accesorios' },
    images: [
      { url: '/2025sn-bag-01.webp', alt: 'Libreta de Planillas de Anotación FIDE' }
    ],
    shortDescription: 'Libreta espiral con 100 planillas reglamentarias con membrete de Academia Alekhins.',
    description: 'Diseñada según las normas de arbitraje de la FIDE. Cada hoja cuenta con casillas claras para número de ronda, mesa, contendientes, Elo, resultado y firmas de ambos jugadores.',
    variants: [
      { id: 'v-not-100', sku: 'ACC-NOT-100-STD', name: 'Libreta Espiral 100 Partidas', price: 140, stock: 80 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: 'prod-pack-5-libretas',
    name: 'Paquete de 5 Libretas de Anotación de Torneo Alekhins',
    slug: 'paquete-5-libretas-anotacion-torneo-alekhins',
    sku: 'ACC-NOT-PAK5',
    price: 590,
    compareAtPrice: 700,
    isAcademyRecommended: true,
    masterComment: 'El pack más conveniente para toda la temporada de torneos del año.',
    category: { id: 'cat-accesorios', name: 'Accesorios', slug: 'accesorios' },
    images: [
      { url: '/2025sn-bag-01.webp', alt: 'Pack 5 Libretas de Anotación' }
    ],
    shortDescription: '5 libretas de 100 partidas (500 partidas en total) con descuento especial.',
    description: 'Equípate para todo el calendario competitivo con el paquete de 5 libretas oficiales de anotación. Formato compacto de bolsillo fácil de llevar al salón de juego.',
    variants: [
      { id: 'v-not-pak5', sku: 'ACC-NOT-PAK5-STD', name: 'Pack de 5 Libretas', price: 590, stock: 25 }
    ],
    reviews: [{ rating: 5 }, { rating: 5 }]
  }
];

export function getStoreProductBySlug(slug: string): ProductItem | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedStoreProducts(limit = 4): ProductItem[] {
  return STORE_PRODUCTS.filter((p) => p.isAcademyRecommended).slice(0, limit);
}

