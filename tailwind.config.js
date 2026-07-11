/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: '#06B6D4',
        'brand-dark': '#0891B2',
        'brand-light': '#38bdf8',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #06B6D4, #38bdf8)',
        'gradient-card': 'linear-gradient(135deg, rgba(15,23,42,0.6), rgba(15,23,42,0.3))',
      },
    },
  },
  plugins: [],
}
