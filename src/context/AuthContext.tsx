import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  quickDemoLogin: (role?: 'customer' | 'farmer') => void;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'sunrisecrop_auth_user';
const ORDERS_STORAGE_KEY = 'sunrisecrop_user_orders';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const login = async (email: string, password: string) => {
    // Basic verification
    if (!email || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    // Check if matches demo user or create session
    const matched = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (matched) {
      setUser(matched);
      setIsAuthModalOpen(false);
      return { success: true, message: `Welcome back, ${matched.name}!` };
    }

    // Allow user to sign in with any valid email
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: formattedName,
      email: email.trim(),
      phone: '+91 98000 00000',
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=15803d`,
      addresses: [
        {
          id: 'addr-default',
          fullName: formattedName,
          phone: '+91 98000 00000',
          street: '125 Organic Valley Park',
          city: 'Harvest County',
          state: 'FR',
          postalCode: '98765',
          isDefault: true,
        },
      ],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, message: `Welcome back, ${formattedName}!` };
  };

  const quickDemoLogin = (role: 'customer' | 'farmer' = 'customer') => {
    const demo = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setUser(demo);
    setIsAuthModalOpen(false);
  };

  const register = async (name: string, email: string, password: string, phone = '') => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98000 00000',
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=15803d`,
      addresses: [
        {
          id: 'addr-' + Date.now(),
          fullName: name.trim(),
          phone: phone.trim() || '+91 98000 00000',
          street: 'Green Farm Residency, Block A',
          city: 'Harvest County',
          state: 'FR',
          postalCode: '98765',
          isDefault: true,
        },
      ],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, message: `Account created! Welcome to SunriseCrop Farm, ${newUser.name}.` };
  };

  const logout = () => {
    setUser(null);
    setIsOrdersModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        quickDemoLogin,
        register,
        logout,
        orders,
        addOrder,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
