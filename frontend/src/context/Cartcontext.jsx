import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ➤ Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➤ Add item to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) return prev; // prevent duplicates
      return [...prev, { ...product }];
    });
  };

  // ➤ Reduce quantity from cart
  const reduceFromCart = (product) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.max(p.quantity - 1, 0) }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // ➤ Remove item completely
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((p) => p.id !== id));

  // ➤ Totals and counts
  const cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);
  const wishlistCount = wishlist.length;
  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        reduceFromCart,
        removeFromCart,
        cartCount,
        totalPrice,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
