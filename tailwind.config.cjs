/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: 'hsl(var(--brand-50) / <alpha-value>)',
          500: 'hsl(var(--brand-500) / <alpha-value>)',
          600: 'hsl(var(--brand-600) / <alpha-value>)',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'heart-pulse': 'heartPulse 1.5s ease infinite',
        'petal-bloom': 'petalBloom 0.5s ease-out forwards',
      },
      keyframes: {
        heartPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        petalBloom: {
          '0%': { opacity: 0, transform: 'scale(0.5) rotate(0deg)' },
          '100%': { opacity: 1, transform: 'scale(1) rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}