const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/varaibles");
const { connectDB } = require("./config/connectdb");
const { userRouter } = require("./router/userRouter");
const { eventRouter } = require("./router/eventRouter");
const { bookingRouter } = require("./router/bookingRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "OK" });
});

app.use("/user", userRouter);
app.use("/events", eventRouter);
app.use("/bookings", bookingRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server started on port ${PORT}`);
});
