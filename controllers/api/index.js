// Imports & supporting NPM modules
const router = require("express").Router();

const userRoutes = require("./userRoutes");
const userProgressRoutes = require("./userProgressRoutes");
const quizRoutes = require("./quizRoutes");
const tutorialRoutes = require("./tutorialRoutes");
const exampleCodeRoutes = require("./exampleCodeRoutes");

// Middleware
router.use("/users", userRoutes);
router.use("/progress", userProgressRoutes);
router.use("/quizzes", quizRoutes);
router.use("/tutorials", tutorialRoutes);
router.use("/examples", exampleCodeRoutes);

// Catch-all route for any unmatched API routes, returning a 404 JSON response.
router.get("/*", (req, res) => {
	res.status(404).json({
		message: "Not Found!",
		error: "The requested endpoint does not exist!",
	});
});

// Exports
module.exports = router;
