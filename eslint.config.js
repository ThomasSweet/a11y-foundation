/**
 * Flat ESLint config — the JS/TS counterpart to stylelint and vue-tsc.
 *
 * Deliberately lean: types are vue-tsc's job and formatting is nobody's (no
 * formatter in this repo), so this catches real defects — unused code, unsafe
 * patterns, Vue template mistakes — and stays quiet otherwise.
 */
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default ts.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'src/showcases/**/*.snippet.*', 'public/**'],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: ts.parser },
    },
    rules: {
      /* Single-word component filenames are the convention here (CraftPage,
         HubView); the multi-word rule targets template tag collisions, which
         this project's PascalCase imports can't produce. */
      'vue/multi-word-component-names': 'off',
      /* Attribute ordering and line-break style are formatting opinions —
         out of scope, see the header note. */
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/attributes-order': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      /* Props are declared type-first (`detect?: () => boolean`); the `?` is
         already the explicit statement that undefined is valid, and adding
         `default: undefined` to satisfy an options-API rule would be noise. */
      'vue/require-default-prop': 'off',
    },
  },

  {
    files: ['**/*.{js,mjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  /* Build and test tooling runs in Node, not the browser. */
  {
    files: ['scripts/**/*.{js,mjs}', 'tests/**/*.ts', '*.config.js', '*.config.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'off',
    },
  },
)
