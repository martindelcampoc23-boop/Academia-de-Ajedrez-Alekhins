import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | Academia Alekhins',
};

export default function TermsLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-stone-border pb-4">
        <h1 className="font-serif-editorial text-3xl font-bold text-ivory">Términos y Condiciones de Uso</h1>
        <p className="text-xs text-ivory-dim">Última actualización: Agosto 2026</p>
      </div>

      <div className="p-4 bg-amber-950/40 border border-amber-800 text-amber-300 text-xs rounded flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 shrink-0" />
        <span>Documento modelo en desarrollo. <strong>PENDIENTE DE REVISIÓN LEGAL DEFINITIVA</strong>.</span>
      </div>

      <div className="card-carbon p-6 space-y-6 text-xs text-ivory-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">1. Generalidades</h2>
          <p>
            El presente documento rige el uso de la plataforma web Academia de Ajedrez Alekhins, incluyendo la contratación de planes de entrenamiento, suscripciones y la adquisición de material de ajedrez.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">2. Compras & Envíos</h2>
          <p>
            Todos los precios mostrados están expresados en pesos mexicanos (MXN) e incluyen impuestos correspondientes. El recálculo final de envío e inventario se realiza de forma estricta en el servidor al confirmar el pedido.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-editorial text-base font-bold text-ivory">3. Cancelación de Suscripciones</h2>
          <p>
            Las suscripciones a programas de entrenamiento pueden cancelarse en cualquier momento desde el área privada del alumno (`/mi-cuenta/suscripciones`) sin penalizaciones ni cobros ocultos.
          </p>
        </section>
      </div>
    </div>
  );
}
