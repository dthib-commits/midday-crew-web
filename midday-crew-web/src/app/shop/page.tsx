import { PRODUCTS } from '@/lib/mockData';
import { ProductCard } from '@/components/product/ProductCard';

export const metadata = {
  title: 'The Collection | Midday Crew',
  description: 'Curated selection of premium pickleball gear and apparel.',
};

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl lg:text-5xl text-court-navy mb-4">The Collection</h1>
        <p className="font-sans text-court-charcoal/70 text-lg max-w-2xl mx-auto">
          A curated selection of premium paddles, essential court accessories, and our exclusive lifestyle apparel.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
