'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, getProductsByCategory } from '@/lib/products';
import { Category, Product } from '@/lib/types';
import { FilterBar } from '@/components/catalog/FilterBar';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useCart } from '@/lib/cart';
import { CheckCircle2, Plus, ArrowRight } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';
  const checkoutStatus = searchParams.get('checkout');

  const [category, setCategory] = useState<Category>(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'catalog'>('grid');
  const { addItem } = useCart();

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredProducts = getProductsByCategory(category);

  return (
    <div className="space-y-8 pb-20">
      {/* Checkout Success Notification Banner */}
      {checkoutStatus === 'success' && (
        <div className="bg-sb-green text-sb-chalk p-4 text-center font-mono text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>Allocation Confirmed! Your order has been routed to our Dallas production desk.</span>
        </div>
      )}

      {/* Catalog Header Banner */}
      <div className="bg-[#FAF9F5] border-b border-sb-charcoal/15 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
            DEPARTMENT OF ALLOCATIONS • VOLUME I
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-navy uppercase tracking-tight mt-1">
            The Dealmaker&apos;s Chino &amp; Canvas Collection
          </h1>
          <p className="text-xs sm:text-sm text-sb-charcoal/70 font-sans mt-2 max-w-2xl leading-relaxed">
            Every cap, heavy tote, and combed cotton knit in Volume I is built to outlast market downturns. Enzyme-washed chino twill, 24 oz industrial duck canvas, and quiet insider wit.
          </p>
        </div>
      </div>

      {/* Interactive Filter & View Bar */}
      <FilterBar
        selectedCategory={category}
        onSelectCategory={setCategory}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        totalCount={filteredProducts.length}
      />

      {/* Main Catalog View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === 'grid' ? (
          /* STANDARD DEPARTMENT GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* 1990s VINTAGE J. CREW CATALOG EDITORIAL SPREAD VIEW */
          <div className="space-y-16">
            {filteredProducts.map((product, idx) => (
              <article
                key={product.id}
                className="bg-white border border-sb-charcoal/20 rounded-xs p-6 sm:p-10 shadow-sm"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Left Column: Image */}
                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-4/3 rounded-xs overflow-hidden border border-sb-charcoal/15 bg-sb-chalk">
                      <Image
                        src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column: Editorial Storytelling */}
                  <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex justify-between items-baseline border-b border-sb-charcoal/10 pb-2">
                      <span className="text-[10px] font-mono tracking-widest text-sb-leather uppercase">
                        ITEM {idx + 1} OF {filteredProducts.length} • {product.sku}
                      </span>
                      <span className="font-mono text-base font-bold text-sb-navy">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <Link href={`/products/${product.handle}`}>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sb-navy hover:text-sb-leather transition-colors leading-tight">
                        {product.title}
                      </h2>
                    </Link>

                    <p className="text-xs font-mono text-sb-charcoal/60">
                      Colorway: <strong>{product.colorway}</strong> • Thread: {product.threadColor}
                    </p>

                    <blockquote className="border-l-2 border-sb-leather pl-4 py-1 italic text-xs font-serif text-sb-charcoal/80 leading-relaxed bg-[#FAF9F5]/70">
                      &ldquo;{product.catalogStory}&rdquo;
                    </blockquote>

                    <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
                      <strong>Styling Guide:</strong> {product.stylingNotes}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => addItem(product)}
                        className="px-5 py-3 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-xs tracking-widest uppercase transition-colors rounded-xs flex items-center justify-center space-x-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Allocation Bag</span>
                      </button>
                      <Link
                        href={`/products/${product.handle}`}
                        className="px-5 py-3 border border-sb-charcoal/20 hover:border-sb-navy text-sb-navy font-mono text-xs tracking-widest uppercase transition-colors rounded-xs text-center flex items-center justify-center space-x-1"
                      >
                        <span>Inspect Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Loading Volume I Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
