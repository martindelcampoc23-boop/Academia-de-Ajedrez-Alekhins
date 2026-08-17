import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/providers/CartProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CookieManager } from '@/components/ui/CookieManager';

export const metadata: Metadata = {
  title: {
    default: 'Academia de Ajedrez Alekhins | Entrenamiento & Material Profesional',
    template: '%s | Academia de Ajedrez Alekhins',
  },
  description:
    'Academia de ajedrez para niños, jóvenes y adultos. Formación de alto nivel y la mejor tienda especializada en productos de ajedrez. Dirigida por el MI Roberto Martín del Campo.',
  keywords: ['ajedrez', 'clases de ajedrez', 'maestro internacional ajedrez', 'tienda de ajedrez', 'tableros de ajedrez', 'piezas staunton', 'relojes dgt'],
  authors: [{ name: 'MI Roberto Martín del Campo Cárdenas' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://alekhins.com',
    title: 'Academia de Ajedrez Alekhins',
    description: 'Entrenamiento especializado, conocimiento de alto nivel y material seleccionado para jugadores, familias, clubes y escuelas.',
    siteName: 'Academia de Ajedrez Alekhins',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#0B1510', color: '#F6F3EC' }}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <CookieManager />
        </CartProvider>
      </body>
    </html>
  );
}
