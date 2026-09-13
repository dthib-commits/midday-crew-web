import * as React from "react";
import { cn, formatPrice } from "@/lib/utils";

interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  compareAtPrice?: number;
}

export function PriceDisplay({ price, compareAtPrice, className, ...props }: PriceDisplayProps) {
  const isOnSale = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <div className={cn("flex items-center gap-2 font-sans", className)} {...props}>
      {isOnSale && (
        <span className="text-gray-400 line-through text-sm">
          {formatPrice(compareAtPrice)}
        </span>
      )}
      <span className={cn("font-medium", isOnSale ? "text-court-terracotta" : "text-court-charcoal")}>
        {formatPrice(price)}
      </span>
    </div>
  );
}
