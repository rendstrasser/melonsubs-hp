var moment = require('moment');

var config = require('./config.js');

module.exports.prepareForDb = function (value) {
	if (value) {
		return value.trim();
	}

	return null;
}

module.exports.injectDateStringAsUTCDate = function (request, valueExtractor, valueInjector) {
    const momentValue = moment.utc(valueExtractor(request), config.allowedDateFormats).add(request.body.timezoneOffset, 'minutes');

    if (momentValue.isValid()) {
        valueInjector(momentValue.format("YYYY-MM-DD HH:mm:ss z"));
    }
}