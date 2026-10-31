'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitLeadAction } from '@/lib/actions';
import {
  Building2,
  Users,
  PackageCheck,
  Send,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Trophy,
  Laptop,
  Check,
  Phone,
  MessageCircle
} from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '529991020078';

export default function ClubsAndSchoolsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institutionName: '',
    playerCount: 20,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const res = await submitLeadAction({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      entityType: 'SCHOOL',
      institutionName: formData.institutionName,
      playerCount: Number(formData.playerCount),
      notes: formData.notes,
    });

    if (res.success) {
      setMessage('¡Solicitud institucional recibida con éxito! Nuestro departamento de vinculación educativa preparará tu cotización formal y se comunicará a la brevedad.');
      setFormData({ name: '', email: '', phone: '', institutionName: '', playerCount: 20, notes: '' });
    } else {
      setError(res.error || 'Ocurrió un error al enviar tu solicitud. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1D30] text-[#FAF8F2] py-12 md:py-20 selection:bg-[#C5A46D] selection:text-[#0F1D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">

        {/* Hero Header */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B46] border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-bold uppercase tracking-widest shadow">
            <Building2 className="w-3.5 h-3.5" />
            <span>Convenios Educativos &amp; Deportivos • Academia Alekhins</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            AJEDREZ PARA ESCUELAS, COLEGIOS Y CLUBES
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4CBD4] leading-relaxed max-w-3xl mx-auto font-light">
            Soluciones integrales para instituciones: programas curriculares, capacitación para profesores, equipamiento oficial con factura fiscal y licencias para el aula virtual Chessgora.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a href="#cotizacion" className="btn-dorado text-xs sm:text-sm uppercase tracking-wider font-extrabold py-3.5 px-8">
              Solicitar Cotización Formal
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hola, deseo solicitar informes para implementar ajedrez en nuestro colegio/club con Academia Alekhins.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy-outline text-xs sm:text-sm uppercase tracking-wider font-bold py-3.5 px-6 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A46D]" />
              WhatsApp Institucional
            </a>
          </div>
        </section>

        {/* 4 Ejes de Servicio Institucional */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-white">Ajedrez Curricular</h3>
            <p className="text-xs text-[#C4CBD4] leading-relaxed">
              Planes de estudio estructurados por grado escolar para desarrollar el pensamiento matemático y la concentración en el aula.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-white">Dotación de Material</h3>
            <p className="text-xs text-[#C4CBD4] leading-relaxed">
              Paquetes de tableros de vinil grueso, piezas Staunton irrompibles, relojes DGT y tableros murales magnéticos de demostración.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-white">Torneos Intercolegiales</h3>
            <p className="text-xs text-[#C4CBD4] leading-relaxed">
              Organización, arbitraje titulado FIDE y premiación oficial de campeonatos internos y copas intercolegiales.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F1D30] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-lg font-bold text-white">Aula Chessgora Escolar</h3>
            <p className="text-xs text-[#C4CBD4] leading-relaxed">
              Panel escolar para que los maestros de la institución asignen tareas, sigan el progreso y califiquen el avance de cada alumno.
            </p>
          </div>
        </section>

        {/* Paquetes de Equipamiento Preset */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A46D] block">
              Equipamiento por Volumen
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Paquetes Recomendados para Centros Educativos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C5A46D] uppercase">Para 10 Jugadores</span>
                <h3 className="font-serif-editorial text-lg font-bold text-white">Paquete Básico</h3>
                <p className="text-xs text-[#C4CBD4]">5 Tableros de vinil + 5 juegos Staunton #6 pesados + 5 bolsas reforzadas.</p>
              </div>
              <a href="#cotizacion" className="btn-navy-outline text-xs text-center py-2.5 font-bold uppercase">
                Cotizar Paquete
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1C3454] to-[#172B46] border-2 border-[#C5A46D] flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C5A46D] uppercase">Para 20 Jugadores</span>
                <h3 className="font-serif-editorial text-lg font-bold text-white">Paquete de Torneo Escolar</h3>
                <p className="text-xs text-[#C4CBD4]">10 Sets completos + 5 Relojes Digitales DGT + Maletín institucional de transporte.</p>
              </div>
              <a href="#cotizacion" className="btn-dorado text-xs text-center py-2.5 font-bold uppercase">
                Cotizar Paquete
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C5A46D] uppercase">Para 40 Jugadores</span>
                <h3 className="font-serif-editorial text-lg font-bold text-white">Paquete Integral de Club</h3>
                <p className="text-xs text-[#C4CBD4]">20 Sets de torneo + 10 Relojes Digitales + 1 Tablero mural magnético de 1x1m.</p>
              </div>
              <a href="#cotizacion" className="btn-navy-outline text-xs text-center py-2.5 font-bold uppercase">
                Cotizar Paquete
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#172B46] border border-[#233F65] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C5A46D] uppercase">Más de 50 Jugadores</span>
                <h3 className="font-serif-editorial text-lg font-bold text-white">Dotación Masiva / Distrito</h3>
                <p className="text-xs text-[#C4CBD4]">Equipamiento a escala para colegios múltiples, talleres y olimpiadas intercolegiales.</p>
              </div>
              <a href="#cotizacion" className="btn-navy-outline text-xs text-center py-2.5 font-bold uppercase">
                Cotizar Paquete
              </a>
            </div>
          </div>
        </section>

        {/* Formulario de Cotización Institucional */}
        <section id="cotizacion" className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#172B46] border-2 border-[#233F65] space-y-6 shadow-2xl">
          <div className="border-b border-[#233F65] pb-4 space-y-1">
            <h2 className="font-serif-editorial text-2xl font-bold text-white">
              Formulario de Cotización B2B / Institucional
            </h2>
            <p className="text-xs text-[#C4CBD4]">
              Completa los datos de tu institución y te enviaremos una propuesta formal en PDF con desglose fiscal.
            </p>
          </div>

          {message && (
            <p className="p-4 bg-emerald-950/80 border border-emerald-500/60 text-xs text-emerald-300 rounded-xl font-medium">
              {message}
            </p>
          )}
          {error && (
            <p className="p-4 bg-red-950/80 border border-red-500/60 text-xs text-red-300 rounded-xl font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#FAF8F2] font-semibold block">Nombre del Representante *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Profesor o Coordinador"
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#FAF8F2] font-semibold block">Nombre del Colegio o Club *</label>
                <input
                  type="text"
                  name="institutionName"
                  required
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="Instituto / Colegio / Club"
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#FAF8F2] font-semibold block">Correo Electrónico Institucional *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="coordinacion@colegio.edu.mx"
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#FAF8F2] font-semibold block">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 999 123 4567"
                  className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#FAF8F2] font-semibold block">Matrícula Estimada de Alumnos / Jugadores</label>
              <select
                name="playerCount"
                value={formData.playerCount}
                onChange={handleChange}
                className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
              >
                <option value={10}>10 a 20 alumnos</option>
                <option value={30}>20 a 50 alumnos</option>
                <option value={80}>50 a 100 alumnos</option>
                <option value={150}>Más de 100 alumnos (Convenio de Red Escolar)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[#FAF8F2] font-semibold block">Requerimientos Específicos o Comentarios</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Ej. Nos interesa equipar 2 salones con 15 tableros cada uno y capacitar a dos docentes de primaria."
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-[#0F1D30] border border-[#233F65] p-3 rounded-xl text-white focus:outline-none focus:border-[#C5A46D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-dorado w-full py-3.5 uppercase tracking-wider font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Procesando Propuesta...' : 'ENVIAR SOLICITUD DE COTIZACIÓN'}
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
