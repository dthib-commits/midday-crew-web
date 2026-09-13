'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export default function ShopPage() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesBrand = selectedBrand === 'All' || p.vendor.toLowerCase() === selectedBrand.toLowerCase();
    const matchesType = selectedType === 'All' || p.productType.toLowerCase() === selectedType.toLowerCase();
    return matchesBrand && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount;
    }
    if (sortBy === 'price-high') {
      return b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount;
    }
    return 0; // featured default
  });

  return (
    <div className="min-h-screen bg-court-cream/20 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-sans uppercase tracking-widest text-court-terracotta font-semibold">
            Curated Catalog
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-court-navy mt-1 mb-3">The Collection</h1>
          <p className="font-sans text-court-charcoal/70 text-base max-w-xl mx-auto leading-relaxed">
            Tournament-grade performance paddles from Selkirk, JOOLA, and Diadem alongside our proprietary Dallas court apparel.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-court-sand/40 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-sans uppercase tracking-wider text-court-charcoal/50 self-center mr-2 hidden sm:inline">
                Type:
              </span>
              {[
                { label: 'All Gear', value: 'All' },
                { label: 'Paddles', value: 'Paddle' },
                { label: 'Apparel', value: 'Apparel' },
                { label: 'Accessories', value: 'Accessories' }
              ].map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`px-3.5 py-1.5 rounded-xs text-xs font-sans uppercase tracking-wider transition-colors ${
                    selectedType === t.value
                      ? 'bg-court-navy text-court-cream font-medium'
                      : 'bg-court-cream text-court-charcoal hover:bg-court-sand/40'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-sans text-court-charcoal self-end md:self-auto">
              <span className="uppercase tracking-wider text-court-charcoal/60">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-court-cream border border-court-sand/40 rounded-xs px-2.5 py-1.5 text-xs text-court-navy outline-none focus:border-court-navy cursor-pointer"
              >
                <option value="featured">Featured Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Brand Filter Row */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-court-sand/20">
            <span className="text-xs font-sans uppercase tracking-wider text-court-charcoal/50 mr-2 hidden sm:inline">
              Brand:
            </span>
            {['All', 'Selkirk', 'JOOLA', 'Diadem', 'Midday Crew'].map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1 rounded-xs text-xs font-sans uppercase tracking-wider transition-colors ${
                  selectedBrand === brand
                    ? 'border-b-2 border-court-terracotta text-court-navy font-semibold'
                    : 'text-court-charcoal/70 hover:text-court-navy'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex justify-between items-center mb-8 px-1">
          <p className="text-xs font-sans uppercase tracking-widest text-court-charcoal/60">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
          <div className="flex gap-4 text-xs font-sans">
            <Link href="/compare" className="text-court-terracotta hover:underline font-medium">
              Compare Paddles Side-by-Side →
            </Link>
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white p-8 rounded-sm border border-court-sand/40">
            <p className="font-serif text-xl text-court-navy mb-2">No products match your active filters.</p>
            <button
              onClick={() => { setSelectedBrand('All'); setSelectedType('All'); }}
              className="mt-4 px-6 py-2.5 bg-court-navy text-court-cream text-xs uppercase tracking-widest hover:bg-court-terracotta transition-colors rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
