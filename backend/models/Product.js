import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, default: 'Generic' },
    image: { type: String },
    images: [{ type: String }],
    description: { type: String, default: '' },
    category: { type: String, enum: ['Mens', 'Womens', 'Kids' ,'Regular','clocks'], required: true },
    subCategory: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    strapMaterial: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    newArrival: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    isGift: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);


