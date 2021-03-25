module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/recommended',
		'@vue/airbnb',
		'plugin:prettier/recommended',
		'prettier/vue',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-underscore-dangle': 'off',
		'no-param-reassign': 'off',
	},
}
