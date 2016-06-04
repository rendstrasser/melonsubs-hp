module.exports = {
	// General app info
	title: "Melon-Subs",

	// DB info
	dbHost: "localhost",
	dbPort: 5432,
	dbName: "melonsubs",
	dbUser: "melonsubs_admin_user",
	dbPassword: "mypassword",
	dbForceDrop: false,
	dbLog: false,

	// Project info
	allowedProjectTypes: ["Serie", "Film", "OVA", "OAD"],
	allowedProjectStatuses: ["Laufend", "Geplant", "Abgeschlossen", "Lizenziert", "Abgebrochen"],
}