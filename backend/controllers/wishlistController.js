import Wishlist from "../models/wishlistModel.js";

// ➕ Add item to wishlist
export const addToWishlist = async (req, res) => {
  const { productId, name, price, image, category } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      const itemExists = wishlist.items.some(
        (item) => item.productId.toString() === productId
      );

      if (itemExists) {
        return res.status(400).json({ message: "Item already in wishlist" });
      } else {
        wishlist.items.push({ productId, name, price, image, category });
      }

      await wishlist.save();
      res.json(wishlist);
    } else {
      const newWishlist = await Wishlist.create({
        user: req.user._id,
        items: [{ productId, name, price, image, category }],
      });
      res.status(201).json(newWishlist);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get all wishlist items
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist is empty" });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Clear entire wishlist
export const clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
