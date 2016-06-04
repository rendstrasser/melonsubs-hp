module.exports.prepareForDb = function (value) {
	if (value) {
		return value.trim();
	}

	return null;
}

module.exports.convertToDate = function (dateString) {
	if (!dateString) {
		return null;
	}

	// TODO: validation
	var dateParts = dateString.split(".");

	return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
}

module.exports.convertFromDate = function(date) {
	if (!date) {
		return null;
	}

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	return day + "." + month + "." + year;
}