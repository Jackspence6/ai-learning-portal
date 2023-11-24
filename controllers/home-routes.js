// Imports & supporting NPM modules
const router = require("express").Router();
const {
	Users,
	UserProgress,
	Tutorials,
	Quizzes,
	ExampleCode,
} = require("../models");
require("./home-routes");

// Route to display homepage
router.get("/", (req, res) => {
	res.render("homepage", {
		logged_in: req.session.logged_in,
		on_homepage: true,
	});
});

// Exports
module.exports = router;
