const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectdb");

const eventModel = sequelize.define("events", {
  name: { type: DataTypes.STRING, allowNull: false },
  venue: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  type: {
    type: DataTypes.ENUM,
    values: ["music", "sports", "culture"],
    allowNull: false,
  },
});

// eventModel.sync({ force: true });

module.exports = { eventModel };
