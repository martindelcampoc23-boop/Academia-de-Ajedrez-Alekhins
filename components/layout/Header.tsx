'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
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
  ChevronDown,
  LogOut,
  BookOpen,
  Package,
  ShieldAlert,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cart, setIsOpen: setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const user = session?.user;
  const role = (user as any)?.role || 'CUSTOMER';

  // Cerrar menú desplegable al hacer clic fuera
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

          {/* Center Navigation Links */}
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
              Escuelas y Colegios
            </Link>

            <Link
              href="/contacto"
              className={`py-7 transition hover:text-[#D8B155] ${
                pathname === '/contacto' ? 'text-[#D8B155] font-bold' : 'text-gray-200'
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="p-2 text-gray-300 hover:text-[#D8B155] transition cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Carrito"
              className="relative p-2 text-gray-300 hover:text-[#D8B155] transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#D8B155] text-[#0B1510] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Usuario Autenticado / Login */}
            {status === 'authenticated' && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F2E1E] border border-[#2B3E34] hover:border-[#D8B155] text-white transition text-xs font-semibold cursor-pointer"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'Usuario'}
                      className="w-6 h-6 rounded-full object-cover border border-[#D8B155]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#D8B155] text-[#0B1510] font-bold flex items-center justify-center text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate hidden sm:inline-block">
                    {user.name?.split(' ')[0] || 'Mi Cuenta'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#D8B155]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#121E17] border border-[#2B3E34] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-[#2B3E34]/80">
                      <p className="text-xs font-bold text-white truncate">{user.name || 'Usuario'}</p>
                      <p className="text-[10px] text-[#A8B2A6] truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-[#1B4D3E] text-[#D8B155] border border-[#D8B155]/30">
                        {role === 'SUPERADMIN' ? '👑 Admin & Maestro' : role === 'ADMIN' ? '👑 Administrador' : role === 'COACH' ? '🎓 Maestro / Coach' : '♟️ Alumno'}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/mi-cuenta"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#1B4D3E]/40 hover:text-[#D8B155] transition"
                      >
                        <User className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Mi Portal de Usuario</span>
                      </Link>

                      {(role === 'SUPERADMIN' || role === 'ADMIN' || role === 'COACH' || role?.includes('COACH') || role?.includes('MAESTRO')) && (
                        <Link
                          href="/maestro"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-[#1B4D3E]/40 transition"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                          <span>Panel del Maestro (Tareas)</span>
                        </Link>
                      )}

                      <Link
                        href="/mi-cuenta/tareas"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#1B4D3E]/40 hover:text-[#D8B155] transition"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Mis Tareas de Ajedrez</span>
                      </Link>

                      <Link
                        href="/mi-cuenta/academia"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#1B4D3E]/40 hover:text-[#D8B155] transition"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Mis Cursos & Clases</span>
                      </Link>

                      <Link
                        href="/rastrear-pedido"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#1B4D3E]/40 hover:text-[#D8B155] transition"
                      >
                        <Package className="w-3.5 h-3.5 text-[#D8B155]" />
                        <span>Mis Pedidos & Guías</span>
                      </Link>

                      {(role === 'SUPERADMIN' || role === 'ADMIN' || role?.includes('ADMIN')) && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#D8B155] hover:bg-[#1B4D3E]/40 transition border-t border-[#2B3E34]/50"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-[#D8B155]" />
                          <span>Panel de Administración</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#2B3E34]/80 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : status === 'loading' ? (
              /* Skeleton placeholder mientras carga la sesión */
              <div className="flex items-center gap-2">
                <div className="hidden sm:block h-8 w-24 rounded-lg bg-[#1C3328] animate-pulse" />
                <div className="h-8 w-24 rounded-lg bg-[#1C3328] animate-pulse" />
              </div>
            ) : (
              /* No autenticado — siempre visible */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 border border-stone-600 rounded-lg hover:border-[#D8B155] hover:text-[#D8B155] transition text-white"
                >
                  <User className="w-4 h-4" />
                  <span>Iniciar sesión</span>
                </Link>

                <Link
                  href="/registro"
                  className="btn-gold-solid text-xs py-2 px-3.5 shadow-md rounded-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Registrarse</span>
                </Link>
              </div>
            )}


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-[#D8B155] lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1C3328] bg-[#0F1E17] px-4 py-6 space-y-4 text-sm animate-in slide-in-from-top duration-200">
            {status === 'authenticated' && user && (
              <div className="p-3 rounded-lg bg-[#121E17] border border-[#2B3E34] mb-3">
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[10px] text-[#A8B2A6]">{user.email}</p>
                <div className="mt-2 flex gap-2">
                  <Link
                    href="/mi-cuenta"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-[#D8B155] underline"
                  >
                    Mi Cuenta
                  </Link>
                  {(role === 'SUPERADMIN' || role === 'ADMIN' || role === 'COACH' || role?.includes('COACH')) && (
                    <Link
                      href="/maestro"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-amber-300 underline font-bold"
                    >
                      Panel Maestro
                    </Link>
                  )}
                  {(role === 'SUPERADMIN' || role === 'ADMIN' || role?.includes('ADMIN')) && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-[#D8B155] underline font-bold"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="text-xs text-red-400 underline ml-auto"
                  >
                    Salir
                  </button>
                </div>
              </div>
            )}

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
              className="block text-white py-2 border-b border-stone-800"
            >
              Escuelas y Colegios
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white py-2 border-b border-stone-800"
            >
              Contacto
            </Link>

            {status !== 'authenticated' && (
              <div className="pt-2 flex flex-col gap-2 sm:hidden">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-4 rounded border border-stone-600 text-white text-xs font-semibold"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-4 rounded bg-[#D8B155] text-[#0B1510] text-xs font-bold"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
