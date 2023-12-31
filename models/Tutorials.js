// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Tutorials extends Model {}

// Tutorials Model properties
Tutorials.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		youtube_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		topic: {
			type: DataTypes.ENUM,
			values: [
				"Supervised Learning",
				"Unsupervised Learning",
				"Deep Learning",
				"Ensemble Learning",
				"Dimensionality Reduction",
				"Clustering",
				"Decision Tree",
				"Bayesian",
				"Neural Network",
				"Reinforcement Learning",
				"Natural Language Processing",
				"Computer Vision",
			],
			allowNull: false,
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		date_updated: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "tutorials",
	}
);

// Exports
module.exports = Tutorials;
