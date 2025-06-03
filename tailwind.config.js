/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        border: "hsl(328 100% 95%)",
        input: "hsl(328 100% 96%)",
        ring: "hsl(222.2 84% 4.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: '#E91E63',
          light: '#F8BBD9',
          dark: '#AD1457',
          foreground: "hsl(210 40% 98%)"
        },
        secondary: {
          DEFAULT: '#9C27B0',
          light: '#E1BEE7',
          dark: '#6A1B6A',
          foreground: "hsl(222.2 47.4% 11.2%)"
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)"
        },
        muted: {
          DEFAULT: "hsl(330 50% 98%)",
          foreground: "hsl(280 15% 65%)"
        },
        accent: '#FF6B9D',
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)"
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)"
        },
        surface: {
          50: '#fef7ff',
          100: '#fdf2ff',
          200: '#fce7ff',
          300: '#f8d4ff',
          400: '#f0abff',
          500: '#e879ff',
          600: '#d946ef',
          700: '#c026d3',
          800: '#a21caf',
          900: '#86198f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'cycle': '0 8px 32px rgba(233, 30, 99, 0.15)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
spacing: {
        'mobile-0.5': '0.125rem',
        'mobile-1': '0.25rem',
        'mobile-1.5': '0.375rem',
        'mobile-2': '0.5rem', 
        'mobile-2.5': '0.625rem',
        'mobile-3': '0.75rem',
        'mobile-4': '1rem',
        'mobile-5': '1.25rem',
        'mobile-6': '1.5rem',
        'mobile-7': '1.75rem',
        'mobile-8': '2rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cycle-gradient': 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
        'flow-gradient': 'linear-gradient(45deg, #FF6B9D 0%, #E91E63 100%)'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}