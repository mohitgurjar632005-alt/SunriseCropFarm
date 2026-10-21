import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-sky-50 border-sky-200 text-sky-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in shadow-2xl transition-all">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border shadow-lg ${
          bgStyles[toast.type || 'success']
        }`}
      >
        {icons[toast.type || 'success']}
        <p className="text-sm font-semibold flex-1 leading-snug">{toast.message}</p>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-200/50"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
