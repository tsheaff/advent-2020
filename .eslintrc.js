module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 'off',
    'no-continue': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'prefer-destructuring': 'off',
    'func-names': 'off',
    'callback-return': ['error', ['callback', 'cb', 'done']],
    'no-console': 'off',
    curly: ['error', 'all'],
    'object-curly-newline': ['error', { consistent: true }],
    'max-len': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'object-shorthand': 'off',
    'no-use-before-define': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],
    radix: 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': 'off',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'off',
      {
        js: 'never',
        coffee: 'never',
        json: 'always',
      },
    ],
    'import/no-dynamic-require': 'off',
    'prefer-const': 'off',
  },
};

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'fp', 'filenames', 'mocha-no-only'],
//   parserOptions: {
//     plugins: ['fp', 'filenames', 'mocha-no-only'],
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   settings: {
//     'import/resolver': {
//       typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
//     },
//   },
//   overrides: [
//     {
//       files: ['**/*.ts'],
//       extends: [
//         'plugin:@typescript-eslint/recommended',
//         'prettier/@typescript-eslint',
//         'plugin:prettier/recommended',
//       ],
//       rules: {
//         eqeqeq: ['error', 'always', { null: 'never' }],
//         '@typescript-eslint/explicit-function-return-type': [
//           'error',
//           { allowExpressions: true },
//         ],
//         '@typescript-eslint/no-unused-vars': [
//           'error',
//           { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
//         ],
//         '@typescript-eslint/no-explicit-any': 'error',
//         '@typescript-eslint/no-use-before-define': 'off',
//         '@typescript-eslint/no-non-null-assertion': 'off',
//         '@typescript-eslint/ban-types': 'off',
//         'mocha-no-only/mocha-no-only': ['error'],
//       },
//     },
//     {
//       files: ['**/*.js'],
//       extends: ['airbnb', 'plugin:prettier/recommended'],
//       rules: {
//       },
//     },
//     {
//       files: ['*.test.js'],
//       rules: {
//         'no-unused-expressions': 'off',
//       },
//     },
//   ],
// };
