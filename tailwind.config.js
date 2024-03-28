/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: ["lemonade", "forest",],
  },
  theme: {
    extend: {
      height: {
        '700' : '700px',
      },
    },
  },
  plugins: [require("daisyui")],
}