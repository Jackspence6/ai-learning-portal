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
		tutorial_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "tutorials",
				key: "id",
			},
		},
		progress_status: {
			type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
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
		modelName: "UserProgress",
	}
);

// Exports
module.exports = UserProgress;
