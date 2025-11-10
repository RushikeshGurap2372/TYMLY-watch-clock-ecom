import { Link } from 'react-router-dom';
// Star is added for the new design's rating display
import { Heart, ShoppingBag, Star } from 'lucide-react'; 
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';

// Utility function for consistent product object conversion for cart
const toCartProduct = (product) => ({
  _id: product._id,
  name: product.name,
  price: product.price,
  image: product.image || 'https://via.placeholder.com/600',
  qty: 1,
});

export default function ProductCard({ product }) {
  const { toggle, isWished } = useWishlist();
  const { addToCart } = useCart();

  const isProductWished = isWished(product._id);
  
  // Price and Discount Calculation (Logic preserved)
  const currentPrice = product.price;
  const originalPrice = product.discount 
    ? Math.round(product.price / (1 - product.discount / 100)) 
    : null;

  // Placeholder/Mock data for new design properties (adjust these based on your actual product object structure)
  const mockRating = product.rating || 4.5;
  const mockReviews = product.reviews || '250';
  const mockIsTopSeller = product.isTopSeller || false;
  const mockSubtitle = product.brand || 'Category Name';
  
  return (
    // The link wraps the entire card element as per the new design structure
    <Link 
      to={`/product/${product._id}`} 
      key={product._id} 
      className="block bg-white group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Image */}
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/600'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          loading="lazy"
        />
        
        {/* Top Seller tag */}
        {mockIsTopSeller && (
          <span className="absolute top-2 left-0 bg-indigo-800 text-white text-xs font-semibold px-3 py-1 z-10">BEST SELLER</span>
        )}
        
        {/* Wishlist Button (Functionality preserved) */}
        <button
          onClick={(e) => { 
            e.preventDefault(); // Prevents link navigation
            toggle(product._id); 
          }}
          aria-label="Add to favorites"
          className="absolute top-2 right-2 p-2 rounded-full shadow-md bg-white/70 hover:bg-white transition-all duration-200 z-10"
        >
          <Heart 
            size={18} 
            strokeWidth={1.5} 
            className={isProductWished ? 'fill-gray-700 text-gray-700' : 'text-gray-500 hover:text-gray-700'} 
          />
        </button>

        {/* Add to Cart Button on hover (Functionality preserved) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Important to stop link navigation
            addToCart(toCartProduct(product), 1);
          }}
          aria-label="Add to Cart"
          className="absolute bottom-0 left-0 right-0 py-2 bg-black/80 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0"
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingBag size={16} />
            <span>QUICK ADD</span>
          </div>
        </button>
      </div>
      
      <div className="p-2 sm:p-3">
        {/* Rating and Reviews */}
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Star size={14} fill="gold" stroke="gold" className="mr-1" />
          <span className="text-sm font-medium text-gray-700">{mockRating}</span> 
          <span className="text-xs text-gray-400 ml-1">({mockReviews})</span>
        </div>
        
        {/* Product Subtitle (Brand/Category) */}
        <div className="text-sm font-medium text-gray-900 leading-tight">
          {mockSubtitle}
        </div>
        
        {/* Product Title (Main Name) */}
        <h3 className="text-sm text-gray-600 mb-2 leading-snug">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-base font-bold text-gray-900">₹{currentPrice.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-xs text-gray-500 line-through ml-2">
                ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}