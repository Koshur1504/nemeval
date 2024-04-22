const express = require("express");
const { auth } = require("../middlewares/authenticator.middleware");
const {
  createEvent,
  updateEvent,
  getEvents,
  getSingleEvent,
} = require("../controllers/event.controllers");
const eventRouter = express.Router();

eventRouter.use(auth);
eventRouter.post("/", createEvent);
eventRouter.patch("/:id", updateEvent);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getSingleEvent);

module.exports = { eventRouter };
