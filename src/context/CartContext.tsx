import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  shippingFee: number;
  freeShippingThreshold: number;
  total: number;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sunrisecrop_cart_items';
const PROMO_STORAGE_KEY = 'sunrisecrop_cart_promo';
const FREE_SHIPPING_THRESHOLD = 1000;
const STANDARD_SHIPPING_FEE = 150;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      // Preload 1 sample item so user immediately sees cart with contents if desired, or start fresh
    ];
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } catch {
      // ignore
    }
  }, [promoCode]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const hideToast = () => setToast(null);

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity} × ${product.name} to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name} from cart`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  const upperPromo = promoCode.trim().toUpperCase();
  if (upperPromo === 'ORGANIC10') {
    discount = Math.round(subtotal * 0.1);
  } else if (upperPromo === 'FRESH150' && subtotal >= 800) {
    discount = 150;
  } else if (upperPromo === 'HARVEST20' && subtotal >= 2000) {
    discount = Math.round(subtotal * 0.2);
  }

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a coupon code.' };
    }
    if (cleanCode === 'ORGANIC10') {
      setPromoCode('ORGANIC10');
      showToast('10% Organic Discount Applied!', 'success');
      return { success: true, message: 'Coupon ORGANIC10 applied! 10% off entire order.' };
    }
    if (cleanCode === 'FRESH150') {
      if (subtotal < 800) {
        return { success: false, message: 'FRESH150 requires a minimum order of ₹800.' };
      }
      setPromoCode('FRESH150');
      showToast('Flat ₹150 Discount Applied!', 'success');
      return { success: true, message: 'Coupon FRESH150 applied! Flat ₹150 off.' };
    }
    if (cleanCode === 'HARVEST20') {
      if (subtotal < 2000) {
        return { success: false, message: 'HARVEST20 requires a minimum order of ₹2,000.' };
      }
      setPromoCode('HARVEST20');
      showToast('20% Harvest Super Discount Applied!', 'success');
      return { success: true, message: 'Coupon HARVEST20 applied! 20% off.' };
    }
    return { success: false, message: 'Invalid coupon code. Try ORGANIC10 or FRESH150.' };
  };

  const removePromo = () => {
    setPromoCode('');
    showToast('Promo code removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        promoCode,
        applyPromo,
        removePromo,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        total,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
