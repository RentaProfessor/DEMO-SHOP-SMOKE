'use client';

import { useState, useEffect } from 'react';
import { X, Package, Clock, CheckCircle, XCircle, Calendar, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orderService, Order } from '@/lib/mockBackend';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderHistory({ isOpen, onClose }: OrderHistoryProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchOrders();
    }
  }, [isOpen, user]);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const userOrders = orderService.getUserOrders(user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load order history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'confirmed':
        return <Package className="h-4 w-4 text-blue-400" />;
      case 'ready':
        return <Package className="h-4 w-4 text-accent-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'confirmed':
        return 'text-blue-400';
      case 'ready':
        return 'text-accent-400';
      case 'completed':
        return 'text-green-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <div className="max-w-md w-full bg-primary-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-display font-bold text-gray-100 mb-4">
              Please Sign In
            </h2>
            <p className="text-gray-400 mb-6">
              You must be signed in to view your order history.
            </p>
            <button onClick={onClose} className="btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-primary-900 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary-800 px-6 py-4 border-b border-primary-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-gray-100 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order History
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-accent-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Loading your orders...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <button onClick={fetchOrders} className="btn-primary">
                  Try Again
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No orders yet</p>
                <p className="text-gray-500 text-sm">
                  When you place your first order, it will appear here.
                </p>
                <button onClick={onClose} className="btn-primary mt-4">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center gap-3 mb-4 lg:mb-0">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-display font-semibold text-gray-100">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Total</p>
                          <p className="font-semibold text-accent-400">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Status</p>
                          <p className={`font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Customer Info</h4>
                        <div className="space-y-1 text-gray-400">
                          <p className="flex items-center gap-2">
                            <span>📧</span>
                            {order.customerInfo.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {order.customerInfo.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Order Details</h4>
                        <div className="space-y-1 text-gray-400">
                          <p className="flex items-center gap-2">
                            <Package className="h-3 w-3" />
                            {order.orderType === 'pickup' ? 'Store Pickup' : 'Delivery'}
                          </p>
                          {order.pickupTime && (
                            <p className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {order.pickupTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-primary-700">
                        <h4 className="font-medium text-gray-300 mb-3">Items Ordered</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-8 h-8 rounded object-cover bg-primary-800"
                                />
                                <span className="text-gray-300">{item.productName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                <span>×{item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 