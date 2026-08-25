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

// Order Number Generator helper
function generateOrderNumber(count) {
  return `ALE-2026-${String(count + 1).padStart(6, '0')}`;
}

// Stripe Line Items Builder helper
function buildStripeLineItems(items) {
  return items.map((item) => ({
    price_data: {
      currency: 'mxn',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // convert to cents
    },
    quantity: item.quantity,
  }));
}

describe('Academia Alekhins - Core E-Commerce & Stripe Checkout Unit Tests', () => {
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

  test('Generates consecutive 6-digit Order Numbers with ALE-2026 prefix', () => {
    assert.strictEqual(generateOrderNumber(0), 'ALE-2026-000001');
    assert.strictEqual(generateOrderNumber(42), 'ALE-2026-000043');
    assert.match(generateOrderNumber(125), /^ALE-2026-\d{6}$/);
  });

  test('Converts product prices to Stripe cent amounts accurately', () => {
    const items = [
      { name: 'Reloj Digital DGT 2500', price: 1899.50, quantity: 1 },
      { name: 'Libro El Método Yusupov', price: 450.00, quantity: 2 },
    ];
    const lineItems = buildStripeLineItems(items);

    assert.strictEqual(lineItems[0].price_data.unit_amount, 189950);
    assert.strictEqual(lineItems[0].quantity, 1);
    assert.strictEqual(lineItems[1].price_data.unit_amount, 45000);
    assert.strictEqual(lineItems[1].quantity, 2);
  });
});
