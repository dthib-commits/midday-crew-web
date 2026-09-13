import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

interface FeaturedCollectionProps {
  products: Product[];
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  return (
    <section className="bg-court-cream py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="block uppercase tracking-widest text-xs font-sans text-court-sage">
            CURATED FOR THE COURT
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-court-navy">
            Editor's Picks
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button as="link" href="/shop" variant="secondary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
