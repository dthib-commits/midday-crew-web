import { notFound } from 'next/navigation';
import { getProductsByCollection, COLLECTIONS } from '@/lib/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = COLLECTIONS.find(c => c.handle === handle);
  
  if (!collection) {
    return { title: 'Collection Not Found | Midday Crew' };
  }
  
  return {
    title: `${collection.title} | Midday Crew`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = COLLECTIONS.find(c => c.handle === handle);
  
  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(handle);

  return (
    <div className="min-h-screen bg-court-cream/30">
      {/* Editorial Hero */}
      <div className="bg-court-cream py-16 md:py-24 border-b border-court-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs font-sans uppercase tracking-widest text-court-charcoal/50 mb-4">
            <Link href="/" className="hover:text-court-navy transition-colors">Home</Link>
            <span>/</span>
            <span className="text-court-navy">{collection.title}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-court-navy mb-4">
            {collection.title}
          </h1>
          <p className="font-sans text-court-charcoal/80 max-w-2xl mx-auto text-lg leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Paddle Banner */}
      {handle === 'paddles' && (
        <div className="bg-court-navy text-court-cream py-3.5 px-4 text-center">
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase">
            The Midday Standard: Every paddle in our lineup is USAPA tournament certified. Tested on Dallas courts.
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 border-b border-court-sand/30 pb-4">
          <span className="text-xs font-sans uppercase tracking-widest text-court-charcoal/60">
            {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
          </span>
          <div className="flex gap-4 text-xs font-sans text-court-charcoal/80">
            <Link href="/compare" className="text-court-terracotta hover:underline font-medium">
              Compare Paddles →
            </Link>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-court-navy mb-4">No products found</p>
            <p className="font-sans text-court-charcoal/70 mb-8">We are refreshing this collection. Check back soon.</p>
            <Link href="/shop" className="inline-block bg-court-navy text-court-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-court-terracotta transition-colors">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
