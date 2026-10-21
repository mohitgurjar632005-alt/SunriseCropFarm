export interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  priceNum: number;
  unit: string;
  image: string;
  category:
    | 'Grains'
    | 'Vegetables'
    | 'Fruits'
    | 'Farm Pantry'
    | 'Organic Fertilisers'
    | 'Khad & Organic Manures'
    | 'Crop Medicines'
    | 'Khad Treatment & Bio-Decomposers'
    | 'Bio-Pesticides'
    | 'Organic Insecticides'
    | 'Seeds';
  hindiName?: string;
  dosage?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  freshHarvestDate: string;
  benefits: string[];
  nutrients: string[];
  specs?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'farmer';
  avatar?: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Harvesting' | 'Dispatched' | 'Delivered';
  paymentMethod: string;
  deliveryAddress: Address;
  deliverySlot: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  desc: string;
  author: string;
  category: string;
  content: string[];
}

export interface FarmingPractice {
  id: string;
  title: string;
  iconName: string;
  desc: string;
  benefits: string[];
  details: string;
}
