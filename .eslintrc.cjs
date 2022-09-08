module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './packages/*/tsconfig.json'
    ]
  },
  plugins: [
    'vue',
    'simple-import-sort',
    'unused-imports'
  ],
  rules: {
    'no-void': ['error'],
    'quotes': ['error', 'single', {
      allowTemplateLiterals: true
    }],
    'quote-props': ['error', 'consistent'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\w'], ['^@\\w'], ['^', '^\\.'], ['^\\u0000']]
      }
    ],
    'simple-import-sort/exports': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    '@typescript-eslint/array-type': ['error', {
      default: 'generic',
      readonly: 'generic'
    }],
    '@typescript-eslint/naming-convention': ['error', {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allowDouble'
    }]
  }
}
