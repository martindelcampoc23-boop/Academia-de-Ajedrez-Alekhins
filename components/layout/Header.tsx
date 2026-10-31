'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/components/providers/CartProvider';
import { useLocaleCurrency } from '@/components/providers/LocaleCurrencyProvider';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import { playLogoClickSound } from '@/lib/soundEffects';
import {
  ShoppingBag,
  Search,
  User,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Laptop,
  Globe,
  ExternalLink,
  ShieldCheck,
  Package,
  BookOpen
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cart, setIsOpen: setCartOpen } = useCart();
  const { currency, setCurrency, locale, setLocale } = useLocaleCurrency();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const user = session?.user;
  const role = (user as any)?.role || 'CUSTOMER';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#172B46] border-b border-[#233F65] text-[#FAF8F2] shadow-xl">
        {/* Top Utility Bar: Dominio, Moneda, Idioma, Aula Virtual */}
        <div className="bg-[#0F1D30] border-b border-[#1C3454] text-[11px] text-[#C4CBD4] py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold tracking-wider text-[#C5A46D] uppercase">
                ACADEMIA ALEKHINS
              </span>
              <span className="text-[#4B5563]">|</span>
              <span>Director Académico: MI Roberto Martín del Campo Cárdenas</span>
              <span className="text-[#4B5563]">|</span>
              <span className="text-[#9CA3AF]">ajedrezprofesional.com</span>
            </div>

            <div className="flex items-center gap-5 font-medium">
              {/* Selector de Moneda */}
              <div className="flex items-center gap-1.5 bg-[#172B46] px-2 py-0.5 rounded border border-[#233F65]">
                <span className="text-[10px] text-[#9CA3AF]">Moneda:</span>
                <button
                  onClick={() => setCurrency('MXN')}
                  className={`px-1.5 py-0.5 rounded transition ${
                    currency === 'MXN' ? 'bg-[#C5A46D] text-[#0F1D30] font-bold' : 'hover:text-white'
                  }`}
                >
                  MXN ($)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-1.5 py-0.5 rounded transition ${
                    currency === 'USD' ? 'bg-[#C5A46D] text-[#0F1D30] font-bold' : 'hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
              </div>

              {/* Selector de Idioma */}
              <div className="flex items-center gap-1.5 bg-[#172B46] px-2 py-0.5 rounded border border-[#233F65]">
                <Globe className="w-3 h-3 text-[#C5A46D]" />
                <button
                  onClick={() => setLocale('es')}
                  className={`px-1 py-0.5 rounded transition ${
                    locale === 'es' ? 'text-[#C5A46D] font-bold' : 'hover:text-white'
                  }`}
                >
                  ES
                </button>
                <span className="text-[#4B5563]">/</span>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-1 py-0.5 rounded transition ${
                    locale === 'en' ? 'text-[#C5A46D] font-bold' : 'hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Acceso Directo Aula Virtual Chessgora */}
              <a
                href="https://chessgora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#C5A46D] hover:text-[#D4B785] transition font-bold"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Aula Virtual Chessgora</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Original de Academia Alekhins */}
          <Link href="/" onClick={playLogoClickSound} className="flex items-center group">
            <img
              src="/alekhins-logo-vector.svg"
              alt="Academia Alekhins"
              className="h-11 sm:h-12 md:h-14 w-auto brightness-110 group-hover:brightness-125 transition-all duration-300"
            />
          </Link>

          {/* Menú Principal Desktop (11 puntos institucionales) */}
          <nav className="hidden xl:flex items-center gap-5 text-[11px] lg:text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname === '/' ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]' : 'text-[#FAF8F2]'
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/la-academia"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/la-academia') || pathname.startsWith('/roberto-martin-del-campo')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              La Academia
            </Link>

            <Link
              href="/programas"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/programas') || pathname.startsWith('/entrenamiento')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Programas
            </Link>

            <Link
              href="/clases-personalizadas"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/clases-personalizadas')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Clases Personalizadas
            </Link>

            <Link
              href="/entrenadores"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/entrenadores')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Entrenadores
            </Link>

            <Link
              href="/tienda"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/tienda')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Tienda
            </Link>

            <Link
              href="/clubes-y-escuelas"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname === '/clubes-y-escuelas'
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Escuelas y Clubes
            </Link>

            <Link
              href="/articulos"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname.startsWith('/articulos')
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contacto"
              className={`py-2 transition hover:text-[#C5A46D] ${
                pathname === '/contacto'
                  ? 'text-[#C5A46D] font-bold border-b-2 border-[#C5A46D]'
                  : 'text-[#E5DFD1]'
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Right Action Icons: Search, Aula Virtual Pill, User, Cart */}
          <div className="flex items-center gap-3">
            {/* Acceso a Aula Virtual (Visible en Desktop & Tablet) */}
            <a
              href="https://chessgora.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0F1D30] border border-[#C5A46D]/60 text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F1D30] transition text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Aula Virtual</span>
            </a>

            {/* Búsqueda */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar en la plataforma"
              className="p-2 text-[#C4CBD4] hover:text-[#C5A46D] transition cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Carrito de Compras */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Carrito de compras"
              className="relative p-2 text-[#C4CBD4] hover:text-[#C5A46D] transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A46D] text-[#0F1D30] text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menú Usuario / Cuenta */}
            <div className="relative" ref={dropdownRef}>
              {session?.user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-[#1C3454] transition text-xs font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0F1D30] border border-[#C5A46D] flex items-center justify-center text-[#C5A46D] font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-[#C4CBD4] hover:text-[#C5A46D] transition inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && session?.user && (
                <div className="absolute right-0 mt-2 w-52 bg-[#0F1D30] border border-[#233F65] rounded-xl shadow-2xl py-2 z-50 text-xs text-[#FAF8F2]">
                  <div className="px-4 py-2 border-b border-[#1C3454]">
                    <p className="font-bold text-white truncate">{user?.name}</p>
                    <p className="text-[11px] text-[#9CA3AF] truncate">{user?.email}</p>
                  </div>

                  <Link
                    href="/mi-cuenta"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#172B46] hover:text-[#C5A46D] transition"
                  >
                    <User className="w-4 h-4 text-[#C5A46D]" />
                    <span>Mi Cuenta & Suscripciones</span>
                  </Link>

                  {(role === 'SUPERADMIN' || role === 'ADMIN' || role === 'COACH') && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#172B46] text-[#C5A46D] font-semibold transition"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Panel Administrativo</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-[#172B46] transition border-t border-[#1C3454] mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#C4CBD4] hover:text-[#C5A46D] transition"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0F1D30] border-t border-[#1C3454] px-4 py-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3454] text-xs">
              <span className="text-[#C5A46D] font-bold">AJEDREZPROFESIONAL.COM</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrency(currency === 'MXN' ? 'USD' : 'MXN')}
                  className="px-2 py-0.5 rounded bg-[#172B46] text-[#FAF8F2] border border-[#233F65] font-bold"
                >
                  {currency}
                </button>
                <button
                  onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                  className="px-2 py-0.5 rounded bg-[#172B46] text-[#C5A46D] border border-[#233F65] font-bold uppercase"
                >
                  {locale}
                </button>
              </div>
            </div>

            <nav className="space-y-2 text-xs font-semibold uppercase tracking-wider">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                1. Inicio
              </Link>
              <Link
                href="/la-academia"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                2. La Academia
              </Link>
              <Link
                href="/programas"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                3. Programas Académicos
              </Link>
              <Link
                href="/clases-personalizadas"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                4. Clases Personalizadas
              </Link>
              <Link
                href="/entrenadores"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                5. Entrenadores
              </Link>
              <Link
                href="/tienda"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                6. Tienda de Ajedrez
              </Link>
              <Link
                href="/clubes-y-escuelas"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                7. Escuelas y Clubes
              </Link>
              <Link
                href="/articulos"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                8. Blog & Artículos
              </Link>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#FAF8F2] hover:text-[#C5A46D]"
              >
                9. Contacto
              </Link>
            </nav>

            <div className="pt-4 border-t border-[#1C3454] space-y-3">
              <a
                href="https://chessgora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dorado w-full text-center text-xs uppercase tracking-wider py-3 font-bold"
              >
                <Laptop className="w-4 h-4" />
                10. Aula Virtual Chessgora
              </a>
              <Link
                href="/mi-cuenta"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-navy-outline w-full text-center text-xs uppercase tracking-wider py-3 font-bold block"
              >
                11. Mi Cuenta / Alumnos
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modal de Búsqueda Global */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
