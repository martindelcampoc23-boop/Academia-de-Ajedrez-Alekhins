export interface CartItemType {
  variantId: string;
  productId: string;
  name: string;
  variantName: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartSummary {
  items: CartItemType[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  appliedCoupon?: string;
}

export const FREE_SHIPPING_THRESHOLD = 1500; // Free shipping on orders over $1500 MXN

export function calculateCartSummary(items: CartItemType[], couponDiscount: number = 0): CartSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.min(couponDiscount, subtotal);
  const subtotalAfterDiscount = subtotal - discount;
  
  const shipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 150; // $150 flat rate
  const tax = Math.round(subtotalAfterDiscount * 0.16 * 100) / 100; // 16% IVA
  const total = Math.max(0, subtotalAfterDiscount + shipping);

  const progressToFreeShipping = Math.min(100, Math.round((subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100));

  return {
    items,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    progressToFreeShipping,
  };
}
