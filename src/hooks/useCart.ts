import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
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

const CART_STORAGE_KEY = "gst-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const itemsRef = useRef<CartItem[]>(items);
  const hydrated = useRef(false);

  // Restore the cart after mount (not during render, to keep SSR and client markup identical).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
    } catch {
      /* storage unavailable or corrupt — start with an empty cart */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    itemsRef.current = items;
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [items]);

  const addItem = useCallback((service: Omit<CartItem, "quantity">) => {
    if (itemsRef.current.some((item) => item.id === service.id)) {
      toast.info(`${service.name} is already in your cart`);
      return;
    }
    toast.success(`${service.name} added to your cart`);
    setItems((prev) =>
      prev.some((item) => item.id === service.id) ? prev : [...prev, { ...service, quantity: 1 }],
    );
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
