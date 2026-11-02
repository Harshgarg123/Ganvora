/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'hsl(40 20% 97%)',
          50: 'hsl(40 24% 99%)',
          100: 'hsl(40 22% 98%)',
          200: 'hsl(40 20% 96%)',
          300: 'hsl(40 18% 94%)',
          400: 'hsl(40 16% 91%)',
        },
        ink: {
          DEFAULT: 'hsl(0 0% 10%)',
          600: 'hsl(0 0% 25%)',
          500: 'hsl(0 0% 40%)',
          400: 'hsl(0 0% 55%)',
          300: 'hsl(0 0% 70%)',
          200: 'hsl(0 0% 85%)',
          100: 'hsl(0 0% 92%)',
        },
        forest: {
          DEFAULT: 'hsl(150 24% 30%)',
          50: 'hsl(150 24% 96%)',
          100: 'hsl(150 22% 90%)',
          200: 'hsl(150 22% 75%)',
          300: 'hsl(150 24% 55%)',
          400: 'hsl(150 24% 40%)',
          500: 'hsl(150 24% 30%)',
          600: 'hsl(150 26% 24%)',
          700: 'hsl(150 28% 18%)',
        },
        oxblood: {
          DEFAULT: 'hsl(355 45% 40%)',
          50: 'hsl(355 45% 96%)',
          100: 'hsl(355 40% 88%)',
          500: 'hsl(355 45% 40%)',
          600: 'hsl(355 48% 32%)',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        editorial: '72rem',
        prose: '42rem',
        wide: '90rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-3d': 'float3d 7s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
      keyframes: {
        float3d: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)' },
          '50%': { transform: 'translate3d(0,-10px,18px) rotateX(3deg) rotateY(-4deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'premium': '0 1px 2px hsl(0 0% 0% / 0.04), 0 8px 24px hsl(0 0% 0% / 0.06)',
        'premium-lg': '0 1px 2px hsl(0 0% 0% / 0.04), 0 16px 48px hsl(0 0% 0% / 0.08)',
        'forest': '0 8px 32px hsl(150 24% 30% / 0.12)',
      },
    },
  },
  plugins: [],
};
