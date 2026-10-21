/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersModal } from './components/OrdersModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { PracticesPage } from './pages/PracticesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { Product } from './types';

const MainContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { setIsCartOpen } = useCart();
  const { setIsOrdersModalOpen } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBuyNowFromModal = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Top Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenProductDetail={handleOpenProductDetail}
          />
        )}
        {currentPath === '/products' && (
          <ProductsPage onOpenProductDetail={handleOpenProductDetail} />
        )}
        {currentPath === '/about' && <AboutPage onNavigate={navigateTo} />}
        {currentPath === '/practices' && <PracticesPage onNavigate={navigateTo} />}
        {currentPath === '/blog' && <BlogPage />}
        {currentPath === '/contact' && <ContactPage />}
        {![
          '/',
          '/products',
          '/about',
          '/practices',
          '/blog',
          '/contact',
        ].includes(currentPath) && (
          <HomePage
            onNavigate={navigateTo}
            onOpenProductDetail={handleOpenProductDetail}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onBrowseProducts={() => navigateTo('/products')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onViewOrders={() => setIsOrdersModalOpen(true)}
      />

      {/* User Login / Register Modal */}
      <AuthModal />

      {/* Orders Tracking Modal */}
      <OrdersModal
        onClose={() => setIsOrdersModalOpen(false)}
        onBrowseProducts={() => navigateTo('/products')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNowFromModal}
      />

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}
