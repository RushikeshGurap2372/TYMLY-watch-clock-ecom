import React, { useContext } from "react";
import { X, User, Heart, ShoppingBag, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

const Account = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray bg-opacity-40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-80 w-72 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">My Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> Profile
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              onClose();
            }}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>

          <button
            onClick={() => {
              navigate("/wishlist");
              onClose();
            }}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <Heart className="w-5 h-5" /> Wishlist
          </button>

          <button
            onClick={() => {
              navigate("/settings");
              onClose();
            }}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <Settings className="w-5 h-5" /> Settings
          </button>

          <hr className="my-3" />

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-3 w-full text-left text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
