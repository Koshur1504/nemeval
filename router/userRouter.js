const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/users.controller");
const { auth } = require("../middlewares/authenticator.middleware");
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/logout", auth, logoutUser);

module.exports = { userRouter };
