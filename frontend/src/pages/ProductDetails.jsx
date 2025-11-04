import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Make sure this path is correct relative to your ProductDetails.jsx location
import productsData from "../assets/data/product.json"; 
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { CartContext } from "../context/cartcontext"; // Import CartContext

const ProductDetails = () => {
  // 1. Hooks Initialization
  // The parameter name 'id' MUST match the route path: /product/:id
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(CartContext);

  // 2. State for the selected product
  const [product, setProduct] = useState(null);

  // 3. Effect to fetch product data on component mount or ID change
  useEffect(() => {
    // Convert the URL parameter 'id' (a string) to a number for comparison
    const productIdNum = parseInt(id); 

    const foundProduct = productsData.find(
      (p) => p.id === productIdNum
    );

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Handle product not found (e.g., redirect to a 404 page or product list)
      navigate("/shop"); 
    }
  }, [id, navigate]); // Depend on 'id' and 'navigate'

  // 4. Loading State Check
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 pt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Product not found or loading...
        </h2>
      </div>
    );
  }

  // 5. Handlers for Cart and Wishlist
  const handleAddToCart = () => {
    addToCart(product);
    // Navigate to the cart page after adding, as requested
    
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    // Navigate to the wishlist page after adding, as requested
    
  };

  const handleToBuyNow= () => {
    addToCart(product);
   
    navigate("/cart"); 
    
    
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page (e.g., /shop)
        className="flex items-center text-gray-600 hover:text-gray-800 transition mb-6 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      {/* Product Details Layout (Grid for side-by-side) */}
      <div className="bg-gray-100 rounded-xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 border border-gray-100">
        
        {/* Left: Product Image Section */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[400px] object-cover"
            
          />
          <button
                          onClick={handleAddToWishlist}
                          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
                        >
                          <Heart size={18} className="text-red-500" />
                        </button>
        </div>

        {/* Right: Product Details and Actions */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase mb-1">
              {product.brand_name}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-red-600">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500">
                ({product.gender}'s)
              </span>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <p className="text-gray-700 flex items-center">
                <span className="font-medium mr-2">Rating:</span> 
                {product.rating} / 5
              </p>
              
              <h3 className="font-bold text-xl text-gray-800 pt-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center bg-black text-white font-semibold py-3 px-6  hover:bg-white hover:text-black hover:border-black transition duration-300 transform hover:scale-[1.01]"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>

            <button
              onClick={handleToBuyNow}
              className="flex items-center justify-center bg-white text-black border-black font-semibold py-3 px-6 hover:bg-black hover:text-white transition duration-300 shadow-md w-1/3"
            >
              
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;