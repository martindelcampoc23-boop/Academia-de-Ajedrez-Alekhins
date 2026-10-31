'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'MXN' | 'USD';
type Locale = 'es' | 'en';

interface LocaleCurrencyContextType {
  currency: Currency;
  locale: Locale;
  setCurrency: (c: Currency) => void;
  setLocale: (l: Locale) => void;
  formatPrice: (amountMxn: number) => string;
  exchangeRate: number; // 1 USD = X MXN
}

const LocaleCurrencyContext = createContext<LocaleCurrencyContextType>({
  currency: 'MXN',
  locale: 'es',
  setCurrency: () => {},
  setLocale: () => {},
  formatPrice: (val) => `$${val.toLocaleString('es-MX')} MXN`,
  exchangeRate: 19.5,
});

export function LocaleCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('MXN');
  const [locale, setLocaleState] = useState<Locale>('es');
  const exchangeRate = 19.5; // Tasa de cambio de referencia

  useEffect(() => {
    try {
      const savedCurr = localStorage.getItem('alekhins_currency') as Currency;
      const savedLoc = localStorage.getItem('alekhins_locale') as Locale;
      if (savedCurr && (savedCurr === 'MXN' || savedCurr === 'USD')) {
        setCurrencyState(savedCurr);
      }
      if (savedLoc && (savedLoc === 'es' || savedLoc === 'en')) {
        setLocaleState(savedLoc);
      }
    } catch {
      // localStorage no disponible
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('alekhins_currency', c);
    } catch {}
  };

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem('alekhins_locale', l);
    } catch {}
  };

  const formatPrice = (amountMxn: number): string => {
    if (currency === 'USD') {
      const amountUsd = Math.round(amountMxn / exchangeRate);
      return `$${amountUsd.toLocaleString('en-US')} USD`;
    }
    return `$${amountMxn.toLocaleString('es-MX')} MXN`;
  };

  return (
    <LocaleCurrencyContext.Provider
      value={{
        currency,
        locale,
        setCurrency,
        setLocale,
        formatPrice,
        exchangeRate,
      }}
    >
      {children}
    </LocaleCurrencyContext.Provider>
  );
}

export function useLocaleCurrency() {
  return useContext(LocaleCurrencyContext);
}
