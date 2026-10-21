import React, { useState } from 'react';
import { Sprout, CheckCircle2, ShieldCheck, HeartHandshake, Truck, Users, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProductDetail }) => {
  const { applyPromo, setIsCartOpen } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredProducts = selectedFilter === 'All'
    ? PRODUCTS.slice(0, 12)
    : PRODUCTS.filter(
        (p) =>
          p.category === selectedFilter ||
          (selectedFilter === 'Khad & Organic Manures' &&
            (p.category === 'Khad & Organic Manures' ||
              p.category === 'Organic Fertilisers'))
      );

  const whyChooseUsItems = [
    { icon: Sprout, title: '100% Fresh Farm Products', desc: 'Harvested fresh every morning directly from our fields.' },
    { icon: ShieldCheck, title: 'Sustainable Practices', desc: 'Committed to organic compost, zero synthetic chemicals, and soil health.' },
    { icon: CheckCircle2, title: 'Quality Tested Produce', desc: 'Each batch is rigorously inspected for pure organic nutrition.' },
    { icon: Truck, title: 'Direct Farm to Customer', desc: 'No middlemen. Delivered straight to your kitchen in optimal freshness.' },
    { icon: Users, title: 'Trusted by Local Communities', desc: 'Supplying hundreds of healthy households across the region.' },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-emerald-50/30 to-white pb-20 pt-12 md:pt-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Hero Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs mb-6 shadow-2xs border border-emerald-200">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Sustainable & Organic Agriculture</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Welcome to <br className="hidden sm:inline" />
                <span className="text-emerald-800">SunriseCrop Farm</span>
              </h1>

              <p className="text-xl md:text-2xl text-emerald-700 font-semibold mb-5">
                Fresh From Our Fields to Your Family
              </p>

              <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-xl">
                At SunriseCrop Farm, we are passionate about growing healthy, sustainable, and high-quality farming products. Our farm combines traditional agricultural values with modern farming techniques to provide fresh produce and natural crops that support healthy living.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('/products')}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 cursor-pointer active:scale-98"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('/practices')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 px-7 py-4 rounded-full font-bold text-base transition-all shadow-2xs cursor-pointer"
                >
                  <span>Our Farming Practices</span>
                </button>
              </div>

              {/* Promo Banner Tag */}
              <div className="mt-8 flex items-center gap-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Tag className="w-4 h-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">
                    Get 10% OFF on all organic orders
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Use promo code <span className="font-extrabold text-emerald-700">ORGANIC10</span> at checkout!
                  </p>
                </div>
                <button
                  onClick={() => {
                    applyPromo('ORGANIC10');
                    setIsCartOpen(true);
                  }}
                  className="ml-auto text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-emerald-100/60 transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500 max-w-lg mx-auto">
                <img
                  src="/assets/home_hero_banner_1782034414846-Diulwge4.jpg"
                  alt="SunriseCrop Farm Fresh Harvest"
                  className="w-full h-auto max-h-[550px] object-cover rounded-[2rem] bg-slate-50"
                />
                <div className="mt-4 px-3 py-2 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Purity & Sustainability Guaranteed
                  </span>
                  <span className="text-slate-400 font-medium">Harvest Season 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Our Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
            Why Choose SunriseCrop Farm?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every crop is nurtured with care, respect for the earth, and an uncompromising standard for purity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {whyChooseUsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl shadow-xs border border-emerald-100 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="bg-emerald-50 p-4 rounded-2xl mb-4 text-emerald-700">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section with Add to Cart */}
      <section className="bg-slate-50/90 py-16 px-4 md:px-6 border-y border-emerald-100/60">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                Harvest Store
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Our Featured Products
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Order directly online with our new quick cart and home delivery!
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All Products', value: 'All' },
                { label: 'Khat & Manures (खाद)', value: 'Khad & Organic Manures' },
                { label: 'Crop Medicines (फसल दवा)', value: 'Crop Medicines' },
                { label: 'Khad Decomposers (खाद उपचार)', value: 'Khad Treatment & Bio-Decomposers' },
                { label: 'Certified Seeds (बीज)', value: 'Seeds' },
                { label: 'Bio-Pesticides', value: 'Bio-Pesticides' },
                { label: 'Organic Insecticides', value: 'Organic Insecticides' },
                { label: 'Grains & Harvest', value: 'Grains' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedFilter(cat.value)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedFilter === cat.value
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenProductDetail}
              />
            ))}
          </div>

          {/* Bottom View All CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/products')}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-emerald-600/30 cursor-pointer"
            >
              <span>View All Farm Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Vision Spotlight */}
      <section className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center border border-emerald-900/40">
          <div className="w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center shrink-0">
            <img
              src="/assets/premium_farm_lifestyle_1782035018788-yaoc1HG-.jpg"
              alt="Premium organic farming lifestyle"
              className="w-full max-h-[460px] rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-14 relative flex flex-col justify-center text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Our Vision & Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
              Responsible Farming for Future Generations
            </h2>
            <blockquote className="text-lg md:text-xl text-emerald-100/90 italic mb-6 leading-relaxed border-l-4 border-emerald-500 pl-4">
              "To become a leading provider of sustainable agricultural products while promoting responsible farming practices worldwide."
            </blockquote>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              We believe food should nourish people without impoverishing the earth. Through continuous soil rejuvenation, renewable energy, and ethical water stewardship, our harvest is nature's finest gift.
            </p>
            <div>
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors cursor-pointer"
              >
                <span>Read Our Farm Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Organic Farming Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-emerald-100">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Commitment to Organic Farming
            </h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Our dedication to <strong className="text-emerald-700 font-bold">Organic Farming</strong> ensures that every crop we grow is free from synthetic chemicals. We focus heavily on maintaining excellent <strong className="text-emerald-700 font-bold">Soil Health</strong> and using only natural <strong className="text-emerald-700 font-bold">Compost & Bio-Fertilizers</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Pesticide-Free Land
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero synthetic sprays or chemical runoff protecting our local aquifer and pollinators.
                </p>
              </div>

              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Mineral Rich Topsoil
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cover cropping and natural composting enhance the soil microbiome for nutrient-dense food.
                </p>
              </div>

              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Farm-to-Door Delivery
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fresh harvests packed carefully in eco-friendly bags and crates directly for your family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
