const bcrypt = require("bcrypt");
const { SALT, JWT_SECRET } = require("../config/varaibles");
const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");
const { userModel } = require("../models/users.model");
const { blaclistModel } = require("../models/blacklist.model");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, SALT);
    const user = await userModel.create({ username, email, password: hash });
    const accessToken = createToken(user);
    return res.status(StatusCodes.CREATED).send({ error: false, accessToken });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    const hash = user.password;
    const isValid = bcrypt.compareSync(password, hash);
    if (!isValid) throw new Error("Wrong password");
    const accessToken = createToken(user);
    return res.status(StatusCodes.OK).send({ error: false, accessToken });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.logoutUser = async (req, res) => {
  const { accessToken } = req;
  try {
    await blaclistModel.create({ token: accessToken });
    return res
      .status(StatusCodes.OK)
      .send({ error: false, message: "Logout Successfull" });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

const createToken = (user) => {
  return jsonwebtoken.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
};

const sendBadResponse = (error, res) => {
  console.log(error);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: error.message });
};

exports.sendBadResponse = sendBadResponse;
