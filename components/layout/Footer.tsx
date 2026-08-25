'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedMsg('¡Gracias por suscribirte!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B1510] text-gray-300 border-t border-[#1C3328] pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C3328]">

        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-[#D8B155] bg-[#0F2E1E] flex items-center justify-center text-[#D8B155] shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#D8B155] uppercase font-bold block leading-none">
                ACADEMIA DE AJEDREZ
              </span>
              <span className="font-serif-editorial text-xl font-bold tracking-wider text-white block leading-tight">
                ALEKHINS
              </span>
            </div>
          </Link>

          <p className="text-xs leading-relaxed text-gray-400 max-w-xs">
            Academia de ajedrez de alto nivel y la mejor tienda especializada en productos de ajedrez. Dirigida por el MI Roberto Martín del Campo Cárdenas.
          </p>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D8B155] shrink-0" />
              <span>info@alekhins.mx</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D8B155] shrink-0" />
              <span>+52 55 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D8B155] shrink-0" />
              <span>Ciudad de México</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#13221B] border border-[#1C3328] flex items-center justify-center text-gray-300 hover:text-[#D8B155] hover:border-[#D8B155] transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#13221B] border border-[#1C3328] flex items-center justify-center text-gray-300 hover:text-[#D8B155] hover:border-[#D8B155] transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#13221B] border border-[#1C3328] flex items-center justify-center text-gray-300 hover:text-[#D8B155] hover:border-[#D8B155] transition">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter / X" className="w-8 h-8 rounded-full bg-[#13221B] border border-[#1C3328] flex items-center justify-center text-gray-300 hover:text-[#D8B155] hover:border-[#D8B155] transition">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links: Inicio */}
        <div>
          <h4 className="font-serif-editorial text-white text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b border-[#1C3328]">
            ENLACES RÁPIDOS
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link href="/" className="hover:text-[#D8B155] transition">Inicio</Link></li>
            <li><Link href="/entrenamiento" className="hover:text-[#D8B155] transition">Clases</Link></li>
            <li><Link href="/tienda" className="hover:text-[#D8B155] transition">Tienda</Link></li>
            <li><Link href="/roberto-martin-del-campo" className="hover:text-[#D8B155] transition">Nosotros</Link></li>
            <li><Link href="/clubes-y-escuelas" className="hover:text-[#D8B155] transition">Escuelas y Colegios</Link></li>
            <li><Link href="/contacto" className="hover:text-[#D8B155] transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Links: Tienda */}
        <div>
          <h4 className="font-serif-editorial text-white text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b border-[#1C3328]">
            TIENDA
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link href="/tienda?categoria=sets" className="hover:text-[#D8B155] transition">Tableros</Link></li>
            <li><Link href="/tienda?categoria=piezas" className="hover:text-[#D8B155] transition">Piezas</Link></li>
            <li><Link href="/tienda?categoria=relojes" className="hover:text-[#D8B155] transition">Relojes</Link></li>
            <li><Link href="/tienda?categoria=libros" className="hover:text-[#D8B155] transition">Libros</Link></li>
            <li><Link href="/tienda?categoria=sets" className="hover:text-[#D8B155] transition">Accesorios</Link></li>
            <li><Link href="/clubes-y-escuelas" className="hover:text-[#D8B155] transition">Cotizaciones</Link></li>
          </ul>
        </div>

        {/* Links: Información + Métodos de Pago */}
        <div className="space-y-8">
          <div>
            <h4 className="font-serif-editorial text-white text-sm font-bold tracking-wider uppercase mb-5 pb-2 border-b border-[#1C3328]">
              INFORMACIÓN
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link href="/faq" className="hover:text-[#D8B155] transition">Preguntas frecuentes</Link></li>
              <li><Link href="/legal/envios" className="hover:text-[#D8B155] transition">Envíos y devoluciones</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-[#D8B155] transition">Métodos de pago</Link></li>
              <li><Link href="/tienda" className="hover:text-[#D8B155] transition">Guía de tallas</Link></li>
              <li><Link href="/legal/terminos" className="hover:text-[#D8B155] transition">Garantías</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-serif-editorial text-white text-xs font-bold tracking-wider uppercase mb-3">
              MÉTODOS DE PAGO
            </h4>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">VISA</span>
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">Mastercard</span>
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">AMEX</span>
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">PayPal</span>
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">OXXO</span>
              <span className="bg-[#13221B] border border-[#1C3328] text-gray-300 font-bold px-2.5 py-1 rounded">SPEI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 Academia de Ajedrez Alekhins. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <Link href="/legal/terminos" className="hover:text-[#D8B155] transition">Términos y condiciones</Link>
          <span className="text-[#1C3328]">|</span>
          <Link href="/legal/privacidad" className="hover:text-[#D8B155] transition">Política de privacidad</Link>
          <span className="text-[#1C3328]">|</span>
          <Link href="/legal/cookies" className="hover:text-[#D8B155] transition">Aviso legal</Link>
        </div>
      </div>
    </footer>
  );
}
