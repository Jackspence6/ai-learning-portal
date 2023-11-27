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

		const { quiz_id, progress_status, quiz_scores } = req.body;

		// Checking if quiz_id is provided
		if (!quiz_id) {
			return res.status(400).json({ error: "Quiz ID is required!" });
		}

		const newUserProgress = await UserProgress.create({
			user_id: userId,
			quiz_id: quiz_id,
			progress_status,
			quiz_scores,
		});

		console.log({ newUserProgress });

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
		const username = req.session.username;

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
				{
					model: Users,
					attributes: ["username"],
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
				quizScore: userProgress ? userProgress.quiz_scores + "%" : "N/A",
			};
		});

		// Rendering user progress to user
		res.render("userProgress", {
			quizzesData,
			user: { id: userId, name: username },
			on_userProgressPage: true,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
