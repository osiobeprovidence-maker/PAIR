import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  paymentOption: "full" | "installment";
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, paymentOption: "full" | "installment") => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalDelivery: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: string, color: string, paymentOption: "full" | "installment" = "full") => {
    setItems((prev) => [...prev, { ...product, selectedSize: size, selectedColor: color, paymentOption }]);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const totalDelivery = items.reduce((acc, item) => acc + item.deliveryFee, 0);
  const total = subtotal + totalDelivery;

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      clearCart, 
      totalItems: items.length,
      subtotal,
      totalDelivery,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
