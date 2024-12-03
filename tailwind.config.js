/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2DD4BF', // teal
          light: '#5EEAD4',
          dark: '#14B8A6'
        },
        secondary: {
          DEFAULT: '#FF6B6B', // coral
          light: '#FF8787',
          dark: '#FA5252'
        },
        navy: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dark: '#1E3A8A'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};