'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { orderService } from '@/lib/mockBackend';
import { Customer } from '@/types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Update customer info when user changes
  useEffect(() => {
    if (user) {
      setCustomer({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleCustomerChange = (field: keyof Customer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return customer.firstName && customer.lastName && customer.email && customer.phone;
  };

  const validateStep2 = () => {
    return orderType && (orderType === 'delivery' || pickupTime);
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      setOrderError('You must be signed in to place an order');
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);
    
    try {
      const { order, error } = await orderService.createOrder(
        cart.items,
        customer,
        {
          orderType,
          pickupTime
        }
      );

      if (error || !order) {
        setOrderError(error || 'Failed to create order');
        setIsSubmitting(false);
        return;
      }

      setCreatedOrder(order);
      setOrderComplete(true);
      setIsSubmitting(false);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setOrderError(null);
        setCreatedOrder(null);
        setStep(1);
        onClose();
      }, 5000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setOrderError('An unexpected error occurred while placing your order');
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    
    for (let hour = 10; hour <= 20; hour++) {
      const time = `${hour}:00`;
      const timeLabel = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push({ value: time, label: timeLabel });
    }
    
    return slots;
  };

  if (orderComplete && createdOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-primary-900 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-100 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-400 mb-6">
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <p><span className="font-medium">Order ID:</span> {createdOrder.id.slice(0, 8)}</p>
            <p><span className="font-medium">Order Total:</span> ${createdOrder.total.toFixed(2)}</p>
            <p><span className="font-medium">Items:</span> {cart.itemCount}</p>
            <p><span className="font-medium">Status:</span> {createdOrder.status}</p>
            {createdOrder.pickup_time && (
              <p><span className="font-medium">Pickup Time:</span> {createdOrder.pickup_time}</p>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This window will close automatically in a few seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-primary-900 rounded-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-primary-800 px-8 py-6 border-b border-primary-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-gray-100">
                Checkout
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-6 space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNum ? 'bg-accent-600 text-white' : 'bg-primary-700 text-gray-400'}
                  `}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-accent-600' : 'bg-primary-700'}`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Customer Info</span>
              <span>Order Details</span>
              <span>Payment</span>
            </div>
          </div>

          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-semibold text-gray-100 mb-6">
                  Customer Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={customer.firstName}
                        onChange={(e) => handleCustomerChange('firstName', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={customer.lastName}
                        onChange={(e) => handleCustomerChange('lastName', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => handleCustomerChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => handleCustomerChange('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!validateStep1()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Order Details
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-semibold text-gray-100 mb-6">
                  Order Details
                </h3>
                
                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Order Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setOrderType('pickup')}
                      className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                        orderType === 'pickup'
                          ? 'border-accent-600 bg-accent-950/30'
                          : 'border-primary-700 bg-primary-800'
                      }`}
                    >
                      <MapPin className="h-6 w-6 text-accent-400 mx-auto mb-2" />
                      <div className="text-center">
                        <h4 className="font-medium text-gray-100">Store Pickup</h4>
                        <p className="text-sm text-gray-400">Free - Available today</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                        orderType === 'delivery'
                          ? 'border-accent-600 bg-accent-950/30'
                          : 'border-primary-700 bg-primary-800'
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="font-medium text-gray-100">Delivery</h4>
                        <p className="text-sm text-gray-400">Coming soon</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Pickup Time Selection */}
                {orderType === 'pickup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pickup Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      >
                        <option value="">Select pickup time</option>
                        {generateTimeSlots().map((slot) => (
                          <option key={slot.value} value={slot.label}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="card p-6">
                  <h4 className="font-display font-semibold text-gray-100 mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <span className="text-gray-100">{item.product.name}</span>
                          <span className="text-gray-400 ml-2">×{item.quantity}</span>
                        </div>
                        <span className="text-accent-400 font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-primary-700 pt-3 flex justify-between items-center">
                      <span className="font-semibold text-gray-100">Total:</span>
                      <span className="font-bold text-xl text-accent-400">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!validateStep2()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-semibold text-gray-100 mb-6">
                  Payment & Confirmation
                </h3>
                
                <div className="bg-accent-950/30 border border-accent-800/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-6 w-6 text-accent-400" />
                    <h4 className="font-display font-semibold text-accent-300">Payment Information</h4>
                  </div>
                  <p className="text-accent-200 text-sm">
                    For this demo, payment will be processed in-store upon pickup. 
                    No credit card information is required at this time.
                  </p>
                </div>

                {/* Final Order Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="card p-6">
                    <h4 className="font-display font-semibold text-gray-100 mb-4">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Name:</span> {customer.firstName} {customer.lastName}</p>
                      <p><span className="text-gray-400">Email:</span> {customer.email}</p>
                      <p><span className="text-gray-400">Phone:</span> {customer.phone}</p>
                      <p><span className="text-gray-400">Type:</span> {orderType === 'pickup' ? 'Store Pickup' : 'Delivery'}</p>
                      {pickupTime && <p><span className="text-gray-400">Pickup Time:</span> {pickupTime}</p>}
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h4 className="font-display font-semibold text-gray-100 mb-4">Order Total</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal:</span>
                        <span className="text-gray-100">${cart.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax:</span>
                        <span className="text-gray-100">${(cart.total * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t border-primary-700 pt-2">
                        <span className="text-gray-100">Total:</span>
                        <span className="text-accent-400">${(cart.total * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Error Message */}
                {orderError && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/30 border border-red-800/50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{orderError}</p>
                  </div>
                )}

                {/* Auth Warning */}
                {!user && (
                  <div className="flex items-center gap-2 p-3 bg-accent-950/30 border border-accent-800/50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-accent-400 flex-shrink-0" />
                    <p className="text-sm text-accent-300">
                      You must be signed in to place an order. Please sign in from the account menu.
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || !user}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 