const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/varaibles");
const { blaclistModel } = require("../models/blacklist.model");
const { userModel } = require("../models/users.model");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(" ")[1];
  try {
    const data = jsonwebtoken.verify(accessToken, JWT_SECRET);
    const isBlackListed = await blaclistModel.findOne({
      where: { token: accessToken },
    });
    if (isBlackListed) throw new Error("Token not valid");
    const id = data.id;
    const user = await userModel.findByPk(id);
    if (!user) req.user = user;
    req.accessToken = accessToken;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: true, message: error.message });
  }
};

module.exports = { auth };
