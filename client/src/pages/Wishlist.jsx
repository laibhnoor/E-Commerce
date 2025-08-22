import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState({});

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    const result = await addToCart(productId);
    if (result.success) {
      alert('Added to cart successfully!');
    } else {
      alert(result.error);
    }
    setAddingToCart(prev => ({ ...prev, [productId]: false }));
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      await removeFromWishlist(productId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="card">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items to your wishlist to save them for later.</p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.productId} className="card group">
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={item.image || 'https://via.placeholder.com/300x200?text=Product'}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                  <Heart className="w-4 h-4 text-white fill-current" />
                </div>
                <button
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                  className="absolute top-2 left-2 p-2 bg-white text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {item.stock}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item.productId)}
                    disabled={addingToCart[item.productId]}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    {addingToCart[item.productId] ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <Link
                    to={`/products/${item.productId}`}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for when items are removed */}
        {wishlist.length === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items to your wishlist to save them for later.</p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
