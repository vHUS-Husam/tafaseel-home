/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF7F2',
          100: '#F5EFE3',
          200: '#EBDEC7',
          300: '#DCC9A0',
          400: '#CDB079',
          500: '#B89452',
          600: '#8B6914',
          700: '#6B5010',
          800: '#4A380B',
          900: '#2A2006'
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#B8941D'
        },
        cream: '#FAF7F2',
        warm: {
          beige: '#F5EFE3',
          brown: '#5D4037',
          dark: '#2C1810'
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
