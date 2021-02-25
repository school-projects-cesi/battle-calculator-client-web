module.exports = {
	publicPath:
		process.env.NODE_ENV === 'production'
			? process.env.VUE_APP_BASE_URL
			: `http://localhost:${process.env.VUE_APP_BASE_PORT}`,
	outputDir: `../dist${process.env.VUE_APP_BASE_URL}`,
	configureWebpack: {
		devServer: {
			headers: { 'Access-Control-Allow-Origin': '*' },
			historyApiFallback: true,
		},
	},
}
