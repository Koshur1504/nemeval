const { Sequelize } = require("sequelize");
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = require("./varaibles");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = { connectDB ,sequelize};
