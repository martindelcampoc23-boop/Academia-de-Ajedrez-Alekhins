import React from 'react';
import Link from 'next/link';
import { Truck, Package, ShieldCheck, RefreshCw, Clock, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Política de Envíos, Garantías y Devoluciones | Academia Alekhins',
  description: 'Información detallada sobre métodos de envío, tiempos de entrega con FedEx/DHL, empaque seguro y garantías de material de ajedrez.',
};

export default function ShippingReturnsLegalPage() {
  return (
    <div className="bg-[#0B1510] text-[#F6F3EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="border-b border-[#2B3E34] pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/40 border border-[#D8B155]/40 text-[#D8B155] text-xs font-semibold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            Logística & Entregas Seguras
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Política de Envíos y Devoluciones
          </h1>
          <p className="text-sm text-[#A8B2A6]">
            Envíos a todo México con paqueterías líderes y empaque de alta protección para material de ajedrez.
          </p>
        </div>

        {/* 3 Bloques destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#121E17] border border-[#2B3E34] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex items-center justify-center text-[#D8B155]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-base font-bold text-white">Despacho en 24-48h</h3>
            <p className="text-xs text-[#A8B2A6]">Todos los pedidos confirmados se preparan e inspeccionan minuciosamente.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#121E17] border border-[#2B3E34] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex items-center justify-center text-purple-400">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-base font-bold text-white">Rastreo en Tiempo Real</h3>
            <p className="text-xs text-[#A8B2A6]">Recibes tu guía de FedEx, DHL o Estafeta para seguir tu paquete minuto a minuto.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#121E17] border border-[#2B3E34] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-editorial text-base font-bold text-white">Garantía Total 30 Días</h3>
            <p className="text-xs text-[#A8B2A6]">Garantía directa contra defectos de fábrica o piezas faltantes en tu set.</p>
          </div>
        </div>

        {/* Secciones detalladas */}
        <div className="space-y-8 text-xs sm:text-sm text-[#D2DBD0] leading-relaxed">
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">1.</span> Cobertura y Métodos de Envío
            </h2>
            <p>
              Realizamos envíos a <strong>todos los códigos postales de la República Mexicana</strong>. Trabajamos exclusivamente con empresas de paquetería de primer nivel:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A8B2A6]">
              <li><strong className="text-white">Envío Estándar Terrestre (2 a 5 días hábiles):</strong> Ideal para sets de ajedrez reglamentarios, relojes y pedidos para clubes.</li>
              <li><strong className="text-white">Envío Express Aéreo (24 a 48 horas hábiles):</strong> Para entregas urgentes en ciudades principales.</li>
              <li><strong className="text-white">Envío Gratuito:</strong> Aplicable en compras superiores al monto promocional indicado en tienda.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">2.</span> Empaque Seguro para Ajedrez Profesional
            </h2>
            <p>
              Entendemos el valor de cada pieza, tablero y reloj electrónico DGT. Por ello, todos nuestros productos son empacados con:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
              <li>Cajas de cartón corrugado de alta resistencia.</li>
              <li>Plástico de burbuja multicapa y material amortiguador en las esquinas.</li>
              <li>Protección individual para displays de relojes digitales.</li>
              <li>Cintas de seguridad inviolables con sello de la Academia.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">3.</span> Política de Devoluciones y Reemplazos
            </h2>
            <p>
              Si recibes un producto con algún inconveniente, tienes <strong>30 días naturales</strong> desde la recepción para solicitar un cambio o reembolso:
            </p>
            <div className="space-y-2 pt-2 text-[#A8B2A6]">
              <p><strong className="text-white">A. Pieza Faltante o Defecto de Fábrica:</strong> Te enviamos la pieza de repuesto o el producto nuevo de inmediato sin costo adicional de envío.</p>
              <p><strong className="text-white">B. Cambio por Satisfacción:</strong> Si deseas cambiar el color del tablero o el modelo de reloj, el producto debe encontrarse sin uso, en su empaque original con todos sus accesorios.</p>
              <p><strong className="text-white">C. Proceso Rápido:</strong> Escribe a <strong className="text-white">soporte@alekhins.com</strong> con tu número de pedido y fotos del producto. Te responderemos en menos de 24 horas hábiles con la guía de devolución prepagada.</p>
            </div>
          </section>
        </div>

        {/* CTA Rastrear Pedido */}
        <div className="p-8 rounded-xl bg-[#121E17] border border-[#2B3E34] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-editorial text-xl font-bold text-white">¿Ya realizaste una compra?</h3>
            <p className="text-xs text-[#A8B2A6]">Rastrea el estatus de tu guía y entrega en tiempo real.</p>
          </div>
          <Link
            href="/rastrear-pedido"
            className="px-6 py-3 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-xs font-bold uppercase tracking-wider transition shrink-0 shadow-lg"
          >
            Rastrear Mi Pedido →
          </Link>
        </div>
      </div>
    </div>
  );
}
