import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage for guest users
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Load cart from server for authenticated users
  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCart(response.data.cart);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
    setLoading(false);
  };

  const addToCart = async (product) => {
    const cartItem = {
      productId: product.id.toString(),
      quantity: 1,
      title: product.title,
      price: product.price,
      image: product.thumbnail
    };

    if (user) {
      // Add to server cart
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
        setCart(response.data.cart);
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
      setLoading(false);
    } else {
      // Add to local cart
      const existingItem = cart.find(item => item.productId === cartItem.productId);
      let newCart;
      
      if (existingItem) {
        newCart = cart.map(item =>
          item.productId === cartItem.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...cart, cartItem];
      }
      
      setCart(newCart);
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.put(`http://localhost:5000/api/cart/update/${productId}`, {
          quantity
        });
        setCart(response.data.cart);
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
      setLoading(false);
    } else {
      const newCart = cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
      setCart(newCart);
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
      setLoading(false);
    } else {
      const newCart = cart.filter(item => item.productId !== productId);
      setCart(newCart);
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  };

  const clearCart = async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.delete('http://localhost:5000/api/cart/clear');
        setCart(response.data.cart);
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
      setLoading(false);
    } else {
      setCart([]);
      localStorage.removeItem('guestCart');
    }
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
