
import Product from "../models/product.js";


export const getProducts = async (req, res) => {
  try {
    const { gender } = req.query; // Get gender from query params
    let filter = {};

    if (gender) {
      filter.gender = gender; // Filter products by gender
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const addProducts = async (req, res) => {
  try {
    const products = req.body; // can be single object or array
    let result;

    if (Array.isArray(products)) {
      result = await Product.insertMany(products);
    } else {
      result = await Product.create(products);
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
