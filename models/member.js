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
		favoriteAnime: DataTypes.STRING(1000),
		memberSince: DataTypes.STRING,
		additionalInfo: DataTypes.STRING(2000),
		profileImgPath: DataTypes.STRING,
	}, {
		underscored: true
	});

	return Member;
}