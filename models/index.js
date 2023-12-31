// Imports
const Users = require("./Users");
const UserProgress = require("./UserProgress");
const Tutorials = require("./Tutorials");
const Quizzes = require("./Quizzes");
const ExampleCode = require("./ExampleCode");

// Associations between Models

// User to UserProgress (One-to-Many)
Users.hasMany(UserProgress, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});
UserProgress.belongsTo(Users, {
	foreignKey: "user_id",
});

// Quiz to UserProgress (One-to-Many)
Quizzes.hasMany(UserProgress, {
	foreignKey: "quiz_id",
	onDelete: "CASCADE",
});
UserProgress.belongsTo(Quizzes, {
	foreignKey: "quiz_id",
});

// Tutorial to Quiz
Quizzes.belongsTo(Tutorials, {
	foreignKey: "tutorial_id",
	allowNull: true,
});

// Tutorial to ExampleCode (One-to-Many)
Tutorials.hasMany(ExampleCode, {
	foreignKey: "tutorial_id",
	onDelete: "CASCADE",
});
ExampleCode.belongsTo(Tutorials, {
	foreignKey: "tutorial_id",
});

// Exports
module.exports = { Users, UserProgress, Tutorials, Quizzes, ExampleCode };
