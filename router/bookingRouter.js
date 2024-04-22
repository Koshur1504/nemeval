const express = require("express");
const { auth } = require("../middlewares/authenticator.middleware");
const {
  getBookings,
  cancelBooking,
  getSingleBooking,
  addBooking,
} = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.use(auth);
bookingRouter.get("/", getBookings);
bookingRouter.get("/:id", getSingleBooking);
bookingRouter.patch("/:id", cancelBooking);
bookingRouter.post("/", addBooking);

module.exports = { bookingRouter };
