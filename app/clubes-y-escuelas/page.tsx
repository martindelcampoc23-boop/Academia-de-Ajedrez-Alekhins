'use client';

import React, { useState } from 'react';
import { submitLeadAction } from '@/lib/actions';
import { Building2, Users, PackageCheck, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ClubsAndSchoolsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institutionName: '',
    playerCount: 10,
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
      setMessage(res.message || 'Solicitud enviada con éxito');
      setFormData({ name: '', email: '', phone: '', institutionName: '', playerCount: 10, notes: '' });
    } else {
      setError(res.error || 'Error al enviar');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
          Soluciones Institucionales
        </span>
        <h1 className="font-serif-editorial text-3xl md:text-5xl font-bold text-ivory">
          Ajedrez para Clubes, Escuelas y Universidades
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Equipamos instituciones educativas con sets de torneo certificados, tableros de demostración murales, relojes digitales DGT y programas pedagógicos a medida.
        </p>
      </div>

      {/* Preset Bundles Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-carbon p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-champagne">PAQUETE 5 JUGADORES</span>
            <h3 className="font-serif-editorial text-lg font-bold text-ivory">5 Sets Completos</h3>
            <p className="text-xs text-ivory-dim">5 Tableros de vinil + 5 juegos Staunton + 5 bolsos.</p>
          </div>
          <a href="#cotizacion" className="btn-outline-gold text-xs text-center py-2">Solicitar Cotización</a>
        </div>

        <div className="card-carbon p-6 space-y-4 flex flex-col justify-between border-champagne">
          <div className="space-y-2">
            <span className="text-xs font-bold text-champagne">PAQUETE 10 JUGADORES</span>
            <h3 className="font-serif-editorial text-lg font-bold text-ivory">10 Sets + Relojes</h3>
            <p className="text-xs text-ivory-dim">10 Sets completos + 5 Relojes DGT + Maletín oficial.</p>
          </div>
          <a href="#cotizacion" className="btn-champagne text-xs text-center py-2">Solicitar Cotización</a>
        </div>

        <div className="card-carbon p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-champagne">PAQUETE 20 JUGADORES</span>
            <h3 className="font-serif-editorial text-lg font-bold text-ivory">20 Sets de Torneo</h3>
            <p className="text-xs text-ivory-dim">20 Sets pesados + 10 Relojes + 1 Tablero mural magnético.</p>
          </div>
          <a href="#cotizacion" className="btn-outline-gold text-xs text-center py-2">Solicitar Cotización</a>
        </div>

        <div className="card-carbon p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-champagne">PAQUETE 50 JUGADORES</span>
            <h3 className="font-serif-editorial text-lg font-bold text-ivory">Aulas & Talleres</h3>
            <p className="text-xs text-ivory-dim">Equipamiento masivo institucional para torneos intercolegiales.</p>
          </div>
          <a href="#cotizacion" className="btn-outline-gold text-xs text-center py-2">Solicitar Cotización</a>
        </div>
      </div>

      {/* Quote Form Form */}
      <div id="cotizacion" className="max-w-2xl mx-auto card-carbon p-8 space-y-6 border-stone-border">
        <div className="border-b border-stone-border pb-4">
          <h2 className="font-serif-editorial text-xl font-bold text-ivory">Formulario de Cotización Institucional</h2>
          <p className="text-xs text-ivory-dim">Completa los datos de tu escuela o colegio y recibe una propuesta B2B personalizada.</p>
        </div>

        {message && <p className="p-3 bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 rounded font-medium">{message}</p>}
        {error && <p className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-300 rounded font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-ivory-muted block mb-1">Nombre Completo *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
              />
            </div>
            <div>
              <label className="text-ivory-muted block mb-1">Nombre del Colegio / Club *</label>
              <input
                type="text"
                name="institutionName"
                required
                value={formData.institutionName}
                onChange={handleChange}
                className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
              />
            </div>
            <div>
              <label className="text-ivory-muted block mb-1">Correo Electrónico Institucional *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
              />
            </div>
            <div>
              <label className="text-ivory-muted block mb-1">Teléfono de Contacto *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
              />
            </div>
          </div>

          <div>
            <label className="text-ivory-muted block mb-1">Número estimado de alumnos / jugadores *</label>
            <select
              name="playerCount"
              value={formData.playerCount}
              onChange={handleChange}
              className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
            >
              <option value={5}>5 a 10 jugadores</option>
              <option value={20}>10 a 25 jugadores</option>
              <option value={50}>25 a 50 jugadores</option>
              <option value={100}>Más de 50 jugadores</option>
            </select>
          </div>

          <div>
            <label className="text-ivory-muted block mb-1">Requerimientos específicos</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Ej. Requerimos 15 tableros de vinil verde, 5 relojes DGT 2010 y factura fiscal."
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-carbon-dark border border-stone-border p-2.5 rounded text-ivory"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-champagne w-full py-3">
            {loading ? 'Enviando solicitud...' : 'Enviar Solicitud de Cotización'}
          </button>
        </form>
      </div>
    </div>
  );
}
