import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isApparel = product.productType.toLowerCase() === "apparel";
  const aspectRatioClass = isApparel ? "aspect-[3/4]" : "aspect-square";
  
  const isNew = product.tags.includes("new");
  const isBestseller = product.tags.includes("bestseller");
  const isPaddle = product.productType.toLowerCase() === "paddle";

  return (
    <Link href={`/products/${product.handle}`} className="group block h-full flex flex-col">
      <div className={cn("relative bg-white overflow-hidden mb-4 rounded-sm border border-court-sand/40 shadow-xs", aspectRatioClass)}>
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-court-navy/20 font-serif text-4xl group-hover:scale-[1.02] transition-transform duration-500">
            {product.vendor.substring(0, 1) || "MC"}
          </div>
        )}
        
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {isPaddle && (
            <span className="bg-court-green text-white text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-xs shadow-xs">
              USAPA
            </span>
          )}
          {isNew && <Badge variant="new">New</Badge>}
          {isBestseller && <Badge variant="default">Best Seller</Badge>}
        </div>
      </div>
      
      <div className="space-y-1 flex-1 flex flex-col">
        <div className="flex justify-between items-baseline">
          <p className="uppercase text-[10px] tracking-widest text-court-charcoal/60 font-sans">
            {product.vendor}
          </p>
        </div>
        
        <h3 className="font-sans text-sm font-medium text-court-navy group-hover:text-court-terracotta transition-colors line-clamp-2 leading-snug">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <PriceDisplay 
            price={product.priceRange.minVariantPrice.amount} 
            compareAtPrice={product.compareAtPriceRange?.minVariantPrice.amount}
          />
          
          {product.variants.length > 1 && (
            <span className="text-[11px] font-sans text-court-charcoal/50">
              {product.variants.length} colors
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
