import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode, Banknote, Calendar, ChevronRight, PackageCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order, Address } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewOrders: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onViewOrders }) => {
  const { cart, subtotal, discount, shippingFee, total, clearCart, showToast } = useCart();
  const { user, addOrder, setIsAuthModalOpen } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98234 56789');
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || '125 Organic Valley Park');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Harvest County');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || 'FR-98765');
  const [deliverySlot, setDeliverySlot] = useState('Tomorrow Morning (7:00 AM - 11:00 AM) — Fresh Morning Harvest');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderAddress: Address = {
        id: 'addr-' + Date.now(),
        fullName,
        phone,
        street,
        city,
        state: 'Harvest County',
        postalCode,
      };

      const orderNumber = 'SCF-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: Order = {
        id: orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cart],
        subtotal,
        discount,
        shippingFee,
        total,
        status: 'Processing',
        paymentMethod:
          paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : paymentMethod === 'upi'
            ? 'UPI / QR Payment (Completed)'
            : 'Credit / Debit Card (Verified)',
        deliveryAddress: orderAddress,
        deliverySlot,
      };

      addOrder(newOrder);
      setCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#16a34a', '#22c55e', '#86efac', '#eab308', '#ffffff'],
        });
      } catch {
        // ignore
      }

      showToast(`Order #${orderNumber} placed successfully!`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 z-10 my-8">
        {/* Success / Order Confirmation View */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Harvest Order Confirmed
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Thank You for Supporting Organic Farming!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We have received your order{' '}
                <strong className="text-emerald-700">#{completedOrder.id}</strong>. Our farm
                workers are preparing your fresh harvest for dispatch.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-900">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Scheduled Delivery Slot:</span>
                <span className="font-semibold text-slate-800 text-right">
                  {completedOrder.deliverySlot}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-800 text-right">
                  {completedOrder.deliveryAddress.street}, {completedOrder.deliveryAddress.city}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment:</span>
                <span className="font-semibold text-emerald-700">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-extrabold text-slate-900">
                <span>Total Amount Paid / Due:</span>
                <span className="text-emerald-700">₹{completedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  handleClose();
                  onViewOrders();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Track in My Orders</span>
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer"
              >
                Back to Farm Shop
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            <div className="bg-emerald-900 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Farm Direct Checkout
                </h3>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Safe, organic certified farm delivery straight to your doorstep
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!user && (
              <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
                <span>Already have a customer account?</span>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="font-bold underline text-amber-950 hover:text-emerald-800 cursor-pointer"
                >
                  Log in for faster checkout
                </button>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  1. Delivery Information
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98234 56789"
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address / House / Colony *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. 125 Organic Valley Park, Sector 4"
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / PIN *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Harvest County, 98765"
                      className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Preferred Delivery Slot
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="Tomorrow Morning (7:00 AM - 11:00 AM) — Fresh Morning Harvest">
                      Tomorrow Morning (7:00 AM - 11:00 AM) — Fresh Morning Harvest
                    </option>
                    <option value="Tomorrow Afternoon (2:00 PM - 6:00 PM) — Regular Farm Dispatch">
                      Tomorrow Afternoon (2:00 PM - 6:00 PM) — Regular Farm Dispatch
                    </option>
                    <option value="Express Same-Day Delivery (Within 4 Hours)">
                      Express Same-Day Delivery (Within 4 Hours)
                    </option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  2. Payment Method
                </h4>

                <div className="grid sm:grid-cols-3 gap-3">
                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="sr-only"
                    />
                    <QrCode className="w-6 h-6 mb-1 text-emerald-600" />
                    <span className="text-xs">UPI / QR Code</span>
                    <span className="text-[10px] text-slate-500 font-normal">GPay, PhonePe, Paytm</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <Banknote className="w-6 h-6 mb-1 text-emerald-600" />
                    <span className="text-xs">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-500 font-normal">Pay upon receipt</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <CreditCard className="w-6 h-6 mb-1 text-emerald-600" />
                    <span className="text-xs">Credit / Debit Card</span>
                    <span className="text-[10px] text-slate-500 font-normal">Instant & Secure</span>
                  </label>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Items ({cart.length} types)</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Applied</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-emerald-700">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isSubmitting
                    ? 'Confirming Farm Order...'
                    : `Place Order • ₹${total.toLocaleString()}`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
