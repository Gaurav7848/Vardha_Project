/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/auth/**/*.{js,jsx}",
    "./src/Home/**/*.{js,jsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C2F26',
        'primary-dark': '#5A221C',
        'primary-light': '#9B3E31',
        secondary: '#B76E2E',
        accent: '#D4A038',
        background: '#F3F0EA',
        'text-dark': '#2C1810',
        'text-light': '#FCF8F0',
        brick: 'rgba(124, 47, 38, 0.05)',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'brick-move': 'brickMove 20s linear infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'gradient-move': 'gradientMove 2s linear infinite',
        'shield-pulse': 'shieldPulse 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'spin-slow': 'rotation 0.8s linear infinite',
      },
      keyframes: {
        brickMove: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(30px) translateY(30px)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        shieldPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}