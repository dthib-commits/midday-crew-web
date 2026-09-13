'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Button } from '@/components/ui/Button';
import { VariantSelector } from './VariantSelector';
import { MiddayScorecard } from './MiddayScorecard';
import { useCart } from '@/components/cart/CartProvider';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  
  const { addItem } = useCart();

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  
  const isPaddle = product.productType === 'Paddle';

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product, selectedVariant, 1);
    }
  };

  return (
    <div className="sticky top-32">
      {/* Breadcrumbs */}
      <nav className="font-sans text-sm text-court-charcoal/60 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-court-navy transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/shop" className="hover:text-court-navy transition-colors">Shop</Link>
        <span aria-hidden="true">/</span>
        <span className="text-court-charcoal truncate" aria-current="page">{product.title}</span>
      </nav>

      {/* Vendor */}
      <div className="font-sans text-xs uppercase tracking-[0.2em] text-court-charcoal/70 mb-3">
        {product.vendor}
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-4xl text-court-navy mb-4">
        {product.title}
      </h1>

      {/* Price */}
      {selectedVariant && (
        <PriceDisplay 
          price={selectedVariant.price.amount} 
          className="text-lg mb-8"
        />
      )}

      {/* Description */}
      <p className="font-sans text-court-charcoal/80 leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Variant Selector */}
      {product.variants.length > 1 && (
        <VariantSelector 
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />
      )}

      {/* Add to Bag Button */}
      <Button 
        variant="primary" 
        size="lg" 
        className="w-full mb-8"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? 'Add to Bag' : 'Out of Stock'}
      </Button>

      {/* Trust Signals */}
      <ul className="space-y-3 font-sans text-sm text-court-charcoal/70 border-t border-court-sand/50 pt-6">
        <li className="flex items-center gap-3">
          <svg className="w-5 h-5 text-court-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Complimentary shipping over $100
        </li>
        <li className="flex items-center gap-3">
          <svg className="w-5 h-5 text-court-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          30-Day Court Guarantee
        </li>
        {isPaddle && (
          <li className="flex items-center gap-3">
            <svg className="w-5 h-5 text-court-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            USAPA Approved
          </li>
        )}
      </ul>

      {/* Midday Scorecard */}
      <MiddayScorecard handle={product.handle} />
    </div>
  );
}
