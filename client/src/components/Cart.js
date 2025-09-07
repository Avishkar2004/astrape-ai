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
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-secondary-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Your cart is empty</h2>
          <p className="text-lg text-secondary-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <a 
            href="/" 
            className="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Shopping Cart</h1>
        {!user && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-amber-800">
                You're shopping as a guest. <a href="/login" className="font-medium text-amber-900 hover:text-amber-700 underline">Login</a> to save your cart.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.productId} className="card p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-secondary-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-primary-600">
                    ${item.price}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="text-lg font-medium text-secondary-900 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-secondary-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-secondary-600">Subtotal</span>
                <span className="font-medium text-secondary-900">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-secondary-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-secondary-900">Total</span>
                  <span className="text-lg font-bold text-primary-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full btn-primary py-3 text-base font-medium mb-4">
              Proceed to Checkout
            </button>
            
            <button
              onClick={clearCart}
              className="w-full btn-secondary py-2 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
