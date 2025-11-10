import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import { motion } from 'framer-motion';
import { LogOut, ChevronDown, ChevronUp, Clock, ShoppingBag, User, CreditCard } from 'lucide-react'; // Added new icons
import { useEffect, useState } from 'react';
import { getMyOrders } from '../api/ordersAPI.js';

// Helper function for currency formatting
const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

export default function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingOrders(true);
      setOrdersError(null);
      try {
        const data = await getMyOrders();
        if (mounted) setOrders(data || []);
      } catch (err) {
        console.error('Failed to load orders', err);
        if (mounted) setOrdersError(err?.response?.data?.message || err.message || 'Failed to load orders');
      } finally {
        if (mounted) setLoadingOrders(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl  font-bold text-gray-900 mb-4">Please log in to access your exclusive profile</h2>
          <Link
            to="/login"
            // Elevated, dark/gold-accented button style
            className="inline-block px-8 py-3 bg-gray-900 text-white tracking-widest uppercase text-sm font-semibold rounded-sm hover:bg-gold-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    // Increased max-width for a spacious feel, removed fixed margin
    <div className="mt-20 max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 mt-5">
          {/* Elegant header using a serif font for luxury */}
          <h2 className="text-4xl  text-gray-900 mb-2 tracking-wide">My Account Dashboard</h2>
          <p className="text-gray-500  text-lg">Your curated space for managing orders and personal details.</p>
        </div>

        {/* --- Profile and History Container --- */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* --- Left Column: Profile Card --- */}
            <div className="lg:col-span-1">
                <div className="bg-white  border border-gray-200 shadow-xl overflow-hidden h-full">
                    
                    {/* Header - Dark/Gold Theme */}
                    <div className="p-6 border-b border-gray-200 bg-gray-900 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-full bg-yellow-600 flex items-center justify-center text-gray-900 text-2xl font-bold  shadow-lg">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl  font-semibold">{user.name}</h3>
                                <p className="text-gray-300 mt-1 text-sm font-light">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details and Actions */}
                    <div className="p-6 space-y-6">
                        <h4 className='text-lg  font-semibold text-gray-800 border-b pb-2 mb-4'>Account Details</h4>
                        
                        {/* Name Field */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider"><User size={14} className="mr-2 text-yellow-600" /> Full Name</label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-gray-900 font-medium">{user.name}</div>
                        </div>
                        
                        {/* Email Field */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider"><CreditCard size={14} className="mr-2 text-yellow-600" /> Email Address</label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-gray-900 font-medium">{user.email}</div>
                        </div>
                        
                        {/* Admin Badge */}
                        {user.isAdmin && (
                            <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-sm text-sm font-semibold flex items-center">
                                <Clock size={16} className="mr-2" /> Administrator Privileges
                            </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                            <button
                                onClick={handleLogout}
                                // Logout: bold, prominent, and associated with red/exit
                                className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors font-semibold uppercase text-sm tracking-widest"
                            >
                                <LogOut size={16} className="mr-3" />
                                Logout
                            </button>
                            <Link
                                to="/shop"
                                // Continue Shopping: elegant, bordered, matching the luxury theme
                                className="w-full flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors font-medium uppercase text-sm tracking-widest"
                            >
                                <ShoppingBag size={16} className="mr-3" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Right Column: Order History --- */}
            <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 shadow-xl p-6">
                    <h3 className="text-2xl  font-semibold text-gray-900 mb-6 border-b pb-3">Purchase History</h3>
                    
                    {loadingOrders && <div className="text-base text-gray-500 flex items-center"><Clock size={16} className="mr-2" /> Retrieving your orders...</div>}
                    {ordersError && <div className="text-base text-red-600">{ordersError}</div>}
                    {!loadingOrders && orders.length === 0 && (
                        <div className="text-base text-gray-600 p-4 border border-gray-100 rounded-lg">You have no past orders. Begin your collection today.</div>
                    )}

                    <div className="space-y-4 mt-4">
                        {orders.map((o) => (
                            <div key={o._id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setExpandedOrder((id) => (id === o._id ? null : o._id))}
                                    className="w-full flex items-center justify-between p-4 text-left"
                                >
                                    <div>
                                        <div className="text-base font-bold text-gray-900">Order #...{String(o._id).slice(-6)}</div>
                                        <div className="text-xs text-gray-500 mt-1">Date: {new Date(o.createdAt || o.updatedAt || Date.now()).toLocaleDateString()}</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-lg font-bold text-gray-900 ">{formatCurrency(o.totalPrice || o.total)}</div>
                                        {/* Status Badge - Gold/Green for luxury theme */}
                                        <div className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${o.isPaid ? 'bg-green-600 text-white' : 'bg-yellow-600 text-gray-900'}`}>{o.isPaid ? 'Completed' : 'Processing'}</div>
                                        {expandedOrder === o._id ? <ChevronUp size={20} className="text-gray-600" /> : <ChevronDown size={20} className="text-gray-600" />}
                                    </div>
                                </button>
                                
                                {/* Order Details Dropdown */}
                                {expandedOrder === o._id && (
                                    <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                                        <div className="mt-4 space-y-3">
                                            {o.orderItems?.map((it, i) => (
                                                <div key={i} className="flex items-center gap-4 border-b border-gray-100 pb-3">
                                                    <img 
                                                        src={it.image || '/images/placeholder.png'} 
                                                        alt={it.name} 
                                                        className="w-16 h-16 object-cover rounded-sm border border-gray-200" 
                                                    />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-900">{it.name}</div>
                                                        <div className="text-xs text-gray-500 mt-1">Quantity: **{it.qty}** | Unit Price: {formatCurrency(it.price)}</div>
                                                    </div>
                                                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(it.qty * it.price)}</div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Order Summary in Detail View */}
                                        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-sm">
                                            <div className="text-gray-600">Shipping Cost: **{formatCurrency(o.shippingPrice || 0)}**</div>
                                            <div className="text-base text-gray-900 font-bold">Grand Total: {formatCurrency(o.totalPrice || o.total)}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}