import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      showNotification("✅ Login successful!");
    } catch (err) {
      showNotification("❌ Invalid credentials", "error");
    }
  };

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      showNotification("🎉 Registered successfully!");
    } catch (err) {
      showNotification("⚠️ Registration failed", "error");
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    showNotification("👋 Logged out successfully!");
  };

  // ✅ Load User Data (wishlist, cart, orders)
  const fetchUserProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error loading profile:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  // ✅ Bottom Notification
  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.background = type === "error" ? "#FF4C4C" : "#4CAF50";
    notification.style.color = "white";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "8px";
    notification.style.fontSize = "14px";
    notification.style.zIndex = "9999";
    notification.style.transition = "opacity 0.5s";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
