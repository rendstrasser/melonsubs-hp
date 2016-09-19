var config = require('../server/config.js');
var utils = require('../server/utils.js');
var prepareForDb = utils.prepareForDb;

module.exports = function(sequelize, DataTypes) {
	var Episode = sequelize.define('Episode', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		publishDate: DataTypes.DATE,
		published: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		articleContent: DataTypes.TEXT,
		downloads: DataTypes.ARRAY(DataTypes.JSONB)
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				Episode.belongsTo(models.Member, {as: 'Author', foreignKey: 'authorId'});
				Episode.belongsTo(models.Project, {foreignKey: 'projectId'});
			},
			buildFromRequest: function(req) {
				var episode = {
					title: req.body.title,
					publishDate: req.body.publishDate,
					published: req.body.published,
					authorId: req.body.authorId,
					articleContent: req.body.articleContent
				}

				return episode;
			}
		}
	});

	return Episode;
}
