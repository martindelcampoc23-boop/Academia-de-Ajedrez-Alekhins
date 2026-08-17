import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: '#16130b',
          light: '#1f1b13',
          surface: '#231f17',
          card: '#2d2a21',
          dark: '#110e07',
        },
        ivory: {
          DEFAULT: '#eae1d4',
          muted: '#d0c5af',
          dim: '#99907c',
        },
        stoneGray: {
          light: '#4d4635',
          DEFAULT: '#38342b',
          dark: '#1f1b13',
        },
        walnut: {
          light: '#5D4037',
          DEFAULT: '#3D2B1F',
          dark: '#231f17',
        },
        champagne: {
          light: '#f2ca50',
          DEFAULT: '#d4af37',
          dark: '#e9c349',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
        gold: '0 0 25px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
