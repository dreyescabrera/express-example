const eslint = require('@eslint/js')
const prettier = require('eslint-config-prettier')
const importPlugin = require('eslint-plugin-import')
const securityPlugin = require('eslint-plugin-security')
const promisePlugin = require('eslint-plugin-promise')

/** @type {import("eslint").Linter.Config} */
module.exports = [
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        module: 'readonly'
      }
    },
    ignores: ['node_modules', 'dist', '.vercel'],
    plugins: {
      security: securityPlugin,
      promise: promisePlugin
    },
    rules: {
      // Promise rules
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',

      // Security rules
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'warn',
      'security/detect-buffer-noassert': 'error',
      'security/detect-object-injection': 'warn',
      'security/detect-new-buffer': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-return-await': 'error',
      'no-await-in-loop': 'warn',
      'no-var': 'error',
      'prefer-const': 'error'
    }
  },
  prettier
]
