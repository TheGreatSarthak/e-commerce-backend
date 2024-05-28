import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "Customer",
  },
  mobile: {
    type: String,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "paymentInformation",
    },
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("users", userSchema);
export default User;
