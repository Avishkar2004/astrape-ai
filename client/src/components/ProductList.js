import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [filters, currentPage]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/categories/list"
      );
      console.log("Categories response:", response.data);
      // Ensure we have an array of strings
      const categoriesData = Array.isArray(response.data) ? response.data : [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setCategories([]);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.search) params.append("search", filters.search);
      params.append("limit", "12");
      params.append("skip", (currentPage * 12).toString());

      const response = await axios.get(
        `http://localhost:5000/api/products?${params}`
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(0);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const totalPages = Math.ceil(totalProducts / 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-block mb-6">
          <h1 className="text-5xl font-bold gradient-text mb-4 animate-slide-up">
            Discover Amazing Products
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
          Shop from our curated collection of high-quality products with advanced filtering options
        </p>
      </div>

      {/* Filters */}
      <div className="card p-8 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Filter Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🔍 Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
                className="input-field pl-12"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📂 Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map((category) => {
                const categoryStr = String(category || "");
                return (
                  <option key={category} value={category}>
                    {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💰 Min Price
            </label>
            <div className="relative">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="input-field pl-10"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">$</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💰 Max Price
            </label>
            <div className="relative">
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="input-field pl-10"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">$</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-lg text-gray-600 mt-6 font-medium">Loading amazing products...</p>
            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="card card-interactive group animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <span className="badge badge-primary backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold gradient-text">
                      ${product.price}
                    </div>
                    <div className="flex items-center">
                      <span className="badge badge-success">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary py-3 text-base font-semibold group-hover:shadow-glow transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-6 animate-fade-in">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === currentPage + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum - 1)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary-600 text-white shadow-lg' 
                          : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
