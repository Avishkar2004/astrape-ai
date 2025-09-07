import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, loading } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-gray-600 mt-6 font-medium">Loading your cart...</p>
          <div className="flex space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <div className="mx-auto h-32 w-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-8 animate-float">
            <svg className="h-16 w-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-6">Your cart is empty</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <a 
            href="/" 
            className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold hover:shadow-glow transition-all duration-300"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold gradient-text">Shopping Cart</h1>
        </div>
        
        {!user && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-amber-800 font-semibold">
                  You're shopping as a guest
                </p>
                <p className="text-amber-700">
                  <a href="/login" className="font-semibold text-amber-900 hover:text-amber-800 underline transition-colors duration-200">Login</a> to save your cart and access your order history.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, index) => (
            <div key={item.productId} className="card p-6 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="text-2xl font-bold gradient-text">
                    ${item.price}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-2">
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:shadow-md"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="text-lg font-bold text-gray-900 min-w-[3rem] text-center mx-4">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:shadow-md"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600 text-sm font-semibold transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-8 sticky top-24 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Shipping</span>
                <span className="text-lg font-bold text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl px-4">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold gradient-text">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full btn-primary py-4 text-lg font-semibold mb-4 hover:shadow-glow transition-all duration-300">
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceed to Checkout
              </span>
            </button>
            
            <button
              onClick={clearCart}
              className="w-full btn-secondary py-3 text-base font-semibold"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;