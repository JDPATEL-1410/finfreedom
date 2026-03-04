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
          DEFAULT: '#335C8E',
          50: '#EBF1F8',
          100: '#C7D8ED',
          200: '#A3BEE2',
          300: '#7FA4D7',
          400: '#5B8ACC',
          500: '#335C8E',
          600: '#2A4C77',
          700: '#213B5E',
          800: '#172A45',
          900: '#0E1A2C',
        },
        secondary: {
          DEFAULT: '#EB3E4A',
          50: '#FDE9EA',
          100: '#FAC7CA',
          200: '#F6969B',
          300: '#F1656C',
          400: '#EE4F57',
          500: '#EB3E4A',
          600: '#D0323D',
          700: '#A8282F',
          800: '#7F1E24',
          900: '#56141A',
        },
        navy: {
          DEFAULT: '#1F2A44',
          light: '#2B3A5C',
          dark: '#141C2F',
        },
        surface: {
          DEFAULT: '#F5F7FA',
          alt: '#E9EEF4',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '120': '30rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(51, 92, 142, 0.08), 0 1px 3px rgba(51, 92, 142, 0.06)',
        'card-hover': '0 8px 24px rgba(51, 92, 142, 0.15), 0 4px 8px rgba(51, 92, 142, 0.1)',
        'nav': '0 2px 16px rgba(31, 42, 68, 0.1)',
        'premium': '0 20px 60px rgba(51, 92, 142, 0.12)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #335C8E 0%, #1F2A44 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(31,42,68,0.85) 0%, rgba(51,92,142,0.7) 100%)',
        'gradient-card': 'linear-gradient(145deg, #ffffff, #f5f7fa)',
        'gradient-secondary': 'linear-gradient(135deg, #EB3E4A 0%, #C02F39 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'counter': 'counter 2s ease-out',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
