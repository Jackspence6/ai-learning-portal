// Imports & supporting NPM modules
const router = require("express").Router();
const { UserProgress, Quizzes } = require("../../models");

// Route to save user quiz results and quiz status
router.post("/", async (req, res) => {
	// Checking if user is logged in
	if (!req.session.logged_in) {
		return res
			.status(401)
			.send("You must be logged in to save your quiz results!");
	}

	try {
		const userId = req.session.user_id;
		const quizId = req.session.quiz_id;

		const { progress_status, quiz_scores } = req.body;

		const newUserProgress = await UserProgress.create({
			user_id: userId,
			quiz_id: quizId,
			progress_status,
			quiz_scores,
		});

		res
			.status(200)
			.json({ message: "Quiz results saved successfully!", newUserProgress });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
