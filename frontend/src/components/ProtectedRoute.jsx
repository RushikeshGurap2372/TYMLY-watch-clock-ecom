import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // if not logged in → redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // else render the child route
  return children;
};

export default ProtectedRoute;
