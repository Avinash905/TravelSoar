const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotels");
const roomRouter = require("./routes/rooms");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use(express.static(path.join(__dirname, "./client/build")));

app.use((error, req, res, next) => {
  const errStatus = error.status || 500;
  const errMessage = error.message || "Something went wrong";
  return res.status(errStatus).send({
    message: errMessage,
    status: errStatus,
    stack: error.stack,
    success: false,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {});
