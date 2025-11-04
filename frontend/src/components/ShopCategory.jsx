import React from "react";
import { NavLink } from "react-router-dom";

const ShopCategory = () => {
  const categories = ["All", "Hoodies", "Formals", "Rowdy", "Accessories"];

  return (
    <div className="bg-gray-100 shadow-sm py-2 px-4 flex gap-6 justify-center">
      {categories.map((category) => (
        <NavLink
          key={category}
          to={`/shop/${category.toLowerCase()}`}
          className={({ isActive }) =>
            `font-medium ${
              isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"
            }`
          }
        >
          {category}
        </NavLink>
      ))}
    </div>
  );
};

export default ShopCategory;
