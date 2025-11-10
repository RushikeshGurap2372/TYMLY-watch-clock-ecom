import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useUser } from '../context/UserContext.jsx';

// --- Category Data (Simplified Mock Data) ---
const CATEGORIES = {
  Men: [
    { name: 'Shop by Collection', href: '/shop?category=Mens' },
    { name: 'Shop by Function', href: '/shop?category=Mens' },
    { name: 'Shop by Movement', href: '/shop?category=Mens' },
  ],
  Women: [
    { name: 'Shop by Price', href: '/shop?category=Womens' },
    { name: 'Shop by Color', href: '/shop?category=Womens' },
    { name: 'Shop by Brand', href: '/shop?category=Womens' },
  ],
  Kids: [
    { name: 'Shop by Dial', href: '/shop?category=Kids' },
    { name: 'Shop by Looks', href: '/shop?category=Kids' },
    { name: 'Shop by Feature', href: '/shop?category=Kids' },
  ],
};

const Header = () => {
  // State from previous Header versions
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  
  // NEW STATE: Control visibility of the second shop menu bar
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  // REINSTATED STATE: For managing Men/Women/Kids dropdowns
  const [openCategory, setOpenCategory] = useState(null); // 'Men' | 'Women' | 'Kids' | null


  const { items } = useCart();
  const { productIds } = useWishlist();
  const { user, logout } = useUser();
  const cartItemsCount = items.reduce((sum, i) => sum + i.qty, 0);
  const wishlistCount = productIds.length;

  const navigate = useNavigate();
  const location = useLocation(); // ADDED: useLocation to check for active state
  // Refs for click outside logic
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const shopMenuRef = useRef(null);

  // Toggle for Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close all menus/overlays
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
    setIsShopMenuOpen(false);
    setOpenCategory(null);
  };
  
  // Click outside logic for Search, User Menu, AND Shop Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target) && !event.target.closest('.search-button')) {
        setIsSearchOpen(false);
      }
      // Close user menu
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target) && !event.target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
      // Close shop menu bar if click is outside the header and shop bar
      if (isShopMenuOpen && shopMenuRef.current && !shopMenuRef.current.contains(event.target) && !event.target.closest('.shop-menu-toggle')) {
        // Also ensure the click wasn't on the category dropdowns
        if (!event.target.closest('.category-dropdown')) {
          setIsShopMenuOpen(false);
          setOpenCategory(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isUserMenuOpen, isShopMenuOpen]);

  // Debounced search logic (kept as is)
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    let mounted = true;
    setSuggestLoading(true);
    const timer = setTimeout(async () => {
      try {
        const mockSuggestions = ['Denim Jacket', 'Running Shoes', 'Red Dress'].filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        if (mounted) setSuggestions(mockSuggestions.map(name => ({ _id: name, name, price: 500 }))); 
      } catch (e) {
        if (mounted) setSuggestions([]);
      } finally {
        if (mounted) setSuggestLoading(false);
      }
    }, 300);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const navigateSearch = (q) => {
    setIsSearchOpen(false);
    if (!q) return;
    navigate(`/shop?keyword=${encodeURIComponent(q)}`);
  };

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SHOP', href: '/shop', isToggle: true }, // Marks this as the toggle button
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' }
  ];
  
  const ShopSubMenuLinks = [
    { name: '          ALL', href: '/shop' },
    { name: '    SALE', href: '/shop?onSale=true' },
    { name: 'NEW ARRIVALS', href: '/shop?isNewArrival=true' },
    { name: 'MEN', key: 'Men' ,href: '/shop?category=Mens'}, // Dropdown trigger
    { name: 'WOMEN', key: 'Women' ,href: '/shop?category=Womens'}, // Dropdown trigger
    { name: 'KIDS', key: 'Kids', href: '/shop?category=Kids' }, // Dropdown trigger
    { name: 'CLOCKS', href: '/shop?category=clocks' }, 
  
  // Example of other single-category links
  { name: 'SMART WATCHES', href: '/shop?subCategory=smart' },
  { name: 'PREMIUM WATCHES', href: '/shop?subCategory=premium' },
  { name: 'GIFTING', href: '/shop?isGift=true' },
  { name: 'WATCH SERVICES', href: '/Services' },
    
  ];
  

  const IconButton = ({ icon: Icon, label, onClick, className = '', badgeCount = 0 }) => (
    <button
      aria-label={label}
      onClick={onClick}
      className={`relative text-[#31393C] hover:text-yellow-700 ${className}`}
    >
      <Icon className="w-5 h-5" />
      {badgeCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-700 text-white text-xs rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
  
  // Component for the category dropdown menus
  const CategoryDropdown = ({ categoryKey }) => {
    const items = CATEGORIES[categoryKey] || [];
    
    return (
      <div 
        className={`absolute top-full left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 transition-opacity duration-150 category-dropdown ${openCategory === categoryKey ? 'block opacity-100' : 'hidden opacity-0'}`}
        onMouseLeave={() => setOpenCategory(null)}
      >
        <div className="p-2 font-medium text-gray-800 border-b mb-1">{categoryKey}'s Shop</div>
        {items.map((item) => (
          <Link 
            key={item.name} 
            to={item.href} 
            onClick={() => closeAllMenus()} 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  };
  
  // Component for the second shop bar
  const ShopSubMenu = () => {
    if (!isShopMenuOpen) return null;

    // Helper function to determine if a link button should be styled as active
    // Helper function to determine if a link button should be styled as active
const isLinkActive = (href, key) => {
  if (key) {
    // Dropdown buttons become active when their category is open
    return openCategory === key;
  }

  // Extract params from link
  const linkParams = new URLSearchParams(new URL(href, 'http://dummy.com').search);

  // Extract current URL params
  const currentParams = new URLSearchParams(location.search);

  // Compare each param in the link with current URL param
  for (const [paramKey, paramValue] of linkParams.entries()) {
    const currentValue = currentParams.get(paramKey);
    if (currentValue && currentValue.toLowerCase() === paramValue.toLowerCase()) {
      return true; // ✅ Active match
    }
  }

  return false; // ❌ Not active
};

    
    return (
      <div ref={shopMenuRef} className="w-full bg-[#EDEEEB] border-t border-[#CCC7BF] shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center text-black font-medium text-sm ">
          {ShopSubMenuLinks.map((link) => {
            const isActive = isLinkActive(link.href, link.key);
            
            // Define consistent button styling
            const baseClass = ' p-4 transition-all duration-150';
            const activeClass = ' hover:bg-black text-white hover:tex';
            const defaultClass = 'hover:bg-black hover:text-white';
            

            return (
              <div key={link.name} className="relative">
                {link.key ? (
                  // Dropdown link
                  <button
                    onClick={() => setOpenCategory(openCategory === link.key ? null : link.key)}
                    onMouseEnter={() => setOpenCategory(link.key)}
                    className={`
                      flex items-center ${baseClass}
                      ${isActive ? activeClass : defaultClass}
                    `}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  // Simple link (SALE, NEW ARRIVALS) - NOW AS A BUTTON
                  <button
                    onClick={() => {
                      closeAllMenus();
                      navigate(link.href);
                    }}
                    className={`
                      ${baseClass}
                      ${isActive ? activeClass : defaultClass}
                    `}
                  >
                    {link.name}
                    
                  </button>
                )}
                {link.key && <CategoryDropdown categoryKey={link.key} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#EDEEEB] shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Brand / Logo */}
          <div
            className="text-4xl font-serif font-bold tracking-widest text-yellow-950 transition-colors uppercase"
            onClick={() => closeAllMenus() || navigate("/")}
          >
            TYMLY
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-[#31393C] font-medium">
            {navLinks.map((link) => (
              link.isToggle ? (
                // SHOP button: Toggles the secondary menu bar
                <button
                  key={link.name}
                  onClick={() => setIsShopMenuOpen(v => !v)}
                  className={`hover:text-yellow-600 transition-colors shop-menu-toggle ${isShopMenuOpen ? 'text-yellow-700' : ''}`}
                  aria-expanded={isShopMenuOpen}
                >
                  {link.name}
                </button>
              ) : (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => closeAllMenus()}
                  className={({ isActive }) => `hover:text-yellow-700 transition-colors ${isActive ? 'text-yellow-700' : ''}`}
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>

          {/* Icons Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Search Icon - Toggle search overlay */}
            <IconButton icon={Search} label="Search" onClick={() => { closeAllMenus(); setIsSearchOpen(v => !v); }} className="search-button" />

            {/* Account / User Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  onClick={() => { closeAllMenus(); setIsUserMenuOpen(v => !v); }}
                  className="user-menu-button relative text-[#31393C] hover:text-yellow-700"
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <NavLink to="/login" onClick={closeAllMenus} className="flex items-center gap-1 text-[#31393C] hover:text-yellow-700">
                  Login
                </NavLink>
              )}

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  <Link to="/profile" onClick={() => closeAllMenus()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => closeAllMenus()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
                  )}
                  <Link to="/wishlist" onClick={() => closeAllMenus()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                  <button onClick={() => { closeAllMenus(); logout(); navigate('/'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <IconButton
              icon={Heart}
              label="Wishlist"
              onClick={() => { closeAllMenus(); navigate("/wishlist"); }}
              badgeCount={wishlistCount}
            />

            {/* Cart */}
            <IconButton
              icon={ShoppingBag}
              label="Shopping Bag"
              onClick={() => { closeAllMenus(); navigate("/cart"); }}
              badgeCount={cartItemsCount}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => { closeAllMenus(); toggleMenu(); }}
            className="md:hidden text-[#31393C] hover:text-yellow-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        
        {/* SECONDARY SHOP MENU BAR (Desktop Only) */}
        <ShopSubMenu />

        {/* Mobile Menu Drawer (Simplified, without nested menus for simplicity) */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#EDEEEB] border-t border-[#CCC7BF] px-4 py-3 space-y-3">
            {[...navLinks.filter(link => !link.isToggle), ...ShopSubMenuLinks.filter(link => !link.key)].map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => { toggleMenu(); }}
                className="block w-full text-left hover:text-yellow-700 py-1"
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Added Men/Women/Kids to Mobile menu as simple links for now */}
            <Link to="/shop?category=men" onClick={() => toggleMenu()} className="block w-full text-left hover:text-yellow-700 py-1">MEN</Link>
            <Link to="/shop?category=women" onClick={() => toggleMenu()} className="block w-full text-left hover:text-yellow-700 py-1">WOMEN</Link>
            <Link to="/shop?category=kids" onClick={() => toggleMenu()} className="block w-full text-left hover:text-yellow-700 py-1">KIDS</Link>


            <div className="flex flex-col space-y-3 pt-3 border-t border-[#CCC7BF]">
              {/* Login/User in Mobile Menu */}
              {user ? (
                <>
                  <Link to="/profile" onClick={toggleMenu} className="flex items-center text-[#31393C] hover:text-yellow-700 gap-2">
                    <User className="w-5 h-5" /> Profile
                  </Link>
                  <button onClick={() => { logout(); toggleMenu(); navigate('/'); }} className="flex items-center text-left text-red-600 hover:text-red-700 gap-2">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="flex items-center text-[#31393C] hover:text-yellow-700 gap-2">
                  <User className="w-5 h-5" /> Login
                </Link>
              )}
              
              <button
                onClick={() => { toggleMenu(); setIsSearchOpen(true); }}
                className="flex items-center text-[#31393C] hover:text-yellow-700 gap-2"
              >
                <Search className="w-5 h-5" /> Search
              </button>

              {/* Wishlist in Mobile Menu */}
              <button
                onClick={() => { navigate("/wishlist"); toggleMenu(); }}
                className="relative flex items-center text-[#31393C] hover:text-yellow-700 gap-2"
              >
                <Heart className="w-5 h-5" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-2 bg-[#3E96F4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart in Mobile Menu */}
              <button
                onClick={() => { navigate("/cart"); toggleMenu(); }}
                className="relative flex items-center text-[#31393C] hover:text-yellow-700 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shopping Bag
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-[#3E96F4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay (Kept logic from Header.jsx) */}
      {isSearchOpen && (
          <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md">
            <div ref={searchRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Search</h2>
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <div className="relative mb-8">
                <div className="rounded-full bg-white shadow-sm border border-gray-200 px-4 py-2 flex items-center">
                  <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                  <input
                    type="text"
                    aria-label="Search products"
                    placeholder="Search products, collections, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigateSearch(searchQuery);
                    }}
                    className="flex-1 text-lg placeholder-gray-400 bg-transparent focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="ml-3 text-sm text-gray-500 hover:text-gray-700">Clear</button>
                  )}
                </div>
              </div>
              {/* Simplified suggestions/results display */}
              {searchQuery !== '' && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Results</h3>
                  <div className="bg-white rounded-lg shadow-md divide-y overflow-hidden">
                    {suggestLoading && (
                      <div className="p-4 text-sm text-gray-500">Searching...</div>
                    )}
                    {!suggestLoading && suggestions.length === 0 && (
                      <div className="p-4 text-sm text-gray-500">No results. Press Enter to search all products.</div>
                    )}
                    {!suggestLoading && suggestions.map((p) => (
                      <button key={p._id} onClick={() => navigateSearch(p.name)} className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3">
                        {/* Placeholder/simplified image and detail */}
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div> 
                        <div>
                          <div className="font-medium text-gray-900">{p.name}</div>
                          <div className="text-sm text-gray-500">Result Detail</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
                <button onClick={() => setIsSearchOpen(false)} className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-full transition-colors duration-200">Close Search</button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Header;