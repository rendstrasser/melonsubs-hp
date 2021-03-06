var multer = require('multer');
var crypto = require("crypto");
var mime = require("mime");
var path = require('path');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var models = require('../models/')
var sequelize = models.sequelize;
var Sequelize = models.Sequelize;
var serverConfig = require("./config.js");

function initMulter() {
	var storage = multer.diskStorage({
	  	destination: './media',
	  	filename: function (req, file, cb) {
	   		crypto.pseudoRandomBytes(16, function (err, raw) {
	     		cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
	    	});
	 	}
	});

	return multer({ storage: storage })
}

function whereCaseInsensitive(colName, searchValue) {
	return Sequelize.where(Sequelize.fn('lower', Sequelize.col(colName)), searchValue.toLowerCase());
}

function initPassport() {
	passport.serializeUser(function (user, done) {
    	done(null, { id: user.id, name: user.name, role: user.role, profileImgPath: user.profileImgPath });
	});

	passport.deserializeUser(function (user, done) {
		done(null, user)
	});

	passport.use('local', new LocalStrategy(
		{ usernameField: 'email' },
		function (email, password, done) {
			models.Member.findOne({
			  	where: {
			  		$and: [
			  			whereCaseInsensitive("email", email),
			  			whereCaseInsensitive("password", password),
			  			{ $or: [{ role: "Admin" }, { role: "Member"}] }
			  		]
			  	},
			  	attributes: ['id', 'name', 'role', 'profileImgPath']
			})
			.then(authenticationQueryCallback(done))
			.catch(authenticationError(done));
 		}
    ));
}

function authenticationError(done) {
	return function(err) {
		done(err);
	}
}

function authenticationQueryCallback(done) {
	return function(member) {
		if (member == null) {
			done(null, false, { message: "Authentication failed: Member not found" });
			return;
		}

		done(null, member);
	}
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.json({ error: "Please login to request data."});
}

function extractReturnedDbObject(result) {
    console.log(result);
    console.log(result[1]);
	return result[1][0].dataValues;
}

module.exports = (app) => {
	var upload = initMulter();
	
	initPassport();

    app.use(session({
	    secret: "something-secret",
	    resave: true,
	    saveUninitialized: false,
	    store: new SequelizeStore({
	    	db: sequelize
	    })
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/auth/login',	upload.array(), passport.authenticate('local', { 
			failureRedirect: '/auth/login/failure'
	}), (req, res) =>  {
		res.json({ 
        	state: 'success', 
        	user: req.user ? req.user : null
        });
	});

    app.get('/auth/login/failure', (req, res) => {
        res.json({ 
        	state: 'failure', 
        	user: null 
        });
    });
    app.get('/auth/logout', (req, res) => {
	  	req.logout();
	});

	var router = express.Router();

	router.get('/initialData', (req, res) => {
        var result = {
            'user': req.user,
            'title': serverConfig.title,
            'allowedProjectTypes': serverConfig.allowedProjectTypes,
            'allowedProjectStatuses': serverConfig.allowedProjectStatuses,
        };

        Promise.all([models.Project.findAll(), models.Article.findAll()])
            .then(values => {
                result.projects = values[0];
                result.articles = values[1];

                res.json(result);
            });
	});

	// Project routing

	const projectImageMulterFields = [
		{ name: 'cover', maxCount: 1 },
		{ name: 'header', maxCount: 1 },
		{ name: 'release-preview', maxCount: 1 },
		{ name: 'avatar', maxCount: 1 },
	]

	router.post('/project/', upload.fields(projectImageMulterFields), (req, res) => {
		models.Project
			.create(models.Project.buildFromRequest(req))
			.then((project) => {
	        	res.json({project: project});
        	});
	});

	router.put('/project/:id', upload.fields(projectImageMulterFields), (req, res) => {
		models.Project
			.update(
				models.Project.buildFromRequest(req),
				{ 
			    	where: {id: req.params.id},
			    	returning: true
			  	}
			)
			.then((result) => {
				res.json({project: extractReturnedDbObject(result)});
			});
	});

	router.delete('/project/:id', function(req, res) {
		models.Project
			.findById(req.params.id)
			.then((project) => {
				project
					.destroy()
					.then(function(deletedProject) {
						res.json({project: deletedProject});
					});
			});
	});

	// Article routing

	router.post('/article/', upload.array(), (req, res) => {
		models.Article
			.create(models.Article.buildFromRequest(req))
			.then((article) => {
	        	res.json({article: article});
        	});
	});

	router.put('/article/:id', (req, res) => {
		models.Article
			.update(
				models.Article.buildFromRequest(req),
				{ 
			    	where: {id: req.params.id},
			    	returning: true
			  	}
			)
			.then((result) => {
				res.json({article: extractReturnedDbObject(result)});
			});
	});

	router.delete('/article/:id', function(req, res) {
		models.Article
			.findById(req.params.id)
			.then((article) => {
				project
					.destroy()
					.then(function(deletedArticle) {
						res.json({article: deletedArticle});
					});
			});
	});

	app.use('/internal', isLoggedIn, router);

	app.use('*', (req, res) => {
	    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
	});
}