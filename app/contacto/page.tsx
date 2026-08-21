'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Crown,
  BookOpen,
  ShoppingBag
} from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
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

    try {
      // Simulación de envío o llamada a lead/contacto
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          entityType: 'INDIVIDUAL',
          notes: `[Asunto: ${formData.subject}] ${formData.message}`,
        }),
      }).catch(() => null);

      setSuccessMsg('¡Mensaje recibido! Nuestro equipo se pondrá en contacto contigo a la brevedad.');
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    } catch {
      setErrorMsg('Ocurrió un error al enviar tu mensaje. También puedes escribirnos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Atención & Soporte
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Ponte en Contacto con Nosotros
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          ¿Tienes dudas sobre nuestras clases de ajedrez, pedidos de la tienda o necesitas asesoría personalizada? Estamos para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Cards Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Principal */}
          <div className="card-carbon p-6 space-y-6 border-champagne/30">
            <div className="flex items-center gap-3 border-b border-stone-border pb-4">
              <div className="w-10 h-10 rounded-full bg-walnut/40 border border-champagne flex items-center justify-center text-champagne">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-editorial text-base font-bold text-ivory">
                  Academia de Ajedrez Alekhins
                </h3>
                <p className="text-xs text-champagne">Dirección Técnica MI Roberto Martín del Campo</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-ivory-muted">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-champagne shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-ivory block">Correo Electrónico</span>
                  <a href="mailto:info@alekhins.mx" className="text-champagne hover:underline">
                    info@alekhins.mx
                  </a>
                  <p className="text-[11px] text-ivory-dim">Respuesta en menos de 24 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-ivory block">WhatsApp & Atención Telefónica</span>
                  <a
                    href="https://wa.me/525500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    +52 55 1234 5678
                  </a>
                  <p className="text-[11px] text-ivory-dim">Lunes a Sábado de 9:00 a 19:00 hrs (CDMX)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-blue-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-ivory block">Horarios de Clases en Vivo</span>
                  <p className="text-ivory-muted">Sesiones vespertinas y fines de semana por chessgora.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-ivory block">Ubicación & Envíos</span>
                  <p className="text-ivory-muted">Ciudad de México • Envíos seguros a toda la República Mexicana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="card-carbon p-6 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-champagne">
              Accesos Directos
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/entrenamiento"
                className="p-3 bg-carbon-dark rounded border border-stone-border hover:border-champagne transition group block"
              >
                <BookOpen className="w-4 h-4 text-champagne mb-1 group-hover:scale-110 transition" />
                <span className="font-semibold text-ivory block">Planes de Estudio</span>
                <span className="text-[10px] text-ivory-dim">Ver niveles y costos</span>
              </Link>
              <Link
                href="/clubes-y-escuelas"
                className="p-3 bg-carbon-dark rounded border border-stone-border hover:border-champagne transition group block"
              >
                <Crown className="w-4 h-4 text-champagne mb-1 group-hover:scale-110 transition" />
                <span className="font-semibold text-ivory block">Escuelas y Colegios</span>
                <span className="text-[10px] text-ivory-dim">Paquetes por volumen</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="card-carbon p-8 space-y-6 border-stone-border shadow-2xl">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
                Formulario de Contacto
              </span>
              <h2 className="font-serif-editorial text-2xl font-bold text-ivory mt-1">
                Envíanos un Mensaje
              </h2>
              <p className="text-xs text-ivory-muted mt-1">
                Completa tus datos y un asesor de la academia se comunicará contigo.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-ivory-muted">
                    Nombre Completo *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Roberto Gómez"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-ivory-muted">
                    Correo Electrónico *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-ivory-muted">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="55 1234 5678"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-ivory-muted">
                    Motivo de Contacto
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm focus:outline-none focus:border-champagne transition"
                  >
                    <option value="general">Información General</option>
                    <option value="clases">Inscripción a Clases / Cursos</option>
                    <option value="tienda">Dudas sobre Productos o Pedidos</option>
                    <option value="maestro">Asesoría con el Maestro Roberto</option>
                    <option value="soporte">Soporte Técnico de Plataforma</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-ivory-muted">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe aquí tu consulta con el mayor detalle posible..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-champagne hover:bg-champagne/90 text-[#0B1510] text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition shadow-lg disabled:opacity-60 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Enviando mensaje...' : 'Enviar Mensaje'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
