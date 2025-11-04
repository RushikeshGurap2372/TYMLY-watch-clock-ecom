import React, { useContext, useState } from "react";
import { ShoppingBag, Heart, Menu, X, User , LogOut } from "lucide-react";
import { NavLink, useNavigate  } from "react-router-dom";
import { CartContext } from "../context/cartcontext";
import Account from "../pages/Account";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { wishlistCount, cartCount } = useContext(CartContext); // ✅ Correct
  const [ openAccount, setopenAccount] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#EDEEEB] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          className="text-2xl font-semibold text-[#31393C] cursor-pointer"
          onClick={() => navigate("/products")}
        >
          TYMLY
        </div>
        

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-[#31393C] font-medium">
          <NavLink to="/" className="hover:text-[#3E96F4]">
            HOME
          </NavLink>
          <NavLink to="/shop" className="hover:text-[#3E96F4]">
            SHOP
          </NavLink>
          
          <button className="hover:text-[#3E96F4]">ABOUT </button>
          <button className="hover:text-[#3E96F4]">CONTACT</button>
        </div>

        {/* Icons Section */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Account */}
          {isAuthenticated ? (
  <>
    <button
      onClick={() => setopenAccount(!openAccount)}
      className="relative text-[#31393C] hover:text-[#3E96F4]"
    >
      <User className="w-5 h-5" />
    </button>
    
    <ProtectedRoute>
              <Account
      isOpen={openAccount}
      onClose={() => setopenAccount(false)}
    />
            </ProtectedRoute>
    
  </>
) : (
  <NavLink to="/login" className="flex items-center gap-1 text-gray-600">
    Login
  </NavLink>
)}


          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative text-[#31393C] hover:text-[#3E96F4]"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3E96F4] text-white text-xs rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-[#31393C] hover:text-[#3E96F4]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3E96F4] text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#31393C] hover:text-[#3E96F4]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#EDEEEB] border-t border-[#CCC7BF] px-4 py-3 space-y-3">
          <button
            onClick={() => {
              navigate("/products");
              toggleMenu();
            }}
            className="block w-full text-left hover:text-[#3E96F4]"
          >
            SHOP
          </button>
          
          <button className="block w-full text-left hover:text-[#3E96F4]">
            ABOUT
          </button>
          <button className="block w-full text-left hover:text-[#3E96F4]">
            CONTACT
          </button>

          <div className="flex space-x-6 pt-3 border-t border-[#CCC7BF]">
            <button
              onClick={() => navigate("/wishlist")}
              className="relative text-[#31393C]"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#3E96F4] text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative text-[#31393C]"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#3E96F4] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        
      )}
    </header>
    
    
  );
};

export default Navbar;
