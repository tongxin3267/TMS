//path
var path = require('path')

//webpack
var webpack = require('webpack')
var merge = require('webpack-merge')

//plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CompressionWebpackPlugin = require('compression-webpack-plugin')

//tools
var utils = {
	assetsPath: function(_path) {
		return path.posix.join('static', _path)
	},
	cssLoaders: function(options) {
		options = options || {}

		var cssLoader = {
			loader: 'css-loader',
			options: {
				minimize: true,
				sourceMap: options.sourceMap
			}
		}

		function generateLoaders(loader, loaderOptions) {
			var loaders = [cssLoader]
			if (loader) {
				loaders.push({
					loader: loader + '-loader',
					options: Object.assign({}, loaderOptions, {
						sourceMap: options.sourceMap
					})
				})
			}

			if (options.extract) {
				return ExtractTextPlugin.extract({
					use: loaders,
					fallback: 'vue-style-loader'
				})
			} else {
				return ['vue-style-loader'].concat(loaders)
			}
		}

		return {
			css: generateLoaders(),
			postcss: generateLoaders(),
			less: generateLoaders('less'),
			sass: generateLoaders('sass', {
				indentedSyntax: true
			}),
			scss: generateLoaders('sass'),
			stylus: generateLoaders('stylus'),
			styl: generateLoaders('stylus')
		}
	},
	styleLoaders: function(options) {
		var output = []
		var loaders = this.cssLoaders(options)
		for (var extension in loaders) {
			var loader = loaders[extension]
			output.push({
				test: new RegExp('\\.' + extension + '$'),
				use: loader
			})
		}
		return output
	}
}

//resolve path
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

//webpack base config
var baseWebpackConfig = {
	entry: {
		app: resolve('src/bundle.js')
	},
	output: {
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
		publicPath: './'
	},
	devtool: '#source-map',
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.runtime.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: utils.cssLoaders({
						sourceMap: true,
						extract: true
					}),
					transformToRequire: {
						video: 'src',
						source: 'src',
						img: 'src',
						image: 'xlink:href'
					}
				}
			}, 
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			}, 
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			}, 
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			}, 
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
			  	NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css')
		}),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: 'static',
			ignore: ['.*']
		}]),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				['js', 'css'].join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})		
	]
}

//style loaders
var webpackConfig = merge(baseWebpackConfig, {
	module: {
	    rules: utils.styleLoaders({
	      sourceMap: true,
	      extract: true
	    })
  	}
})

module.exports = webpackConfig