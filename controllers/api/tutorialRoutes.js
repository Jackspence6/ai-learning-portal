// Imports & supporting NPM modules
const router = require("express").Router();
const { Tutorials } = require("../../models");

// Route to get all Tutorials
router.get("/", async (req, res) => {
	try {
		// const tutorialData = await Tutorials.findAll();

		// Rendering Tutorials Page
		res.render("tutorials", {
			on_tutorialPage: true,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
