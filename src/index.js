const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const authRouters = require("./routes/authRoute");
app.use("/auth", authRouters);

const userRouters = require("./routes/userRoute");
app.use("/users", userRouters);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to ecommerce api", status: true });
});

module.exports = app;
