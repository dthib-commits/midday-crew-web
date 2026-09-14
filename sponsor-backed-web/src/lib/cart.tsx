'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, Product } from './types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: { size?: string; customMonogram?: string; quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  giftMemo: string;
  setGiftMemo: (memo: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 120.0;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [giftMemo, setGiftMemo] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sb_cart');
      if (saved) setItems(JSON.parse(saved));
      const savedMemo = localStorage.getItem('sb_gift_memo');
      if (savedMemo) setGiftMemo(savedMemo);
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('sb_cart', JSON.stringify(items));
      localStorage.setItem('sb_gift_memo', giftMemo);
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, giftMemo, mounted]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, options?: { size?: string; customMonogram?: string; quantity?: number }) => {
    const qty = options?.quantity || 1;
    const size = options?.size || (product.sizes ? product.sizes[0] : undefined);
    const customMonogram = options?.customMonogram;

    const uniqueId = `${product.id}-${size || 'default'}-${customMonogram || 'none'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === uniqueId);
      if (existing) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      const newItem: CartItem = {
        id: uniqueId,
        productId: product.id,
        sku: product.sku,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        image: product.images[0] || '/images/sponsor_backed_cap.jpg',
        colorway: product.colorway,
        size,
        customMonogram,
        quantity: qty,
      };
      return [...prev, newItem];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const contextValue = useMemo(() => ({
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingProgress,
    giftMemo,
    setGiftMemo,
  }), [items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, freeShippingProgress, giftMemo, setGiftMemo]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
