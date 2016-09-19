var config = require('../server/config.js');

module.exports = function(sequelize, DataTypes) {
	var Member = sequelize.define('Member', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		role: {
			type: DataTypes.ENUM,
			defaultValue: "Consumer",
			values: ["Admin", "Member", "Consumer"]
		},
		showOnTeampage: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		favoriteGenres: DataTypes.STRING,
		favoriteAnime: DataTypes.STRING,
		memberSince: DataTypes.STRING,
		additionalInfo: DataTypes.TEXT,
		profileImgPath: DataTypes.STRING,
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				Member.hasMany(models.Article, {foreignKey: 'authorId'});
			}
		}
	});

	return Member;
}