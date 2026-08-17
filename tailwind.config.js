/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',500:'#3b5ccc',600:'#3048b5',700:'#293a91',800:'#0f2d52',900:'#0b1f3a',950:'#071426' },
        accent: { 500:'#6753d8',600:'#5541c0' },
        success: { 50:'#ecfdf5',600:'#059669',700:'#047857' },
      },
      boxShadow: { soft: '0 12px 40px rgba(11,31,58,.08)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
