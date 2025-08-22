import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
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
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const fetchCart = async () => {
    setLoading(true);
    try {
      // The backend now sends fully populated data thanks to .populate()
      const response = await cartAPI.getCart();
      
      // The data is perfect. We just need to pull the items out of it.
      // And we rename `product` to match what our Cart page component expects.
      const populatedItems = response.data.items?.map(item => ({
        ...item.product, // Spread the full product details
        quantity: item.quantity,
        productId: item.product._id,
      })) || [];

      setCart(populatedItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartAPI.addToCart(productId, quantity);
      await fetchCart(); // Refresh the cart
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to add' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      await fetchCart(); // Refresh the cart
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to remove' };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartAPI.updateQuantity(productId, quantity);
      await fetchCart(); // Refresh the cart
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to update' };
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: () => setCart([]), // Simple clear function
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
