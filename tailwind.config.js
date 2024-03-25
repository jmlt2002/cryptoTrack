/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: ["lemonade", "forest",],
  },
  theme: {
    extend: {
      colors: {
        cryptoTrackYellow: '#FBA834',
        cryptoTrackBlue1: '#333A73',
        cryptoTrackBlue2: '#387ADF',
        cryptoTrackBlue3: '#50C4ED',
      },
      height: {
        '700' : '700px',
      },
    },
  },
  plugins: [require("daisyui")],
}