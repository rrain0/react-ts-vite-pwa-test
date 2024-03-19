import { FlatCompat } from '@eslint/eslintrc'
import * as url from 'url'
import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactConfigRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// https://github.com/prettier/eslint-plugin-prettier
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended'
import prettier from 'eslint-plugin-prettier'
// https://www.npmjs.com/package/eslint-plugin-react-refresh
// Validate that your components can safely be updated with fast refresh.
import reactRefresh from 'eslint-plugin-react-refresh'


// use for old plugins
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
})



// Migration from .eslintrc.cjs to eslint.config.mjs
// https://eslint.org/docs/latest/use/configure/migration-guide

export default [
  ...ts.config(
    js.configs.recommended, // works
    ...ts.configs.recommended, // works
  ),
  ...compat.extends('plugin:react/recommended'), // works
  // must be after react.configs.recommended ('plugin:react/recommended')
  ...compat.extends('plugin:react/jsx-runtime'), // seems to be working
  ...compat.extends('plugin:react-hooks/recommended'), // works
  ...compat.extends('plugin:import/errors'), // works
  ...compat.extends('plugin:import/warnings'), // works
  
  ...compat.extends('plugin:jsx-a11y/recommended'), // NOT work
  
  // prettier must be last
  prettierConfigRecommended, // works
  
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        }
      },
    },
    files: ['**/*.{ts,cts,mts,tsx,d.ts,js,cjs,mjs,jsx}'],
    plugins: {
      'react-refresh': reactRefresh, // works
      'react': react,
      'import': importPlugin,
      'jsx-a11y': jsxA11y,
      'prettier': prettier,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-no-target-blank': 'off',
      'react/function-component-definition': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        }
      }
    }
  },
  // !!! ignores must be in a standalone object to work globally
  {
    ignores: ['dist', 'dev-dist', 'eslint.config.mjs'],
  }
]
