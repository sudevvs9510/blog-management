/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        customAqua:'#0FA4AF',
        darkerAqua: '#097780',
      }
    },
  },
  plugins: [],
}