import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { User, BookOpen, ShoppingBag, CreditCard, ShieldCheck, LogOut } from 'lucide-react';

export const metadata = {
  title: 'Mi Cuenta & Portal del Alumno | Academia Alekhins',
};

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-border pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
            Portal de Usuario
          </span>
          <h1 className="font-serif-editorial text-3xl font-bold text-ivory">
            Bienvenido, {user?.name || 'Alumno / Cliente'}
          </h1>
          <p className="text-xs text-ivory-dim">{user?.email || 'alumno@alekhins.com'}</p>
        </div>

        {user?.role === 'SUPERADMIN' || user?.role === 'ADMIN' ? (
          <Link href="/admin" className="btn-champagne text-xs px-4 py-2">
            Panel de Administración →
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/mi-cuenta/academia" className="card-carbon p-6 space-y-4 hover:border-champagne transition group">
          <div className="w-10 h-10 rounded bg-walnut border border-champagne flex items-center justify-center text-champagne">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-ivory group-hover:text-champagne transition">
            Mi Plan de Academia
          </h3>
          <p className="text-xs text-ivory-muted">
            Consulta tu plan activo, enlace a clases en vivo, videoteca y tareas.
          </p>
        </Link>

        <Link href="/mi-cuenta/suscripciones" className="card-carbon p-6 space-y-4 hover:border-champagne transition group">
          <div className="w-10 h-10 rounded bg-walnut border border-champagne flex items-center justify-center text-champagne">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-ivory group-hover:text-champagne transition">
            Gestión de Suscripciones
          </h3>
          <p className="text-xs text-ivory-muted">
            Consulta prórrogas, facturación y cancela suscripciones en 1-clic.
          </p>
        </Link>

        <Link href="/rastrear-pedido" className="card-carbon p-6 space-y-4 hover:border-champagne transition group">
          <div className="w-10 h-10 rounded bg-walnut border border-champagne flex items-center justify-center text-champagne">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-ivory group-hover:text-champagne transition">
            Mis Pedidos & Guías
          </h3>
          <p className="text-xs text-ivory-muted">
            Historial de compras de material de ajedrez y rastreo de envíos.
          </p>
        </Link>
      </div>
    </div>
  );
}
