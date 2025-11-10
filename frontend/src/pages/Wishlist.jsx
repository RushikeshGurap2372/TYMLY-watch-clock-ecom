import { useWishlist } from '../context/WishlistContext.jsx';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../api/productAPI.js';
import ProductCard from '../components/ProductCard.jsx';
import {Link} from 'react-router-dom';

export default function Wishlist() {
  const { productIds } = useWishlist();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      if (productIds.length === 0) return setProducts([]);
      const uniqueIds = Array.from(new Set(productIds));
      const results = await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            return await fetchProduct(id);
          } catch (_) {
            return null;
          }
        })
      );
      setProducts(results.filter(Boolean));
    })();
  }, [productIds]);
  return (
    <div className="mt-20 container mx-auto px-4 sm:px-6 py-6 lg:py-10 max-w-7xl">
  {products.length === 0 ? (
    <div className="pt-20 text-center py-12">
      <p className="text-lg text-gray-600 mb-6">Your wishlist is empty</p>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center bg-gray-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  ) : (
    <>
      <h2 className="mb-5 pt-20 text-2xl font-semibold">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </>
  )}
</div>

  );
}


