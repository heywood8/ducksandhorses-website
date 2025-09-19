/* eslint config */
module.exports = {
  root: true,
  env: { es2022: true, browser: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: null, ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import', 'astro'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:import/recommended'
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    }
  },
  rules: {
    'import/order': ['warn', { 'newlines-between': 'always', groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], alphabetize: { order: 'asc', caseInsensitive: true } }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },
  overrides: [
    {
      files: ['**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: { parser: '@typescript-eslint/parser', extraFileExtensions: ['.astro'] },
      rules: {}
    }
  ]
};
