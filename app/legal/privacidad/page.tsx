import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Aviso de Privacidad | Academia Alekhins',
};

export default function PrivacyLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-stone-border pb-4">
        <h1 className="font-serif-editorial text-3xl font-bold text-ivory">Aviso de Privacidad Integral</h1>
        <p className="text-xs text-ivory-dim">Cumplimiento LFPDPPP México • Última actualización: Agosto 2026</p>
      </div>

      <div className="p-4 bg-amber-950/40 border border-amber-800 text-amber-300 text-xs rounded flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 shrink-0" />
        <span>Documento modelo en desarrollo. <strong>PENDIENTE DE REVISIÓN LEGAL DEFINITIVA</strong>.</span>
      </div>

      <div className="card-carbon p-6 space-y-6 text-xs text-ivory-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">1. Identidad del Responsable</h2>
          <p>
            Academia de Ajedrez Alekhins es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su protección.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">2. Datos de Alumnos Menores de Edad</h2>
          <p>
            En cumplimiento estricto con las regulaciones de protección a menores, los datos de los estudiantes menores de edad son gestionados exclusivamente bajo el consentimiento explícito del padre, madre o tutor legal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">3. Derechos ARCO</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones del uso que les damos (Acceso, Rectificación, Cancelación y Oposición). Para ejercerlos envíe un correo a contacto@alekhins.com.
          </p>
        </section>
      </div>
    </div>
  );
}
