const mongoose = require("mongoose");

const mongoDBUrl =
  "mongodb+srv://sarthak2232:qhnafgKvCm61bcX2@cluster0.rbe1tcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
  return mongoose.connect(mongoDBUrl);
};

module.exports = { connectDB };
