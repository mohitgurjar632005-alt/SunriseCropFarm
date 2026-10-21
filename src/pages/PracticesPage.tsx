import React, { useState } from 'react';
import { Sprout, RefreshCw, ShieldCheck, Droplets, Leaf, CheckCircle2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { FARMING_PRACTICES } from '../data/mockData';

interface PracticesPageProps {
  onNavigate: (path: string) => void;
}

export const PracticesPage: React.FC<PracticesPageProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(FARMING_PRACTICES[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-emerald-600" />;
      case 'Recycle':
        return <RefreshCw className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-emerald-600" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sprout className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Earth & Science
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Sustainable & Organic Farming Practices
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Learn about our sustainable and organic farming practices. Discover how we focus on soil health, natural fertilizers, and eco-friendly agriculture.
        </p>
      </div>

      {/* Banner */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-emerald-100 p-2 md:p-3">
        <img
          src="/assets/farming_practices_banner_1782292050866-je9YQrhh.jpg"
          alt="Sustainable farming practices in action"
          className="w-full max-h-[500px] object-cover rounded-2xl mx-auto bg-slate-50"
        />
      </div>

      {/* Practices Cards List */}
      <div className="space-y-6">
        {FARMING_PRACTICES.map((practice, index) => {
          const isExpanded = expandedId === practice.id;
          return (
            <div
              key={practice.id}
              className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'border-emerald-300 shadow-lg ring-1 ring-emerald-200'
                  : 'border-slate-100 shadow-2xs hover:border-emerald-200'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : practice.id)}
                className="p-6 md:p-8 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    {getIcon(practice.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Practice #{index + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                      {practice.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                      {practice.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-2 text-slate-400 hover:text-emerald-700 transition-colors shrink-0"
                  aria-label="Toggle details"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {isExpanded && (
                <div className="px-6 md:px-8 pb-8 pt-2 border-t border-slate-100 bg-emerald-50/30 space-y-5 animate-fade-in">
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {practice.details}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Proven Ecological Benefits:
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {practice.benefits.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 bg-white rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-950 shadow-2xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to action card */}
      <div className="bg-emerald-900 text-white p-8 md:p-12 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-extrabold">
          Taste the Fruits of Honest, Caring Agriculture
        </h3>
        <p className="text-sm text-emerald-200/80 max-w-xl mx-auto leading-relaxed">
          When you support SunriseCrop Farm, you are directly investing in clean groundwater, biodiversity preservation, and wholesome nutrition for your family.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate('/products')}
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Order Certified Organic Harvest
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-8 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm transition-all cursor-pointer border border-emerald-700"
          >
            Contact Our Farmers
          </button>
        </div>
      </div>
    </div>
  );
};
