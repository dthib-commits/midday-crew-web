'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-square bg-sb-chalk overflow-hidden mb-3">
        <Image
          src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
          alt={product.title}
          fill
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
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-sb-navy">
            ${product.price.toFixed(0)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="text-xs text-sb-charcoal/50 hover:text-sb-navy transition-colors underline underline-offset-2"
          >
            Quick add
          </button>
        </div>
      </div>
    </div>
  );
}
