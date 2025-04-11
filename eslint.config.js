import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
const react = require('eslint-plugin-react');
const globals = require('globals');
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

module.exports = [
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		plugins: {
			react,
			js,
			reactHooks,
			reactRefresh,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'reactHooks/rules-of-hooks': 'error',
			'reactHooks/exhaustive-deps': 'warn',
			'reactRefresh/only-export-components': 'error',
		},
	},
];
