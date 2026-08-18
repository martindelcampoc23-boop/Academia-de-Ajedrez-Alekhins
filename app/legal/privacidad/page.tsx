import React from 'react';
import Link from 'next/link';
import { Lock, Shield, Eye, Database, UserCheck, Mail, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Aviso de Privacidad Integral | Academia de Ajedrez Alekhins',
  description: 'Aviso de privacidad y protección de datos personales de conformidad con la LFPDPPP en México.',
};

export default function PrivacyLegalPage() {
  return (
    <div className="bg-[#0B1510] text-[#F6F3EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="border-b border-[#2B3E34] pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/40 border border-[#D8B155]/40 text-[#D8B155] text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            Protección de Datos Personales
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Aviso de Privacidad Integral
          </h1>
          <p className="text-sm text-[#A8B2A6]">
            En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.
          </p>
        </div>

        {/* Resumen */}
        <div className="p-6 rounded-xl bg-[#121E17] border border-[#2B3E34] space-y-3">
          <h3 className="font-serif-editorial text-lg font-bold text-[#D8B155] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D8B155]" />
            Tu Privacidad es Nuestra Prioridad
          </h3>
          <p className="text-xs text-[#D2DBD0] leading-relaxed">
            En la <strong>Academia de Ajedrez Alekhins</strong>, nos comprometemos a resguardar la confidencialidad, seguridad e integridad de la información personal que nos confías al inscribirte a nuestros programas, registrarte en el portal del alumno o adquirir productos en nuestra tienda.
          </p>
        </div>

        {/* Secciones del Aviso */}
        <div className="space-y-8 text-xs sm:text-sm text-[#D2DBD0] leading-relaxed">
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">1.</span> Responsable del Tratamiento de sus Datos
            </h2>
            <p>
              La <strong>Academia de Ajedrez Alekhins</strong>, con domicilio operativo en la Ciudad de México, México, y portal web oficial <strong>alekhins.com</strong>, es la entidad responsable del uso, tratamiento y protección de sus datos personales.
            </p>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">2.</span> Datos Personales que Recabamos
            </h2>
            <p>Para la adecuada prestación de nuestros servicios pedagógicos y comerciales, podemos solicitar:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
              <li><strong>Datos de Identificación:</strong> Nombre completo, edad, fecha de nacimiento y nivel ajedrecístico.</li>
              <li><strong>Datos de Contacto:</strong> Correo electrónico, número de teléfono (WhatsApp) y domicilio para entrega de pedidos físicos.</li>
              <li><strong>Datos de Menores de Edad:</strong> Nombre del estudiante menor y nombre, firma y contacto del padre, madre o tutor responsable.</li>
              <li><strong>Datos Académicos / Deportivos:</strong> Rating FIDE / FENAMAC, club o escuela de procedencia, tareas y partidas analizadas.</li>
              <li><strong>Datos de Pago:</strong> Procesados de forma encriptada y tokenizada por pasarelas externas seguras (Stripe / PayPal / Bancos). Nosotros <strong>nunca</strong> almacenamos números completos de tarjetas de crédito o CVV en nuestros servidores.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">3.</span> Finalidades del Tratamiento
            </h2>
            <div className="space-y-2">
              <p><strong>Finalidades Primarias (necesarias para el servicio):</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
                <li>Gestión de inscripciones, asignación de grupos y calendarización de clases.</li>
                <li>Habilitación del portal del alumno, revisión de tareas y seguimiento del progreso técnico.</li>
                <li>Procesamiento de pagos, facturación fiscal y cobro de membresías activas.</li>
                <li>Preparación, empaque, logística y envío de pedidos de la tienda con números de rastreo.</li>
              </ul>
              <p className="pt-2"><strong>Finalidades Secundarias (opcionales):</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
                <li>Envío de boletines educativos, artículos de análisis magistral e invitaciones a torneos organizados por la Academia.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">4.</span> Derechos ARCO y Revocación del Consentimiento
            </h2>
            <p>
              Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> (Derechos ARCO) al tratamiento de sus datos personales, así como a revocar el consentimiento otorgado.
            </p>
            <p>
              Para ejercer estos derechos, envíe una solicitud por escrito al correo electrónico <strong className="text-white">privacidad@alekhins.com</strong> indicando su nombre completo, correo registrado y la descripción clara del derecho que desea ejercer. Recibirá respuesta en un plazo no mayor a 15 días hábiles.
            </p>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">5.</span> Transferencia de Datos a Terceros
            </h2>
            <p>
              Sus datos personales no serán vendidos, cedidos ni transferidos a empresas externas para fines publicitarios. Únicamente se comparten con:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
              <li>Empresas de paquetería (FedEx, DHL, Estafeta) con la finalidad exclusiva de realizar la entrega en su domicilio.</li>
              <li>Procesadores de pago certificados para la liquidación de sus transacciones.</li>
              <li>Autoridades competentes únicamente en caso de requerimiento legal expreso.</li>
            </ul>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="p-6 rounded-xl bg-[#121E17] border border-[#2B3E34] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-white">Oficina de Privacidad y Datos Personales</p>
            <p className="text-xs text-[#A8B2A6]">Correo oficial: privacidad@alekhins.com • Ciudad de México</p>
          </div>
          <Link
            href="/legal/terminos"
            className="px-4 py-2 rounded bg-[#1B4D3E] hover:bg-[#226350] text-[#D8B155] text-xs font-bold transition shrink-0"
          >
            Ver Términos y Condiciones →
          </Link>
        </div>
      </div>
    </div>
  );
}
