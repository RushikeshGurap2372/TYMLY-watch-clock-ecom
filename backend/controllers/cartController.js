import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, image, quantity });
      }

      cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      await cart.save();
      res.json(cart);
    } else {
      const newCart = await Cart.create({
        user: req.user._id,
        items: [{ productId, name, price, image, quantity }],
        totalPrice: price * quantity,
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart is empty" });
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  await cart.save();
  res.json(cart);
};
