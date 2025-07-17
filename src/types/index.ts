export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  inStock: boolean;
  featured?: boolean;
  specifications?: Record<string, string>;
}

export type ProductCategory = 
  | 'vapes' 
  | 'glass' 
  | 'accessories' 
  | 'papers' 
  | 'lighters' 
  | 'CBD';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  orderType: 'pickup' | 'delivery';
  pickupTime?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: Date;
} 