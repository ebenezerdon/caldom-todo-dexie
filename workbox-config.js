module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,html,js}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};