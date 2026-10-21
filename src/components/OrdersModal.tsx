import React from 'react';
import { X, PackageCheck, Clock, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OrdersModalProps {
  onClose: () => void;
  onBrowseProducts: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ onClose, onBrowseProducts }) => {
  const { isOrdersModalOpen, setIsOrdersModalOpen, orders, user } = useAuth();

  if (!isOrdersModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOrdersModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 z-10 my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-emerald-900 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <PackageCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-xl font-bold">My Farm Orders</h3>
              <p className="text-xs text-emerald-200">
                {user ? `Account orders for ${user.name}` : 'Recent harvest purchases'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="text-emerald-300 hover:text-white p-1.5 rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">No harvest orders yet</h4>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Once you place an order for our organic produce or grains, you can monitor harvesting and delivery progress right here.
              </p>
              <button
                onClick={() => {
                  setIsOrdersModalOpen(false);
                  onBrowseProducts();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <span>Shop Fresh Harvest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 hover:border-emerald-300 transition-all"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Order ID: </span>
                    <strong className="text-sm font-extrabold text-slate-900">#{order.id}</strong>
                    <span className="text-xs text-slate-400 ml-2">• {order.date}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-100"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} × ₹{item.product.priceNum.toLocaleString()} ({item.product.unit})
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">
                        ₹{(item.product.priceNum * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery and Total */}
                <div className="flex flex-wrap items-center justify-between text-xs pt-2 text-slate-600 border-t border-slate-200/60">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Deliver to: {order.deliveryAddress.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {order.deliveryAddress.street}, {order.deliveryAddress.city}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      Slot: {order.deliverySlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-[11px]">Total Paid ({order.paymentMethod})</p>
                    <p className="text-base font-extrabold text-emerald-700">
                      ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
