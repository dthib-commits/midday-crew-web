'use client';

import React from 'react';
import { Category } from '@/lib/types';

interface FilterBarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  viewMode: 'grid' | 'catalog';
  onToggleViewMode: (mode: 'grid' | 'catalog') => void;
  totalCount: number;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
}: FilterBarProps) {
  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'caps', label: 'Caps' },
    { key: 'apparel', label: 'Apparel' },
    { key: 'canvas', label: 'Canvas' },
    { key: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="border-b border-sb-charcoal/10 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Category filters */}
        <div className="flex space-x-6 text-sm">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelectCategory(c.key)}
              className={`pb-0.5 transition-colors ${
                selectedCategory === c.key
                  ? 'text-sb-navy font-medium border-b border-sb-navy'
                  : 'text-sb-charcoal/50 hover:text-sb-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="hidden sm:flex items-center space-x-3 text-xs text-sb-charcoal/50">
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
  );
}
