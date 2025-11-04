import React from 'react';
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartcontext';
import CartSummary from '../components/CartSummary';

const Cart = () => {

    const { cart } = useContext(CartContext);
    const [cartItems, setCartItems] = useState(cart);

    // Increase quantity
    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Calculate total
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <div className="grid grid-cols-5 gap-8">
                    {cartItems.map((item) => (
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
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="px-2 py-1 bg-gray-300 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="px-2 py-1 bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="font-semibold mt-3">
                                    ₹{item.price * item.quantity}
                                </div>


                            </div>


                        </div>

                    ))
                    }
                    <CartSummary total={total} />





                </div>
                
                


            )}
             
        </div>
    )

}

export default Cart;

