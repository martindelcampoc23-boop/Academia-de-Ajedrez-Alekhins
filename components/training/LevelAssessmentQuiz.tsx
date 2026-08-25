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
  AlertCircle
} from 'lucide-react';
import { submitLeadAction } from '@/lib/actions';

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
    slug: string;
    price: number;
  } | null>(null);

  const totalSteps = 6;

  const handleOptionSelect = (field: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !answers.experience) {
      setErrorMsg('Por favor selecciona tu nivel de experiencia actual.');
      return;
    }
    if (currentStep === 2 && !answers.goal) {
      setErrorMsg('Por favor selecciona tu objetivo principal.');
      return;
    }
    if (currentStep === 3 && !answers.weakness) {
      setErrorMsg('Por favor indica en qué fase de la partida sientes mayor dificultad.');
      return;
    }
    if (currentStep === 4 && !answers.timeCommitment) {
      setErrorMsg('Por favor selecciona tu tiempo estimado de estudio semanal.');
      return;
    }
    if (currentStep === 5 && !answers.tacticalAnswer) {
      setErrorMsg('Por favor responde a la pregunta de concepto táctico del Maestro.');
      return;
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const calculateRecommendation = () => {
    // Lógica pedagógica para determinar el plan óptimo
    if (answers.experience.includes('Principiante') || answers.experience.includes('mover las piezas')) {
      return {
        name: 'Plan Iniciación & Fundamentos',
        level: 'Principiante',
        description: 'Ideal para construir bases posicionales sólidas, evitar celadas típicas y dominar los principios fundamentales del juego.',
        slug: 'iniciacion-fundamentos',
        price: 1200,
      };
    } else if (answers.experience.includes('Avanzado') || answers.experience.includes('1800') || answers.timeCommitment.includes('6')) {
      return {
        name: 'Plan Alto Rendimiento & Maestría',
        level: 'Avanzado / Maestría',
        description: 'Repertorio profundo de aperturas, cálculo dinámico, toma de decisiones complejas y preparación para torneos oficiales FIDE.',
        slug: 'alto-rendimiento',
        price: 2400,
      };
    } else {
      return {
        name: 'Plan Intermedio & Táctica Competitiva',
        level: 'Intermedio',
        description: 'Enfocado en visión táctica, cálculo de variantes, estructuras de peones y técnica en finales para superar la barrera de los 1500-1800 ELO.',
        slug: 'intermedio-tactica',
        price: 1600,
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.studentName || !answers.studentEmail || !answers.studentPhone) {
      setErrorMsg('Por favor completa tu nombre, correo electrónico y teléfono de contacto.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const recommendation = calculateRecommendation();
    setRecommendedPlan(recommendation);

    // Formatear resumen detallado para el CRM y los profesores
    const diagnosticSummary = `
[EVALUACIÓN DIAGNÓSTICA DE NIVEL - ACADEMIA ALEKHINS]
• Experiencia / ELO: ${answers.experience}
• Objetivo principal: ${answers.goal}
• Mayor debilidad técnica: ${answers.weakness}
• Tiempo semanal de estudio: ${answers.timeCommitment}
• Respuesta a ejercicio táctico: ${answers.tacticalAnswer}
• Edad del alumno: ${answers.studentAge || 'No especificada'}
• Plan sugerido por el test: ${recommendation.name} (${recommendation.level})
• Notas / Comentarios del alumno: ${answers.notes || 'Ninguno'}
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
        setErrorMsg(res.error || 'Ocurrió un error al guardar tu evaluación. Intenta de nuevo.');
      }
    } catch {
      setErrorMsg('Error de conexión al enviar el test. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Barra de Progreso */}
      {!isCompleted && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-[#A8B2A6]">
            <span>Paso {currentStep} de {totalSteps}</span>
            <span className="font-semibold text-[#C8AA6E]">
              {Math.round((currentStep / totalSteps) * 100)}% Completado
            </span>
          </div>
          <div className="w-full h-2 bg-[#0B1510] rounded-full overflow-hidden border border-[#2B3E34]">
            <div
              className="h-full bg-gradient-to-r from-[#1B4D3E] to-[#C8AA6E] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Contenedor Principal del Test */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8AA6E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1B4D3E]/10 rounded-full blur-3xl -z-10" />

        {isCompleted && recommendedPlan ? (
          /* RESULTADO FINAL & PLAN RECOMENDADO */
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#1B4D3E]/50 border border-[#C8AA6E]/60 flex items-center justify-center text-[#C8AA6E] shadow-gold">
              <Crown className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block">
                Evaluación Diagnóstica Completada
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#F6F3EC]">
                Plan Recomendado: {recommendedPlan.name}
              </h3>
              <p className="text-xs text-[#A8B2A6] max-w-md mx-auto leading-relaxed">
                {recommendedPlan.description}
              </p>
            </div>

            {/* Ficha de Evaluación */}
            <div className="bg-[#0B1510] border border-[#2B3E34] rounded-xl p-5 text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between items-center border-b border-[#1B3028] pb-2">
                <span className="text-[#A8B2A6]">Nivel Diagnosticado:</span>
                <span className="font-bold text-[#C8AA6E]">{recommendedPlan.level}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#1B3028] pb-2">
                <span className="text-[#A8B2A6]">Inversión Mensual:</span>
                <span className="font-bold text-[#F6F3EC]">${recommendedPlan.price.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8B2A6]">Evaluación Docente:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enviada al Profesor
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#A8B2A6] max-w-sm mx-auto leading-relaxed">
              El Maestro Internacional Roberto Martín del Campo revisará tus respuestas técnicas y se pondrá en contacto contigo para coordinar tu ingreso o clase muestra.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/entrenamiento/${recommendedPlan.slug}`}
                className="py-3 px-6 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg transition"
              >
                <span>Ver Detalles &amp; Inscribirme al Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
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
                className="py-3 px-4 rounded-xl bg-[#1B4D3E]/30 border border-[#2B3E34] text-[#A8B2A6] hover:text-[#F6F3EC] text-xs font-medium transition"
              >
                Repetir Test
              </button>
            </div>
          </div>
        ) : (
          /* PREGUNTAS DEL TEST */
          <div className="space-y-6">
            {/* PASO 1: Experiencia Actual */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Pregunta 1 de 5</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">
                  ¿Cuál es tu experiencia actual frente al tablero?
                </h3>
                <p className="text-xs text-[#A8B2A6]">
                  Selecciona la opción que mejor describa tu nivel o rating en plataformas de ajedrez.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      title: 'Principiante Total / Nivel Básico',
                      desc: 'Sé mover las piezas pero apenas empiezo a jugar partidas completas o cometo descuidos frecuentes.',
                    },
                    {
                      title: 'Aficionado Online (1000 - 1400 ELO)',
                      desc: 'Juego regularmente en Chess.com o Lichess, conozco mates básicos y táctica elemental.',
                    },
                    {
                      title: 'Intermedio Competitivo (1400 - 1800 ELO)',
                      desc: 'Tengo repertorio de aperturas básico, cálculo dinámico y busco profundizar en estrategia posicional.',
                    },
                    {
                      title: 'Avanzado / Con Rating FIDE (1800+ ELO)',
                      desc: 'Compite en torneos oficiales federados FIDE/FENAMAC y busco preparación de alto rendimiento.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('experience', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        answers.experience === opt.title
                          ? 'border-[#C8AA6E] bg-[#1B4D3E]/30 text-[#F6F3EC] shadow-sm'
                          : 'border-[#2B3E34] bg-[#0B1510] text-[#A8B2A6] hover:border-[#C8AA6E]/50 hover:bg-[#121E17]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        checked={answers.experience === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C8AA6E]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#F6F3EC] block">{opt.title}</span>
                        <span className="text-[11px] text-[#A8B2A6] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 2: Objetivo Principal */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Pregunta 2 de 5</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">
                  ¿Cuál es tu principal objetivo de entrenamiento?
                </h3>
                <p className="text-xs text-[#A8B2A6]">
                  Esto nos permite orientar las lecciones hacia tus metas personales o competitivas.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      title: 'Construir bases sólidas y aprender a pensar correctamente',
                      desc: 'Entender el porqué de cada jugada y erradicar errores tácticos recurrentes.',
                    },
                    {
                      title: 'Subir rating en internet y vencer rivales más fuertes',
                      desc: 'Desarrollar agilidad táctica, patrones de combinación y visión en partidas rápidas y blitz.',
                    },
                    {
                      title: 'Competir y ganar medallas en torneos oficiales FIDE / Estatales',
                      desc: 'Preparación psicológica, manejo de reloj, cálculo profundo y finales técnicos.',
                    },
                    {
                      title: 'Ajedrez formativo para mi hijo/a',
                      desc: 'Desarrollar concentración, pensamiento lógico, toma de decisiones y disciplina deportiva.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('goal', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        answers.goal === opt.title
                          ? 'border-[#C8AA6E] bg-[#1B4D3E]/30 text-[#F6F3EC] shadow-sm'
                          : 'border-[#2B3E34] bg-[#0B1510] text-[#A8B2A6] hover:border-[#C8AA6E]/50 hover:bg-[#121E17]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        checked={answers.goal === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C8AA6E]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#F6F3EC] block">{opt.title}</span>
                        <span className="text-[11px] text-[#A8B2A6] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 3: Mayor Dificultad en Partida */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <Swords className="w-4 h-4" />
                  <span>Pregunta 3 de 5</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">
                  ¿En qué fase de la partida sientes mayor debilidad o incertidumbre?
                </h3>
                <p className="text-xs text-[#A8B2A6]">
                  Ayuda a los entrenadores a personalizar tu temario de estudio.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      title: 'Aperturas y Repertorio',
                      desc: 'No sé qué jugar contra ciertas defensas o salgo con desventaja de espacio.',
                    },
                    {
                      title: 'Táctica y Cálculo de Variantes',
                      desc: 'Omito golpes tácticos del rival o me cuesta calcular varias jugadas adelante.',
                    },
                    {
                      title: 'Estrategia de Medio Juego y Planes',
                      desc: 'Termino la apertura y me quedo sin un plan claro o no sé dónde colocar mis piezas.',
                    },
                    {
                      title: 'Técnica de Finales',
                      desc: 'Llego con ventaja al final pero no logro convertir la victoria o cedo tablas.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('weakness', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        answers.weakness === opt.title
                          ? 'border-[#C8AA6E] bg-[#1B4D3E]/30 text-[#F6F3EC] shadow-sm'
                          : 'border-[#2B3E34] bg-[#0B1510] text-[#A8B2A6] hover:border-[#C8AA6E]/50 hover:bg-[#121E17]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="weakness"
                        checked={answers.weakness === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C8AA6E]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#F6F3EC] block">{opt.title}</span>
                        <span className="text-[11px] text-[#A8B2A6] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 4: Tiempo Semanal de Estudio */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Pregunta 4 de 5</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">
                  ¿Cuánto tiempo puedes dedicar al ajedrez por semana?
                </h3>
                <p className="text-xs text-[#A8B2A6]">
                  Calcularemos la intensidad de las tareas y ritmo de avance recomendado.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      title: '1 a 2 horas por semana',
                      desc: 'Ritmo relajado: lección semanal y ejercicios puntuales.',
                    },
                    {
                      title: '3 a 5 horas por semana',
                      desc: 'Ritmo constante: clases grupales/individuales, tareas tácticas y partidas de práctica.',
                    },
                    {
                      title: '6 o más horas semanales (Alto Rendimiento)',
                      desc: 'Compromiso intensivo: análisis de partidas propias, preparación teórica y entrenamiento competitivo.',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('timeCommitment', opt.title)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        answers.timeCommitment === opt.title
                          ? 'border-[#C8AA6E] bg-[#1B4D3E]/30 text-[#F6F3EC] shadow-sm'
                          : 'border-[#2B3E34] bg-[#0B1510] text-[#A8B2A6] hover:border-[#C8AA6E]/50 hover:bg-[#121E17]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeCommitment"
                        checked={answers.timeCommitment === opt.title}
                        onChange={() => {}}
                        className="mt-1 accent-[#C8AA6E]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#F6F3EC] block">{opt.title}</span>
                        <span className="text-[11px] text-[#A8B2A6] mt-0.5 block leading-relaxed">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 5: Ejercicio Diagnóstico del Maestro */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Pregunta 5 de 5 (Diagnóstico Técnico)</span>
                </div>
                <div className="bg-[#0B1510] p-4 rounded-xl border border-[#2B3E34] space-y-2">
                  <span className="text-[11px] font-bold text-[#C8AA6E] uppercase">Pregunta del MI Roberto Martín del Campo:</span>
                  <p className="text-xs text-[#F6F3EC] italic leading-relaxed">
                    &quot;En una posición abierta de medio juego, donde el rey de tu rival aún permanece en el centro sin enrocar y tienes ventaja de desarrollo, ¿cuál debe ser tu prioridad estratégica inmediata?&quot;
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      title: 'Abrir líneas y columnas centrales mediante rupturas o sacrificios calculados para atacar al rey antes de que se enroque.',
                      tag: 'A',
                    },
                    {
                      title: 'Desarrollar lentamente las piezas restantes y defender pasivamente mis peones.',
                      tag: 'B',
                    },
                    {
                      title: 'Iniciar una tormenta de peones en los flancos alejados del centro.',
                      tag: 'C',
                    },
                  ].map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => handleOptionSelect('tacticalAnswer', `${opt.tag}) ${opt.title}`)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition ${
                        answers.tacticalAnswer === `${opt.tag}) ${opt.title}`
                          ? 'border-[#C8AA6E] bg-[#1B4D3E]/30 text-[#F6F3EC] shadow-sm'
                          : 'border-[#2B3E34] bg-[#0B1510] text-[#A8B2A6] hover:border-[#C8AA6E]/50 hover:bg-[#121E17]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tacticalAnswer"
                        checked={answers.tacticalAnswer === `${opt.tag}) ${opt.title}`}
                        onChange={() => {}}
                        className="mt-1 accent-[#C8AA6E]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#F6F3EC] block">Opción {opt.tag}:</span>
                        <span className="text-xs text-[#D2DBD0] mt-0.5 block leading-relaxed">{opt.title}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 6: Datos del Alumno y Envío a Evaluación Docente */}
            {currentStep === 6 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-[#C8AA6E] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Finalizar &amp; Enviar a Evaluación</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F6F3EC]">
                  Datos de Contacto para el Informe del Maestro
                </h3>
                <p className="text-xs text-[#A8B2A6]">
                  Ingresa tus datos para recibir tu recomendación y permitir que los entrenadores de la Academia revisen tu perfil.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#D2DBD0]">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={answers.studentName}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, studentName: e.target.value }))}
                        placeholder="Ej. Carlos Martínez"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#D2DBD0]">
                      Correo Electrónico *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={answers.studentEmail}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, studentEmail: e.target.value }))}
                        placeholder="carlos@correo.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#D2DBD0]">
                      Teléfono / WhatsApp *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A8B2A6]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={answers.studentPhone}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, studentPhone: e.target.value }))}
                        placeholder="55 1234 5678"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#D2DBD0]">
                      Edad del Alumno (opcional)
                    </label>
                    <input
                      type="text"
                      value={answers.studentAge}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, studentAge: e.target.value }))}
                      placeholder="Ej. 12 años (o adulto)"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#D2DBD0]">
                    Comentario o Dudas para el Profesor (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={answers.notes}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="¿Tienes metas específicas, torneos próximos o alguna duda sobre el formato de clases?"
                    className="w-full p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-gold disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Procesando evaluación...' : 'Ver Mi Diagnóstico & Enviar a Revisión Docente'}</span>
                </button>
              </form>
            )}

            {/* BOTONES DE NAVEGACIÓN */}
            {currentStep < totalSteps && (
              <div className="flex items-center justify-between pt-4 border-t border-[#2B3E34]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="inline-flex items-center gap-1 text-xs text-[#A8B2A6] hover:text-[#F6F3EC] disabled:opacity-40 disabled:hover:text-[#A8B2A6] transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2.5 px-5 rounded-lg bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-xs font-bold flex items-center gap-1.5 shadow transition"
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
