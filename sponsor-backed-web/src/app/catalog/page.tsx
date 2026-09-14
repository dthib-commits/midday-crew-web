'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { Category } from '@/lib/types';
import { FilterBar, SortOption } from '@/components/catalog/FilterBar';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useCart } from '@/lib/cart';
import { CheckCircle2, ArrowRight } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';
  const checkoutStatus = searchParams.get('checkout');

  const [category, setCategory] = useState<Category>(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'catalog'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const { addItem } = useCart();

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const prods = [...getProductsByCategory(category)];
    if (sortBy === 'price-asc') {
      return prods.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      return prods.sort((a, b) => b.price - a.price);
    }
    return prods;
  }, [category, sortBy]);

  return (
    <div className="pb-24">
      {/* Checkout success */}
      {checkoutStatus === 'success' && (
        <div className="bg-sb-green/10 text-sb-green text-sm text-center py-3 flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Order confirmed — routed to our Dallas production desk.</span>
        </div>
      )}

      {/* Page header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sb-navy">
          The Collection
        </h1>
        <p className="text-sm text-sb-charcoal/60 mt-2 max-w-lg">
          Broken-in chino twill caps, 24 oz duck canvas, and heavyweight combed cottons. Every piece embroidered in Dallas.
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        selectedCategory={category}
        onSelectCategory={setCategory}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        sortBy={sortBy}
        onSelectSort={setSortBy}
        totalCount={filteredProducts.length}
      />

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Editorial spread */
          <div className="space-y-20">
            {filteredProducts.map((product, idx) => (
              <article key={product.id}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  idx % 2 === 1 ? '' : ''
                }`}>
                  {/* Image */}
                  <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Link href={`/products/${product.handle}`} className="block relative aspect-4/3 overflow-hidden bg-sb-chalk">
                      <Image
                        src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>

                  {/* Copy */}
                  <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div>
                      <p className="text-xs text-sb-charcoal/40 mb-1">{product.sku}</p>
                      <Link href={`/products/${product.handle}`}>
                        <h2 className="font-serif text-2xl font-semibold text-sb-navy hover:text-sb-leather transition-colors">
                          {product.title}
                        </h2>
                      </Link>
                      <p className="text-sm font-medium text-sb-navy mt-1">${product.price.toFixed(0)}</p>
                    </div>

                    <p className="font-serif italic text-sm text-sb-charcoal/70 leading-relaxed">
                      &ldquo;{product.catalogStory}&rdquo;
                    </p>

                    <div className="flex items-center space-x-4 pt-2">
                      <button
                        onClick={() => addItem(product)}
                        className="px-5 py-2.5 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors"
                      >
                        Add to bag
                      </button>
                      <Link
                        href={`/products/${product.handle}`}
                        className="text-sm text-sb-charcoal/50 hover:text-sb-navy transition-colors flex items-center space-x-1"
                      >
                        <span>Details</span>
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
    <Suspense fallback={<div className="p-12 text-center text-sm text-sb-charcoal/40">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
