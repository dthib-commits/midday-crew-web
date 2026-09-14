import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* Hero — Full-bleed image with minimal overlay */}
      <section className="relative">
        <div className="aspect-[16/7] sm:aspect-[16/6] relative overflow-hidden">
          <Image
            src="/images/sponsor_backed_cap.jpg"
            alt="The Sponsor Backed Broken-In Chino Cap"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sb-navy/70 via-sb-navy/30 to-transparent" />

          {/* Hero copy */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg space-y-5">
                <p className="text-xs tracking-widest uppercase text-sb-chalk/70">
                  Volume I — Autumn / Winter 2026
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1]">
                  Fine Goods for the Dealmaking Class.
                </h1>
                <p className="text-sm sm:text-base text-sb-chalk/80 leading-relaxed max-w-md">
                  Broken-in chino twill, 24 oz duck canvas, and quiet insider wit. Archival American craftsmanship.
                </p>
                <Link
                  href="/catalog"
                  className="inline-flex items-center space-x-2 bg-white/95 hover:bg-white text-sb-navy px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial intro line */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-serif text-xl sm:text-2xl text-sb-navy/80 leading-relaxed italic">
          &ldquo;Your headwear and weekend canvas should carry the same quiet authority as your favorite vintage chino jacket.&rdquo;
        </p>
        <p className="text-xs text-sb-charcoal/50 mt-3 tracking-wide">
          Crafted in Dallas, Texas by The Hat Company
        </p>
      </section>

      {/* Featured Products — Clean grid, no section chrome */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-2xl font-semibold text-sb-navy">
            The Collection
          </h2>
          <Link
            href="/catalog"
            className="text-sm text-sb-charcoal/60 hover:text-sb-navy transition-colors flex items-center space-x-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Dallas Manufacturing — Single image + short copy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src="/images/ebitda_rope_hat.jpg"
              alt="EBITDA Braided Rope Cap"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-5 lg:pr-8">
            <p className="text-xs tracking-widest uppercase text-sb-charcoal/50">
              The Dallas Mill
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-sb-navy leading-snug">
              Every stitch runs through Dallas.
            </h2>
            <p className="text-sm text-sb-charcoal/70 leading-relaxed">
              Sponsor Backed is tethered directly to commercial headwear manufacturing at The Hat Company in Dallas, Texas. Multi-head Ricoma embroidery, high-density Madeira threads, and solid antique brass hardware — no third-party print-on-demand middlemen.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm text-sb-navy hover:text-sb-leather transition-colors space-x-1"
            >
              <span>Read the full story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* B2B Teaser — Quiet, understated */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-sb-charcoal/15 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <h3 className="font-serif text-xl font-semibold text-sb-navy">
              Corporate closing gifts that actually get worn.
            </h3>
            <p className="text-sm text-sb-charcoal/60">
              Custom deal-team caps, monogrammed totes, and stamped brass coins. Minimum 12 sets.
            </p>
          </div>
          <Link
            href="/deal-toy"
            className="shrink-0 px-5 py-2.5 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors flex items-center space-x-2"
          >
            <span>Build a crate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
