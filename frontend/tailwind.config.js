/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s ease-in-out infinite',
      },
      keyframes: {
        spin: {
          '0%': { borderRadius: '12%', transform: 'rotate(0deg)', width: '88px', height: '88px', marginBottom: '12px' },
          '50%': { borderRadius: '50%', width: '100px', height: '100px', marginBottom: '0' },
          '100%': { borderRadius: '12%', transform: 'rotate(360deg)', width: '88px', height: '88px', marginBottom: '12px' },
        },
      },
    },
  },
  plugins: [],
}