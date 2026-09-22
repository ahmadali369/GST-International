import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { createElement } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (service: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((service: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === service.id);
      if (existing) {
        toast.info(`${service.name} is already in your cart`);
        return prev;
      }
      toast.success(`${service.name} added to your cart`);
      return [...prev, { ...service, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const isInCart = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  return createElement(
    CartContext.Provider,
    {
      value: { items, addItem, removeItem, updateQuantity, clearCart, getItemCount, isInCart },
    },
    children
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
