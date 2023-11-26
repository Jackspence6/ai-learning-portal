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

// Route to GET single quiz by it's Id
router.get("/:id", async (req, res) => {
	try {
		const quizData = await Quizzes.findByPk(req.params.id, {
			attributes: [
				"tutorial_id",
				"questions",
				"answers",
				"correct_answers",
				"topic",
			],
		});

		// Checking if that Quiz exists
		if (!quizData) {
			res.status(404).json({ message: "No Quiz found with this Id!" });
			return;
		}

		// Serializing data so the template can read it
		const quiz = quizData.get({ plain: true });
		console.log(quiz);

		// Passing serialized data into the Handlebars template
		res.render("individualQuiz", {
			quizzes: quiz,
			logged_in: req.session.logged_in,
			on_singleQuiz: true,
			correctAnswers: quiz.correct_answers,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
