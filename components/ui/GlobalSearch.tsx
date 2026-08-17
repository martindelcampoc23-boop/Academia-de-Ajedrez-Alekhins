'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, BookOpen, Video as VideoIcon, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  type: 'PRODUCT' | 'PLAN' | 'VIDEO' | 'ARTICLE';
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  price?: number;
}

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setResults((await res.json()).results || []);
      } catch {}
      finally { setIsLoading(false); }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-[#0F1E17] border border-[#1C3328] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-[#1C3328] flex items-center gap-3 bg-[#0B1510]">
          <Search className="w-5 h-5 text-[#D8B155] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos, planes, clases o videos..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-base"
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {isLoading && <p className="text-center py-6 text-sm text-gray-400">Buscando...</p>}
          {!isLoading && query.trim() && results.length === 0 && (
            <p className="text-center py-6 text-sm text-gray-400">No se encontraron resultados para &quot;{query}&quot;</p>
          )}
          {!isLoading && results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.url}
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded hover:bg-[#13221B] border border-transparent hover:border-[#1C3328] transition group"
            >
              <div className="flex items-center gap-3">
                {item.type === 'PRODUCT' && <ShoppingBag className="w-5 h-5 text-[#D8B155] shrink-0" />}
                {item.type === 'PLAN' && <BookOpen className="w-5 h-5 text-emerald-400 shrink-0" />}
                {item.type === 'VIDEO' && <VideoIcon className="w-5 h-5 text-amber-400 shrink-0" />}
                {item.type === 'ARTICLE' && <User className="w-5 h-5 text-blue-400 shrink-0" />}
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#D8B155] transition">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-gray-400">{item.subtitle}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.price !== undefined && <span className="text-sm font-bold text-[#D8B155]">${item.price.toFixed(2)}</span>}
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D8B155] transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
