'use client';

import { Fragment, useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Checkout from './Checkout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-primary-900 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-primary-800 p-6">
            <h2 className="text-lg font-display font-semibold text-gray-100 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart ({cart.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="card p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover bg-primary-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-100 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          ${item.product.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-gray-100 font-medium px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-primary-800 p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold text-gray-100">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleProceedToCheckout}
                className="w-full btn-primary"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={onClose}
                className="w-full btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
} 