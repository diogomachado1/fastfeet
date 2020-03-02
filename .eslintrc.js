module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  plugins: ['prettier'],
  rules: {
    'allowSyntheticDefaultImports': 0,
    'esModuleInterop': 0,
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/extensions': ['error', 'always', {
      ts: 'never',
    }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.ts']
      }
    },
  }
};
