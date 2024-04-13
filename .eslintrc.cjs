module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  },
  plugins: ['simple-import-sort', 'import', 'react-refresh', '@typescript-eslint', 'prettier', 'jest', 'prettier-plugin-tailwindcss'],
  settings: {
    'import/parsers': {
      "typescript-eslint/parser": [".ts", ".tsx"]
    },
    'import/resolver': {
      typescript: {"alwaysTryTypes": true, "project": "./tsconfig.json"},
      node: true,
    },
  }, 
  rules: {
    camelcase: 'error',
    "import/no-unresolved": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    'spaced-comment': 'error',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': ['warn', {'name': 'react-redux', 'importNames': ['useSelector', 'useDispatch'], 'message': 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'}],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    quotes: ['error', 'single'],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
