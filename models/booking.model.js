const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectdb");

const bookingModel = sequelize.define("bookings", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM,
    values: ["pending", "approved", "cancelled"],
    allowNull: false,
  },
  date: { type: DataTypes.DATEONLY, allowNull: false },
});

// bookingModel.sync({ alter: true });

module.exports = { bookingModel };
