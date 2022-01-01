const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,js,jsx,vue}'
  ],
  theme: {
    purge: [],
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'pale-yellow': '#D5A755',
        'pale-gray': '#423E41'
      }
    }
  },
  variants: {},
  plugins: []
}
