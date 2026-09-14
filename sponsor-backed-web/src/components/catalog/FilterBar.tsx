'use client';

import React from 'react';
import { Category } from '@/lib/types';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface FilterBarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  viewMode: 'grid' | 'catalog';
  onToggleViewMode: (mode: 'grid' | 'catalog') => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
  totalCount: number;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  sortBy,
  onSelectSort,
  totalCount,
}: FilterBarProps) {
  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'caps', label: 'Caps' },
    { key: 'apparel', label: 'Apparel' },
    { key: 'canvas', label: 'Canvas' },
    { key: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="border-b border-sb-charcoal/10 py-3.5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex space-x-6 text-sm overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelectCategory(c.key)}
              className={`pb-0.5 transition-colors whitespace-nowrap ${
                selectedCategory === c.key
                  ? 'text-sb-navy font-medium border-b border-sb-navy'
                  : 'text-sb-charcoal/50 hover:text-sb-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Right: Sort & View Mode */}
        <div className="flex items-center justify-between sm:justify-end space-x-5 text-xs text-sb-charcoal/50">
          {/* Sort Selector */}
          <div className="flex items-center space-x-1.5">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-transparent text-sb-navy font-medium border-none focus:outline-none cursor-pointer py-0.5"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <span className="hidden sm:inline">·</span>

          {/* View toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={viewMode === 'grid' ? 'text-sb-navy font-medium' : 'hover:text-sb-navy'}
            >
              Grid
            </button>
            <span>·</span>
            <button
              onClick={() => onToggleViewMode('catalog')}
              className={viewMode === 'catalog' ? 'text-sb-navy font-medium' : 'hover:text-sb-navy'}
            >
              Editorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
