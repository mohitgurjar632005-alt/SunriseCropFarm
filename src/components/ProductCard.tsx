import React, { useState } from 'react';
import { ShoppingCart, Check, Star, Plus, Minus, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Organic Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-emerald-200" />
            100% Organic
          </span>
          <span className="bg-slate-900/80 backdrop-blur-xs text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm w-fit">
            {product.category}
          </span>
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="p-2 rounded-full bg-white/90 text-slate-700 hover:text-emerald-700 hover:bg-white shadow-md transition-all cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Harvest Note */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              {product.freshHarvestDate}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">
              {product.hindiName}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.desc}
          </p>

          {/* Unit & Dosage */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[11px] font-medium text-slate-600">
            <span>Pack: <strong className="text-slate-800">{product.unit}</strong></span>
            {product.dosage && (
              <span className="text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-semibold border border-amber-200 truncate max-w-[180px]">
                {product.dosage}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400">Price:</span>
              <div className="text-xl font-extrabold text-emerald-900 leading-none">
                {product.price}
              </div>
            </div>

            {/* Stepper for Quantity */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden"
            >
              <button
                onClick={handleDecrease}
                className="px-2 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2.5 text-xs font-bold text-slate-800">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Big Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 shadow-sm cursor-pointer active:scale-98 ${
              isAdded
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-200 stroke-[3]" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart ({quantity})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
