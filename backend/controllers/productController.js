import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;
  
  // Basic filters
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
  
  // Handle single or comma-separated categories using $in
  const categoryParam = req.query.category;
  const category = categoryParam
    ? { category: { $in: categoryParam.split(',') } }
    : {};
    
  const subCategory = req.query.subCategory ? { subCategory: req.query.subCategory } : {};
  const isNewArrival = req.query.isNewArrival ? { newArrival: req.query.isNewArrival === 'true' } : {};
  const onSale = req.query.onSale ? { onSale: req.query.onSale === 'true' } : {};
  // ⚡️ NEW: Filter for isGift
  const isGift = req.query.isGift ? { isGift: req.query.isGift === 'true' } : {};
  
  // Price range filter
  const priceFilter = {};
  if (req.query.minPrice) priceFilter.$gte = Number(req.query.minPrice);
  if (req.query.maxPrice) priceFilter.$lte = Number(req.query.maxPrice);
  const price = Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};

  // Brand filter
  const brand = req.query.brands ? { brand: { $in: req.query.brands.split(',') } } : {};
  
  // Color filter (Assuming query 'colors' filters the singular 'color' field)
  const color = req.query.colors ? { color: { $in: req.query.colors.split(',') } } : {};
  
  // ⚡️ NEW: Filter for strapMaterial (Assuming query 'strapMaterials' is used)
  const strapMaterial = req.query.strapMaterials ? { strapMaterial: { $in: req.query.strapMaterials.split(',') } } : {};

  // Sort option
  let sortOption = {};
  const sortBy = req.query.sortBy;
  if (sortBy === 'price_asc') sortOption = { price: 1 };
  else if (sortBy === 'price_desc') sortOption = { price: -1 };
  else if (sortBy === 'newest') sortOption = { createdAt: -1 };
  else if (sortBy === 'top_rated') sortOption = { rating: -1 };
  
  // Combine all filters
  const filter = { ...keyword, ...category, ...subCategory, ...isNewArrival, ...onSale, ...isGift, ...price, ...brand, ...color, ...strapMaterial };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  return res.status(404).json({ message: 'Product not found' });
});

// Admin: create a new product
export const createProduct = asyncHandler(async (req, res) => {
  // ⚡️ CHANGES: Removed 'sizes'. Added 'strapMaterial' and 'isGift'.
  const { name, brand, image, images, description, category, subCategory, price, color, stock, discount, newArrival, onSale, strapMaterial, isGift } = req.body;
  const product = new Product({
    name,
    brand,
    image,
    images: images || [],
    description: description || '',
    category,
    subCategory: subCategory || '',
    price: Number(price) || 0,
    color,
    // ⚡️ NEW: Initialize strapMaterial
    strapMaterial: strapMaterial || [],
    stock: Number(stock) || 0,
    discount: Number(discount) || 0,
    newArrival: !!newArrival,
    onSale: !!onSale,
    // ⚡️ NEW: Initialize isGift
    isGift: !!isGift
  });
  const created = await product.save();
  return res.status(201).json(created);
});

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // example: await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
