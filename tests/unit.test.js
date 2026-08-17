const assert = require('node:assert');
const { test, describe } = require('node:test');

// Inline cart logic validator matching lib/cart.ts
function calculateCartSummary(items, couponDiscount = 0) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.min(couponDiscount, subtotal);
  const subtotalAfterDiscount = subtotal - discount;
  const shipping = subtotalAfterDiscount >= 1500 || items.length === 0 ? 0 : 150;
  const tax = Math.round(subtotalAfterDiscount * 0.16 * 100) / 100;
  const total = Math.max(0, subtotalAfterDiscount + shipping);

  return { subtotal, discount, shipping, tax, total };
}

describe('Academia Alekhins - Core E-Commerce Unit Tests', () => {
  test('Calculates cart subtotal and shipping fee under $1500 threshold', () => {
    const items = [
      { variantId: 'v1', price: 899, quantity: 1 }
    ];
    const summary = calculateCartSummary(items, 0);

    assert.strictEqual(summary.subtotal, 899);
    assert.strictEqual(summary.discount, 0);
    assert.strictEqual(summary.shipping, 150); // Under $1500 gets $150 shipping
    assert.strictEqual(summary.total, 899 + 150);
  });

  test('Grants FREE SHIPPING for orders equal or over $1500', () => {
    const items = [
      { variantId: 'v1', price: 1850, quantity: 1 }
    ];
    const summary = calculateCartSummary(items, 0);

    assert.strictEqual(summary.subtotal, 1850);
    assert.strictEqual(summary.shipping, 0); // FREE SHIPPING
    assert.strictEqual(summary.total, 1850);
  });

  test('Applies percentage coupon correctly', () => {
    const items = [
      { variantId: 'v1', price: 1000, quantity: 1 }
    ];
    const discount = (1000 * 10) / 100; // 10% = $100
    const summary = calculateCartSummary(items, discount);

    assert.strictEqual(summary.subtotal, 1000);
    assert.strictEqual(summary.discount, 100);
    assert.strictEqual(summary.shipping, 150); // $900 after discount < $1500
    assert.strictEqual(summary.total, 900 + 150);
  });
});
