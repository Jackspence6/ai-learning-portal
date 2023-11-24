// Imports & supporting NPM modules
const router = require("express").Router();
const { Tutorials } = require("../../models");

// Route to get all Tutorials
router.get("/", async (req, res) => {
	try {
		const tutorialData = await Tutorials.findAll({
			attributes: ["id", "title", "image_url", "youtube_url", "description"],
		});

		// Serializing data so the template can read it
		const tutorials = tutorialData.map((tutorial) =>
			tutorial.get({ plain: true })
		);

		// Passing serialized data into the Handlebars template
		res.render("tutorials", {
			tutorials,
			on_tutorialPage: true,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
