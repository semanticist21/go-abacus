import tseslint from '@typescript-eslint/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    ignores: ['dist/**', 'src-tauri/**', 'node_modules/**', '*.min.js', 'build/**'],
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...perfectionist.configs['recommended-line-length'].rules,
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          newlinesBetween: 0,
          order: 'desc',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parser: tsparser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      perfectionist,
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsparser,
    },
    files: ['*.config.{js,ts}', 'vite.config.ts'],
  },
];
