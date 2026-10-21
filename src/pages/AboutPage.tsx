import React from 'react';
import { Sprout, ShieldCheck, HeartHandshake, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Our Heritage & Roots
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          About SunriseCrop Farm
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          SunriseCrop Farm is dedicated to producing fresh, high-quality agricultural products through sustainable farming methods that protect natural resources and strengthen local farming communities.
        </p>
      </div>

      {/* Hero Farmers Banner */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-emerald-100 p-2 md:p-3">
        <img
          src="/assets/about_us_farmers_1782034597291-BwC26JeY.jpg"
          alt="Our dedicated farmers in the fields"
          className="w-full max-h-[500px] object-cover rounded-2xl mx-auto bg-slate-50"
        />
      </div>

      {/* Our Story Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            How It Began
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Farming in Harmony With Nature
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founded with a steadfast passion for pure agriculture, SunriseCrop Farm began as a humble family acreage dedicated to regenerating mistreated soil. Over the years, we expanded our regenerative methods across hundreds of fertile acres.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            We reject harmful synthetic pesticides, hormone growth stimulants, and genetic engineering. Instead, we nurture biological complexity—fostering earthworms, beneficial ladybugs, and native grasses that keep the soil rich and crumbly.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/practices')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <span>Explore our eco-friendly agriculture methods</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-emerald-50/70 p-8 rounded-3xl border border-emerald-100 space-y-6">
          <h3 className="text-lg font-bold text-emerald-950">Our Guiding Pillars</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sprout className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Soil First Philosophy</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Topsoil health governs every nutrient in your food. We enrich our land through organic humus and compost.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Zero Synthetic Chemicals</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  100% certified pesticide-free crops ensuring pure nutrition for your children and household.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Fair Community Prosperity</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Fair wages, healthcare, and safe dignified working conditions for all our skilled farm workers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Stats */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">100%</div>
          <div className="text-xs text-emerald-200 mt-1 font-semibold">Organic Certified</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">500+</div>
          <div className="text-xs text-emerald-200 mt-1 font-semibold">Acres Regenerated</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">10,000+</div>
          <div className="text-xs text-emerald-200 mt-1 font-semibold">Happy Households</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">0%</div>
          <div className="text-xs text-emerald-200 mt-1 font-semibold">Chemical Sprays</div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-4">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Experience the Difference of Real Organic Food
        </h3>
        <button
          onClick={() => onNavigate('/products')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Order Fresh Harvest Produce</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
