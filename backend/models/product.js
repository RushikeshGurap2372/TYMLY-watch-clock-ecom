import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  brand_name: String,
  price: Number,
  gender: String,
  rating: Number,
  description: String,
  image: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
