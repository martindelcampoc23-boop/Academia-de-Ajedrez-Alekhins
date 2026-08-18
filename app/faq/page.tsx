import React from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, BookOpen, ShoppingBag, CreditCard, Laptop, ShieldCheck, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Preguntas Frecuentes (FAQ) | Academia de Ajedrez Alekhins',
  description: 'Respuestas a las preguntas más frecuentes sobre clases de ajedrez, inscripciones, niveles, tienda en línea y métodos de pago.',
};

const FAQ_CATEGORIES = [
  {
    category: 'Clases y Programas de Ajedrez',
    icon: BookOpen,
    questions: [
      {
        q: '¿A partir de qué edad pueden inscribirse los alumnos?',
        a: 'Aceptamos alumnos desde los 5 años de edad en nuestro programa Peones del Futuro (Iniciación). Contamos con metodologías lúdicas y adaptadas para niños pequeños, jóvenes y adultos.',
      },
      {
        q: '¿Qué necesito para tomar las clases en línea?',
        a: 'Solo necesitas una computadora, tablet o smartphone con conexión a internet estable, micrófono y cámara. Las sesiones se imparten a través de salas virtuales seguras con tableros interactivos.',
      },
      {
        q: '¿Cómo sé en qué nivel debo inscribirme o inscribir a mi hijo?',
        a: 'Ofrecemos una clase de evaluación diagnóstica sin costo donde el maestro evalúa el nivel táctico, comprensión de aperturas y cálculo para recomendar el grupo óptimo.',
      },
      {
        q: '¿Las clases quedan grabadas si no puedo asistir?',
        a: '¡Sí! Todas las clases maestras quedan grabadas en alta definición y se suben a la videoteca privada del alumno para repaso ilimitado.',
      },
    ],
  },
  {
    category: 'Tienda, Envíos y Material de Ajedrez',
    icon: ShoppingBag,
    questions: [
      {
        q: '¿Qué paqueterías utilizan y cuánto tardan los envíos?',
        a: 'Enviamos a todo México a través de FedEx, DHL, Estafeta y Redpack. Los pedidos se procesan en 24-48 horas hábiles y el tiempo de entrega habitual es de 2 a 5 días hábiles.',
      },
      {
        q: '¿Los sets de ajedrez cumplen con el reglamento oficial de la FIDE?',
        a: 'Totalmente. Nuestras piezas Staunton tienen las medidas reglamentarias (Rey de 3.75 pulgadas) con peso y balance profesional para torneos oficiales.',
      },
      {
        q: '¿Qué pasa si mi paquete llega dañado o falta una pieza?',
        a: 'Contamos con Garantía Total de 30 días. Si alguna pieza falta o llega dañada, te enviamos el repuesto sin ningún costo adicional de envío.',
      },
    ],
  },
  {
    category: 'Pagos, Facturación y Cancelaciones',
    icon: CreditCard,
    questions: [
      {
        q: '¿Cuáles son los métodos de pago aceptados?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, AMEX), PayPal, transferencias bancarias (SPEI) y depósitos en OXXO.',
      },
      {
        q: '¿Puedo cancelar mi mensualidad en cualquier momento?',
        a: 'Sí, las membresías no tienen plazos forzosos. Puedes cancelar en cualquier momento desde tu panel de usuario en 1-clic sin penalizaciones.',
      },
      {
        q: '¿Emiten factura fiscal (CFDI) en México?',
        a: 'Sí, emitimos factura fiscal para todas las colegiaturas y compras de material. Puedes solicitarla enviando tus datos fiscales a facturacion@alekhins.com.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-[#0B1510] text-[#F6F3EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/40 border border-[#D8B155]/40 text-[#D8B155] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Centro de Ayuda
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Preguntas Frecuentes
          </h1>
          <p className="text-sm text-[#A8B2A6]">
            Encuentra respuestas rápidas a las dudas más comunes sobre la academia, clases, tienda y métodos de pago.
          </p>
        </div>

        {/* Categories & Questions */}
        <div className="space-y-10">
          {FAQ_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2.5 text-lg font-serif-editorial font-bold text-[#D8B155] border-b border-[#2B3E34] pb-2">
                  <Icon className="w-5 h-5 text-[#D8B155]" />
                  <h2>{cat.category}</h2>
                </div>

                <div className="space-y-3">
                  {cat.questions.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-2">
                      <h3 className="font-serif-editorial text-base font-bold text-white flex items-start gap-2">
                        <span className="text-[#D8B155] font-sans text-sm mt-0.5">Q.</span>
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D2DBD0] pl-6 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-[#121E17] via-[#1A3D2B] to-[#121E17] border border-[#D8B155]/40 text-center space-y-4">
          <h3 className="font-serif-editorial text-2xl font-bold text-white">¿No encontraste lo que buscabas?</h3>
          <p className="text-xs text-[#D2DBD0] max-w-md mx-auto">
            Escríbenos directamente por WhatsApp o correo electrónico y un asesor te atenderá al instante.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/clubes-y-escuelas"
              className="px-6 py-3 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-xs font-bold uppercase tracking-wider transition shadow-lg"
            >
              Contactar por Formulario →
            </Link>
            <a
              href="https://wa.me/525512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 text-xs font-bold uppercase tracking-wider transition"
            >
              WhatsApp Directo 💬
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
