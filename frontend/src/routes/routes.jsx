import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

// Pages
import Home from "../components/Home";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Shop from "../pages/Shop";
// import Account from "../pages/Account"
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <ProtectedRoute>
              <Cart />
            </ProtectedRoute> },
      { path: "/wishlist", element: <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute> },
      { path: "/shop", element: <Shop /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      //  { path: "/account", element: <Account /> },
      { path: "/product/:id", element: <ProductDetails /> }, // dynamic route
    ],
  },  
]);

export default router;
