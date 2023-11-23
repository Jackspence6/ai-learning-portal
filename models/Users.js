// Imports
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Users extends Model {
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

// Users Model properties
Users.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: 8,
			},
		},
		registration_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		last_login_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		hooks: {
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "users",
	}
);

// Exports
module.exports = Users;
