import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/cartcontext';

const Wishlist = () => {
    
           const { wishlist }  = useContext(CartContext);
               return (
                    <div className="p-6">
                 <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
                 {wishlist.length === 0 ? (
                   <p>No items in wishlist</p>
                 ) : (
                   <div className="grid grid-cols-5 gap-8">
                     {wishlist.map((item) => (
                     <div
                       key={item.id}
                       className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
                     >
                       <div className="relative group">
                         <img
                           src={item.image}
                           alt={item.name}
                           className="h-56 w-full object-cover transform group-hover:scale-105 transition duration-300"
                         />
           
                         
                       </div>
           
                       <div className="p-4">
                         <h3 className="font-semibold text-gray-800 text-lg truncate">
                           {item.name}
                         </h3>
                         <p className="text-gray-500 text-sm">{item.brand}</p>
                         <p className="text-blue-600 font-bold text-md mt-2">
                           ₹{item.price}
                         </p>
                         <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                           {item.description}
                         </p>
           
                         <button
                           onClick={() => addToCart(item)}
                           className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-700 transition"
                         >
                           
                           Buy Now
                         </button>
                       </div>
                     </div>
                   ))}
                   </div>
                 )}
               </div>
               )
        
}

export default Wishlist;

