import { populate } from "dotenv";
import Address from "../models/addressModel";
import OrderItem from "../models/orderItemsModel";
import Order from "../models/orderModel";
import { findUserCart } from "./cartService";

const createOrder = async (user, shippingAddress) => {
  let address;
  if (shippingAddress._id) {
    let existedAddress = await Address.findById(shippingAddress._id);
    address = existedAddress;
  } else {
    address = new Address(shippingAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  const cart = await findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createdOrder.save();
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "Placed";
  order.paymentDetails.status = "Completed";

  return await order.save();
};

const confirmOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "Confirmed";

  return await order.save();
};

const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "Shipped";

  return await order.save();
};

const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "Delivered";

  return await order.save();
};

const cancelOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "Cancelled";

  return await order.save();
};

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};

const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "Placed" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
};

const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

export {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
};
