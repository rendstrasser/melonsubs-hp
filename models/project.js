var config = require('../server/config.js');
var utils = require('../server/utils.js');
var prepareForDb = utils.prepareForDb;

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define('Project', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		originalName: DataTypes.STRING,
		releaseDate: DataTypes.STRING,
		description: DataTypes.STRING(2000),
		genres: DataTypes.STRING,
		studio: DataTypes.STRING,
		homepage: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		aniDbLink: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		aniSearchLink: { 
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		malLink: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		type: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: config.allowedProjectTypes
		},
		status: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: config.allowedProjectStatuses
		},
		coverImgPath: DataTypes.STRING,
		avatarImgPath: DataTypes.STRING,
		headerImgPath: DataTypes.STRING,
		releasePreviewImgPath: DataTypes.STRING,
		projectPreviewImgPaths: DataTypes.ARRAY(DataTypes.TEXT),
		projectPreviewVidPaths: DataTypes.ARRAY(DataTypes.TEXT),
		published: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		underscored: true,
		classMethods: {
			buildFromRequest: function(req) {
				var project = {
					name: req.body.name,
					originalName: prepareForDb(req.body.originalName),
					description: prepareForDb(req.body.description),
					type: req.body.type,
					status: req.body.status,
					published: (req.body.published == "true"),
					releaseDate: prepareForDb(req.body.releaseDate),
					genres: prepareForDb(req.body.genre),
					studio: prepareForDb(req.body.studio),
					homepage: prepareForDb(req.body.homepage),
					aniDbLink: prepareForDb(req.body.anidbLink),
					aniSearchLink: prepareForDb(req.body.anisearchLink),
					malLink: prepareForDb(req.body.malLink),
				}

				if (req.file) {
					project.coverImgPath = req.file.filename;
				}

				return project;
			}
		}
	});

	return Project;
}
