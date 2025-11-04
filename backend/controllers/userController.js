import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// ✅ Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      wishlist: user.wishlist,
      cart: user.cart,
      orders: user.orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      wishlist: user.wishlist,
      cart: user.cart,
      orders: user.orders,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// ✅ Fetch user profile (includes all info)
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      wishlist: user.wishlist,
      cart: user.cart,
      orders: user.orders,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  const { productId, name, image, price } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    const exists = user.wishlist.find((item) => item.productId.toString() === productId);
    if (exists) {
      res.status(400).json({ message: "Product already in wishlist" });
    } else {
      user.wishlist.push({ productId, name, image, price });
      await user.save();
      res.json(user.wishlist);
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, name, image, price, quantity } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    const item = user.cart.find((i) => i.productId.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({ productId, name, image, price, quantity });
    }
    await user.save();
    res.json(user.cart);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// ✅ Place Order
export const placeOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.orders.push({ orderItems, totalPrice });
    user.cart = []; // clear cart after placing order
    await user.save();
    res.json(user.orders);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
