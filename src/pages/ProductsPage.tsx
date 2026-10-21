import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, CheckCircle2, ArrowUpDown, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductsPageProps {
  onOpenProductDetail: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenProductDetail }) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { label: 'All Products', value: 'All' },
    { label: 'Khat / Khad (खाद)', value: 'Khad & Organic Manures' },
    { label: 'Crop Medicines (फसल दवा)', value: 'Crop Medicines' },
    { label: 'Khad Decomposers (खाद उपचार)', value: 'Khad Treatment & Bio-Decomposers' },
    { label: 'Bio-Pesticides', value: 'Bio-Pesticides' },
    { label: 'Organic Insecticides', value: 'Organic Insecticides' },
    { label: 'Certified Seeds (बीज)', value: 'Seeds' },
    { label: 'Grains & Harvest', value: 'Grains' },
    { label: 'Vegetables & Fruits', value: 'Vegetables' },
  ];

  const benefitsList = [
    '100% Bio & Organic Certified Inputs',
    'Zero Synthetic Chemical Toxicity',
    'High Germination & Viable Spore Counts',
    'Safe for Pollinators, Earthworms & Soil',
  ];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const isKhadQuery = query === 'khat' || query === 'khad' || query === 'खाद';
    const isMedicineQuery =
      query === 'medicine' ||
      query === 'medicines' ||
      query === 'dawa' ||
      query === 'dawai' ||
      query === 'दवा';

    return PRODUCTS.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.hindiName && item.hindiName.toLowerCase().includes(query)) ||
        (item.dosage && item.dosage.toLowerCase().includes(query)) ||
        (isKhadQuery &&
          (item.category === 'Khad & Organic Manures' ||
            item.category === 'Organic Fertilisers')) ||
        (isMedicineQuery &&
          (item.category === 'Crop Medicines' ||
            item.category === 'Bio-Pesticides' ||
            item.category === 'Organic Insecticides'));

      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Khad & Organic Manures' &&
          item.category === 'Organic Fertilisers') ||
        (selectedCategory === 'Vegetables' && item.category === 'Fruits');

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Direct From SunriseCrop Farm
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Our Farm Products
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Discover our fresh agricultural products, including organic wheat, golden corn, and naturally-grown fruits and vegetables, cultivated with care and sustainability in mind.
        </p>
      </div>

      {/* Showcase Banner */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-emerald-100 p-2 md:p-3">
        <img
          src="/assets/products_showcase_banner_1782034699493-oJ6xvTUW.jpg"
          alt="Premium farm products showcase"
          className="w-full max-h-[460px] object-cover rounded-2xl mx-auto bg-slate-50"
        />
      </div>

      {/* Sticky Cart Notification Strip if items added */}
      {totalItems > 0 && (
        <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <p className="text-sm font-bold">
                You have {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart (₹{subtotal.toLocaleString()})
              </p>
              <p className="text-xs text-emerald-200">
                Ready for fresh harvest dispatch straight to your doorstep.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Open Cart & Checkout
          </button>
        </div>
      )}

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xs border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search khat, gobar khad, crop medicines, tonics, seeds..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100/80 hover:bg-emerald-50 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="featured">Featured Crops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Content: Products Grid + Benefits Sidebar */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left 3 cols: Product Cards */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
              <p className="text-slate-400 text-sm">No farm products match your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={onOpenProductDetail}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right 1 col: Product Benefits and Assurance Sidebar */}
        <div className="space-y-6">
          <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-base">Product Benefits</h3>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Every harvest at SunriseCrop Farm is grown using organic and regenerative farming methods.
            </p>
            <div className="space-y-3">
              {benefitsList.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-emerald-100 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Farm Quality Seal */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-2xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Our Farm Guarantee
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We stand 100% behind our harvest. If your grains or produce do not meet peak freshness standards upon delivery, we will replace your order immediately.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
              <Truck className="w-3.5 h-3.5" />
              Free delivery on orders over ₹1,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
