// Imports & supporting NPM modules
const router = require("express").Router();
const { UserProgress, Quizzes, Users } = require("../../models");

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

// Route to GET user progress by user ID
router.get("/", async (req, res) => {
	try {
		// Check if user is logged in
		if (!req.session.logged_in) {
			return res.redirect("/login");
		}
		const userId = req.session.user_id;

		// Find the user with associated UserProgress and Quizzes
		const userProgresses = await UserProgress.findAll({
			where: { user_id: userId },
			attributes: ["user_id", "quiz_id", "progress_status", "quiz_scores"],
			include: [
				{
					model: Quizzes,
					attributes: ["id", "topic"],
				},
			],
		});

		if (!userProgresses) {
			return res.status(404).json({ message: "User progress not found!" });
		}

		// Serializing data for Handlebars
		const quizzesData = userProgresses.map((progress) => {
			return {
				id: progress.quiz ? progress.quiz.id : "Not Available",
				topic: progress.quiz ? progress.quiz.topic : "Not Attempted",
				progressStatus: progress.progress_status || "Not Started",
				quizScore: progress.quiz_scores || "No Score",
			};
		});

		// Rendering user progress template with data to user
		res.render("userProgress", {
			quizzesData,
			user: { id: userId, name: req.session.username },
			on_userProgressPage: true,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
