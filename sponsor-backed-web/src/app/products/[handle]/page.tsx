'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ProductCard } from '@/components/catalog/ProductCard';
import { MANUFACTURED_BY } from '@/lib/constants';
import { Plus, Minus, ShieldCheck, Ruler, ArrowRight, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = getProductByHandle(handle);

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [customMonogram, setCustomMonogram] = useState('');

  if (!product) {
    return notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToBag = () => {
    addItem(product, {
      size: selectedSize,
      customMonogram: customMonogram.trim() || undefined,
      quantity,
    });
  };

  return (
    <div className="pb-24 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-[11px] font-mono tracking-wider uppercase text-sb-charcoal/60 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-sb-leather">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-sb-leather">Volume I Catalog</Link>
          <span>/</span>
          <span className="text-sb-navy font-bold">{product.sku}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-xs overflow-hidden border border-sb-charcoal/20 bg-sb-chalk shadow-lg">
              <Image
                src={product.images[0] || '/images/sponsor_backed_cap.jpg'}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-sb-navy/90 text-sb-chalk text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Dallas Manufacturing Assurance Box */}
            <div className="border border-sb-charcoal/15 bg-white p-5 rounded-xs space-y-2">
              <div className="flex items-center space-x-2 text-sb-leather font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4 text-sb-green" />
                <span>Dallas Mill Certification</span>
              </div>
              <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
                Directly embroidered on multi-head Ricoma equipment in Dallas, Texas by <strong>The Hat Company</strong>. Inspected for high thread density, uniform tension, and zero thread pull.
              </p>
            </div>
          </div>

          {/* Right Column: Buy Box & Editorial Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-sb-charcoal/15 pb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
                {product.sku} • {product.subtitle}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sb-navy uppercase mt-1 leading-snug">
                {product.title}
              </h1>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="text-xl font-mono font-bold text-sb-navy">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-sb-green tracking-wider uppercase font-semibold">
                  In Stock • Dallas Floor
                </span>
              </div>
            </div>

            {/* Catalog Story Blurb */}
            <div className="bg-[#FAF9F5] border-l-2 border-sb-leather p-4 rounded-xs">
              <p className="font-serif italic text-xs text-sb-charcoal/80 leading-relaxed">
                &ldquo;{product.catalogStory}&rdquo;
              </p>
            </div>

            {/* Sizing Selection & Modal Trigger */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-sb-charcoal/70 uppercase">Select Allocation Size:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="flex items-center space-x-1 text-sb-leather hover:text-sb-navy transition-colors underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size &amp; Fit Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 text-xs font-mono border rounded-xs transition-colors ${
                        selectedSize === s
                          ? 'border-sb-navy bg-sb-navy text-sb-chalk font-bold'
                          : 'border-sb-charcoal/20 bg-white text-sb-charcoal hover:border-sb-navy'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Monogramming / Arch Customizer */}
            {product.category === 'caps' && (
              <div className="border border-sb-charcoal/15 bg-white p-3.5 rounded-xs space-y-2">
                <label className="block text-[11px] font-mono uppercase text-sb-charcoal/70">
                  Optional Rear Arch Monogram / Initials (+$0 Complimentary)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={customMonogram}
                  onChange={(e) => setCustomMonogram(e.target.value.toUpperCase())}
                  placeholder="E.G. Q4 2026 OR 'J.R.'"
                  className="w-full p-2 bg-sb-chalk border border-sb-charcoal/20 rounded-xs font-mono text-xs focus:outline-none focus:border-sb-navy"
                />
                <p className="text-[10px] font-mono text-sb-charcoal/50">
                  Direct flat stitch centered above the rear antique brass buckle.
                </p>
              </div>
            )}

            {/* Quantity & Add to Bag Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-sb-charcoal/20 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-sb-chalk text-sb-charcoal transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-sb-chalk text-sb-charcoal transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Submit to Bag */}
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-3.5 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-xs tracking-widest uppercase transition-all rounded-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Allocation Bag • ${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[10px] font-mono text-sb-charcoal/60 pt-1">
                <span>Free shipping on orders over $120</span>
                <span>•</span>
                <span>30-Day Easy Returns</span>
              </div>
            </div>

            {/* Technical Garment Specs */}
            <div className="border-t border-sb-charcoal/15 pt-5 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-sb-navy">
                Construction &amp; Material Specifications
              </h3>
              <dl className="divide-y divide-sb-charcoal/10 text-xs font-mono">
                <div className="py-2 flex justify-between">
                  <dt className="text-sb-charcoal/60">Colorway</dt>
                  <dd className="font-semibold text-sb-navy">{product.colorway}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-sb-charcoal/60">Thread Stitching</dt>
                  <dd className="text-sb-navy">{product.threadColor}</dd>
                </div>
                {product.undervisorColor !== 'N/A' && (
                  <div className="py-2 flex justify-between">
                    <dt className="text-sb-charcoal/60">Undervisor Color</dt>
                    <dd className="font-semibold text-sb-green">{product.undervisorColor}</dd>
                  </div>
                )}
                <div className="py-2 flex justify-between">
                  <dt className="text-sb-charcoal/60">Hardware</dt>
                  <dd className="text-sb-navy">{product.hardware}</dd>
                </div>
                {product.specs.map((s) => (
                  <div key={s.label} className="py-2 flex justify-between">
                    <dt className="text-sb-charcoal/60">{s.label}</dt>
                    <dd className="text-sb-navy">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Product Recommendations */}
        <div className="mt-20 pt-12 border-t border-sb-charcoal/15">
          <h2 className="font-serif text-2xl font-bold text-sb-navy uppercase mb-6">
            Pair with These Volume I Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
