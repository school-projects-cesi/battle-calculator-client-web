module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '.',
	outputDir:
		process.env.NODE_ENV === 'production' ? `../dist${process.env.VUE_APP_BASE_URL}` : 'dist',
}
