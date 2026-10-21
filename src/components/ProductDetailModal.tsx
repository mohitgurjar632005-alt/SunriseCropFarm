import React, { useState } from 'react';
import { X, ShoppingCart, Check, Star, Plus, Minus, Sparkles, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    onBuyNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 z-10 my-8 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[280px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              100% Certified Organic
            </span>
            <span className="bg-slate-900/80 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit">
              {product.category}
            </span>
          </div>
        </div>

        {/* Right: Info and Actions */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-400 font-normal">
                  ({product.reviewCount} customer reviews)
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                  In Stock
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-sm font-bold text-emerald-800 mt-1">
                  {product.hindiName}
                </p>
              )}
              <p className="text-emerald-800 text-2xl font-extrabold mt-1">
                {product.price}
                <span className="text-xs text-slate-500 font-normal ml-2">({product.unit})</span>
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{product.desc}</p>

            {/* Dosage box if available */}
            {product.dosage && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-extrabold text-amber-950 block">
                  🚜 प्रयोग विधि एवं मात्रा (Dosage & Application):
                </span>
                <p className="font-medium">{product.dosage}</p>
              </div>
            )}

            {/* Organic Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Key Farm Highlights
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrients / Technical Specs Highlights */}
            <div className="space-y-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">
                  {['Seeds', 'Organic Fertilisers', 'Bio-Pesticides', 'Organic Insecticides'].includes(product.category)
                    ? 'Application & Specifications: '
                    : 'Nutritional Profile: '}
                </span>
                {product.specs && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {product.specs}
                  </span>
                )}
              </div>
              <p className="text-slate-600 mt-1 leading-relaxed">
                {product.nutrients.join(' • ')}
              </p>
            </div>
          </div>

          {/* Stepper & Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Select Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200 stroke-[3]" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Quality Tested
              </span>
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" /> Direct from Farmers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
