import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User as UserIcon, Menu, X, LogOut, PackageCheck, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, setAuthModalTab, logout, setIsOrdersModalOpen, orders } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Practices', path: '/practices' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-gray-900 group cursor-pointer text-left focus:outline-none"
        >
          <img
            src="/assets/sunrisecrop_farm_logo_1782034167817-DkpDXMrG.jpg"
            alt="SunriseCrop Farm Logo"
            className="h-12 w-12 object-contain rounded-xl shadow-xs border border-emerald-100 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-xl md:text-2xl tracking-tight text-emerald-950 flex items-center gap-1">
              SunriseCrop<span className="text-emerald-600 font-semibold">Farm</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase -mt-0.5">
              Sustainable & Organic
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons: Cart + Login/User */}
        <div className="flex items-center gap-3">
          {/* Add to Cart / View Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 font-medium text-sm transition-all duration-200 border border-emerald-200/80 cursor-pointer shadow-xs active:scale-95 group"
            aria-label="View shopping cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs animate-scale-up">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">
              {totalItems === 0 ? 'Cart' : `₹${subtotal.toLocaleString()}`}
            </span>
          </button>

          {/* User Account / Login Button */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-sm font-semibold transition-all cursor-pointer focus:outline-none"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="hidden md:inline max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-scale-up">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-emerald-700 font-medium capitalize mt-0.5">
                      🌱 {user.role === 'farmer' ? 'Organic Farmer' : 'Farm Patron'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsOrdersModalOpen(true);
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left font-medium"
                  >
                    <div className="flex items-center gap-2.5">
                      <PackageCheck className="w-4 h-4 text-emerald-600" />
                      <span>My Orders</span>
                    </div>
                    {orders.length > 0 && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                        {orders.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('/products');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left font-medium"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Shop Fresh Harvest</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleOpenLogin}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <UserIcon className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-emerald-100 px-5 py-5 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full p-3 rounded-xl bg-emerald-50 text-emerald-900 font-bold text-sm"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                View Shopping Cart
              </span>
              <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full">
                {totalItems} items (₹{subtotal.toLocaleString()})
              </span>
            </button>

            {!user ? (
              <button
                onClick={handleOpenLogin}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                Log In / Create Account
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline p-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
