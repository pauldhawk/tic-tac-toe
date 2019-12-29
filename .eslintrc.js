module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': 'warning',
    'vue/html-closing-bracket-newline': 'warning',
    'vue/html-closing-bracket-spacing': 'warning',
    'vue/html-end-tags': 'warning',
    'vue/html-indent': 'warning',
    'vue/html-quotes': 'warning',
    'vue/html-self-closing': 'warning',
    'vue/max-attributes-per-line': 'warning',
    'vue/multiline-html-element-content-newline': 'warning',
    'vue/mustache-interpolation-spacing': 'warning',
    'vue/name-property-casing': 'warning',
    'vue/no-multi-spaces': 'warning',
    'vue/v-bind-style': 'warning',
    'vue/v-on-style': 'warning'
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
