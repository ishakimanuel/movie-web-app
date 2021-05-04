const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: '#810000',
      'primary-dark': '#630000',
      secondary: '#eeebdd',
      dark: '#1b1717',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
