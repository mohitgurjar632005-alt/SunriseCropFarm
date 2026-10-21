import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    quickDemoLogin,
  } = useAuth();
  const { showToast } = useCart();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [showForgotView, setShowForgotView] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalTab === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.message);
        } else {
          showToast(res.message, 'success');
        }
      } else {
        const res = await register(name, email, password, phone);
        if (!res.success) {
          setError(res.message);
        } else {
          showToast(res.message, 'success');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = (role: 'customer' | 'farmer') => {
    quickDemoLogin(role);
    showToast(
      role === 'customer'
        ? 'Signed in as Ramesh Patel (Patron)'
        : 'Signed in as Anita Sharma (Organic Farmer)',
      'success'
    );
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address first.');
      return;
    }
    setForgotPasswordSent(true);
    setTimeout(() => {
      setForgotPasswordSent(false);
      setShowForgotView(false);
      showToast(`Password reset link sent to ${email}`, 'info');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 z-10 animate-scale-up">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 px-6 py-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-700/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-emerald-600/50 rounded-lg text-emerald-200">
              <Sprout className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              SunriseCrop Farm Portal
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {showForgotView
              ? 'Reset Password'
              : authModalTab === 'login'
              ? 'Welcome Back'
              : 'Create Farm Account'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {showForgotView
              ? 'Enter your email to receive recovery instructions'
              : authModalTab === 'login'
              ? 'Log in to manage orders, addresses, and delivery preferences'
              : 'Join our community for farm-fresh updates and exclusive discounts'}
          </p>
        </div>

        {/* Quick Demo Login Bar */}
        {!showForgotView && (
          <div className="bg-emerald-50/80 px-6 py-3 border-b border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-emerald-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Quick 1-Click Demo Login:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('customer')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Patron
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('farmer')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Farmer
              </button>
            </div>
          </div>
        )}

        {/* Tab Toggle */}
        {!showForgotView && (
          <div className="flex border-b border-slate-100 px-6 pt-3">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setError('');
              }}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 cursor-pointer transition-all ${
                authModalTab === 'login'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('register');
                setError('');
              }}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 cursor-pointer transition-all ${
                authModalTab === 'register'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {showForgotView ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {forgotPasswordSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold">Recovery link sent!</p>
                  <p className="text-xs text-slate-600">Please check your inbox.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    Send Reset Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForgotView(false)}
                    className="w-full text-center text-xs font-bold text-slate-500 hover:text-emerald-700 cursor-pointer"
                  >
                    Back to Log In
                  </button>
                </>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authModalTab === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98234 56789"
                        className="w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patel@farmfresh.in"
                    className="w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password *</label>
                  {authModalTab === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotView(true)}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {authModalTab === 'login' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    defaultChecked
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 font-medium">
                    Keep me signed in on this device
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : authModalTab === 'login'
                    ? 'Log In to Account'
                    : 'Create Account & Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
