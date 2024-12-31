import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import securityPlugin from 'eslint-plugin-security'
import promisePlugin from 'eslint-plugin-promise'

/** @type {import("eslint").Linter.Config} */
export default [
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
    plugins: {
      security: securityPlugin,
      promise: promisePlugin
    },
    rules: {
      // Import rules
      'import/no-commonjs': 'error',

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
