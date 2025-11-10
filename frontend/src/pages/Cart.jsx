import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2, X } from 'lucide-react'; // Assuming you have lucide-react or similar icons installed

export default function Cart() {
  const { items, removeFromCart, updateQty, totals } = useCart();
  const navigate = useNavigate();

  // Helper function to format price
  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };
  
  // Calculate Grand Total for the visual consistency with the image (before discounts/tax/shipping)
  // The existing `totals.itemsPrice` is what is shown as 'Order Value' in the image.
  const orderValue = totals.itemsPrice; 

  return (
    <div className="mt-20 container mx-auto px-4 sm:px-6 py-6 lg:py-10 max-w-7xl">
      {items.length === 0 ? (
        <div className="pt-20 text-center py-12">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center bg-gray-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="pt-20 grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* --- Cart Items Section (Left Column) --- */}
          <div className="lg:col-span-2">
            
            {/* Item Selected Banner */}
            <div className="flex items-center bg-yellow-50/50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm mb-6 font-medium">
                <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                 (<span className="text-gray-900 font-bold">{formatPrice(orderValue)}</span>)
            </div>

            {/* Cart Item List */}
            <div className="divide-y divide-gray-100">
              {items.map((i) => (
                <div key={i.product} className="flex items-start py-6 relative">
                  
                  {/* Item Image and Details */}
                  <div className="flex items-start flex-1 pr-6">
                    <img 
                      className="w-24 h-24 object-cover rounded-lg mr-4 border border-gray-100" 
                      src={i.data?.images?.[0] || 'https://via.placeholder.com/96'} 
                      alt={i.data?.name}
                    />
                    <div>
                      <Link 
                        className="text-gray-900 text-base font-semibold hover:text-gray-700 transition-colors" 
                        to={`/product/${i.product}`}
                      >
                        {i.data?.name || 'Product Name'}
                      </Link>
                      {/* Product Metadata like Color, SKU, etc. */}
                      
                    </div>
                  </div>
                  
                  {/* Price, Quantity, Remove Section */}
                  <div className="flex items-center justify-end space-x-6">
  {/* Price */}
  <div className="text-lg font-bold text-gray-900 w-24 text-right">
    {formatPrice(i.data?.price)}
  </div>

  {/* Quantity Selector */}
  <div className="flex items-center border border-gray-300 rounded-md">
    <button
      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
      onClick={() => updateQty(i.product, i.qty - 1)}
      disabled={i.qty <= 1}
    >
      -
    </button>
    <input
      className="w-10 text-center text-sm border-x border-gray-300 py-1 focus:ring-0 focus:outline-none"
      type="number"
      min="1"
      value={i.qty}
      onChange={(e) => updateQty(i.product, Number(e.target.value))}
    />
    <button
      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
      onClick={() => updateQty(i.product, i.qty + 1)}
    >
      +
    </button>
  </div>

  {/* Remove Button */}
  <button
    onClick={() => removeFromCart(i.product)}
    className="bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
  >
    Remove
  </button>
</div>


               
                </div>
              ))}
            </div>

            {/* Footer details like return and dispatch */}
            {/* <div className="flex justify-start space-x-6 text-sm text-gray-600 border-t pt-4 mt-4">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181-3.181m0-3.182h2.028M5 10a7 7 0 1114 0 7 7 0 01-14 0z" />
                    </svg>
                    7 Days Return
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18L10.5 16.5m2.25-1.5L14.25 12m-3.96-6.495a4.778 4.778 0 013.96 0m-.96 6.495h.96m0 0h-2.25m-2.25 0h.008v.008H7.5V12m4.5 0h.008v.008H12V12zm4.5 0h.008v.008H16.5V12z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c3.21 0 5.25-.5 5.25-5.25a5.25 5.25 0 00-10.5 0c0 4.75 2.04 5.25 5.25 5.25zM12 3.75c-3.21 0-5.25.5-5.25 5.25a5.25 5.25 0 0010.5 0c0-4.75-2.04-5.25-5.25-5.25z" />
                    </svg>
                    Dispatch by **8 Nov, Saturday**
                </div>
            </div> */}
          </div>
          
          {/* --- Order Summary Section (Right Column) --- */}
          <div className="lg:col-span-1 h-max lg:sticky lg:top-24">
            
            {/* Coupon Application Panel */}
            {/* <div className="p-4 border border-gray-200 rounded-lg mb-6 flex items-center bg-white">
                <div className="flex items-center">
                    <div className="p-1 border border-dashed border-gray-400 rounded-full mr-3 text-sm font-semibold text-gray-700 bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6V4.5A2.25 2.25 0 0014.25 2.25h-4.5A2.25 2.25 0 007.5 4.5V6m9 0v.75a2.25 2.25 0 01-2.25 2.25h-4.5A2.25 2.25 0 017.5 6.75V6m9 0H7.5m9 0V4.5a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 007.5 4.5V6M12 9.75V15M12 15h2.25m-2.25 0L9.75 15" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-700 text-sm">Apply Coupons</p>
                        <p className="text-xs text-green-700 font-medium">TRY NEW10 & Save **₹ 850**</p>
                        <p className="text-xs text-blue-600 cursor-pointer hover:underline">View all coupons</p>
                    </div>
                </div>
                <button className="ml-auto text-primary-600 font-semibold text-sm hover:text-primary-500">
                    Apply
                </button>
            </div> */}


            {/* Order Summary Panel */}
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Order Summary <span className="text-gray-500 font-normal"></span></h3>
              <div className="space-y-1 text-base">
                {/* Order Value */}
                <div className="flex justify-between py-1">
                    <span className="text-gray-600">Order Value</span>
                    <span className="font-medium text-gray-900">{formatPrice(orderValue)}</span>
                </div>
                {/* Shipping */}
                <div className="flex justify-between py-1">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-semibold">
                        {totals.shippingPrice === 0 ? 'Free' : formatPrice(totals.shippingPrice)}
                    </span>
                </div>
                {/* Note: Tax is not explicitly shown in the image but is in the original code. I will omit it for visual alignment. */}
              </div>

              {/* Grand Total */}
              <div className="flex justify-between pt-4 text-xl font-bold text-gray-900 border-t border-gray-200 mt-4">
                <span>Grand Total</span>
                {/* The image shows Grand Total = Order Value (if no discount/shipping is applied) */}
                <span>{formatPrice(orderValue)}</span>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full py-4 text-center text-white text-sm font-medium tracking-wider  bg-gray-900 hover:bg-gray-800 transition-colors uppercase"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}