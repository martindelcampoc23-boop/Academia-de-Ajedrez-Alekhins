'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Crown,
  BookOpen,
  Award,
  Sparkles,
  User,
  Mail,
  Phone,
  Clock,
  Target,
  Swords,
  BrainCircuit,
  Send,
  AlertCircle,
  MessageCircle,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { submitLeadAction } from '@/lib/actions';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

interface QuizAnswers {
  experience: string;
  goal: string;
  weakness: string;
  timeCommitment: string;
  tacticalAnswer: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentAge: string;
  notes: string;
}

export function LevelAssessmentQuiz() {
  const { currency, formatPrice } = useLocaleCurrency();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [answers, setAnswers] = useState<QuizAnswers>({
    experience: '',
    goal: '',
    weakness: '',
    timeCommitment: '',
    tacticalAnswer: '',
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    studentAge: '',
    notes: '',
  });

  const [recommendedPlan, setRecommendedPlan] = useState<{
    name: string;
    level: string;
    description: string;
    url: string;
    priceMxn: number;
    priceUsd: number;
    schedule: string;
    badge: string;
  } | null>(null);

  const totalSteps = 6;

  const handleOptionSelect = (field: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !answers.experience) {
      setErrorMsg('Por favor selecciona tu nivel o experiencia actual frente al tablero.');
      return;
    }
    if (currentStep === 2 && !answers.goal) {
      setErrorMsg('Por favor selecciona tu objetivo principal de entrenamiento.');
      return;
    }
    if (currentStep === 3 && !answers.weakness) {
      setErrorMsg('Por favor indica en qué fase de la partida sientes mayor dificultad.');
      return;
    }
    if (currentStep === 4 && !answers.timeCommitment) {
      setErrorMsg('Por favor selecciona tu disponibilidad de tiempo semanal.');
      return;
    }
    if (currentStep === 5 && !answers.tacticalAnswer) {
      setErrorMsg('Por favor selecciona tu respuesta al ejercicio táctico del Maestro.');
      return;
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const calculateRecommendation = () => {
    // Si es principiante total o busca bases desde cero
    if (
      answers.experience.includes('Principiante') ||
      answers.experience.includes('mover las piezas') ||
      answers.goal.includes('bases sólidas')
    ) {
      return {
        name: 'Grupo de Ajedrez Inicial',
        level: 'Iniciación (Principiantes)',
        description:
          'Aprende ajedrez desde sus fundamentos con metodología didáctica y progresiva. 3 días de entrenamiento en vivo por semana con acceso completo a Chessgora.com.',
        url: '/programas#iniciacion',
        priceMxn: 500,
        priceUsd: 28,
        schedule: 'Lunes, miércoles y jueves • 6:00 a 7:00 p. m.',
        badge: 'Recomendado para Ti',
      };
    }

    // Si busca entrenamiento individual, alta flexibilidad o preparación de maestría
    if (
      answers.goal.includes('personal') ||
      answers.timeCommitment.includes('flexible') ||
      answers.experience.includes('Avanzado') ||
      answers.experience.includes('FIDE')
    ) {
      return {
        name: 'Entrenamiento Personalizado 1 a 1',
        level: 'Atención Individual de Maestría',
        description:
          'Preparación individual impartida directamente por el Maestro Internacional Roberto Martín del Campo Cárdenas. Plan a la medida, revisión de PGN y horarios a convenir.',
        url: '/clases-personalizadas',
        priceMxn: 5000,
        priceUsd: 280,
        schedule: 'Horarios flexibles a convenir (Sesiones de 60 min)',
        badge: 'Cátedra de Élite',
      };
    }

    // Por defecto para aficionados intermedios y competidores
    return {
      name: 'Grupo de Entrenamiento Competitivo',
      level: 'Menos de 2000 Elo',
      description:
        'Lleva tu ajedrez al siguiente nivel con 4 días de entrenamiento constante a la semana. Cálculo de variantes, repertorio de aperturas y técnica de finales en vivo.',
      url: '/programas#desarrollo',
      priceMxn: 699,
      priceUsd: 39,
      schedule: 'Martes a viernes • 6:00 a 7:00 p. m.',
      badge: 'El Más Elegido',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.studentName || !answers.studentEmail || !answers.studentPhone) {
      setErrorMsg('Por favor completa tu nombre, correo electrónico y teléfono de WhatsApp.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const recommendation = calculateRecommendation();
    setRecommendedPlan(recommendation);

    const diagnosticSummary = `
[EVALUACIÓN DIAGNÓSTICA DE NIVEL - ACADEMIA ALEKHINS]
• Alumno: ${answers.studentName} (Edad: ${answers.studentAge || 'No especificada'})
• Experiencia / Nivel: ${answers.experience}
• Objetivo: ${answers.goal}
• Mayor debilidad: ${answers.weakness}
• Dedicación semanal: ${answers.timeCommitment}
• Respuesta táctica: ${answers.tacticalAnswer}
• Plan sugerido: ${recommendation.name} (${recommendation.level})
• Teléfono: ${answers.studentPhone} | Email: ${answers.studentEmail}
• Notas: ${answers.notes || 'Ninguna'}
`.trim();

    try {
      const res = await submitLeadAction({
        name: answers.studentName,
        email: answers.studentEmail,
        phone: answers.studentPhone,
        entityType: 'DIAGNOSTIC_EVALUATION',
        studentAge: answers.studentAge || undefined,
        notes: diagnosticSummary,
      });

      if (res.success) {
        setIsCompleted(true);
      } else {
        setErrorMsg(res.error || 'Ocurrió un error al guardar tu diagnóstico. Intenta de nuevo.');
      }
    } catch {
      setErrorMsg('Error de conexión al enviar el diagnóstico. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsappDiagnosticUrl = () => {
    if (!recommendedPlan) return `https://wa.me/${WHATSAPP_NUMBER}`;
    const text = `Hola Maestro Roberto Martín del Campo, he completado el Test Diagnóstico en ajedrezprofesional.com.
Mi nombre es ${answers.studentName}.
Mi nivel evaluado es: ${recommendedPlan.level}
Plan recomendado: ${recommendedPlan.name}
Deseo coordinar mi ingreso a la Academia.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-[#FAF8F2]">
      
      {/* Barra de Progreso Superior */}
      {!isCompleted && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-[#C4CBD4]">
            <span className="font-semibold">
              Paso {currentStep} de {totalSteps}
            </span>
            <span className="font-bold text-[#C5A46D]">
              {Math.round((currentStep / totalSteps) * 100)}% Completado
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#0F1D30] rounded-full overflow-hidden border border-[#233F65]">
            <div
              className="h-full bg-gradient-to-r from-[#172B46] via-[#C5A46D] to-[#DFCBA0] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Contenedor Principal del Test */}
      <div className="bg-[#172B46] border-2 border-[#233F65] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Fondo sutil de luz */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none" />

        {isCompleted && recommendedPlan ? (
          /* =========================================================
              RESULTADO FINAL & PLAN RECOMENDADO
          ========================================================= */
          <div className="space-y-8 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#0F1D30] border-2 border-[#C5A46D] flex items-center justify-center text-[#C5A46D] shadow-xl">
              <Crown className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C5A46D] block">
                Diagnóstico Pedagógico Completado
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                Tu Programa Ideal: {recommendedPlan.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#C4CBD4] max-w-xl mx-auto leading-relaxed font-light">
                {recommendedPlan.description}
              </p>
            </div>

            {/* Ficha Resumen del Diagnóstico */}
            <div className="bg-[#0F1D30] border border-[#233F65] rounded-2xl p-5 text-left space-y-3 max-w-lg mx-auto text-xs">
              <div className="flex justify-between items-center border-b border-[#1C3454] pb-2.5">
                <span className="text-[#9CA3AF]">Nivel Asignado:</span>
                <span className="font-bold text-[#C5A46D] text-sm">{recommendedPlan.level}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1C3454] pb-2.5">
                <span className="text-[#9CA3AF]">Horario / Frecuencia:</span>
                <span className="font-medium text-white">{recommendedPlan.schedule}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1C3454] pb-2.5">
                <span className="text-[#9CA3AF]">Inversión:</span>
                <span className="font-extrabold text-[#C5A46D] text-sm">
                  {currency === 'USD' ? `$${recommendedPlan.priceUsd} USD` : `$${recommendedPlan.priceMxn.toLocaleString('es-MX')} MXN`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[#9CA3AF]">Plataforma Chessgora:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Incluida sin costo extra
                </span>
              </div>
            </div>

            <p className="text-xs text-[#C4CBD4] max-w-md mx-auto leading-relaxed">
              El equipo docente de la Academia Alekhins ha recibido tu diagnóstico para preparar tu incorporación o coordinar una sesión de asesoría.
            </p>

            {/* Acciones de Conversión */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={getWhatsappDiagnosticUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-7 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar al Maestro por WhatsApp con mi Diagnóstico</span>
              </a>

              <Link
                href={recommendedPlan.url}
                className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6"
              >
                <span>Ver Detalles del Programa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentStep(1);
                  setAnswers({
                    experience: '',
                    goal: '',
                    weakness: '',
                    timeCommitment: '',
                    tacticalAnswer: '',
                    studentName: '',
                    studentEmail: '',
                    studentPhone: '',
                    studentAge: '',
                    notes: '',
                  });
                }}
                className="w-full text-center text-xs text-[#9CA3AF] hover:text-[#C5A46D] pt-2 underline"
              >
                Repetir evaluación diagnóstica
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================
              PREGUNTAS DEL TEST INTERACTIVO
          ========================================================= */
          <div className="space-y-6">
            
            {/* PASO 1: Experiencia Actual */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Pregunta 1 de 5</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ¿Cuál es tu experiencia actual en el ajedrez?
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  Selecciona la opción que mejor describa tu nivel práctico o rating en plataformas online.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'Principiante Total / Nivel Inicial',
                      desc: 'Conozco las reglas básicas o deseo aprender desde cero a mover las piezas y coordinarlas.',
                    },
                    {
                      title: 'Aficionado Ocasional (1000 - 1400 Elo Online)',
                      desc: 'Juego partidas por internet, conozco jaque mate elementales y busco dejar de cometer descuidos tácticos.',
                    },
                    {
                      title: 'Intermedio en Desarrollo (1400 - 1800 Elo)',
                      desc: 'Cuento con nociones de apertura y táctica, y busco dominar la estrategia posicional y técnica de finales.',
                    },
                    {
                      title: 'Avanzado / Con Rating FIDE (1800+ Elo)',
                      desc: 'Compite activamente en torneos oficiales federados y busca preparación de alto rendimiento o titulación FIDE.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('experience', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                        answers.experience === opt.title
                          ? 'border-[#C5A46D] bg-[#0F1D30] text-white shadow-md'
                          : 'border-[#233F65] bg-[#0F1D30]/60 text-[#C4CBD4] hover:border-[#C5A46D]/60 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        checked={answers.experience === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C5A46D]"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{opt.title}</span>
                        <span className="text-[11px] text-[#C4CBD4] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 2: Objetivo Principal */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Pregunta 2 de 5</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ¿Cuál es tu principal objetivo de entrenamiento?
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  Esto nos permite orientar las lecciones hacia tus metas personales o deportivas.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'Construir bases sólidas y aprender a razonar estratégicamente',
                      desc: 'Comprender el porqué de cada jugada y fijar patrones de pensamiento analítico.',
                    },
                    {
                      title: 'Subir Elo competitivo y superar a rivales de mayor nivel',
                      desc: 'Desarrollar agilidad táctica, cálculo de variantes y repertorio estructurado de aperturas.',
                    },
                    {
                      title: 'Preparar torneos oficiales FIDE y disputar medallas',
                      desc: 'Simulacros de reloj, preparación contra rivales específicos, psicología competitiva y finales técnicos.',
                    },
                    {
                      title: 'Atención individualizada 1 a 1 con el Maestro Roberto Martín del Campo',
                      desc: 'Análisis profundo de mis partidas PGN y cátedra exclusiva adaptada a mis horarios.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('goal', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                        answers.goal === opt.title
                          ? 'border-[#C5A46D] bg-[#0F1D30] text-white shadow-md'
                          : 'border-[#233F65] bg-[#0F1D30]/60 text-[#C4CBD4] hover:border-[#C5A46D]/60 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        checked={answers.goal === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C5A46D]"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{opt.title}</span>
                        <span className="text-[11px] text-[#C4CBD4] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 3: Mayor Dificultad Técnica */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <Swords className="w-4 h-4" />
                  <span>Pregunta 3 de 5</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ¿En qué fase del juego sientes mayor debilidad o dudas?
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  Ayuda al cuerpo docente a diseñar tus rutinas en la plataforma Chessgora.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'Aperturas y Conexión de Ideas',
                      desc: 'No sé qué líneas elegir contra ciertas defensas o suelo salir de la apertura sin ventaja.',
                    },
                    {
                      title: 'Cálculo Táctico y Combinaciones',
                      desc: 'Omito celadas del adversario o me cuesta visualizar variantes de más de 3 jugadas forzadas.',
                    },
                    {
                      title: 'Estrategia de Medio Juego y Creación de Planes',
                      desc: 'Llego al medio juego y me quedo sin plan o dudo dónde reubicar mis piezas menores.',
                    },
                    {
                      title: 'Técnica de Finales Prácticos',
                      desc: 'Llego con ventaja de peón al final pero cedo tablas por desconocer posiciones teóricas.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('weakness', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                        answers.weakness === opt.title
                          ? 'border-[#C5A46D] bg-[#0F1D30] text-white shadow-md'
                          : 'border-[#233F65] bg-[#0F1D30]/60 text-[#C4CBD4] hover:border-[#C5A46D]/60 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="weakness"
                        checked={answers.weakness === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C5A46D]"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{opt.title}</span>
                        <span className="text-[11px] text-[#C4CBD4] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 4: Disponibilidad Semanal */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Pregunta 4 de 5</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ¿Cuánto tiempo deseas dedicar a tu entrenamiento semanal?
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  La constancia es la clave del progreso en ajedrez.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: '3 Días por Semana (3 horas en vivo)',
                      desc: 'Ideal para el Grupo de Ajedrez Inicial (Lunes, miércoles y jueves de 6 a 7 PM).',
                    },
                    {
                      title: '4 Días por Semana (4 horas en vivo + tareas)',
                      desc: 'Intensidad recomendada para el Grupo Competitivo (Martes a viernes de 6 a 7 PM).',
                    },
                    {
                      title: 'Sesiones 1 a 1 flexibles según mi agenda',
                      desc: 'Para alumnos con horarios rotativos que requieren sesiones individuales de 60 minutos.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('timeCommitment', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                        answers.timeCommitment === opt.title
                          ? 'border-[#C5A46D] bg-[#0F1D30] text-white shadow-md'
                          : 'border-[#233F65] bg-[#0F1D30]/60 text-[#C4CBD4] hover:border-[#C5A46D]/60 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeCommitment"
                        checked={answers.timeCommitment === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C5A46D]"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{opt.title}</span>
                        <span className="text-[11px] text-[#C4CBD4] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 5: Ejercicio de Concepto Táctico del Maestro */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Pregunta 5 de 5 • Concepto Magistral</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Pregunta de Visualización Táctica
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  En una posición donde tu rival tiene su rey enrocado pero ha avanzado el peón de &quot;h&quot; (h6) y tu alfil apunta a h7: ¿Cuál suele ser el tema táctico más destructivo?
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'El sacrificio clásico de alfil en h7 (El regalo griego)',
                      desc: 'Abre la columna &quot;h&quot; para la entrada decisiva de caballo en g5 y dama en h5.',
                    },
                    {
                      title: 'Avanzar peones propios en el flanco de dama',
                      desc: 'Ignorar el rey enemigo y buscar contrajuego en el lado opuesto.',
                    },
                    {
                      title: 'Cambiar de inmediato todas las piezas mayores',
                      desc: 'Buscar simplificar a un final de reyes pasivo.',
                    },
                    {
                      title: 'No estoy seguro / Deseo aprender estos patrones de ataque',
                      desc: 'Aún no domino los sacrificios temáticos clásicos de ataque al enroque.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('tacticalAnswer', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                        answers.tacticalAnswer === opt.title
                          ? 'border-[#C5A46D] bg-[#0F1D30] text-white shadow-md'
                          : 'border-[#233F65] bg-[#0F1D30]/60 text-[#C4CBD4] hover:border-[#C5A46D]/60 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tacticalAnswer"
                        checked={answers.tacticalAnswer === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C5A46D]"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{opt.title}</span>
                        <span className="text-[11px] text-[#C4CBD4] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 6: Datos de Contacto del Alumno */}
            {currentStep === 6 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>Paso Final • Datos del Alumno</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  ¿A dónde te enviamos tu diagnóstico pedagógico?
                </h3>
                <p className="text-xs text-[#C4CBD4]">
                  Recibirás el plan recomendado y la orientación directa del Maestro Internacional Roberto Martín del Campo.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                  <div>
                    <label className="text-[#FAF8F2] block mb-1 font-semibold">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={answers.studentName}
                      onChange={(e) => handleOptionSelect('studentName', e.target.value)}
                      className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div>
                    <label className="text-[#FAF8F2] block mb-1 font-semibold">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@ejemplo.com"
                      value={answers.studentEmail}
                      onChange={(e) => handleOptionSelect('studentEmail', e.target.value)}
                      className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div>
                    <label className="text-[#FAF8F2] block mb-1 font-semibold">Teléfono o WhatsApp (con lada) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+52 999 123 4567"
                      value={answers.studentPhone}
                      onChange={(e) => handleOptionSelect('studentPhone', e.target.value)}
                      className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div>
                    <label className="text-[#FAF8F2] block mb-1 font-semibold">Edad del alumno (opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. 12 años / Adulto"
                      value={answers.studentAge}
                      onChange={(e) => handleOptionSelect('studentAge', e.target.value)}
                      className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[#FAF8F2] block mb-1 font-semibold">Comentarios o dudas adicionales (opcional)</label>
                    <textarea
                      rows={2}
                      placeholder="Cuéntanos si tienes experiencia previa en algún club, horario de preferencia o torneos en puerta..."
                      value={answers.notes}
                      onChange={(e) => handleOptionSelect('notes', e.target.value)}
                      className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white outline-none focus:border-[#C5A46D] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#233F65] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-3 px-4 rounded-xl bg-[#0F1D30] border border-[#233F65] text-xs font-semibold hover:border-[#C5A46D] transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-dorado py-3 px-8 text-xs uppercase font-extrabold shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? (
                      <span>Generando Diagnóstico...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Ver mi Plan Recomendado</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Botones de Navegación de Pasos 1 a 5 */}
            {currentStep < 6 && (
              <div className="pt-4 border-t border-[#233F65] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-2.5 px-4 rounded-xl bg-[#0F1D30] border border-[#233F65] text-xs font-semibold hover:border-[#C5A46D] transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-dorado py-2.5 px-6 text-xs uppercase font-extrabold shadow flex items-center gap-1.5"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
