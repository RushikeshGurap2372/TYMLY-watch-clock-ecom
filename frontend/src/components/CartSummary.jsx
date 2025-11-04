import React, { useState } from "react";
import { motion } from "framer-motion";

const CartSummary = ({ total }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
     

      {/* Sliding Card */}
      {/* <motion.div
        initial={{ x: "100%" }}
        
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 p-6 z-50"
      > */}
      <div classname="right-0">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

        <div className="flex justify-between text-lg mb-4">
          <span>Total:</span>
          <span className="font-semibold text-green-600">₹{total}</span>
        </div>

        <div className="mt-6">
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Proceed to Payment
          </button>
        </div>
        </div>
      {/* </motion.div> */}
    </>
  );
};

export default CartSummary;
