/**
 * lib/email.ts
 * Servicio centralizado de correos transaccionales e informativos para Academia Alekhins.
 * Soporta Resend API y registro estructurado en modo desarrollo.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ajedrezprofesional.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Academia de Ajedrez Alekhins <contacto@ajedrezprofesional.com>';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!to) {
      return { success: false, error: 'Destinatario no especificado' };
    }

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [to],
          subject,
          html,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.warn(`⚠️ [EmailService] Resend API respondió con error:`, data);
        return { success: false, error: data.message || 'Error en servicio de correo' };
      }

      console.info(`📧 [EmailService] Correo enviado exitosamente a ${to} (ID: ${data.id})`);
      return { success: true, id: data.id };
    } else {
      // Modo desarrollo / sin API key de Resend: loguear en consola
      console.info(`📬 [EmailService:DEV] Correo simulado a "${to}" | Asunto: "${subject}"`);
      return { success: true, id: `dev_mock_${Date.now()}` };
    }
  } catch (error: any) {
    console.error(`❌ [EmailService] Excepción al enviar correo a ${to}:`, error);
    return { success: false, error: error.message || 'Error de conexión con servicio de correo' };
  }
}

// ─── Plantilla Base Alekhins ──────────────────────────────────────────────────
function baseEmailTemplate(contentHtml: string): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Academia de Ajedrez Alekhins</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0B1510; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #F6F3EC;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #0B1510; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #121E17; border-radius: 16px; border: 1px solid #2B3E34; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
              
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 32px 24px 20px 24px; border-bottom: 1px solid #2B3E34; background: linear-gradient(180deg, #1B4D3E 0%, #121E17 100%);">
                  <span style="display: block; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #C8AA6E; font-weight: bold; margin-bottom: 8px;">
                    Portal Oficial de Ajedrez
                  </span>
                  <h1 style="margin: 0; font-size: 24px; color: #F6F3EC; font-family: Georgia, serif; font-weight: normal;">
                    Academia de Ajedrez Alekhins
                  </h1>
                  <span style="display: block; font-size: 12px; color: #A8B2A6; margin-top: 4px;">
                    Dirección Técnica: MI Roberto Abel Martín del Campo
                  </span>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 32px 28px;">
                  ${contentHtml}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 24px; background-color: #0E1813; border-top: 1px solid #2B3E34; font-size: 11px; color: #6E7D73; line-height: 1.6;">
                  <p style="margin: 0 0 8px 0;">
                    © ${new Date().getFullYear()} Academia de Ajedrez Alekhins. Todos los derechos reservados.
                  </p>
                  <p style="margin: 0;">
                    <a href="${SITE_URL}" style="color: #C8AA6E; text-decoration: none;">Visitar Sitio Web</a> • 
                    <a href="${SITE_URL}/tienda" style="color: #C8AA6E; text-decoration: none;">Tienda</a> • 
                    <a href="${SITE_URL}/contacto" style="color: #C8AA6E; text-decoration: none;">Contacto</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ─── 1. Correo de Bienvenida / Registro ─────────────────────────────────────────
export async function sendWelcomeEmail(to: string, name: string) {
  const content = `
    <h2 style="color: #C8AA6E; font-size: 20px; margin-top: 0; margin-bottom: 16px; font-family: Georgia, serif;">
      ¡Te damos la bienvenida a la Academia, ${name}!
    </h2>
    <p style="font-size: 14px; line-height: 1.7; color: #D2DBD0;">
      Es un gran honor recibirte en nuestra comunidad de ajedrez. Tu cuenta ha sido creada exitosamente y ahora tienes acceso a nuestro ecosistema de entrenamiento y material oficial.
    </p>
    
    <div style="background-color: #0B1510; border: 1px solid #2B3E34; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <h3 style="color: #F6F3EC; font-size: 14px; margin-top: 0; margin-bottom: 12px;">Lo que puedes hacer ahora:</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #A8B2A6; line-height: 1.8;">
        <li>Explorar nuestros <strong style="color: #C8AA6E;">Planes de Entrenamiento</strong> para todos los niveles.</li>
        <li>Consultar la <strong style="color: #C8AA6E;">Videoteca Magistral</strong> con análisis del Maestro Internacional.</li>
        <li>Adquirir relojes DGT, tableros y libros oficiales en la <strong style="color: #C8AA6E;">Tienda de Ajedrez</strong>.</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 32px 0 16px 0;">
      <a href="${SITE_URL}/mi-cuenta" style="background-color: #C8AA6E; color: #0B1510; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; display: inline-block;">
        Ir a Mi Panel de Usuario
      </a>
    </div>
  `;

  return sendEmail({
    to,
    subject: '¡Bienvenido a la Academia de Ajedrez Alekhins!',
    html: baseEmailTemplate(content),
  });
}

// ─── 2. Correo de Confirmación de Pedido ────────────────────────────────────────
export async function sendOrderConfirmationEmail(params: {
  to: string;
  orderNumber: string;
  customerName: string;
  items: { productName: string; variantName?: string | null; quantity: number; unitPrice: number; totalPrice: number }[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: string;
}) {
  const { to, orderNumber, customerName, items, subtotal, shippingCost, discountAmount, totalAmount } = params;

  let itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #1B3028; font-size: 13px; color: #F6F3EC;">
          <strong>${item.quantity}x</strong> ${item.productName} ${item.variantName ? `(${item.variantName})` : ''}
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #1B3028; font-size: 13px; color: #C8AA6E; font-weight: bold;">
          $${item.totalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
        </td>
      </tr>
    `
    )
    .join('');

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="background-color: #1B4D3E; color: #C8AA6E; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; border: 1px solid #2B3E34;">
        Pago Confirmado
      </span>
      <h2 style="color: #F6F3EC; font-size: 22px; margin: 12px 0 4px 0; font-family: Georgia, serif;">
        ¡Gracias por tu compra, ${customerName}!
      </h2>
      <p style="font-size: 13px; color: #A8B2A6; margin: 0;">
        Número de Pedido: <strong style="color: #C8AA6E; font-family: monospace;">${orderNumber}</strong>
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #D2DBD0;">
      Hemos recibido tu pedido correctamente. Nuestro equipo ya está preparando tu material de ajedrez en almacén para su envío seguro.
    </p>

    <!-- Resumen de Artículos -->
    <div style="background-color: #0B1510; border: 1px solid #2B3E34; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <h3 style="color: #C8AA6E; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid #2B3E34; pb: 8px;">
        Desglose de Artículos
      </h3>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        ${itemsHtml}
      </table>

      <!-- Totales -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 16px; font-size: 13px;">
        <tr>
          <td style="padding: 4px 0; color: #A8B2A6;">Subtotal:</td>
          <td align="right" style="padding: 4px 0; color: #F6F3EC;">$${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</td>
        </tr>
        ${
          discountAmount > 0
            ? `
          <tr>
            <td style="padding: 4px 0; color: #10B981;">Descuento cupón:</td>
            <td align="right" style="padding: 4px 0; color: #10B981;">-$${discountAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</td>
          </tr>
        `
            : ''
        }
        <tr>
          <td style="padding: 4px 0; color: #A8B2A6;">Costo de Envío:</td>
          <td align="right" style="padding: 4px 0; color: #F6F3EC;">${shippingCost === 0 ? '<strong style="color: #10B981;">GRATIS</strong>' : `$${shippingCost.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 0 0; font-size: 15px; font-weight: bold; color: #F6F3EC; border-top: 1px solid #2B3E34;">Total Pagado:</td>
          <td align="right" style="padding: 12px 0 0 0; font-size: 16px; font-weight: bold; color: #C8AA6E; border-top: 1px solid #2B3E34;">$${totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 32px 0 16px 0;">
      <a href="${SITE_URL}/rastrear-pedido" style="background-color: #C8AA6E; color: #0B1510; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; display: inline-block;">
        Rastrear mi Pedido en Tiempo Real
      </a>
    </div>
  `;

  return sendEmail({
    to,
    subject: `Confirmación de Pedido #${orderNumber} — Academia Alekhins`,
    html: baseEmailTemplate(content),
  });
}

// ─── 3. Correo de Confirmación de Contacto / Lead ──────────────────────────────
export async function sendContactConfirmationEmail(to: string, name: string) {
  const content = `
    <h2 style="color: #C8AA6E; font-size: 20px; margin-top: 0; margin-bottom: 16px; font-family: Georgia, serif;">
      ¡Hola ${name}, recibimos tu mensaje!
    </h2>
    <p style="font-size: 14px; line-height: 1.7; color: #D2DBD0;">
      Muchas gracias por comunicarte con la Academia de Ajedrez Alekhins. Tu solicitud ya ha sido canalizada con nuestro equipo pedagógico y de admisiones.
    </p>
    <p style="font-size: 14px; line-height: 1.7; color: #D2DBD0;">
      Un asesor se pondrá en contacto contigo en un plazo no mayor a 24 horas hábiles por correo o teléfono para resolver todas tus dudas y orientarte en el mejor plan para ti.
    </p>
    
    <div style="text-align: center; margin: 28px 0 12px 0;">
      <a href="${SITE_URL}/entrenamiento" style="background-color: #1B4D3E; color: #C8AA6E; border: 1px solid #C8AA6E; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; display: inline-block;">
        Ver Planes de Entrenamiento
      </a>
    </div>
  `;

  return sendEmail({
    to,
    subject: 'Hemos recibido tu mensaje — Academia de Ajedrez Alekhins',
    html: baseEmailTemplate(content),
  });
}
