'use client';

import React from 'react';
import { Category } from '@/lib/types';
import { LayoutGrid, BookOpen } from 'lucide-react';

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
  totalCount,
}: FilterBarProps) {
  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'Complete Department' },
    { key: 'caps', label: 'Field & Boardroom Caps' },
    { key: 'apparel', label: 'Heavy Knits & Fleece' },
    { key: 'canvas', label: 'Harbor Canvas' },
    { key: 'accessories', label: 'Solid Brass Goods' },
  ];

  return (
    <div className="border-b border-sb-charcoal/15 bg-[#FAF9F5] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono tracking-wider uppercase">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelectCategory(c.key)}
              className={`px-3 py-1.5 rounded-xs transition-colors border ${
                selectedCategory === c.key
                  ? 'bg-sb-navy text-sb-chalk border-sb-navy font-bold'
                  : 'bg-white text-sb-charcoal/70 border-sb-charcoal/20 hover:border-sb-navy hover:text-sb-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Right Utility: View Switcher + Counter */}
        <div className="flex items-center justify-between md:justify-end space-x-4 text-xs font-mono text-sb-charcoal/70">
          <span>{totalCount} Pieces Cataloged</span>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center space-x-1 border border-sb-charcoal/20 bg-white rounded-xs p-0.5">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-sb-navy text-sb-chalk font-bold'
                  : 'text-sb-charcoal/60 hover:text-sb-navy'
              }`}
              title="Standard Department Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-wider uppercase">Grid</span>
            </button>
            <button
              onClick={() => onToggleViewMode('catalog')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-xs transition-colors ${
                viewMode === 'catalog'
                  ? 'bg-sb-navy text-sb-chalk font-bold'
                  : 'text-sb-charcoal/60 hover:text-sb-navy'
              }`}
              title="1990s J. Crew Editorial Catalog Lookbook"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-wider uppercase">Catalog Spread</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
