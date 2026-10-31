export interface AcademicProgram {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'INICIACION' | 'DESARROLLO' | 'INTERMEDIO' | 'AVANZADO' | 'ALTO_RENDIMIENTO' | 'PERSONALIZADO' | 'INSTITUCIONAL';
  level: string;
  recommendedElo: string;
  targetAge: string;
  duration: string;
  sessionCount: string;
  modality: string;
  schedule: string;
  instructor: string;
  priceMxn: number;
  priceUsd: number;
  billingPeriod: string;
  featuredBadge?: string;
  description: string;
  objectives: string[];
  syllabus: string[];
  includes: string[];
  benefits: string[];
  materialsIncluded: string[];
  chessgoraIncluded: boolean;
}

export interface CoachProfile {
  id: string;
  slug: string;
  name: string;
  fideTitle: string;
  fideId?: string;
  role: string;
  nationality: string;
  avatarUrl: string;
  ratingPeak?: number;
  ratingCurrent?: number;
  bio: string;
  experienceYears: number;
  achievements: string[];
  specialties: string[];
  teachingStyle: string;
  programsTaught: string[];
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  // 1. Iniciación
  {
    id: 'prog-iniciacion',
    slug: 'iniciacion',
    name: 'Programa de Iniciación & Fundamentos',
    subtitle: 'Aprende las reglas, la visión espacial y los principios fundamentales del juego.',
    category: 'INICIACION',
    level: 'Principiantes (0 - 1000 Elo)',
    recommendedElo: '0 a 1000 Elo',
    targetAge: 'Niños (desde 6 años), jóvenes y adultos',
    duration: 'Mensual renovable',
    sessionCount: '12 sesiones mensuales (3 días por semana)',
    modality: 'Online en vivo (Zoom / Chessgora)',
    schedule: 'Lunes, miércoles y jueves • 6:00 p. m. a 7:00 p. m. (CDMX)',
    instructor: 'Especialistas en Pedagogía Inicial • Dirección MI Roberto Martín del Campo',
    priceMxn: 500,
    priceUsd: 28,
    billingPeriod: 'mes',
    featuredBadge: 'Ideal para Empezar',
    description:
      'Programa diseñado para quienes dan sus primeros pasos en el ajedrez. Desarrolla la concentración, el razonamiento lógico, el conocimiento de cada pieza y los mates elementales a través de una pedagogía amena y estructurada.',
    objectives: [
      'Dominar el movimiento reglamentario y la coordinación de las piezas.',
      'Identificar amenazas inmediatas, jaques y recursos de defensa.',
      'Aprender los mates básicos de rey y dama, rey y torre.',
      'Comprender el control del centro y los principios básicos de apertura.'
    ],
    syllabus: [
      'Geometría del tablero, filas, columnas y diagonales.',
      'Valor relativo de las piezas y conceptos de captura.',
      'El jaque, jaque mate y el ahogado (tablas).',
      'El enroque y la seguridad del rey.',
      'Mates elementales y táctica básica (ataque doble y clavada).'
    ],
    includes: [
      'Clases grupales en vivo.',
      'Reglas y fundamentos del ajedrez.',
      'Principios básicos de apertura.',
      'Táctica y combinaciones iniciales.',
      'Introducción a la estrategia.',
      'Jaque mate y finales básicos.',
      'Material didáctico en PDF.',
      'Actividades y ejercicios para casa.',
      'Acceso completo a Chessgora.com.'
    ],
    benefits: [
      'Fomenta el hábito de estudio, la paciencia y el pensamiento abstracto.',
      'Atención personalizada por especialistas en docencia infantil y juvenil.',
      'Plataforma tecnológica Chessgora incluida sin costo extra.'
    ],
    materialsIncluded: ['Guías didácticas ilustradas en PDF', 'Ejercicios de Chessgora', 'Diploma de nivel'],
    chessgoraIncluded: true
  },

  // 2. Desarrollo
  {
    id: 'prog-desarrollo',
    slug: 'desarrollo',
    name: 'Programa de Desarrollo & Visión Táctica',
    subtitle: 'Consolida tu técnica de cálculo y supera los errores típicos de club.',
    category: 'DESARROLLO',
    level: 'Aficionados en progresión (1000 - 1400 Elo)',
    recommendedElo: '1000 a 1400 Elo',
    targetAge: 'Todas las edades',
    duration: 'Mensual renovable',
    sessionCount: '16 sesiones mensuales (4 días por semana)',
    modality: 'Online en vivo + Ejercicios en plataforma',
    schedule: 'Martes a viernes • 6:00 p. m. a 7:00 p. m. (CDMX)',
    instructor: 'Equipo Docente Alekhins • Coordinación MI Roberto Martín del Campo',
    priceMxn: 699,
    priceUsd: 38,
    billingPeriod: 'mes',
    featuredBadge: 'Más Elegido',
    description:
      'Programa intensivo para jugadores que conocen las reglas y buscan estructurar su juego. Se centra en la erradicación de descuidos tácticos, patrones combinatorios y planes lógicos de medio juego.',
    objectives: [
      'Adquirir agilidad mental para detectar golpes tácticos en 2 y 3 jugadas.',
      'Comprender la estructura de peones básica y la armonía entre piezas.',
      'Establecer un repertorio elemental sólido para blancas y negras.'
    ],
    syllabus: [
      'Motivos combinatorios: desviación, atracción, eliminación de la defensa.',
      'Aperturas abiertas y semiabiertas más frecuentes.',
      'Planes típicos de ataque al rey en el centro y con enroques opuestos.',
      'Finales prácticos de rey y peón.'
    ],
    includes: [
      '16 sesiones en vivo al mes.',
      'Entrenamiento táctico y cálculo de variantes.',
      'Estrategia y planificación.',
      'Estudio de repertorio.',
      'Análisis de partidas de alumnos.',
      'Acceso a Chessgora.com.',
      'Actividades interactivas fuera de clase.'
    ],
    benefits: [
      'Incremento acelerado de rating en torneos locales y plataformas online.',
      'Corrección de vicios de juego mediante revisión continua.'
    ],
    materialsIncluded: ['Bases PGN descargables', 'Módulos interactivos en Chessgora'],
    chessgoraIncluded: true
  },

  // 3. Intermedio
  {
    id: 'prog-intermedio',
    slug: 'intermedio',
    name: 'Programa Intermedio & Estrategia Posicional',
    subtitle: 'Estructuras de peones, casillas débiles y maniobras de medio juego.',
    category: 'INTERMEDIO',
    level: 'Jugadores de club (1400 - 1700 Elo)',
    recommendedElo: '1400 a 1700 Elo',
    targetAge: 'Juvenil y Adultos',
    duration: 'Mensual renovable',
    sessionCount: '16 sesiones mensuales en vivo',
    modality: 'Online interactivo con tableros digitales',
    schedule: 'Martes a viernes • 7:00 p. m. a 8:00 p. m. (CDMX)',
    instructor: 'MI Roberto Martín del Campo Cárdenas y entrenadores FIDE',
    priceMxn: 799,
    priceUsd: 44,
    billingPeriod: 'mes',
    description:
      'Diseñado para jugadores de club que desean trascender el cálculo visual inmediato y dominar los conceptos estratégicos posicionales: profilaxis, casillas fuertes, columnas abiertas y finales de torres.',
    objectives: [
      'Entender los desequilibrios posicionales y la coordinación dinámica.',
      'Construir un repertorio activo contra 1.e4 y 1.d4.',
      'Dominar la técnica de finales de torres más frecuentes.'
    ],
    syllabus: [
      'Estructuras de peones centrales: aislados, colgantes y doblados.',
      'El principio de la peor pieza y la casilla clave.',
      'Concepto de profilaxis de Nimzowitsch y Petrosián.',
      'Técnica en finales de piezas menores y finales de torres (Lucena y Philidor).'
    ],
    includes: [
      'Clases teóricas y prácticas en vivo.',
      'Análisis magistral de partidas clásicas.',
      'Acceso ilimitado a Chessgora.com.',
      'Bases de datos PGN comentadas.'
    ],
    benefits: [
      'Aprende a formular planes a largo plazo sin depender únicamente de la táctica.',
      'Asesoría técnica para competiciones oficiales.'
    ],
    materialsIncluded: ['Fichas estratégicas en PDF', 'Acceso al aula virtual Chessgora'],
    chessgoraIncluded: true
  },

  // 4. Avanzado & Alto Rendimiento
  {
    id: 'prog-alto-rendimiento',
    slug: 'alto-rendimiento',
    name: 'Grupo de Alto Rendimiento & Maestría',
    subtitle: 'Cátedra de élite para competidores federados y aspirantes a titulación FIDE.',
    category: 'ALTO_RENDIMIENTO',
    level: 'Competidores avanzados (1700 - 2200 Elo)',
    recommendedElo: '1700 a 2200 Elo',
    targetAge: 'Competidores federados',
    duration: 'Mensual renovable',
    sessionCount: '16 horas mensuales + Clínicas Magistrales',
    modality: 'Laboratorio de aperturas y análisis profundo',
    schedule: 'Lunes a jueves • 7:30 p. m. a 8:30 p. m. (CDMX)',
    instructor: 'MI Roberto Martín del Campo Cárdenas (4x Olímpico)',
    priceMxn: 1200,
    priceUsd: 65,
    billingPeriod: 'mes',
    featuredBadge: 'Élite Competitiva',
    description:
      'Programa de alto calibre para deportistas de alto rendimiento, preseleccionados estatales y aspirantes a títulos de Candidato a Maestro (CM), Maestro FIDE (MF) y Maestro Internacional (MI).',
    objectives: [
      'Desarrollar profundidad de cálculo y árboles de variantes de alta precisión.',
      'Construir un repertorio magistral soportado por módulos modernos y bases ChessBase.',
      'Gestionar la tensión psicológica y el manejo del tiempo de reloj en torneos clásicos.'
    ],
    syllabus: [
      'Metodología de laboratorio de aperturas con motores modernos.',
      'Toma de decisiones críticas en posiciones complejas e irracionales.',
      'El final de partida a nivel de Gran Maestro: técnica de conversión.',
      'Preparación específica contra rivales y psicología competitiva.'
    ],
    includes: [
      'Cátedra magistral directa con el MI Roberto Martín del Campo.',
      'Bases PGN exclusivas de nivel internacional.',
      'Soporte y orientación durante torneos oficiales.',
      'Acceso total a Chessgora.com.'
    ],
    benefits: [
      'Entrenamiento con uno de los ajedrecistas más condecorados de México.',
      'Seguimiento específico de rating FIDE y normas.'
    ],
    materialsIncluded: ['Bases PGN Magistrales', 'Licencia y plataforma Chessgora'],
    chessgoraIncluded: true
  },

  // 5. Clases Personalizadas (1 a 1)
  {
    id: 'prog-personalizado',
    slug: 'entrenamiento-personalizado',
    name: 'Entrenamiento Personalizado 1 a 1',
    subtitle: 'Tu entrenamiento. Tu ritmo. Tus objetivos individuales.',
    category: 'PERSONALIZADO',
    level: 'Todos los niveles (adaptación 100% individual)',
    recommendedElo: 'Desde principiantes hasta aspirantes a titulación FIDE',
    targetAge: 'Todas las edades',
    duration: 'Paquete de 10 sesiones o sesión individual',
    sessionCount: 'Sesiones individuales de 60 minutos (1 hora completa)',
    modality: 'Online 1 a 1 interactivo y flexible',
    schedule: 'Horarios flexibles a convenir con el alumno',
    instructor: 'MI Roberto Martín del Campo Cárdenas (Titular Académico)',
    priceMxn: 5000,
    priceUsd: 275,
    billingPeriod: 'paquete de 10 sesiones ($600 MXN / $35 USD individual)',
    featuredBadge: 'Servicio Insignia',
    description:
      'El servicio de mayor atención individual de la Academia Alekhins. Cada alumno recibe un plan de entrenamiento individualizado impartido directamente por el Maestro Internacional Roberto Martín del Campo.',
    objectives: [
      'Diagnóstico minucioso del estilo de juego y corrección de debilidades específicas.',
      'Confección de repertorio personalizado según la personalidad ajedrecística del alumno.',
      'Análisis crítico de las partidas jugadas en torneos oficiales con corrección inmediata.'
    ],
    syllabus: [
      'Diagnóstico inicial y detección de patrones de error.',
      'Repertorio de aperturas a la medida del alumno.',
      'Cálculo táctico y técnica de visualización.',
      'Estrategia de medio juego y técnica en finales.',
      'Análisis de partidas propias y preparación para competencias.'
    ],
    includes: [
      'Sesiones individuales de 60 minutos.',
      'Plan de entrenamiento personalizado.',
      'Material didáctico y ejercicios específicos.',
      'Trabajo de aperturas, medio juego y finales.',
      'Análisis y corrección de partidas del alumno.',
      'Tareas y actividades para trabajar en casa.',
      'Acceso a la plataforma de entrenamiento Chessgora.com.'
    ],
    benefits: [
      'Atención y cátedra 100% individual del Maestro Internacional.',
      'Máxima flexibilidad de días y horarios.',
      'Avance hasta 3 veces más rápido que en metodologías genéricas.'
    ],
    materialsIncluded: ['Plan de trabajo personalizado', 'Archivos PGN comentados', 'Acceso a Chessgora.com'],
    chessgoraIncluded: true
  },

  // 6. Preparación para Torneos
  {
    id: 'prog-preparacion-torneos',
    slug: 'preparacion-torneos',
    name: 'Clínica de Preparación para Torneos & Competencia',
    subtitle: 'Ajuste de repertorio, preparación contra rivales y psicología competitiva.',
    category: 'ALTO_RENDIMIENTO',
    level: 'Competidores inscritos en torneos abiertos o nacionales',
    recommendedElo: '1200 a 2000 Elo',
    targetAge: 'Todas las edades',
    duration: 'Módulo intensivo previo a eventos',
    sessionCount: 'Ciclo de 8 sesiones enfocadas',
    modality: 'Online intensivo',
    schedule: 'Vespertino y fines de semana',
    instructor: 'Cuerpo Técnico Alekhins • MI Roberto Martín del Campo',
    priceMxn: 1800,
    priceUsd: 98,
    billingPeriod: 'ciclo intensivo',
    description:
      'Módulo diseñado específicamente para jugadores que están por disputar torneos nacionales, estatales, universitarios o abiertos internacionales FIDE.',
    objectives: [
      'Afinar líneas críticas de apertura y resolver dudas teóricas urgentes.',
      'Simular partidas bajo presión de reloj.',
      'Desarrollar rutinas de preparación psicológica y descanso.'
    ],
    syllabus: [
      'Revisión y pulido del repertorio para el torneo.',
      'Detección y explotación de debilidades de los rivales.',
      'Técnica en apuros de tiempo y control emocional.',
      'Revisión express entre rondas.'
    ],
    includes: [
      '8 sesiones intensivas.',
      'Simulación de partidas con reloj.',
      'Bases de datos de rivales y variantes sorpresa.',
      'Soporte a distancia durante las rondas.'
    ],
    benefits: ['Llegar al torneo con seguridad, claridad de planes y repertorio probado.'],
    materialsIncluded: ['Dossier de aperturas para el torneo', 'Acceso a Chessgora'],
    chessgoraIncluded: true
  },

  // 7. Formación para Escuelas y Clubes
  {
    id: 'prog-escuelas-clubes',
    slug: 'formacion-escuelas-clubes',
    name: 'Programa Institucional para Escuelas & Clubes',
    subtitle: 'Ajedrez curricular, academias extracurriculares y equipamiento homologado.',
    category: 'INSTITUCIONAL',
    level: 'Colegios, Universidades, Clubes y Empresas',
    recommendedElo: 'Todos los niveles',
    targetAge: 'Comunidades educativas y deportivas',
    duration: 'Ciclo escolar o semestral',
    sessionCount: 'Planes a la medida institucional',
    modality: 'Presencial o Virtual con plataforma digital',
    schedule: 'Adaptable al calendario del centro educativo',
    instructor: 'Coordinación Pedagógica Alekhins',
    priceMxn: 0, // Cotización institucional
    priceUsd: 0,
    billingPeriod: 'cotización según matrícula',
    featuredBadge: 'Convenios Institucionales',
    description:
      'Solución integral para centros educativos y clubes que desean implementar el ajedrez como herramienta pedagógica formativa, competitiva o extracurricular, con capacitación docente y material oficial.',
    objectives: [
      'Desarrollar habilidades cognitivas y valores en la comunidad estudiantil.',
      'Formar la selección representativa del colegio para torneos intercolegiales.',
      'Certificar docentes y proveer material de ajedrez reglamentario duradero.'
    ],
    syllabus: [
      'Metodología curricular de ajedrez en el aula.',
      'Dinámicas grupales y torneos internos.',
      'Seguimiento pedagógico digital con Chessgora.',
      'Capacitación y talleres para profesores.'
    ],
    includes: [
      'Currículo estructurado grado por grado.',
      'Capacitación y manuales para profesores.',
      'Acceso institucional a Chessgora.com para todos los alumnos.',
      'Descuentos especiales en material físico de la tienda Alekhins.'
    ],
    benefits: [
      'Prestigio académico y deportivo para la institución.',
      'Reportes de avance y participación para directivos y padres de familia.'
    ],
    materialsIncluded: ['Manuales docentes', 'Paquetes de tableros y piezas institucionales'],
    chessgoraIncluded: true
  }
];

export const COACHES: CoachProfile[] = [
  {
    id: 'coach-roberto-martin-del-campo',
    slug: 'roberto-martin-del-campo',
    name: 'MI Roberto Martín del Campo Cárdenas',
    fideTitle: 'Maestro Internacional FIDE',
    fideId: '5100046',
    role: 'Director Académico & Fundador',
    nationality: 'México (FIDE)',
    avatarUrl: '/maestro-roberto.jpg',
    ratingPeak: 2470,
    ratingCurrent: 2360,
    experienceYears: 30,
    bio:
      'Una de las figuras más emblemáticas y respetadas en la historia del ajedrez mexicano y latinoamericano. Maestro Internacional FIDE, 4 veces representante olímpico de México, Campeón Nacional Absoluto y formador de múltiples Maestros FIDE y campeones nacionales.',
    achievements: [
      'Maestro Internacional de la FIDE con ID oficial 5100046.',
      '4 veces integrante del Equipo Olímpico Mexicano en Olimpiadas Mundiales de Ajedrez.',
      'Campeón Nacional Absoluto de México.',
      'Vencedor ante múltiples Grandes Maestros internacionales de élite.',
      'Más de 3 décadas dedicado a la alta pedagogía y entrenamiento de alto rendimiento.'
    ],
    specialties: [
      'Cálculo de variantes y toma de decisiones tácticas.',
      'Laboratorio de aperturas con enfoque magistral.',
      'Estrategia posicional soviética y técnica de finales.',
      'Psicología competitiva y preparación para torneos de titulación.'
    ],
    teachingStyle:
      'Riguroso, analítico, profundamente didáctico y motivador. Adapta los principios clásicos de la Escuela Soviética a las exigencias modernas del ajedrez contemporáneo.',
    programsTaught: [
      'Entrenamiento Personalizado 1 a 1',
      'Grupo de Alto Rendimiento & Maestría',
      'Programa Intermedio & Estrategia',
      'Clínica de Preparación para Torneos'
    ]
  },
  {
    id: 'coach-pedagogia-inicial',
    slug: 'equipo-pedagogia-inicial',
    name: 'Cuerpo Docente de Iniciación & Desarrollo',
    fideTitle: 'Entrenadores Certificados FIDE / FENAMAC',
    role: 'Especialistas en Ajedrez Infantil & Juvenil',
    nationality: 'México / Internacional',
    avatarUrl: '/maestro-roberto.jpg',
    experienceYears: 12,
    bio:
      'Equipo pedagógico interdisciplinario avalado por la Academia Alekhins para la formación inicial, desarrollo de pensamiento lógico y enseñanza dinámica para niños y aficionados en etapas de desarrollo.',
    achievements: [
      'Certificaciones oficiales FIDE School Instructor y FENAMAC.',
      'Cientos de alumnos iniciados con éxito en competiciones escolares e infantiles.',
      'Metodología lúdico-progresiva que garantiza motivación y retención.'
    ],
    specialties: [
      'Iniciación al ajedrez para niños desde 6 años.',
      'Geometría del tablero y visión táctica elemental.',
      'Desarrollo de paciencia, concentración y disciplina.',
      'Uso pedagógico de herramientas interactivas en Chessgora.com.'
    ],
    teachingStyle: 'Dinámico, paciente, visual y enfocado en el refuerzo positivo del alumno.',
    programsTaught: [
      'Programa de Iniciación & Fundamentos',
      'Programa de Desarrollo & Visión Táctica',
      'Programa Institucional para Escuelas y Clubes'
    ]
  }
];

