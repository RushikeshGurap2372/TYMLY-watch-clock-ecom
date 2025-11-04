import React, { useState, useEffect, useContext } from "react";
import { Heart } from "lucide-react";
import { CartContext } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]); // ✅ Start with empty array
  const { addToCart, addToWishlist } = useContext(CartContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("Fetched:", data);

        
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data) {
          setProducts([data]);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pt-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Explore Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id || item.id}
              onClick={() => handleCardClick(item.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
            >
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover transform group-hover:scale-105 transition duration-300"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(item);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
                >
                  <Heart size={18} className="text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg truncate">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.gender}</p>
                <p className="text-gray-500 text-sm">{item.brand_name}</p>
                <p className="text-gray-500 text-sm">⭐ {item.rating}</p>
                <p className="text-black font-bold text-md mt-2">
                  ₹{item.price}
                </p>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
