const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,js,jsx,vue}'
  ],
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Athiti', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'pale-yellow': '#D5A755',
        'pale-gray': '#423E41',
        'yellow-hover': '#FFCA28',
        'gray-hover': '#777668',
        'red-disabled': '#8B183C'
      }
    }
  },
  variants: {},
  plugins: []
}
