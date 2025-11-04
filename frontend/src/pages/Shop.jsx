import React, { useState, useEffect, useContext } from "react";
import productsData from "../assets/data/product.json";
import { Heart, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "../components/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products`, {
        params: { gender, page, limit: 8 },
      });
      
      setProducts(Array.isArray(res.data) ? res.data : []);
      
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  fetchProducts();
}, [gender, page]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };


  return (
    <>
    <div className="w-full h-15 bg-[#EDEEEB] fixed z-20 shadow-md flex justify-center flex-wrap">
        <button className="px-4 py-2  text-white hover:bg-blue-600 transition" onClick={() => setGender("")}>
          ALL
        </button>
        <button className="px-4 py-2 text-gray-600  hover:bg-gray-500 hover:text-white transition" onClick={() => setGender("Men")}>
          MEN
        </button>
        <button className="px-4 py-2 text-gray-600  hover:bg-gray-500 hover:text-white transition" onClick={() => setGender("Women")}>
          WOMEN
        </button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-500 hover:text-white transition">
          SMARTWATCHES
        </button>
        <button className="px-4 py-2 text-gray-600   hover:bg-gray-500 hover:text-white transition">
          PREMIUM WATCHES
        </button>
        <button className="px-4 py-2 text-gray-600   hover:bg-gray-500 hover:text-white transition" onClick={() => setGender("Home")}>
          CLOCKS
        </button>
        <button className="px-4 py-2 text-gray-600   hover:bg-gray-500 hover:text-white transition">
          SALE
        </button>
        <button className="px-4 py-2 text-gray-600   hover:bg-gray-500 hover:text-white transition">
          GIFTING
        </button>
        
        <button className="px-4 py-2 text-gray-600  hover:bg-gray-500 hover:text-white transition">
          WATCH SERVICES
        </button>
        
      </div>
    <div className="max-w-7xl mx-auto px-6 py-10 pt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Our Products
          </h2>
    
          {!products || products.length === 0 ? (
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
        <div className="flex justify-center mt-8 space-x-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Prev
  </button>

  <span className="text-gray-700 font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Next
  </button>
</div>

    </>
  );
};

export default Shop;
