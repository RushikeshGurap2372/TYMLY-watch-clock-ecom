import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      image: String,
    },
  ],
  totalPrice: { type: Number, required: true },
});

export default mongoose.model("Cart", cartSchema);
