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

// Route to GET user progress by user ID
router.get("/", async (req, res) => {
	try {
		if (!req.session.logged_in) {
			return res.redirect("/login");
		}
		const userId = req.session.user_id;

		// Fetching all quizzes
		const allQuizzes = await Quizzes.findAll({
			attributes: ["id", "topic"],
		});

		// Fetching user progress
		const userProgresses = await UserProgress.findAll({
			where: { user_id: userId },
			include: [
				{
					model: Quizzes,
					attributes: ["id"],
				},
			],
		});

		// Mapping over progress to a dictionary for simplified data collecting
		const progressDict = userProgresses.reduce((acc, progress) => {
			if (progress.quiz && progress.quiz.id !== undefined) {
				acc[progress.quiz.id] = progress;
			}
			return acc;
		}, {});

		// Combining all quizzes with user's progress data
		const quizzesData = allQuizzes.map((quiz) => {
			const userProgress = progressDict[quiz.id];
			return {
				id: quiz.id,
				topic: quiz.topic,
				progressStatus: userProgress
					? userProgress.progress_status
					: "Not Attempted",
				quizScore: userProgress ? userProgress.quiz_scores : "No Score",
			};
		});

		// Rendering user progress to user
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
