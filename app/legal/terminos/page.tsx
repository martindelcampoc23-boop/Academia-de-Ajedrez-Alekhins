import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertCircle, HelpCircle, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones de Uso | Academia de Ajedrez Alekhins',
  description: 'Términos y condiciones legales que regulan los servicios educativos de ajedrez, membresías, clases en vivo y tienda en línea de la Academia Alekhins.',
};

export default function TermsLegalPage() {
  return (
    <div className="bg-[#0B1510] text-[#F6F3EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="border-b border-[#2B3E34] pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3E]/40 border border-[#D8B155]/40 text-[#D8B155] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Marco Legal y Comercial
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-[#A8B2A6]">
            Última actualización: 18 de Agosto de 2026 • Válido para México y usuarios internacionales.
          </p>
        </div>

        {/* Resumen Clave */}
        <div className="p-6 rounded-xl bg-[#121E17] border border-[#2B3E34] space-y-4">
          <h3 className="font-serif-editorial text-lg font-bold text-[#D8B155] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D8B155]" />
            Compromiso de Transparencia Alekhins
          </h3>
          <p className="text-xs text-[#D2DBD0] leading-relaxed">
            Al acceder, navegar o utilizar la plataforma web de la <strong>Academia de Ajedrez Alekhins</strong> (en adelante, &quot;la Academia&quot;), contratar planes de entrenamiento, inscribirte a cursos o adquirir material en nuestra tienda en línea, aceptas de forma libre y expresa quedar legalmente vinculado a los presentes Términos y Condiciones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs space-y-1">
              <span className="font-bold text-white block">♟️ Formación de Alto Nivel</span>
              <span className="text-[#A8B2A6]">Clases dirigidas por el MI Roberto Martín del Campo y su equipo técnico.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs space-y-1">
              <span className="font-bold text-white block">📦 Tienda Segura</span>
              <span className="text-[#A8B2A6]">Envíos asegurados con guía de rastreo y piezas reglamentarias.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs space-y-1">
              <span className="font-bold text-white block">🔒 Cancelación Libre</span>
              <span className="text-[#A8B2A6]">Cancela tus suscripciones mensuales cuando quieras sin penalización.</span>
            </div>
          </div>
        </div>

        {/* Contenido Extenso y Estructurado */}
        <div className="space-y-10 text-xs sm:text-sm text-[#D2DBD0] leading-relaxed">
          {/* Sección 1 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">1.</span> Identidad del Prestador del Servicio
            </h2>
            <p>
              La plataforma <strong>alekhins.com</strong> y sus servicios asociados son operados por la Academia de Ajedrez Alekhins, fundada y dirigida por el Maestro Internacional <strong>Roberto Martín del Campo Cárdenas</strong>, con domicilio en la Ciudad de México, México.
            </p>
            <p>
              Para cualquier notificación legal, aclaración, factura o soporte, los canales oficiales de contacto son:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#A8B2A6]">
              <li>Correo electrónico general: <strong className="text-white">contacto@alekhins.com</strong></li>
              <li>Atención a alumnos y tienda: <strong className="text-white">soporte@alekhins.com</strong></li>
              <li>Línea directa y WhatsApp: <strong className="text-white">+52 55 1234 5678</strong></li>
            </ul>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">2.</span> Servicios Educativos y Formatos de Clase
            </h2>
            <p>
              La Academia ofrece capacitación teórica, táctica y estratégica de ajedrez bajo las siguientes modalidades:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#D2DBD0]">
              <li>
                <strong>Clases Grupales en Vivo:</strong> Sesiones calendarizadas a través de salas virtuales seguras (Zoom / Google Meet) con cupos limitados para garantizar atención personalizada.
              </li>
              <li>
                <strong>Entrenamiento Individualizado (Mentoría 1 a 1):</strong> Sesiones privadas con análisis de repertorio personal, partidas de torneo y preparación psicológica de competencia.
              </li>
              <li>
                <strong>Portal del Alumno y Tareas Escolares:</strong> Plataforma digital interactiva donde los alumnos reciben ejercicios con posiciones FEN/PGN, entregan soluciones y reciben retroalimentación calificada por sus maestros.
              </li>
              <li>
                <strong>Videoteca y Material de Estudio:</strong> Acceso a grabaciones de clases magistrales, archivos PGN de aperturas y bases de datos exclusivas según el plan contratado.
              </li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">3.</span> Membresías, Pagos y Facturación
            </h2>
            <p>
              Todos los precios listados en el sitio web están expresados en <strong>pesos mexicanos (MXN)</strong> e incluyen los impuestos aplicables conforme a la legislación fiscal vigente en México.
            </p>
            <div className="space-y-2 pt-2">
              <p><strong>A. Métodos de Pago Aceptados:</strong> Procesamos pagos mediante pasarelas certificadas y encriptadas con tecnología SSL/TLS, aceptando tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias (SPEI), depósitos en tiendas de conveniencia y PayPal.</p>
              <p><strong>B. Facturación CFDI:</strong> Si requieres factura fiscal de tu colegiatura o compra física, podrás solicitarla dentro del mismo mes calendario de tu pago enviando tu constancia de situación fiscal al correo <strong className="text-white">facturacion@alekhins.com</strong>.</p>
              <p><strong>C. Renovaciones Automáticas:</strong> Las membresías con cargo recurrente mensual se renuevan en la fecha correspondiente a cada ciclo hasta que el usuario decida suspender o cancelar el servicio.</p>
            </div>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">4.</span> Cancelación de Suscripciones y Política de Prórrogas
            </h2>
            <p>
              En la Academia de Ajedrez Alekhins creemos en la libertad de nuestros alumnos:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#D2DBD0]">
              <li>
                <strong>Cancelación en 1-Clic:</strong> Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario en <Link href="/mi-cuenta/suscripciones" className="text-[#D8B155] underline">Mi Cuenta → Gestión de Suscripciones</Link> sin trámites complicados ni cargos por cancelación.
              </li>
              <li>
                <strong>Disfrute del Periodo Pagado:</strong> Al cancelar, mantendrás acceso completo a tus clases, videoteca y plataforma hasta el último día de tu ciclo de facturación pagado.
              </li>
              <li>
                <strong>Prórrogas por Viaje o Torneo:</strong> Si vas a ausentarte por competencias oficiales o motivos de fuerza mayor, puedes solicitar la congelación temporal de tu mensualidad notificando con 5 días hábiles de anticipación.
              </li>
            </ul>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">5.</span> Tienda en Línea: Pedidos, Envíos y Garantías
            </h2>
            <p>
              Comercializamos material de ajedrez reglamentario, tableros de vinil y madera fina, relojes digitales DGT originales, piezas Staunton ponderadas, bolsas transportadoras y bibliografía especializada.
            </p>
            <div className="space-y-2 pt-2">
              <p><strong>A. Cobertura y Paqueterías:</strong> Enviamos a toda la República Mexicana mediante convenios con <strong>FedEx, DHL, Estafeta y Redpack</strong>. Todos los envíos cuentan con número de guía rastreable en tiempo real.</p>
              <p><strong>B. Tiempos de Entrega:</strong> Los pedidos son preparados y despachados en un plazo de 24 a 48 horas hábiles posteriores a la confirmación del pago. El tiempo de tránsito habitual es de 2 a 5 días hábiles para envíos estándar y de 24 a 48 horas para envío express.</p>
              <p><strong>C. Garantía de Daño en Tránsito:</strong> Si tu paquete llega con daños visibles provocados por la paquetería, deberás tomar fotografías del empaque y del producto y reportarlo en un plazo máximo de 48 horas tras la entrega a <strong className="text-white">envios@alekhins.com</strong> para hacer válido el reemplazo sin costo adicional.</p>
            </div>
          </section>

          {/* Sección 6 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">6.</span> Propiedad Intelectual y Material Didáctico
            </h2>
            <p>
              Todos los contenidos didácticos, bases de datos PGN, metodologías de entrenamiento, análisis de aperturas, videos, audios, logotipos, marcas comerciales y textos son propiedad exclusiva de la <strong>Academia de Ajedrez Alekhins</strong> y del <strong>MI Roberto Martín del Campo</strong>, amparados bajo la Ley Federal del Derecho de Autor y tratados internacionales.
            </p>
            <p className="text-amber-300/90 font-medium">
              ⚠️ Queda estrictamente prohibida la reproducción, distribución masiva, reventa, retransmisión o publicación no autorizada de las clases grabadas, materiales descargables o claves de acceso sin consentimiento previo y por escrito.
            </p>
          </section>

          {/* Sección 7 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">7.</span> Código de Conducta y Ética Deportiva
            </h2>
            <p>
              El ajedrez es el deporte de caballeros y damas. En la Academia promovemos el respeto mutuo, la sana competencia y los valores olímpicos:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#D2DBD0]">
              <li>Respeto irrestricto hacia compañeros, entrenadores, árbitros y rivales tanto en clases virtuales como en torneos presenciales.</li>
              <li>Tolerancia cero al uso de asistencia externa por motores de ajedrez (fair-play y juego limpio en torneos online).</li>
              <li>Puntualidad en las sesiones en vivo y participación activa con cámara encendida para enriquecer la dinámica pedagógica.</li>
            </ul>
          </section>

          {/* Sección 8 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">8.</span> Protección a Menores de Edad
            </h2>
            <p>
              Dado que gran parte de nuestra comunidad estudiantil está conformada por niños y jóvenes en formación, la contratación de planes para menores de 18 años debe ser realizada o autorizada por el padre, madre o tutor legal. Garantizamos un entorno virtual seguro, monitoreado y con estrictos protocolos de privacidad.
            </p>
          </section>

          {/* Sección 9 */}
          <section className="space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
            <h2 className="font-serif-editorial text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#D8B155]">9.</span> Legislación Aplicable y Jurisdicción
            </h2>
            <p>
              Para la interpretación, cumplimiento y resolución de cualquier controversia derivada del uso del sitio web o de los servicios contratados, las partes se someten expresamente a las leyes aplicables de los <strong>Estados Unidos Mexicanos</strong> y a la jurisdicción de los tribunales competentes de la <strong>Ciudad de México</strong>, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>
          </section>
        </div>

        {/* Footer Contact Box */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-[#121E17] via-[#1A3D2B] to-[#121E17] border border-[#D8B155]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-xl font-bold text-white">¿Tienes dudas sobre nuestros términos?</h3>
            <p className="text-xs text-[#D2DBD0]">Nuestro equipo administrativo está listo para atenderte personalmente.</p>
          </div>
          <Link
            href="/clubes-y-escuelas"
            className="px-6 py-3 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-xs font-bold uppercase tracking-wider transition shadow-lg shrink-0"
          >
            Contactar Soporte →
          </Link>
        </div>
      </div>
    </div>
  );
}
