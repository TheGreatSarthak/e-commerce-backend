const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();

<<<<<<< HEAD
const mongoDBUrl = process.env.MONGO_URL;
=======
const mongoDBUrl =
  "";
>>>>>>> 9ca4824e5e20dbdae67a22f1d6c32c74b44198f8

const connectDB = () => {
  return mongoose.connect(mongoDBUrl);
};

module.exports = { connectDB };
