import { notFound } from 'next/navigation';
import { getProductByHandle, UPSELL_PRODUCTS } from '@/lib/mockData';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/product/ProductCard';
import { CompleteTheBag } from '@/components/product/CompleteTheBag';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  
  if (!product) {
    return { title: 'Product Not Found | Midday Crew' };
  }
  
  return {
    title: `${product.title} | Midday Crew`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Midday Crew`,
      description: product.description,
      images: product.images.map(img => ({ url: img.url, alt: img.altText || product.title })),
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  
  if (!product) {
    notFound();
  }

  const isPaddle = product.productType === 'Paddle';

  // JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0]?.url,
    brand: {
      '@type': 'Brand',
      name: product.vendor,
    },
    offers: {
      '@type': 'Offer',
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: product.availableForSale 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `https://midday-crew-web.vercel.app/products/${product.handle}`,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-x-12 xl:gap-x-16 mb-12">
        {/* Left Side: Gallery */}
        <div className="lg:col-span-3">
          <ProductGallery images={product.images} />
        </div>
        
        {/* Right Side: Product Info */}
        <div className="lg:col-span-2">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Complete the Midday Bag (Curated Kit on Paddles) */}
      {isPaddle && (
        <CompleteTheBag paddle={product} />
      )}
      
      {/* You May Also Like */}
      <div className="border-t border-court-sand/50 pt-16 mt-16">
        <h2 className="font-serif text-3xl text-court-navy text-center mb-10">You May Also Like</h2>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {UPSELL_PRODUCTS.map(upsellProduct => (
            <div key={upsellProduct.id} className="min-w-[280px] max-w-[280px] snap-start flex-none">
              <ProductCard product={upsellProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
