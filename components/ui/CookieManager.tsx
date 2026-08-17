'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';

export function CookieManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Mandatory
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get('alekhins_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    Cookies.set('alekhins_cookie_consent', JSON.stringify({ essential: true, analytics: true, marketing: true }), { expires: 365 });
    setShowBanner(false);
  };

  const rejectNonEssential = () => {
    Cookies.set('alekhins_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }), { expires: 365 });
    setShowBanner(false);
  };

  const saveCustom = () => {
    Cookies.set('alekhins_cookie_consent', JSON.stringify(preferences), { expires: 365 });
    setShowBanner(false);
    setShowConfig(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-carbon-surface/95 backdrop-blur-md border-t border-stone-border text-ivory shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <ShieldCheck className="w-6 h-6 text-champagne shrink-0 mt-1" />
          <div className="text-sm text-ivory-muted">
            <p className="font-semibold text-ivory mb-1">Privacidad y Gestión de Cookies</p>
            <p>
              Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio, analizar el tráfico y mejorar tu experiencia. Consulta nuestro{' '}
              <a href="/politica-de-privacidad" className="underline text-champagne hover:text-champagne-hover">
                Aviso de Privacidad
              </a>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-xs text-ivory-dim hover:text-ivory underline flex items-center gap-1 px-2 py-1"
          >
            <Settings className="w-3.5 h-3.5" />
            Configurar
          </button>
          <button
            onClick={rejectNonEssential}
            className="text-xs px-3 py-2 border border-stone-border rounded hover:bg-stone-gray text-ivory transition"
          >
            Rechazar no esenciales
          </button>
          <button
            onClick={acceptAll}
            className="btn-champagne text-xs px-4 py-2"
          >
            Aceptar todas
          </button>
        </div>
      </div>

      {showConfig && (
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-stone-border text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-carbon-card rounded border border-stone-border">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ivory">Cookies Esenciales</span>
              <span className="text-emerald-400 font-medium">Requeridas</span>
            </div>
            <p className="text-ivory-dim text-[11px]">Necesarias para la autenticación, inicio de sesión y carrito de compras.</p>
          </div>

          <div className="p-3 bg-carbon-card rounded border border-stone-border">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ivory">Analítica</span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="accent-champagne"
              />
            </div>
            <p className="text-ivory-dim text-[11px]">Nos ayuda a medir el tráfico anónimo para optimizar las lecciones y productos.</p>
          </div>

          <div className="p-3 bg-carbon-card rounded border border-stone-border">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ivory">Marketing & Recomendaciones</span>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="accent-champagne"
              />
            </div>
            <p className="text-ivory-dim text-[11px]">Nos permite sugerir cursos y ofertas de material relevantes para tu nivel.</p>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              onClick={saveCustom}
              className="bg-stone-gray hover:bg-stone-border text-ivory px-4 py-1.5 rounded transition text-xs"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
