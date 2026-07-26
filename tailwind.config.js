/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        zamin: {
          cream: '#F8F3E8',
          creamDark: '#EEE5D2',
          paper: '#FCFAF4',
          ink: '#1E2A27',
          teal: '#1B4B48',
          tealDeep: '#0F332F',
          tealLight: '#2C6B65',
          gold: '#C89B3C',
          goldLight: '#E4C374',
          clay: '#A8512F',
          stone: '#9C9A93',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(30,42,39,0.08), 0 1px 2px -1px rgba(30,42,39,0.06)',
        pill: '0 4px 14px -4px rgba(27,75,72,0.35)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
