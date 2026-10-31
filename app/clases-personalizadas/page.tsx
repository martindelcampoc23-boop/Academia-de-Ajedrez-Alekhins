'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Send,
  MessageCircle,
  Award,
  BookOpen,
  Laptop,
  Check
} from 'lucide-react';
import { submitLeadAction } from '@/lib/actions';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function ClasesPersonalizadasPage() {
  const { formatPrice, currency } = useLocaleCurrency();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageType: 'PAQUETE_10',
    preferredSchedule: '',
    approxRating: '',
    pgnOrProfile: '',
    tournamentGoal: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const formattedNotes = `
[SOLICITUD DE ENTRENAMIENTO PERSONALIZADO]
Paquete elegido: ${formData.packageType === 'PAQUETE_10' ? 'Paquete 10 Sesiones ($5,000 MXN)' : 'Sesión Individual ($600 MXN)'}
Rating actual/aproximado: ${formData.approxRating || 'No especificado'}
Horarios preferidos: ${formData.preferredSchedule || 'A convenir'}
Meta o torneo: ${formData.tournamentGoal || 'Mejora general'}
Partidas PGN / Perfil: ${formData.pgnOrProfile || 'Ninguno'}
Mensaje adicional: ${formData.message || 'Sin mensaje'}
Moneda del solicitante: ${currency}
    `.trim();

    try {
      const res = await submitLeadAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        entityType: 'INDIVIDUAL',
        notes: formattedNotes,
      });

      if (res.success) {
        setSuccessMsg(
          '¡Solicitud enviada con éxito! El MI Roberto Martín del Campo y nuestro equipo docente revisarán tu perfil y se pondrán en contacto contigo vía WhatsApp / Correo para coordinar horarios.'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          packageType: 'PAQUETE_10',
          preferredSchedule: '',
          approxRating: '',
          pgnOrProfile: '',
          tournamentGoal: '',
          message: '',
        });
      } else {
        setErrorMsg(res.error || 'Ocurrió un error al enviar tu solicitud. Intenta de nuevo.');
      }
    } catch {
      setErrorMsg('Error de conexión. También puedes contactar directamente por WhatsApp oficial.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola Maestro Roberto Martín del Campo, deseo solicitar información y agendar Entrenamiento Personalizado 1 a 1 en Academia Alekhins.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Crown className="w-3.5 h-3.5" />
            <span>Servicio VIP • Cátedra Individual de Maestría</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            CLASES PERSONALIZADAS 1 A 1
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Tu entrenamiento. Tu ritmo. Tus objetivos competitivos. Preparación individual impartida directamente por el Maestro Internacional Roberto Martín del Campo Cárdenas.
          </p>
        </section>

        {/* Perfil del Entrenador & Modalidades de Contratación */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Tarjeta del Maestro */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-[#172B46] border-2 border-[#C5A46D] shadow-2xl space-y-6 text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-[#C5A46D] shadow-xl bg-[#0F1D30]">
                <Image
                  src="/maestro-roberto.jpg"
                  alt="MI Roberto Martín del Campo Cárdenas"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#C5A46D] tracking-wider block">
                  Maestro Internacional FIDE
                </span>
                <h2 className="font-serif-editorial text-2xl font-bold text-white">
                  MI Roberto Martín del Campo
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  FIDE ID: 5100046 • 4x Representante Olímpico de México • Campeón Nacional
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1D30] border border-[#233F65] text-left text-xs space-y-2 text-[#E5DFD1]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span><strong>Duración:</strong> 60 minutos por sesión (1 hora completa)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span><strong>Plataforma:</strong> Online en vivo + Acceso a Chessgora.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span><strong>Análisis:</strong> Revisión de tus partidas PGN y torneos</span>
                </div>
              </div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado w-full text-xs uppercase tracking-wider py-3.5 font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar al Maestro por WhatsApp
              </a>
            </div>
          </div>

          {/* Opciones de Paquetes */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
              Inversión & Paquetes Disponibles
            </span>

            {/* Opción 1: Paquete de 10 Sesiones */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#172B46] to-[#1C3454] border-2 border-[#C5A46D] shadow-lg relative space-y-3">
              <div className="absolute top-4 right-4 bg-[#C5A46D] text-[#0F1D30] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Opción Recomendada
              </div>

              <div className="flex items-baseline justify-between pr-24">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif-editorial">
                    Paquete Completo de 10 Sesiones
                  </h3>
                  <p className="text-xs text-[#C4CBD4]">
                    Programa continuo y estructurado de 10 horas de cátedra individual
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-extrabold text-[#C5A46D]">
                  {formatPrice(5000)}
                </span>
                <span className="text-xs text-[#9CA3AF]">
                  total ($500 MXN / sesión)
                </span>
              </div>

              <ul className="text-xs text-[#FAF8F2] space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A46D]" /> Plan de entrenamiento individualizado a largo plazo.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A46D]" /> Preparación y refinamiento de repertorio de aperturas.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A46D]" /> Acceso completo a Chessgora.com incluido.
                </li>
              </ul>
            </div>

            {/* Opción 2: Sesión Individual */}
            <div className="p-5 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-2 hover:border-[#C5A46D] transition">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif-editorial">
                    Sesión Individual de 60 Minutos
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    Ideal para resolver dudas puntuales, revisar una partida o preparar una ronda específica.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(600)}
                  </span>
                  <span className="text-xs text-[#9CA3AF] block">/ sesión</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* Formulario de Solicitud de Entrenamiento & Envío de PGN */}
        <section className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#172B46] border-2 border-[#233F65] shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Registro Oficial de Solicitud
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Solicitar Horarios & Enviar Partidas PGN
            </h2>
            <p className="text-xs sm:text-sm text-[#C4CBD4]">
              Llena tus datos a continuación. Tu solicitud quedará registrada en el sistema de la Academia y nos pondremos en contacto para confirmar tu agenda.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm leading-relaxed">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs sm:text-sm leading-relaxed">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+52 999 123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Paquete Deseado</label>
                <select
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                >
                  <option value="PAQUETE_10">Paquete de 10 Sesiones ($5,000 MXN / $275 USD)</option>
                  <option value="INDIVIDUAL">1 Sesión Individual ($600 MXN / $35 USD)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Rating Actual / Estimado</label>
                <input
                  type="text"
                  value={formData.approxRating}
                  onChange={(e) => setFormData({ ...formData, approxRating: e.target.value })}
                  placeholder="Ej. 1450 FIDE o 1600 Lichess / Principiante"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F2] font-semibold block">Disponibilidad de Horarios</label>
                <input
                  type="text"
                  value={formData.preferredSchedule}
                  onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                  placeholder="Ej. Tardes después de las 6 pm / Fines de semana"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#FAF8F2] font-semibold block">
                Partidas PGN / Perfil de Lichess o Chess.com (Opcional)
              </label>
              <textarea
                rows={3}
                value={formData.pgnOrProfile}
                onChange={(e) => setFormData({ ...formData, pgnOrProfile: e.target.value })}
                placeholder="Pega aquí el texto de tus partidas PGN o el enlace a tu usuario de Lichess / Chess.com para que el Maestro evalúe tu juego."
                className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D] font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#FAF8F2] font-semibold block">
                Objetivo Competitivo o Torneo Próximo
              </label>
              <textarea
                rows={2}
                value={formData.tournamentGoal}
                onChange={(e) => setFormData({ ...formData, tournamentGoal: e.target.value })}
                placeholder="¿Qué deseas mejorar o para qué torneo deseas prepararte?"
                className="w-full px-4 py-3 rounded-xl bg-[#0F1D30] border border-[#233F65] text-white focus:outline-none focus:border-[#C5A46D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-dorado w-full py-4 uppercase tracking-wider font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Enviando Solicitud...' : 'REGISTRAR SOLICITUD DE ENTRENAMIENTO'}
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
