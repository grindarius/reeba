/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  semi: false,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  endOfLine: 'lf',
}
