var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var babelRegister = require("babel-core/register");
var babelPolyfill = require("babel-polyfill");
var path = require("path");

var webpackConfig = require('../webpack.config.js');
var routes = require("./routes.js");
var models = require("../models")
var config = require("./config.js")
var dbSeed = require("./db-seed.js")

process.on('uncaughtException', function (err) {
	console.log(err);
})

var app = express();

var compiler = webpack(webpackConfig);

// webpack dev middleware
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, 
	publicPath: webpackConfig.output.publicPath 
}));
app.use(webpackHotMiddleware(compiler));

app.use(sassMiddleware({
	src: "./style",
	dest: "./dist",
	debug: true
}));


app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/media', express.static(path.resolve(__dirname, '../media')));

// Initializes server-side routing
routes(app);

var port = 3000;

models.sequelize.sync({force: config.dbForceDrop}).then(function () {
	dbSeed();

    app.listen(port, function(error) {
        if (error) {
			throw error;
		}
		console.log("Express server listening on port", port);
    });
});

