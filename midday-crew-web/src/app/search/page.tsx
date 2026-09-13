import { getProductsByQuery } from '@/lib/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" | Midday Crew` : 'Search | Midday Crew',
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || '';
  const products = getProductsByQuery(query);

  return (
    <div className="min-h-screen bg-court-cream/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-court-navy mb-2">
            {query ? `Results for "${query}"` : 'Search the Collection'}
          </h1>
          <p className="font-sans text-court-charcoal/60 uppercase tracking-widest text-xs">
            {products.length} {products.length === 1 ? 'Product Found' : 'Products Found'}
          </p>
        </div>

        {query && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20 max-w-lg mx-auto bg-white p-8 rounded-sm border border-court-sand/40">
            <p className="font-serif text-xl text-court-navy mb-2">No matching products found for "{query}".</p>
            <p className="font-sans text-xs text-court-charcoal/70 mb-6">
              Try searching for brands (Selkirk, JOOLA, Diadem) or gear types (paddles, balls, polo, bag).
            </p>
            <Link 
              href="/shop" 
              className="inline-block bg-court-navy text-court-cream px-6 py-3 text-xs font-sans uppercase tracking-widest hover:bg-court-terracotta transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-lg text-court-navy">Use the search bar in the header to search our collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
