const Cart = require("../models/cartModel");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCart };
