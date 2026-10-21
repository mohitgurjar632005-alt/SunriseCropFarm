import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sprout, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#0b2110] text-emerald-100 pt-16 border-t border-emerald-900/60">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/sunrisecrop_farm_logo_1782034167817-DkpDXMrG.jpg"
                alt="SunriseCrop Farm"
                className="h-12 w-12 rounded-xl object-contain bg-white/10 p-1 border border-emerald-800"
              />
              <span className="font-extrabold text-xl text-white tracking-tight">
                SunriseCrop<span className="text-emerald-400">Farm</span>
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              SunriseCrop Farm provides fresh, organic produce through sustainable farming practices. Experience nature's best right at your table with direct farm deliveries.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-400" />
              100% Certified Organic & Non-GMO
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/practices')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Sustainable Practices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Our Farm Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Farming Insights Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Contact Our Farmers
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Farm Contact</h4>
            <ul className="space-y-3 text-xs text-emerald-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  125 Green Valley Road,
                  <br />
                  Harvest County, FR 98765
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@sunrisecropfarm.com" className="hover:text-white transition-colors">
                  info@sunrisecropfarm.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Harvest Newsletter</h4>
            <p className="text-xs text-emerald-300/80">
              Subscribe for seasonal harvest alerts, weekly organic discount coupons, and farm reports.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-800/60 rounded-xl border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Welcome to the Sunrise family.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs px-3.5 py-2.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-400/60">
          <p>© {new Date().getFullYear()} SunriseCrop Farm. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-emerald-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-emerald-300 transition-colors">
              Terms of Service
            </a>
            <a href="#cookie" className="hover:text-emerald-300 transition-colors">
              Cookie Policy
            </a>
            <span className="flex items-center gap-1 text-emerald-400/80">
              Grown with <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" /> for nature
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
