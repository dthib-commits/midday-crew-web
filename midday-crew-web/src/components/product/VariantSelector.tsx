'use client';

import { ProductVariant } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  if (variants.length <= 1) {
    return null;
  }

  return (
    <div className="mb-8 font-sans">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-court-charcoal uppercase tracking-wider">
          Color
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {variants.map(variant => {
          const isSelected = variant.id === selectedVariantId;
          const optionValue = variant.selectedOptions?.[0]?.value || variant.title;
          
          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant.id)}
              disabled={!variant.availableForSale}
              className={cn(
                "px-4 py-2 text-sm rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-court-navy focus:ring-offset-2",
                isSelected
                  ? "bg-court-navy border-court-navy text-white"
                  : "bg-transparent border-court-sand text-court-charcoal hover:border-court-navy",
                !variant.availableForSale && "opacity-50 cursor-not-allowed line-through"
              )}
              aria-pressed={isSelected}
            >
              {optionValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}
