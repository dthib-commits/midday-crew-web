'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product, ProductVariant } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('midday_crew_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('midday_crew_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((currentItems) => {
      const id = `${product.id}-${variant.id}`;
      const existingItem = currentItems.find((item) => item.id === id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...currentItems,
        { 
          id,
          variantId: variant.id,
          productId: product.id,
          title: product.title,
          handle: product.handle,
          variantTitle: variant.title,
          image: product.images[0],
          price: variant.price,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => {
    const price = typeof item.price.amount === 'string' ? parseFloat(item.price.amount) : item.price.amount;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
