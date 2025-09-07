import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Astrape.AI</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 font-semibold transition-all duration-300 hover:-translate-y-0.5 relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 px-5 py-2.5 rounded-xl hover:from-primary-100 hover:to-accent-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              <span className="font-semibold">Cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce-slow">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-semibold hidden lg:block">
                    Welcome, {user.username}!
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 font-semibold transition-all duration-300 hover:-translate-y-0.5 px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 font-semibold transition-all duration-300 hover:-translate-y-0.5 px-3 py-2 rounded-lg hover:bg-primary-50"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-xl mt-2 shadow-large border border-white/20">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-semibold transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="flex items-center justify-between px-3 py-2 text-gray-600 hover:text-primary-600 font-semibold transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700 font-semibold">
                    Welcome, {user.username}!
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-red-600 font-semibold transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-semibold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
