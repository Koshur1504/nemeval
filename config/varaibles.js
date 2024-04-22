/* eslint-disable no-undef */
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const SALT = +process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  SALT,
  JWT_SECRET,
  DB_HOST,
  PORT,
};
