'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { Plus } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col bg-white border border-sb-charcoal/15 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-md hover:border-sb-leather">
      {/* Image Wrap */}
      <Link href={`/products/${product.handle}`} className="relative aspect-4/3 bg-sb-chalk overflow-hidden block">
        <Image
          src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.badges.map((b) => (
            <span
              key={b}
              className="bg-sb-navy/90 text-sb-chalk font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-xs"
            >
              {b}
            </span>
          ))}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[10px] font-mono tracking-widest text-sb-leather uppercase">
              {product.sku}
            </span>
            <span className="text-xs font-mono font-bold text-sb-navy">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Link href={`/products/${product.handle}`}>
            <h3 className="font-serif text-sm font-bold text-sb-navy group-hover:text-sb-leather transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11px] text-sb-charcoal/70 font-sans line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer Specs & Quick Add */}
        <div className="pt-3 border-t border-sb-charcoal/10 flex items-center justify-between">
          <div className="text-[10px] font-mono text-sb-charcoal/60">
            <span>{product.colorway}</span>
          </div>

          <button
            onClick={() => addItem(product)}
            className="flex items-center space-x-1 text-xs font-mono tracking-widest uppercase bg-sb-chalk hover:bg-sb-navy hover:text-sb-chalk text-sb-navy px-2.5 py-1 rounded-xs border border-sb-charcoal/20 transition-all"
            aria-label={`Add ${product.title} to Bag`}
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
