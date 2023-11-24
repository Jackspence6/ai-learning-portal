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

// Route to redirect user to login page if not already logged in
router.get("/login", async (req, res) => {
	try {
		if (req.session.logged_in) {
			res.redirect("/");
			return;
		}
		res.render("login");
	} catch (err) {
		res.status(400).json(err);
	}
});

// Exports
module.exports = router;
