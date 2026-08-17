'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import {
  Crown,
  ShoppingBag,
  Search,
  User,
  UserPlus,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { cart, setIsOpen: setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B1510] border-b border-[#1C3328] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded border border-[#D8B155] bg-[#0F2E1E] flex items-center justify-center text-[#D8B155] group-hover:bg-[#D8B155] group-hover:text-[#0B1510] transition shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#D8B155] uppercase font-bold block leading-none">
                ACADEMIA DE AJEDREZ
              </span>
              <span className="font-serif-editorial text-lg md:text-xl font-bold tracking-wider text-white block leading-tight group-hover:text-[#D8B155] transition">
                ALEKHINS
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Exact from Screenshot) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/"
              className={`relative py-7 transition hover:text-[#D8B155] ${
                pathname === '/' ? 'text-[#D8B155] font-bold' : 'text-white'
              }`}
            >
              Inicio
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8B155]" />
              )}
            </Link>

            <Link
              href="/entrenamiento"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname.startsWith('/entrenamiento') ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Clases
            </Link>

            <Link
              href="/tienda"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname.startsWith('/tienda') ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Tienda
            </Link>

            <Link
              href="/roberto-martin-del-campo"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname.startsWith('/roberto-martin-del-campo') ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Nosotros
            </Link>

            <Link
              href="/articulos"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname.startsWith('/articulos') ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/clubes-y-escuelas"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname === '/clubes-y-escuelas' ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Right Action Buttons (Exact Screenshot Styling) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="p-2 text-gray-300 hover:text-[#D8B155] transition"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Carrito"
              className="relative p-2 text-gray-300 hover:text-[#D8B155] transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D8B155] text-[#0B1510] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/mi-cuenta"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-stone-600 rounded hover:border-[#D8B155] hover:text-[#D8B155] transition text-white"
            >
              <User className="w-4 h-4" />
              <span>Iniciar sesión</span>
            </Link>

            <Link
              href="/entrenamiento"
              className="btn-gold-solid text-xs py-2 px-4 shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>Inscribirse</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-[#D8B155] lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1C3328] bg-[#0F1E17] px-4 py-6 space-y-4 text-sm animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-[#D8B155] py-2 border-b border-stone-800"
            >
              Inicio
            </Link>
            <Link
              href="/entrenamiento"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 border-b border-stone-800"
            >
              Clases
            </Link>
            <Link
              href="/tienda"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 border-b border-stone-800"
            >
              Tienda
            </Link>
            <Link
              href="/roberto-martin-del-campo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 border-b border-stone-800"
            >
              Nosotros
            </Link>
            <Link
              href="/articulos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 border-b border-stone-800"
            >
              Blog
            </Link>
            <Link
              href="/clubes-y-escuelas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2"
            >
              Contacto
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
