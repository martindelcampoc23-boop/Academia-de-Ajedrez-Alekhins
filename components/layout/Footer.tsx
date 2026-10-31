'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube, Twitter, Laptop, ShieldCheck, ExternalLink } from 'lucide-react';
import { playLogoClickSound } from '@/lib/soundEffects';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedMsg('¡Gracias por suscribirte al boletín de Academia Alekhins!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0F1D30] text-[#C4CBD4] border-t border-[#1C3454] pt-16 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C3454]">

        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" onClick={playLogoClickSound} className="inline-block group">
            <img
              src="/alekhins-logo-vector.svg"
              alt="Academia Alekhins"
              className="h-11 md:h-12 w-auto brightness-110 group-hover:brightness-125 transition-all duration-300"
            />
          </Link>

          <p className="text-xs leading-relaxed text-[#9CA3AF] max-w-sm">
            Institución internacional de formación ajedrecística de alto nivel y tienda especializada en material reglamentario. Dirección Académica del MI Roberto Martín del Campo Cárdenas.
          </p>

          <div className="space-y-2 text-xs text-[#FAF8F2]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>contacto@ajedrezprofesional.com • info@alekhins.mx</span>
            </div>
            <a
              href="https://wa.me/529991020078"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#C5A46D] transition"
            >
              <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>+52 999 102 0078 (Atención y Asesoría Oficial)</span>
            </a>
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Ciudad de México • Cobertura Nacional e Internacional</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="https://wa.me/529991020078" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-[#172B46] border border-[#233F65] flex items-center justify-center text-[#FAF8F2] hover:text-[#C5A46D] hover:border-[#C5A46D] transition">
              <Phone className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#172B46] border border-[#233F65] flex items-center justify-center text-[#FAF8F2] hover:text-[#C5A46D] hover:border-[#C5A46D] transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#172B46] border border-[#233F65] flex items-center justify-center text-[#FAF8F2] hover:text-[#C5A46D] hover:border-[#C5A46D] transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#172B46] border border-[#233F65] flex items-center justify-center text-[#FAF8F2] hover:text-[#C5A46D] hover:border-[#C5A46D] transition">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links: La Academia y Formación */}
        <div>
          <h4 className="font-serif-editorial text-white text-xs font-bold tracking-wider uppercase mb-4 pb-2 border-b border-[#1C3454]">
            FORMACIÓN ACADÉMICA
          </h4>
          <ul className="space-y-2 text-xs text-[#9CA3AF]">
            <li><Link href="/" className="hover:text-[#C5A46D] transition">Inicio</Link></li>
            <li><Link href="/la-academia" className="hover:text-[#C5A46D] transition">La Academia</Link></li>
            <li><Link href="/programas" className="hover:text-[#C5A46D] transition">Programas Académicos</Link></li>
            <li><Link href="/clases-personalizadas" className="hover:text-[#C5A46D] transition">Clases Personalizadas</Link></li>
            <li><Link href="/entrenadores" className="hover:text-[#C5A46D] transition">Cuerpo Técnico</Link></li>
            <li><Link href="/clubes-y-escuelas" className="hover:text-[#C5A46D] transition">Escuelas y Clubes</Link></li>
            <li>
              <a
                href="https://chessgora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A46D] transition flex items-center gap-1 font-bold text-[#C5A46D]"
              >
                <span>Aula Virtual Chessgora</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Links: Tienda de Ajedrez */}
        <div>
          <h4 className="font-serif-editorial text-white text-xs font-bold tracking-wider uppercase mb-4 pb-2 border-b border-[#1C3454]">
            TIENDA DE AJEDREZ
          </h4>
          <ul className="space-y-2 text-xs text-[#9CA3AF]">
            <li><Link href="/tienda?categoria=sets" className="hover:text-[#C5A46D] transition">Sets Completos</Link></li>
            <li><Link href="/tienda?categoria=tableros" className="hover:text-[#C5A46D] transition">Tableros de Madera y Vinil</Link></li>
            <li><Link href="/tienda?categoria=piezas" className="hover:text-[#C5A46D] transition">Piezas Staunton</Link></li>
            <li><Link href="/tienda?categoria=relojes" className="hover:text-[#C5A46D] transition">Relojes Digitales FIDE</Link></li>
            <li><Link href="/tienda?categoria=libros" className="hover:text-[#C5A46D] transition">Libros Especializados</Link></li>
            <li><Link href="/tienda?categoria=clubes-y-escuelas" className="hover:text-[#C5A46D] transition">Paquetes Escolares</Link></li>
            <li><Link href="/rastrear-pedido" className="hover:text-[#C5A46D] transition">Rastreo de Envíos</Link></li>
          </ul>
        </div>

        {/* Links: Legal & Plataforma */}
        <div>
          <h4 className="font-serif-editorial text-white text-xs font-bold tracking-wider uppercase mb-4 pb-2 border-b border-[#1C3454]">
            INFORMACIÓN & LEGAL
          </h4>
          <ul className="space-y-2 text-xs text-[#9CA3AF]">
            <li><Link href="/contacto" className="hover:text-[#C5A46D] transition">Atención al Alumno</Link></li>
            <li><Link href="/faq" className="hover:text-[#C5A46D] transition">Preguntas Frecuentes</Link></li>
            <li><Link href="/articulos" className="hover:text-[#C5A46D] transition">Artículos & Blog</Link></li>
            <li><Link href="/legal/terminos" className="hover:text-[#C5A46D] transition">Términos y Condiciones</Link></li>
            <li><Link href="/legal/privacidad" className="hover:text-[#C5A46D] transition">Aviso de Privacidad</Link></li>
            <li><Link href="/legal/envios" className="hover:text-[#C5A46D] transition">Políticas de Envío y Devolución</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
        <p>
          © 2026 Academia Alekhins (ajedrezprofesional.com). Todos los derechos reservados.
        </p>
        <p className="flex items-center gap-1.5 text-[11px]">
          <span>Plataforma tecnológica asociada:</span>
          <a
            href="https://chessgora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A46D] hover:underline font-bold"
          >
            Chessgora.com
          </a>
        </p>
      </div>
    </footer>
  );
}
