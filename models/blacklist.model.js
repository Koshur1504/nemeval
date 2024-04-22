const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectdb");

const blaclistModel = sequelize.define("blacklist", {
  token: { type: DataTypes.STRING, allowNull: false },
});

// blaclistModel.sync({ alter: true });

module.exports = { blaclistModel };
