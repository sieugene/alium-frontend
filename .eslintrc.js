module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/eslint-plugin-next/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
  plugins: ['prettier'],
  rules: {
    'max-params': 0, // temp
    'max-nested-callbacks': 0, // temp
    '@next/next/no-img-element': 0, // temp
    'react/jsx-no-useless-fragment': 0, // temp
    'react-hooks/rules-of-hooks': 2, // enable for errors: rules of hooks
    complexity: 0,
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['_document.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-invalid-this': 0,
      },
    },
    {
      files: ['next.config.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 0,
      },
    },
    {
      files: ['next-env.d.ts'],
      rules: {
        'spaced-comment': 0,
      },
    },
  ],
}
