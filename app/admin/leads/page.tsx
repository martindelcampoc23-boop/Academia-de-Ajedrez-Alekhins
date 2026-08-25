import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Users, Phone, Mail, Clock, ArrowLeft, CheckCircle, BrainCircuit, School, MessageSquare, Send, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'CRM Evaluaciones & Leads | Admin Alekhins',
};

export const revalidate = 0;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const user = await getCurrentUser();
  if (!user || !['SUPERADMIN', 'ADMIN', 'COACH', 'OPERACIONES'].includes(user.role)) {
    redirect('/login?callbackUrl=/admin/leads');
  }

  const activeTab = searchParams?.tab || 'ALL';

  let leads: any[] = [];

  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { institutionalQuotes: true },
    });
  } catch (error) {
    console.warn('⚠️ [AdminLeadsPage] Database query fallback:', error);
  }

  const diagnosticLeads = leads.filter((l) => l.entityType === 'DIAGNOSTIC_EVALUATION');
  const institutionalLeads = leads.filter((l) => l.entityType === 'SCHOOL' || l.institutionalQuotes.length > 0);
  const generalLeads = leads.filter((l) => l.entityType === 'INDIVIDUAL' && l.institutionalQuotes.length === 0);

  const displayedLeads =
    activeTab === 'DIAGNOSTIC'
      ? diagnosticLeads
      : activeTab === 'INSTITUTIONAL'
      ? institutionalLeads
      : activeTab === 'CONTACT'
      ? generalLeads
      : leads;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <Link href="/admin" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </Link>

      <div className="border-b border-stone-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block mb-1">
            Gestión Comercial &amp; Evaluaciones
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-ivory">
            Evaluaciones Diagnósticas &amp; Leads ({leads.length})
          </h1>
          <p className="text-xs text-ivory-muted mt-1">
            Revisa las respuestas del test de nivel de nuevos alumnos, prospectos y cotizaciones institucionales.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-border pb-4">
        <Link
          href="/admin/leads?tab=ALL"
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'ALL'
              ? 'bg-champagne text-carbon-dark shadow'
              : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
          }`}
        >
          Todos ({leads.length})
        </Link>
        <Link
          href="/admin/leads?tab=DIAGNOSTIC"
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'DIAGNOSTIC'
              ? 'bg-champagne text-carbon-dark shadow'
              : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Evaluaciones de Nivel ({diagnosticLeads.length})</span>
        </Link>
        <Link
          href="/admin/leads?tab=INSTITUTIONAL"
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'INSTITUTIONAL'
              ? 'bg-champagne text-carbon-dark shadow'
              : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
          }`}
        >
          <School className="w-3.5 h-3.5" />
          <span>Clubes y Escuelas ({institutionalLeads.length})</span>
        </Link>
        <Link
          href="/admin/leads?tab=CONTACT"
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'CONTACT'
              ? 'bg-champagne text-carbon-dark shadow'
              : 'bg-carbon-card text-ivory-muted hover:text-ivory border border-stone-border'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contacto General ({generalLeads.length})</span>
        </Link>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {displayedLeads.length === 0 ? (
          <div className="card-carbon p-12 text-center text-ivory-dim text-sm">
            No hay registros en esta sección.
          </div>
        ) : (
          displayedLeads.map((lead: any) => {
            const isDiagnostic = lead.entityType === 'DIAGNOSTIC_EVALUATION';
            const cleanPhone = (lead.phone || '').replace(/\D/g, '');

            return (
              <div
                key={lead.id}
                className={`card-carbon p-6 space-y-4 ${
                  isDiagnostic ? 'border-champagne/60 bg-[#121E17]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-border pb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                          isDiagnostic
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                            : 'bg-walnut/40 text-champagne border-champagne/40'
                        }`}
                      >
                        {isDiagnostic ? '📝 Evaluación Diagnóstica de Nivel' : `Tipo: ${lead.entityType}`}
                      </span>
                      {lead.studentAge && (
                        <span className="text-[10px] text-ivory-dim bg-carbon-dark px-2 py-0.5 rounded border border-stone-border">
                          Edad: {lead.studentAge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-editorial text-lg font-bold text-ivory mt-1">{lead.name}</h3>
                    <p className="text-xs text-ivory-dim">
                      {lead.email} • Tel: {lead.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        lead.status === 'NEW'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : 'bg-stone-gray text-ivory'
                      }`}
                    >
                      Estado: {lead.status}
                    </span>
                  </div>
                </div>

                {lead.notes && (
                  <div className="text-xs text-ivory-muted bg-carbon-dark p-4 rounded-xl border border-stone-border/60 font-mono whitespace-pre-line leading-relaxed">
                    {lead.notes}
                  </div>
                )}

                {lead.institutionalQuotes && lead.institutionalQuotes.length > 0 && (
                  <div className="p-3 bg-walnut/20 border border-champagne/30 rounded text-xs text-ivory-muted space-y-1">
                    <span className="font-bold text-champagne">Cotización Institucional Solicitada:</span>
                    <p>
                      Institución: {lead.institutionalQuotes[0].institutionName} •{' '}
                      {lead.institutionalQuotes[0].playerCount} Jugadores
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap justify-between items-center text-xs text-ivory-dim pt-2 border-t border-stone-border/50 gap-3">
                  <span>Registrado: {new Date(lead.createdAt).toLocaleString('es-MX')}</span>

                  <div className="flex items-center gap-3">
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`}?text=${encodeURIComponent(
                          `¡Hola ${lead.name}! Te saluda el equipo de la Academia de Ajedrez Alekhins. Revisamos tu test de nivel y nos gustaría orientarte en tu plan de entrenamiento.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Contactar por WhatsApp</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${lead.email}?subject=${encodeURIComponent(
                        'Tu Evaluación Diagnóstica — Academia de Ajedrez Alekhins'
                      )}`}
                      className="text-champagne hover:underline inline-flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" /> Contactar por Correo →
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
