import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = model("reviews", reviewSchema);
export default Review;
