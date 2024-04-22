const { StatusCodes } = require("http-status-codes");
const { bookingModel } = require("../models/booking.model");
const { sendBadResponse } = require("./users.controller");

exports.addBooking = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const booking = await bookingModel.create({
      userId,
      eventId,
      status: "pending",
      date: Date.now(),
    });
    return res.status(StatusCodes.CREATED).send({ error: false, booking });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await bookingModel.update({ status: "cancelled" }, { where: { id } });
    return res
      .status(StatusCodes.ACCEPTED)
      .send({ error: false, message: "Booking cancelled" });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.getBookings = async (req, res) => {
  let { page, limit, status } = req.query;
  limit = +limit || 5;
  page = +page || 1;
  const offset = (page - 1) * limit;
  const where = {};
  if (status) {
    where.type = status;
  }

  try {
    const events = await bookingModel.findAll({
      where,
      offset,
      limit,
    });
    let total = await bookingModel.count();
    return res
      .status(StatusCodes.OK)
      .send({ error: false, total, page: page || 1, limit, events });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.getSingleBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await bookingModel.findByPk(id);
    if (!id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: false, message: "Not found" });
    }
    res.status(StatusCodes.OK).send({ error: false, event });
  } catch (error) {
    sendBadResponse(error, res);
  }
};
