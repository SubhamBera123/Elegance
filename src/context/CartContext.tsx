import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && item.size === size && item.color === color
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { productId: product.id, product, quantity, size, color }];
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => !(item.productId === action.payload.productId && 
                 item.size === action.payload.size && 
                 item.color === action.payload.color)
      );
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
      }

      const newItems = state.items.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const items = action.payload;
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      return { items, total, itemCount };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};