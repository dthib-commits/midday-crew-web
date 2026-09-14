'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectingSize, setSelectingSize] = useState(false);

  const hasMultipleSizes = Boolean(product.sizes && product.sizes.length > 1);

  const handleQuickAddClick = () => {
    if (hasMultipleSizes) {
      setSelectingSize(true);
    } else {
      addItem(product, { size: product.sizes?.[0] });
    }
  };

  const handleSelectSize = (size: string) => {
    addItem(product, { size });
    setSelectingSize(false);
  };

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-square bg-sb-chalk overflow-hidden mb-3">
        <Image
          src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </Link>

      {/* Info — minimal */}
      <div className="space-y-1">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-sm font-medium text-sb-navy group-hover:text-sb-leather transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-sb-charcoal/50">{product.colorway}</p>
        
        {selectingSize ? (
          <div className="pt-1.5 flex items-center justify-between animate-in fade-in">
            <span className="text-[11px] text-sb-charcoal/60">Select:</span>
            <div className="flex space-x-1">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSelectSize(size)}
                  className="px-2 py-0.5 text-[11px] border border-sb-charcoal/20 hover:border-sb-navy hover:bg-sb-navy hover:text-sb-chalk transition-colors rounded-xs bg-white"
                >
                  {size}
                </button>
              ))}
              <button
                onClick={() => setSelectingSize(false)}
                className="text-[10px] text-sb-charcoal/40 hover:text-sb-charcoal ml-1"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-medium text-sb-navy">
              ${product.price.toFixed(0)}
            </span>
            <button
              onClick={handleQuickAddClick}
              className="text-xs text-sb-charcoal/50 hover:text-sb-navy transition-colors underline underline-offset-2"
            >
              Quick add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
