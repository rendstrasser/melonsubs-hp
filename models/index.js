var Sequelize = require('sequelize');
var fs = require("fs");
var path = require("path")

var config = require('../server/config.js');

var logging = config.dbLog ? console.log : false;

var sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
	host: config.dbHost,
	port: config.dbPort,
	dialect:'postgres',
	logging: logging,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;