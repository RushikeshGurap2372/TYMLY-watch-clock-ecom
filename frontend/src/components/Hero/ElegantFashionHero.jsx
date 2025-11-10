import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ElegantFashionHero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (q) => {
    const keyword = (q || query || '').trim();
    if (!keyword) return;
    // navigate to shop with keyword
    navigate(`/shop?keyword=${encodeURIComponent(keyword)}`);
  };

  const goCategory = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  // --- Watch-themed data ---
  const watchCategories = ['Automatic', 'Quartz', 'Chronographs', 'Diving'];
  const searchPills = ['New Arrivals', 'Vintage'];

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Hero Content Area - Clean White/Light Gray Background */}
        <div className="py-12 md:py-20 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT content: Headline, Text, Search, & Category Pills */}
            <div className="lg:col-span-7">
              <div className="text-sm font-medium text-gray-700 mb-2 tracking-widest uppercase">Precision Engineering</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-900 font-extrabold leading-tight mb-4">
                <span className="block">Master Time.</span>
                <span className="block text-gray-700">Define Your Legacy.</span>
              </h1>

              <p className="text-base text-gray-500 max-w-2xl mb-8 leading-relaxed">
                Discover curated collections of the world's finest timepieces, blending centuries of tradition with modern innovation.
              </p>

              {/* Search pill - Dark/Gold Theme */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white border border-gray-200 rounded-full p-1.5 shadow-md max-w-lg">
                <div className="flex gap-1 sm:gap-2">
                  {/* Simplified category buttons */}
                  <button onClick={() => goCategory(searchPills[0])} className="px-3 py-1.5 rounded-full bg-gray-900 text-amber-300 font-medium text-sm whitespace-nowrap hover:bg-gray-700 transition-colors">
                    {searchPills[0]}
                  </button>
                  <button onClick={() => goCategory(searchPills[1])} className="px-3 py-1.5 rounded-full text-gray-700 text-sm whitespace-nowrap hover:bg-gray-100 transition-colors">
                    {searchPills[1]}
                  </button>
                </div>
                <div className="flex flex-1 items-center min-w-[200px]">
                  <input
                    placeholder="Search watches, brands, movements..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }}
                    className="flex-1 bg-transparent outline-none px-2 sm:px-4 text-sm text-gray-600 placeholder-gray-400"
                  />
                  {/* Search Button: Gold/Amber accent */}
                  <button onClick={() => submitSearch()} aria-label="Search" className="bg-amber-500 text-gray-900 rounded-full p-2 mr-0.5 hover:bg-amber-400 transition-colors shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT content: Watch Product Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl bg-white border border-gray-100">
                <div className="relative">
                  {/* High-quality watch placeholder image */}
                  <img 
                       src="https://images.unsplash.com/photo-1579582963162-81e57c152912?q=80&w=900&auto=format&fit=crop" 
                       alt="Luxury Chronograph Watch" 
                       className="w-full h-72 object-cover object-top" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-xs text-amber-500 font-semibold">Curated Item</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">Classic Chronograph Series</div>
                  <div className="text-xs text-gray-500 mt-0.5">Swiss Heritage • 5-star rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Utility Band - Premium Black/Gold theme */}
        <div className="mt-12 bg-gray-900 text-white px-4 sm:px-8 py-6 sm:py-10 shadow-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Call to Action and Social */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Exclusive Timepieces</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {/* CTA Button: Primary Gold/Amber */}
                <button 
                        onClick={() => navigate('/shop/all')} 
                        className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-base 
                                 bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors shadow-lg uppercase tracking-wider">
                  Explore Collections
                </button>
                {/* Social Icons: Subtle white text on dark background */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="text-sm hover:text-amber-500 transition-colors cursor-pointer">Instagram</div>
                  <div className="text-sm hover:text-amber-500 transition-colors cursor-pointer">Facebook</div>
                </div>
              </div>
            </div>

            {/* Right: Watch Category Buttons */}
            <div className="lg:col-span-6 mt-4 lg:mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {watchCategories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => goCategory(cat)} 
                    className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center text-sm font-medium 
                             hover:bg-gray-700 transition-colors flex items-center justify-center min-h-[60px] border-b-2 border-amber-500/0 hover:border-amber-500"
                  >
                    <div>{cat}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElegantFashionHero;