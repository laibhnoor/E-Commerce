import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';
import React from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await wishlistAPI.getWishlist();
      // Backend returns { products: [...] } but we need to map it to match frontend expectations
      const wishlistItems = response.data.products?.map(product => ({
        productId: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category
      })) || [];
      setWishlist(wishlistItems);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add items to wishlist' };
    }

    try {
      await wishlistAPI.addToWishlist(productId);
      await fetchWishlist(); // Refresh wishlist data
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add to wishlist' 
      };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      await fetchWishlist(); // Refresh wishlist data
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to remove from wishlist' 
      };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 