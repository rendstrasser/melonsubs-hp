var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtools: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		path.resolve(__dirname, './client/client.js')
	],
	output: {
		path: path.resolve('./dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Hammer: "hammerjs/hammer"
        })
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'react-hmre']
				}
			},
			{
				test: /\.scss$/,
				loaders: [
					"style", 
					"css", 
					"sass?includePaths[]="+ path.resolve(__dirname, 'client', 'lib', 'core', 'style', 'mixins')
				]
			},
			{
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loaders: ["file"]	
			}
		],
	},
	resolve: {
		root: [
			path.resolve("./client/lib"),
			path.resolve("./images")
		],
		extensions: ["", ".js", ".jsx"]
	}
}