import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/providers/CartProvider';
import { LocaleCurrencyProvider } from '@/components/providers/LocaleCurrencyProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CookieManager } from '@/components/ui/CookieManager';
import AuthProvider from '@/components/providers/AuthProvider';
import { buildOrganizationLD, buildWebSiteLD } from '@/lib/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ajedrezprofesional.com'),
  title: {
    default: 'Academia Alekhins | Institución Internacional de Ajedrez & Formación Profesional',
    template: '%s | Academia Alekhins',
  },
  description:
    'Academia Alekhins: institución de excelencia en formación de ajedrez para niños, jóvenes y competidores de alto rendimiento. Dirección académica del MI Roberto Martín del Campo Cárdenas. Tienda especializada y aula virtual Chessgora.',
  keywords: [
    'academia alekhins',
    'clases de ajedrez',
    'ajedrez profesional',
    'entrenamiento de ajedrez',
    'maestro internacional roberto martin del campo',
    'chessgora',
    'clases de ajedrez online',
    'tienda de ajedrez mexico',
    'tableros y relojes de ajedrez',
  ],
  authors: [{ name: 'MI Roberto Martín del Campo Cárdenas' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.ajedrezprofesional.com',
    title: 'Academia Alekhins | Institución Internacional de Ajedrez',
    description:
      'Formación ajedrecística de alto nivel, entrenamiento individual y grupal, equipamiento profesional e integración con el ecosistema tecnológico Chessgora.',
    siteName: 'Academia Alekhins',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academia Alekhins',
    description: 'Formación de ajedrez de alto nivel bajo la dirección del MI Roberto Martín del Campo.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLD = buildOrganizationLD();
  const websiteLD = buildWebSiteLD();

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLD) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0F1D30] text-[#FAF8F2] selection:bg-[#C5A46D] selection:text-[#0F1D30]">
        <AuthProvider>
          <LocaleCurrencyProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
              <CookieManager />
            </CartProvider>
          </LocaleCurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
