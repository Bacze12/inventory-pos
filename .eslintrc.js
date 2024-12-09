const { FlatCompat } = require('@eslint/eslintrc');
const { fileURLToPath } = require('url');
const path = require('path');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = compat.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      project: ['tsconfig.json', 'tsconfig.build.json'],
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': typescriptEslintPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
  }
});
