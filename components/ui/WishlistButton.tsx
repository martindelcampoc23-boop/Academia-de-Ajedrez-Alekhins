'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: string;
  productName: string;
}

const STORAGE_KEY = 'alekhins-wishlist';

function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setIsSaved(getWishlist().includes(productId));
  }, [productId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const list = getWishlist();
    let next: string[];
    if (list.includes(productId)) {
      next = list.filter((id) => id !== productId);
    } else {
      next = [...list, productId];
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
    saveWishlist(next);
    setIsSaved(next.includes(productId));
  };

  return (
    <button
      onClick={toggle}
      title={isSaved ? `Quitar ${productName} de favoritos` : `Agregar ${productName} a favoritos`}
      className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
        isSaved
          ? 'bg-red-500/90 text-white hover:bg-red-600'
          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
      } ${pulse ? 'scale-125' : ''}`}
      aria-label={isSaved ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart className={`w-4 h-4 transition-all ${isSaved ? 'fill-white' : ''}`} />
    </button>
  );
}
