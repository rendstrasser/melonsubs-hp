var moment = require('moment');
var marked = require('marked');

var config = require('../server/config.js');
var utils = require('../server/utils.js');
var prepareForDb = utils.prepareForDb;
var injectDateStringAsUTCDate = utils.injectDateStringAsUTCDate;

module.exports = function(sequelize, DataTypes) {
	var Article = sequelize.define('Article', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		published: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
        publishDate: {
            type: DataTypes.DATE,
            get: function()  {
                var dateValue = this.getDataValue('publishDate');
                if (dateValue) {
                    return moment.utc(dateValue).valueOf();
                }

                return null;
            },
        },
		content: DataTypes.TEXT
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				Article.belongsTo(models.Member, {as: 'Author', foreignKey: 'authorId'});
			},
			buildFromRequest: function(req) {
				var article = {
					title: prepareForDb(req.body.title),
					published: req.body.published,
					authorId: req.body.authorId,
					content: marked(req.body.content)
				};

                injectDateStringAsUTCDate(req, req => req.body.publishDate, dateValue => article.publishDate = dateValue);

				return article;
			}
		}
	});

	return Article;
};
