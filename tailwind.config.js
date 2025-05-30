/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // toggle via .dark sur <html>
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#08475E',
        accent: '#3EC8B3',
        highlight: '#8C30F5',
        light: '#F0F9FA',
        darkText: '#F1F5F9',
        mutedText: '#6B7280',
      },
      keyframes: {
        wave: {
          '0%': { backgroundPositionX: '0%' },
          '100%': { backgroundPositionX: '100%' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        wave: 'wave 12s linear infinite',
        'slow-zoom': 'zoom 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
