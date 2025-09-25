export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type FilterOptions = {
  category: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'name';