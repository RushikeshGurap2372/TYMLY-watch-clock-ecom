import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  addToWishlist,
  addToCart,
  placeOrder,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

router.post("/wishlist", protect, addToWishlist);
router.post("/cart", protect, addToCart);
router.post("/order", protect, placeOrder);

export default router;
