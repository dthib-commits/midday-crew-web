'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';

export default function CartIcon() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-court-navy hover:text-court-terracotta transition-colors group"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-court-navy text-[10px] font-medium text-white group-hover:bg-court-terracotta transition-colors">
          {itemCount}
        </span>
      )}
    </button>
  );
}
