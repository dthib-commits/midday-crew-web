import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle, PRODUCTS } from '@/lib/products';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | SPONSOR BACKED`,
      description: product.catalogStory,
      images: product.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: product.title,
      })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | SPONSOR BACKED`,
      description: product.catalogStory,
      images: product.images,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return notFound();
  }

  // Compute related products server-side
  const sameCategory = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const relatedProducts = sameCategory.length < 3
    ? [...sameCategory, ...PRODUCTS.filter(p => p.id !== product.id && !sameCategory.some(r => r.id === p.id)).slice(0, 3 - sameCategory.length)]
    : sameCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.description,
            image: product.images[0] ? `https://sponsorbacked.com${product.images[0]}` : undefined,
            brand: { '@type': 'Brand', name: 'Sponsor Backed' },
            sku: product.sku,
            offers: {
              '@type': 'Offer',
              price: product.price.toFixed(2),
              priceCurrency: 'USD',
              availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              url: `https://sponsorbacked.com/products/${product.handle}`,
            },
          }),
        }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
