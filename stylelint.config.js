module.exports = {
  extends: 'stylelint-config-recommended-vue/scss',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply']
      }
    ],
    'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': 'always-multi-line',
    'max-empty-lines': 1
  }
}
