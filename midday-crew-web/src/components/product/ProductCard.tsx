import Link from "next/link";
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

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className={cn("relative bg-court-sand/30 overflow-hidden mb-4", aspectRatioClass)}>
        <div className="absolute inset-0 flex items-center justify-center text-court-navy/20 font-serif text-4xl group-hover:scale-[1.02] transition-transform duration-500">
          {product.vendor.substring(0, 1) || "MC"}
        </div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <Badge variant="new">New</Badge>}
          {isBestseller && <Badge variant="default">Best Seller</Badge>}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="uppercase text-[10px] tracking-widest text-court-charcoal/50">
          {product.vendor}
        </p>
        <h3 className="font-sans text-sm font-medium text-court-navy">
          {product.title}
        </h3>
        <PriceDisplay 
          price={product.priceRange.minVariantPrice.amount} 
          compareAtPrice={product.compareAtPriceRange?.minVariantPrice.amount}
        />
      </div>
    </Link>
  );
}
