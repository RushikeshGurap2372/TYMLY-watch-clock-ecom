import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { CartProvider } from "./context/cartcontext";
import { AuthProvider } from "./context/AuthContext";

import './index.css'
import App from './App.jsx'
 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);




