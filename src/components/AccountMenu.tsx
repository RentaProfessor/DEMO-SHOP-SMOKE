'use client';

import { useState } from 'react';
import { User, LogIn, UserPlus, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import OrderHistory from './OrderHistory';
import Link from 'next/link';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountMenu({ isOpen, onClose }: AccountMenuProps) {
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleOrderHistory = () => {
    setOrderHistoryOpen(true);
    onClose();
  };

  const handleAccountAction = (action: string) => {
    // For now, these will show alerts but could be implemented later
    alert(`${action} functionality would be implemented here`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Menu Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-64 bg-primary-900 border border-primary-800 rounded-xl shadow-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-primary-800 bg-primary-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              {user ? (
                <>
                  <p className="text-gray-100 font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </>
              ) : (
                <>
                  <p className="text-gray-100 font-medium">Welcome!</p>
                  <p className="text-gray-400 text-sm">Sign in to your account</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {user ? (
            <>
              {/* Authenticated User Menu */}
              <button
                onClick={handleOrderHistory}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-primary-800 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Order History</span>
              </button>

              <button
                onClick={() => handleAccountAction('Wishlist')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-primary-800 transition-colors"
              >
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => handleAccountAction('Account Settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-primary-800 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </button>

              <div className="border-t border-primary-800 my-2"></div>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-primary-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Guest User Menu */}
              <Link
                href="/sign-in"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-primary-800 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              
              <Link
                href="/create-account"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-primary-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </Link>

              <div className="border-t border-primary-800 my-2"></div>

              {/* Account Features (disabled for guest) */}
              <button
                onClick={() => alert('Please sign in to view your order history')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 cursor-not-allowed"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Order History</span>
              </button>

              <button
                onClick={() => alert('Please sign in to access your wishlist')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 cursor-not-allowed"
              >
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-primary-800 p-4 bg-primary-800/50">
          <p className="text-xs text-gray-500 text-center">
            {user ? 'Account features coming soon' : 'Sign in for full access'}
          </p>
        </div>
      </div>
      
      {/* Order History Modal */}
      <OrderHistory 
        isOpen={orderHistoryOpen}
        onClose={() => setOrderHistoryOpen(false)}
      />
    </>
  );
} 