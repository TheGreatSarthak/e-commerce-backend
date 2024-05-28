import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const CartItem = model("cartItems", cartItemSchema);
export default CartItem;
