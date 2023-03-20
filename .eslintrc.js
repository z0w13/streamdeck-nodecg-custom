/* eslint-disable-next-line unicorn/prefer-module */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended-module',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:array-func/recommended',
    'plugin:unicorn/recommended',
    'plugin:no-use-extend-native/recommended',
    'plugin:promise/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterOverload: true, exceptAfterSingleLine: true },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Index signature
          'signature',

          // Fields
          'public-abstract-field',
          'protected-abstract-field',
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          // Methods
          'public-abstract-method',
          'protected-abstract-method',

          'public-static-method',
          'protected-static-method',
          'private-static-method',

          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
    'array-func/prefer-array-from': 0,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'node/no-missing-import': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'pascalCase',
        ignore: [/\.d\.ts$/, /\.config\.[jt]s$/],
      },
    ],
    'unicorn/prefer-spread': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
