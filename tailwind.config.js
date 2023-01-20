const autoprefixer = require('autoprefixer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'east-bay': {
    '50': '#f3f5fb',
    '100': '#e5e7f4',
    '200': '#d0d5ed',
    '300': '#b0bbe0',
    '400': '#8b97cf',
    '500': '#6f78c2',
    '600': '#5c60b4',
    '700': '#5151a4',
    '800': '#484687',
    '900': '#3e3e70',
},

    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}
