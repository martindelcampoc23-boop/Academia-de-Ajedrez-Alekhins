import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const isStripeMockMode =
  !stripeSecretKey ||
  stripeSecretKey.includes('mock') ||
  stripeSecretKey === 'sk_test_mock_alekhins_key';

export const stripe = new Stripe(stripeSecretKey || 'sk_test_mock_alekhins_key', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  appInfo: {
    name: 'Academia Alekhins Store & Training',
    version: '1.0.0',
    url: 'https://ajedrezprofesional.com',
  },
});

