// Imports & supporting NPM modules
const sequelize = require("../config/connection");
const {
	Users,
	UserProgress,
	Tutorials,
	Quizzes,
	ExampleCode,
} = require("../models");

const userData = require("./userData.json");
const tutorialData = require("./tutorialData.json");
const quizData = require("./quizData.json");
const userProgressData = require("./userProgressData.json");
const exampleCodeData = require("./exampleCodeData.json");

const seedDatabase = async () => {
	// Reset db
	await sequelize.sync({ force: true });

	// Seeding Users
	await Users.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	// Seeding Tutorials
	await Tutorials.bulkCreate(tutorialData);

	// Seeding Quizzes
	await Quizzes.bulkCreate(quizData);

	// Seeding UserProgress
	await UserProgress.bulkCreate(userProgressData);

	// Seeding ExampleCode
	await ExampleCode.bulkCreate(exampleCodeData);

	console.log("All tables have been successfully seeded!🌱");
};

// Calling the seedDatabase function
seedDatabase()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌Failed to seed database:", err);
		process.exit(1);
	});
