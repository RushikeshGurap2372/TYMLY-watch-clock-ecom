import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/productAPI.js';
import ProductCard from '../components/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import Loader from '../components/Loader.jsx';
import FilterPanel from '../components/Filters/FilterPanel.jsx';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('q') || '';
  const onSale = searchParams.get('onSale') || '';
  const isNewArrival = searchParams.get('isNewArrival') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const colors = searchParams.get('colors') || '';
  // ⚡️ REMOVED: const sizes = searchParams.get('sizes') || '';
  const brands = searchParams.get('brands') || '';
  const category = searchParams.get('category') || '';
  const subCategory = searchParams.get('subCategory') || '';
  // ⚡️ NEW: isGift parameter
  const isGift = searchParams.get('isGift') || '';


  useEffect(() => {
    (async () => {
      setLoading(true);
      // ⚡️ CHANGES: Removed 'sizes'. Added 'isGift'.
      const res = await fetchProducts({ 
        page, 
        keyword, 
        onSale, 
        isNewArrival, 
        minPrice, 
        maxPrice, 
        colors, 
        brands, 
        category, 
        subCategory, 
        isGift, // Include new filter
        sortBy: searchParams.get('sortBy')
      });
      setData(res);
      setLoading(false);
    })();
  // ⚡️ CHANGES: Removed 'sizes'. Added 'isGift' to dependency array.
  }, [page, keyword, onSale, isNewArrival, minPrice, maxPrice, colors, brands , category ,subCategory, isGift, searchParams.get('sortBy')]); 

  const onPageChange = (p) => {
    setSearchParams(prev => {
      prev.set('page', p);
      return prev;
    });
  };

  return (
    <div className="mt-20 container mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <div className="flex justify-between items-center mb-6 mt-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">Shop</h1>
        {/* Sort by Dropdown (assumed to be here) */}
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Filters
        </button>
      </div>

      {/* Mobile Filters Modal/Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="relative w-full h-full max-w-xs ml-auto flex flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 flex-1">
              <div className="space-y-6">
                <div className="mt-8">
                  <FilterPanel
                    params={searchParams}
                    onChange={(next) => {
                      setSearchParams(next);
                      setMobileFiltersOpen(false);
                    }}
                    title="Refine Results"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:flex md:gap-6">
        <div className="hidden md:block md:w-64">
          <FilterPanel
            params={searchParams}
            onChange={(next) => setSearchParams(next)}
            title="Refine Results"
          />
        </div>
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {data.products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
              <div className="mt-8 lg:mt-12">
                <Pagination page={data.page} pages={data.pages} onPageChange={onPageChange} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}