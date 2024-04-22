const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectdb");

const userModel = sequelize.define("users", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

// userModel.sync({ force: true });

module.exports = { userModel };
