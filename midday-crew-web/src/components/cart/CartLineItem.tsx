'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCart } from './CartProvider';
import { CartItem } from '@/lib/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);
  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleRemove = () => removeItem(item.id);

  const priceAmt = typeof item.price.amount === 'string' ? parseFloat(item.price.amount) : item.price.amount;
  const price = priceAmt * item.quantity;

  const imageUrl = item.image?.url || '';

  return (
    <div className="flex gap-4 py-4 border-b border-court-sand/30">
      <div className="relative h-24 w-20 flex-shrink-0 bg-court-cream rounded-md overflow-hidden border border-court-sand/30">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-serif text-court-navy text-sm font-medium">{item.title}</h3>
            {item.variantTitle && item.variantTitle !== 'Default Title' && (
              <p className="text-xs text-court-sage mt-1">{item.variantTitle}</p>
            )}
          </div>
          <p className="font-sans text-sm font-medium text-court-navy">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-court-sand/50 rounded-full bg-court-cream">
            <button
              onClick={handleDecrease}
              className="p-1.5 text-court-navy hover:text-court-terracotta transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-medium text-court-navy">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1.5 text-court-navy hover:text-court-terracotta transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-xs text-court-sage hover:text-court-terracotta transition-colors underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
