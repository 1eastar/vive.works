module.exports = {
	root: true,
	globals: {
		JSX: 'readonly',
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'eslint:recommended',
	],
	rules: {
		'quotes': ['error', 'single'],
		'space-before-blocks': 'error',
		'comma-spacing': 'error',
		'object-curly-spacing': ['error', 'always'],
		'keyword-spacing': 'error',
		'space-in-parens': 'error',
		'no-unexpected-multiline': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off'
	},
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
