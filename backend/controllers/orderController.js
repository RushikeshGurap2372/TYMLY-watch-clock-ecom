import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const newOrder = await Order.create({
      user: req.user._id,
      orderItems: cart.items,
      totalAmount: cart.totalPrice,
    });

    await Cart.deleteOne({ user: req.user._id }); // Clear cart
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
