import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const mongoDBUrl = process.env.MONGO_URL;

const connectDB = () => {
  return mongoose.connect(mongoDBUrl);
};

export default connectDB;
