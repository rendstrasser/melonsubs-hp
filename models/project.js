var config = require('../server/config.js');
var utils = require('../server/utils.js');
var prepareForDb = utils.prepareForDb;

// extracts file paths which are provided by multer
// by using the method .fields()
function addFilePathIfPresent(req, project, field, projectField) {
	if (!req.files) {
		return null;
	}

	if (!req.files[field] || !req.files[field][0]) {
		return null;
	}

	project[projectField] = req.files[field][0].filename;
}

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
		description: DataTypes.TEXT,
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
			associate: function(models) {
				Project.hasMany(models.Episode, {foreignKey: 'projectId'});
			},
			buildFromRequest: function(req) {
				var project = {
					name: req.body.name,
					originalName: prepareForDb(req.body.originalName),
					description: prepareForDb(req.body.description),
					type: req.body.type,
					status: req.body.status,
					published: (req.body.published == "true"),
					releaseDate: prepareForDb(req.body.releaseDate),
					genres: prepareForDb(req.body.genres),
					studio: prepareForDb(req.body.studio),
					homepage: prepareForDb(req.body.homepage),
					aniDbLink: prepareForDb(req.body.anidbLink),
					aniSearchLink: prepareForDb(req.body.anisearchLink),
					malLink: prepareForDb(req.body.malLink)
				}

				addFilePathIfPresent(req, project, "cover", "coverImgPath");
				addFilePathIfPresent(req, project, "avatar", "avatarImgPath");
				addFilePathIfPresent(req, project, "header", "headerImgPath");
				addFilePathIfPresent(req, project, "release-preview", "releasePreviewImgPath");

				return project;
			}
		}
	});

	return Project;
}
