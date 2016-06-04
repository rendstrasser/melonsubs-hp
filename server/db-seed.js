var models = require('../models');
var config = require('./config.js');

module.exports = function() {
	if (!config.dbForceDrop) {
		return;
	}

	models.Member.create({
		email: "test@test.at",
		password: "5F4DCC3B5AA765D61D8327DEB882CF99",
		name: "Admin",
		role: "Admin",
		profileImgPath: "admin-profile-pic.png"
	});
}
