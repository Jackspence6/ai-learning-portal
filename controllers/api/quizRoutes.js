// Imports & supporting NPM modules
const router = require("express").Router();
const { Quizzes } = require("../../models");

// Route to GET all Quizzes
router.get("/", async (req, res) => {
	try {
		const quizData = await Quizzes.findAll({
			attributes: ["topic", "id"],
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
				"id",
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

		// Constructing the object to be sent to the frontend
		const quizToSend = {
			id: quiz.id,
			tutorial_id: quiz.tutorial_id,
			questions: quiz.questions,
			answers: quiz.answers,
			topic: quiz.topic,
			correct_answers: quiz.correct_answers,
		};

		// Passing serialized data into the Handlebars template
		res.render("individualQuiz", {
			quizzes: quizToSend,
			logged_in: req.session.logged_in,
			on_singleQuiz: true,
			correctAnswersJSON: JSON.stringify(quizToSend.correct_answers),
		});

		// Saving session
		req.session.save(() => {
			req.session.quiz_id = quizToSend.id;
			req.session.logged_in = true;
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
