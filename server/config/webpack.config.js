var path = require("path")
var webpack = require("webpack")

module.exports = {
	devtool: "inline-source-map",
	entry: [
		"babel-polyfill",
		"webpack-hot-middleware/client",
		path.resolve(__dirname, "./../../client/index.js")
	],
	output: {
		path: path.resolve(__dirname, "./../../build/"),
		filename: "bundle.js",
		publicPath: "/"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css?$/,
				loaders: ["style-loader", "css-loader"]
			}
		]
	}
}
