'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType, CartSummary, calculateCartSummary } from '@/lib/cart';
import { validateCouponAction } from '@/lib/actions';

interface CartContextType {
  cart: CartSummary;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItemType, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  removeCoupon: () => void;
  couponCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('alekhins_cart_items');
      const savedCoupon = localStorage.getItem('alekhins_coupon_code');
      const savedDiscount = localStorage.getItem('alekhins_coupon_discount');
      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedCoupon) setCouponCode(savedCoupon);
      if (savedDiscount) setCouponDiscount(Number(savedDiscount));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('alekhins_cart_items', JSON.stringify(items));
      if (couponCode) {
        localStorage.setItem('alekhins_coupon_code', couponCode);
        localStorage.setItem('alekhins_coupon_discount', String(couponDiscount));
      } else {
        localStorage.removeItem('alekhins_coupon_code');
        localStorage.removeItem('alekhins_coupon_discount');
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, couponCode, couponDiscount, isInitialized]);

  const addItem = (item: Omit<CartItemType, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.variantId === item.variantId);
      if (existing) {
        return prevItems.map((i) =>
          i.variantId === item.variantId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prevItems, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setCouponDiscount(0);
  };

  const applyCoupon = async (code: string) => {
    const summary = calculateCartSummary(items, 0);
    const result = await validateCouponAction(code, summary.subtotal);
    if (result.success && result.discountAmount !== undefined) {
      setCouponCode(result.code || code);
      setCouponDiscount(result.discountAmount);
      return { success: true, message: result.message };
    }
    return { success: false, error: result.error };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setCouponDiscount(0);
  };

  const cart = calculateCartSummary(items, couponDiscount);
  if (couponCode) cart.appliedCoupon = couponCode;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        couponCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
