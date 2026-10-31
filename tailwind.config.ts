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
        // Paleta Institucional Academia Alekhins
        navy: {
          DEFAULT: '#172B46',
          dark: '#0F1D30',
          deep: '#0A1422',
          surface: '#1C3454',
          card: '#223D62',
          light: '#2E507D',
        },
        marfil: {
          DEFAULT: '#FAF8F2',
          soft: '#F5F2E9',
          muted: '#E8E1D3',
          border: '#D8CFBC',
        },
        dorado: {
          DEFAULT: '#C5A46D',
          hover: '#D4B785',
          subtle: '#E8D7B8',
          dark: '#A68750',
        },
        // Compatibilidad previa
        carbon: {
          DEFAULT: '#172B46',
          light: '#1C3454',
          surface: '#0F1D30',
          card: '#15263E',
          dark: '#0A1422',
        },
        ivory: {
          DEFAULT: '#FAF8F2',
          muted: '#E8E1D3',
          dim: '#9CA3AF',
        },
        champagne: {
          light: '#D4B785',
          DEFAULT: '#C5A46D',
          dark: '#A68750',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(23, 43, 70, 0.4)',
        gold: '0 0 20px rgba(197, 164, 109, 0.25)',
        navy: '0 10px 30px rgba(15, 29, 48, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
