const { StatusCodes } = require("http-status-codes");
const { eventModel } = require("../models/events.model");
const { sendBadResponse } = require("./users.controller");

exports.createEvent = async (req, res) => {
  const { name, venue, date, type } = req.body;
  if (!name || !venue || !venue || !type) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: true, message: "name ,venue and date are required" });
  }
  try {
    const event = await eventModel.create({ name, venue, date, type });
    res.status(StatusCodes.CREATED).send({ error: false, event });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await eventModel.update(req.body, { where: { id: id } });
    const event = await eventModel.findByPk(id);
    res.status(StatusCodes.ACCEPTED).send({ error: false, event });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.getEvents = async (req, res) => {
  let { page, limit, type, date } = req.query;
  limit = +limit || 5;
  page = +page || 1;
  const offset = (page - 1) * limit;
  const where = {};
  if (type) {
    where.type = type;
  }
  if (date) {
    where.date = date;
  }
  try {
    const events = await eventModel.findAll({
      where,
      offset,
      limit,
    });
    let total = await eventModel.count();
    return res
      .status(StatusCodes.OK)
      .send({ error: false, total, page: page || 1, limit, events });
  } catch (error) {
    sendBadResponse(error, res);
  }
};

exports.getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventModel.findByPk(id);
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
