const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const SvgStore = require('webpack-svgstore-plugin');



var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

module.exports = {
	devtool: 'source-map',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.scss/,
				loader: 'import-glob-loader'
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [autoprefixer]
								},
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							publicPath: 'img/'
						}
					}
				]
			}
		]
	},
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new CleanWebpackPlugin(['dist']),
		new OpenBrowserPlugin(),
		new SvgStore({
			// svgo options
			svgoOptions: {
				plugins: [
					{ removeTitle: true }
				]
			},
			prefix: 'icon-'
		})
	]
};