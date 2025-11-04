import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      image: String,
      category: String,
    },
  ],
});

export default mongoose.model("Wishlist", wishlistSchema);
