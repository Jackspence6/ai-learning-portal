// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserProgress extends Model {}

// UserProgress Model properties
UserProgress.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
		},
		quiz_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "quizzes",
				key: "id",
			},
		},
		progress_status: {
			type: DataTypes.ENUM("Not Started", "Completed"),
			allowNull: false,
		},
		quiz_scores: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "userProgress",
	}
);

// Exports
module.exports = UserProgress;
