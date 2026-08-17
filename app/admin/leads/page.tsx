import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Users, Phone, Mail, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'CRM Gestor de Leads | Admin Alekhins',
};

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { institutionalQuotes: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <Link href="/admin" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </Link>

      <div className="border-b border-stone-border pb-4 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
            Gestión Comercial CRM
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-ivory">
            Leads & Solicitudes de Cotización ({leads.length})
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="card-carbon p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-border pb-3 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-champagne px-2 py-0.5 bg-walnut/40 rounded border border-champagne/40">
                  Tipo: {lead.entityType}
                </span>
                <h3 className="font-serif-editorial text-lg font-bold text-ivory mt-1">{lead.name}</h3>
                <p className="text-xs text-ivory-dim">{lead.email} • Tel: {lead.phone}</p>
              </div>

              <span className={`px-3 py-1 rounded text-xs font-bold self-start sm:self-auto ${
                lead.status === 'NEW' ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-stone-gray text-ivory'
              }`}>
                Estado: {lead.status}
              </span>
            </div>

            {lead.notes && (
              <p className="text-xs text-ivory-muted bg-carbon-dark p-3 rounded border border-stone-border/50">
                &quot;{lead.notes}&quot;
              </p>
            )}

            {lead.institutionalQuotes.length > 0 && (
              <div className="p-3 bg-walnut/20 border border-champagne/30 rounded text-xs text-ivory-muted space-y-1">
                <span className="font-bold text-champagne">Cotización Institucional Solicitada:</span>
                <p>Institución: {lead.institutionalQuotes[0].institutionName} • {lead.institutionalQuotes[0].playerCount} Jugadores</p>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-ivory-dim pt-2 border-t border-stone-border/50">
              <span>Registrado: {new Date(lead.createdAt).toLocaleString('es-MX')}</span>
              <a href={`mailto:${lead.email}`} className="text-champagne hover:underline">
                Contactar por Correo →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
