// Imports & supporting NPM modules
const router = require("express").Router();
const { Quizzes } = require("../../models");

// Route to GET all Quizzes
router.get("/", async (req, res) => {
	try {
		const quizData = await Quizzes.findAll({
			attributes: ["topic"],
		});

		// Serializing data so the template can read it
		const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));

		// Passing serialized data into the Handlebars template
		res.render("quizzes", {
			quizzes,
			on_quizPage: true,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
