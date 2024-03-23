/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cryptoTrackYellow: '#FBA834',
        cryptoTrackBlue1: '#333A73',
        cryptoTrackBlue2: '#387ADF',
        cryptoTrackBlue3: '#50C4ED',
      },
    },
  },
  plugins: [require("daisyui")],
}