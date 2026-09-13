'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductsByQuery } from '@/lib/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FILTERS = [
  "Selkirk LUXX", "JOOLA Perseus", "Diadem 18K", "Court Polo", "Waxed Canvas Bag", "16mm"
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = getProductsByQuery(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-court-navy/40 backdrop-blur-sm p-4 sm:p-6 pt-20">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-3xl bg-court-cream rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-court-sand/50 p-4">
          <Search className="h-5 w-5 text-court-charcoal/50 ml-2" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent px-4 py-2 text-lg font-sans text-court-navy placeholder-court-charcoal/40 focus:outline-none"
            placeholder="Search paddles, apparel, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-2 text-court-charcoal/50 hover:text-court-navy"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 text-court-charcoal/70 hover:text-court-terracotta md:hidden"
          >
            Cancel
          </button>
        </form>

        <div className="flex-1 overflow-y-auto p-6">
          {!query ? (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-court-navy mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {QUICK_FILTERS.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setQuery(filter)}
                      className="px-4 py-2 bg-court-sand/20 rounded-full text-sm font-sans text-court-charcoal hover:bg-court-sand/50 transition-colors"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-court-navy">Products</h3>
                <Link 
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-sm font-sans text-court-terracotta hover:underline"
                >
                  View all {results.length} results
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.slice(0, 6).map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2 rounded-sm hover:bg-court-sand/20 transition-colors group"
                  >
                    <div className="relative w-16 h-16 bg-court-sand/30 rounded-sm overflow-hidden flex-shrink-0">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.title}
                          fill
                          className="object-contain p-1 mix-blend-multiply group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-court-charcoal/30">
                          {product.vendor.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-court-charcoal/60 mb-0.5">{product.vendor}</p>
                      <p className="text-sm font-sans font-medium text-court-navy group-hover:text-court-terracotta transition-colors line-clamp-1">{product.title}</p>
                      <p className="text-sm text-court-charcoal/80">${product.priceRange.minVariantPrice.amount}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-court-navy mb-2">No results found for "{query}"</p>
              <p className="text-court-charcoal/70 mb-6">Try checking your spelling or using more general terms.</p>
              <button
                onClick={() => setQuery('')}
                className="bg-court-navy text-court-cream px-6 py-3 text-sm font-sans uppercase tracking-widest hover:bg-court-terracotta transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
