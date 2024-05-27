const mongoose = require("mongoose");

const mongoDBUrl =
  "";

const connectDB = () => {
  return mongoose.connect(mongoDBUrl);
};

module.exports = { connectDB };
