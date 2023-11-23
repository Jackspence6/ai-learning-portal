// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ExampleCode extends Model {}

// ExampleCode Model properties
ExampleCode.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		tutorial_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "tutorials",
				key: "id",
			},
		},
		code_snippet: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "exampleCode",
	}
);

// Exports
module.exports = ExampleCode;
