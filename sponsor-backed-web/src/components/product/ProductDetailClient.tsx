'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { Product } from '@/lib/types';
import { PRODUCTS } from '@/lib/products';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ShareWidget } from '@/components/product/ShareWidget';
import { Plus, Minus, Ruler, Check, ArrowRight, Shield, Sparkles } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [customMonogram, setCustomMonogram] = useState('');
  const [showMonogram, setShowMonogram] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [addedFobToast, setAddedFobToast] = useState(false);
  const keyFob = PRODUCTS.find((p) => p.id === 'sb-acc-402');

  const handleAddToBag = () => {
    addItem(product, {
      size: selectedSize,
      customMonogram: customMonogram.trim() || undefined,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="pb-24 pt-6 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-sb-charcoal/50 mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-sb-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-sb-navy transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-sb-navy font-medium">{product.title}</span>
        </nav>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Product Imagery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-3">
              <div className="relative aspect-4/3 overflow-hidden bg-sb-chalk">
                <Image
                  src={product.images[selectedImage] || '/images/sponsor_backed_cap.jpg'}
                  alt={`${product.title} - Image ${selectedImage + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 h-16 shrink-0 overflow-hidden bg-sb-chalk border-2 transition-colors ${
                        selectedImage === idx
                          ? 'border-sb-navy'
                          : 'border-transparent hover:border-sb-charcoal/20'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Subtle Provenance Note */}
            <div className="pt-2 flex items-center justify-between text-xs text-sb-charcoal/50 border-t border-sb-charcoal/10">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sb-green" />
                Crafted in Dallas, TX by The Hat Company
              </span>
              <span>SKU: {product.sku}</span>
            </div>
          </div>

          {/* Right: Product Details & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-sb-charcoal/10 pb-5">
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-sb-navy leading-snug">
                {product.title}
              </h1>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xl font-medium text-sb-navy">
                  ${product.price.toFixed(0)}
                </span>
                <span className="text-xs text-sb-green font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock
                </span>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="space-y-3 text-sm text-sb-charcoal/80 leading-relaxed">
              <p className="font-serif italic text-sb-charcoal/70">
                &ldquo;{product.catalogStory}&rdquo;
              </p>
              <p className="text-xs text-sb-charcoal/60">
                <strong>Styling:</strong> {product.stylingNotes}
              </p>
            </div>

            {/* Sizing Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-sb-charcoal/70">Size:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-sb-charcoal/50 hover:text-sb-navy transition-colors flex items-center gap-1 underline underline-offset-2"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-2 text-xs transition-colors rounded-xs border ${
                        selectedSize === s
                          ? 'border-sb-navy bg-sb-navy text-sb-chalk font-medium'
                          : 'border-sb-charcoal/20 bg-white text-sb-charcoal/80 hover:border-sb-navy'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Monogram / Arch Customizer */}
            {product.category === 'caps' && (
              <div className="pt-2 border-t border-sb-charcoal/10">
                {!showMonogram ? (
                  <button
                    onClick={() => setShowMonogram(true)}
                    className="text-xs text-sb-charcoal/60 hover:text-sb-navy transition-colors underline underline-offset-2"
                  >
                    + Add complimentary rear arch embroidery
                  </button>
                ) : (
                  <div className="space-y-2 bg-white p-3.5 border border-sb-charcoal/15 rounded-xs">
                    <div className="flex justify-between text-xs">
                      <label className="text-sb-charcoal/70">Rear Arch Text / Monogram (Max 16 chars)</label>
                      <button
                        onClick={() => { setShowMonogram(false); setCustomMonogram(''); }}
                        className="text-sb-charcoal/40 hover:text-sb-navy text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={16}
                      value={customMonogram}
                      onChange={(e) => setCustomMonogram(e.target.value.toUpperCase())}
                      placeholder="e.g. Q4 2026 or initials"
                      className="w-full p-2 text-xs border border-sb-charcoal/20 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-sb-navy"
                    />
                    <p className="text-[10px] text-sb-charcoal/50">
                      Directly flat-stitched above the antique brass buckle in Dallas.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Buy Actions */}
            <div className="space-y-3 pt-4">
              <div className="flex space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-sb-charcoal/20 bg-white rounded-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sb-charcoal hover:bg-sb-chalk transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 text-xs font-medium min-w-[20px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sb-charcoal hover:bg-sb-chalk transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-3 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors rounded-xs shadow-xs"
                >
                  Add to Bag • ${(product.price * quantity).toFixed(0)}
                </button>
              </div>

              {addedToast && (
                <div className="bg-sb-green/10 text-sb-green text-xs py-2 px-3 rounded-xs text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to your bag</span>
                </div>
              )}

              {/* 1-Click Impulse Cross-Sell Bridge (AOV Driver) */}
              {product.id !== 'sb-acc-402' && keyFob && (
                <div className="border border-sb-charcoal/15 bg-white p-3 rounded-xs flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="relative w-9 h-9 bg-sb-chalk shrink-0 overflow-hidden rounded-xs">
                      <Image
                        src={keyFob.images[0]}
                        alt={keyFob.title}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[11px] font-medium text-sb-navy truncate">
                        Pair with Horween Leather Crest Fob
                      </p>
                      <p className="text-[10px] text-sb-charcoal/60">
                        Chicago Chromexcel &amp; Brass (+$20)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(keyFob);
                      setAddedFobToast(true);
                      setTimeout(() => setAddedFobToast(false), 2500);
                    }}
                    className="shrink-0 text-xs border border-sb-navy text-sb-navy hover:bg-sb-navy hover:text-sb-chalk px-2.5 py-1.5 rounded-xs transition-colors font-medium whitespace-nowrap"
                  >
                    + Add ($20)
                  </button>
                </div>
              )}

              {addedFobToast && (
                <div className="bg-sb-green/10 text-sb-green text-xs py-1.5 px-3 rounded-xs text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Leather Crest Fob added to bag</span>
                </div>
              )}

              {/* Outfitting the Deal Team Bridge */}
              {product.category === 'caps' && (
                <div className="border border-sb-charcoal/15 bg-[#FAF9F5] p-3.5 rounded-xs space-y-1 text-left mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-sb-navy">Outfitting the Deal Team?</span>
                    <Link
                      href={`/deal-toy?base=${product.handle}`}
                      className="text-xs text-sb-navy hover:text-sb-leather font-medium underline underline-offset-2 flex items-center gap-0.5"
                    >
                      <span>Build Closing Crate</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-sb-charcoal/60 leading-relaxed">
                    Commission 12+ custom caps with deal codename &amp; closing date embroidery, paired with solid brass coins and 24 oz totes.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-center text-sb-charcoal/50">
                Complimentary allocation on orders over $120. Returns accepted within 30 days.
              </p>

              {/* Institutional Assurance Strip */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-sb-charcoal/10 text-center text-[10px] text-sb-charcoal/60">
                <div className="space-y-0.5">
                  <span className="font-medium text-sb-navy block">Dallas Direct</span>
                  <span>Embroidered &amp; QC'd in TX</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-medium text-sb-navy block">24h Dispatch</span>
                  <span>Archival gift packaging</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-medium text-sb-navy block">Effortless Returns</span>
                  <span>30 days, prepaid domestic</span>
                </div>
              </div>
            </div>

            {/* Construction Specs */}
            <div className="border-t border-sb-charcoal/10 pt-5 space-y-3">
              <h3 className="text-xs font-medium tracking-wider uppercase text-sb-navy">
                Specifications
              </h3>
              <ul className="text-xs text-sb-charcoal/70 space-y-2">
                <li className="flex justify-between">
                  <span className="text-sb-charcoal/50">Colorway</span>
                  <span className="text-sb-navy font-medium">{product.colorway}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sb-charcoal/50">Fabrication</span>
                  <span className="text-sb-navy font-medium text-right max-w-[220px]">{product.fabrication}</span>
                </li>
                {product.undervisorColor !== 'N/A' && (
                  <li className="flex justify-between">
                    <span className="text-sb-charcoal/50">Undervisor</span>
                    <span className="text-sb-green font-medium">{product.undervisorColor}</span>
                  </li>
                )}
                {product.specs.map((s) => (
                  <li key={s.label} className="flex justify-between">
                    <span className="text-sb-charcoal/50">{s.label}</span>
                    <span className="text-sb-navy font-medium">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ShareWidget title={product.title} handle={product.handle} />
          </div>
        </div>

        {/* Pair With Section */}
        <div className="mt-24 pt-12 border-t border-sb-charcoal/10">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif text-2xl font-semibold text-sb-navy">
              More from the Collection
            </h2>
            <Link href="/catalog" className="text-sm text-sb-charcoal/60 hover:text-sb-navy transition-colors flex items-center gap-1">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
