'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { PRODUCTS } from '@/lib/mockData';
import { useCart } from '@/components/cart/CartProvider';
import { Check } from 'lucide-react';

interface CompleteTheBagProps {
  paddle: Product;
}

export function CompleteTheBag({ paddle }: CompleteTheBagProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const bagProduct = PRODUCTS.find(p => p.handle === 'midday-crew-waxed-canvas-court-bag');
  const overgripProduct = PRODUCTS.find(p => p.handle === 'performance-overgrip-3-pack');

  if (!bagProduct || !overgripProduct) return null;

  const paddlePrice = paddle.priceRange.minVariantPrice.amount;
  const bagPrice = bagProduct.priceRange.minVariantPrice.amount;
  const overgripPrice = overgripProduct.priceRange.minVariantPrice.amount;

  const fullPrice = paddlePrice + bagPrice + overgripPrice;
  const bundleDiscount = fullPrice * 0.10; // 10% bundle discount
  const bundlePrice = fullPrice - bundleDiscount;

  const handleAddBundle = () => {
    addItem(paddle, paddle.variants[0], 1);
    addItem(bagProduct, bagProduct.variants[0], 1);
    addItem(overgripProduct, overgripProduct.variants[0], 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="bg-white border border-court-sand/50 p-6 md:p-8 rounded-sm shadow-xs my-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-court-sand/30 pb-6 mb-6">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-widest text-court-terracotta font-semibold">
            Curated Kit • Save 10%
          </span>
          <h3 className="font-serif text-2xl text-court-navy mt-1">Complete the Midday Bag</h3>
          <p className="font-sans text-sm text-court-charcoal/70">
            Pair your paddle with our signature waxed canvas bag and tacky replacement grips.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs font-sans text-court-charcoal/50 line-through">
            ${fullPrice.toFixed(2)}
          </div>
          <div className="text-2xl font-serif text-court-navy font-semibold">
            ${bundlePrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* Item 1: Paddle */}
        <div className="flex items-center gap-3 p-3 bg-court-cream/50 rounded-sm border border-court-sand/30">
          <div className="relative w-14 h-14 bg-white rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={paddle.images[0]?.url || ''}
              alt={paddle.title}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-court-navy truncate">{paddle.title}</p>
            <p className="text-xs text-court-charcoal/60">${paddlePrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Item 2: Bag */}
        <div className="flex items-center gap-3 p-3 bg-court-cream/50 rounded-sm border border-court-sand/30">
          <div className="relative w-14 h-14 bg-white rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={bagProduct.images[0]?.url || ''}
              alt={bagProduct.title}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-court-navy truncate">{bagProduct.title}</p>
            <p className="text-xs text-court-charcoal/60">${bagPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Item 3: Overgrip */}
        <div className="flex items-center gap-3 p-3 bg-court-cream/50 rounded-sm border border-court-sand/30">
          <div className="relative w-14 h-14 bg-white rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src={overgripProduct.images[0]?.url || ''}
              alt={overgripProduct.title}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-court-navy truncate">{overgripProduct.title}</p>
            <p className="text-xs text-court-charcoal/60">${overgripPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleAddBundle}
        className="w-full py-4 bg-court-navy text-court-cream font-sans text-xs uppercase tracking-widest hover:bg-court-terracotta transition-colors flex items-center justify-center gap-2 rounded-sm"
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" /> Added Complete Bag to Cart
          </>
        ) : (
          `Add Complete Bag to Cart • Save $${bundleDiscount.toFixed(2)}`
        )}
      </button>
    </div>
  );
}
