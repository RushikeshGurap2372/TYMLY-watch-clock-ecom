import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

const RecommendedProductsCustom = () => {
  const { addToCart } = useCart();
  const { toggle, isWished } = useWishlist();

  // Updated products data to reflect watch/clock theme
  const products = [
  {
    id: "690e4f8aaac9bf7cb4cc0d8f",
    image: 'https://res.cloudinary.com/dbt2bu4tg/image/upload/unnamed_jr7yam.jpg',
    alt: 'Titan Edge Ceramic Quartz in Rich Black Dial Watch for Men',
    isTopSeller: true,
    rating: 4,
    reviews: 2,
    title: 'Titan Edge Ceramic Quartz in Rich Black Dial...',
    subtitle: 'TITAN | Men\'s Watch',
    currentPrice: 2000,
    originalPrice: 2300,
    discount: '13% OFF',
    category: 'Premium'
  },
  {
    id: '690e516caac9bf7cb4cc1dcd',
    image: 'https://res.cloudinary.com/dbt2bu4tg/image/upload/v1762602879/Gemini_Generated_Image_kp0m2gkp0m2gkp0m_q78lfn.png',
    alt: 'Fastrack Optimus 2 Pro AMOLED Smartwatch',
    isTopSeller: true,
    rating: 4,
    reviews: 8,
    title: 'Fastrack Optimus 2 Pro AMOLED Smartwatch...',
    subtitle: 'Fastrack | Women\'s Smartwatch',
    currentPrice: 3999,
    originalPrice: 4399,
    discount: '9% OFF',
    category: 'Smart'
  },
  {
    id: '690e5389aac9bf7cb4cc2e38',
    image: 'https://res.cloudinary.com/dbt2bu4tg/image/upload/v1762715408/unnamed_dnfhdl.jpg',
    alt: 'Casio IQ-126-5B Wall Clock',
    isTopSeller: true,
    rating: 12,
    reviews: 34,
    title: 'Casio IQ-126-5B Simple Wall Clock...',
    subtitle: 'Casio | Home Clock',
    currentPrice: 999,
    originalPrice: 1098,
    discount: '9% OFF',
    category: 'Home'
  },
  {
    id: '690e57baaac9bf7cb4cc52c1',
    image: 'https://res.cloudinary.com/dbt2bu4tg/image/upload/v1762716117/unnamed_swjdgf.jpg',
    alt: 'Rolex Land-Dweller 40 Platinum Watch',
    isTopSeller: true,
    rating: 5,
    reviews: 89,
    title: 'Rolex Land-Dweller 40 Platinum Watch...',
    subtitle: 'ROLEX | Men\'s Premium Watch',
    currentPrice: 10000,
    originalPrice: 10999,
    discount: '9% OFF',
    category: 'Premium'
  }
];


  const toCartProduct = (p) => ({ _id: String(p.id), name: p.title, price: p.currentPrice, images: [p.image] });

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Recommended Timepieces</h2>
          <Link to="/shop" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200">View All Watches</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            // Card structure updated to match the simple, clean style of the image
            <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="block bg-white group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.alt} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {/* Top Seller tag like in the image */}
                {product.isTopSeller && (
                  <span className="absolute top-2 left-0 bg-indigo-800 text-white text-xs font-semibold px-3 py-1 z-10">BEST SELLER</span>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); toggle(String(product.id)); }}
                  aria-label="Add to favorites"
                  className="absolute top-2 right-2 p-2 rounded-full shadow-md bg-white/70 hover:bg-white transition-all duration-200 z-10"
                >
                  <Heart size={18} strokeWidth={1.5} className={isWished(String(product.id)) ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'} />
                </button>
              </div>
              
              <div className="p-2 sm:p-3">
                {/* Rating and Reviews - Placed at the top */}
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Star size={14} fill="gold" stroke="gold" className="mr-1" />
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span> 
                  <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>
                
                {/* Product Name */}
                <div className="text-sm font-medium text-gray-900 leading-tight">
                    {product.subtitle} 
                </div>
                <h3 className="text-sm text-gray-600 mb-2 leading-snug">
                    {product.title}
                </h3>
                
                {/* Price */}
                <div className="flex items-baseline">
                  <span className="text-base font-bold text-gray-900">₹{product.currentPrice.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Keeping 'Add to Cart' functionality for hidden action if needed, though removed button for design simplicity */}
                {/* Note: In a real app, clicking the card would navigate to the product page. */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProductsCustom;

