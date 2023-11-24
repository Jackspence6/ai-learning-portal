// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Quizzes extends Model {}

// Quizzes Model properties
Quizzes.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		tutorial_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "tutorials",
				key: "id",
			},
		},
		questions: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		answers: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		correct_answers: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "quizzes",
	}
);

// Exports
module.exports = Quizzes;
