// routes/productRoutes.js
import express from "express";
import { getProducts, addProducts } from "../controllers/productController.js";

const router = express.Router();

// ✅ GET all products
router.get("/", getProducts);

// ✅ POST product(s)
router.post("/", addProducts);

export default router;
