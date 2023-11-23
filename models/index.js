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

// Tutorial to UserProgress (One-to-Many)
Tutorials.hasMany(UserProgress, {
	foreignKey: "tutorial_id",
	onDelete: "CASCADE",
});
UserProgress.belongsTo(Tutorials, {
	foreignKey: "tutorial_id",
});

// Tutorial to Quiz (One-to-Many)
Tutorials.hasMany(Quizzes, {
	foreignKey: "tutorial_id",
	onDelete: "CASCADE",
});
Quizzes.belongsTo(Tutorials, {
	foreignKey: "tutorial_id",
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
