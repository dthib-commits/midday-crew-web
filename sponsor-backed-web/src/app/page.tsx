import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { MANUFACTURED_BY } from '@/lib/constants';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Editorial Catalog Cover Hero */}
      <section className="border-b border-sb-charcoal/15 bg-[#FAF9F5] pt-8 sm:pt-14 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Editorial Manifesto */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 border border-sb-leather/40 bg-sb-leather/10 px-3 py-1 rounded-xs">
                <span className="w-2 h-2 rounded-full bg-sb-green animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
                  CATALOG VOLUME I • AUTUMN / WINTER 2026
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sb-navy uppercase leading-[1.1]">
                Fine Goods for the Dealmaking Class.
              </h1>

              <p className="text-base sm:text-lg text-sb-charcoal/80 font-sans leading-relaxed">
                The nostalgic, broken-in prep aesthetic of 1990s heritage catalogs meets the sharp, deadpan cultural lexicon of private equity. Zero meme merch. 100% institutional quality.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 font-mono text-xs tracking-widest uppercase">
                <Link
                  href="/catalog"
                  className="px-6 py-4 bg-sb-navy hover:bg-sb-green text-sb-chalk transition-all rounded-xs text-center flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Explore Volume I Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/deal-toy"
                  className="px-6 py-4 bg-white border border-sb-charcoal/20 hover:border-sb-navy text-sb-navy transition-all rounded-xs text-center"
                >
                  B2B Closing Crates
                </Link>
              </div>

              <div className="pt-4 border-t border-sb-charcoal/10 flex items-center space-x-6 text-[11px] font-mono text-sb-charcoal/60">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sb-green" /> 100% Washed Chino
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sb-green" /> Green Undervisor
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sb-green" /> Dallas Embroidered
                </span>
              </div>
            </div>

            {/* Right Column: Hero Product Visual (The Flagship Cap) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 rounded-xs overflow-hidden border border-sb-charcoal/20 shadow-2xl group">
                <Image
                  src="/images/sponsor_backed_cap.jpg"
                  alt="The Sponsor Backed Broken-In Chino Cap"
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 border border-sb-charcoal/15 rounded-xs flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-sb-leather">
                      FLAGSHIP PIECE • SKU SB-CAP-001
                    </span>
                    <h3 className="font-serif text-sm font-bold text-sb-navy">
                      The &quot;Sponsor Backed&quot; Broken-In Chino Cap
                    </h3>
                  </div>
                  <Link
                    href="/products/sponsor-backed-cap"
                    className="px-3 py-1.5 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-[11px] tracking-wider uppercase transition-colors"
                  >
                    View Piece
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Curated Catalog Spread (Featured Pieces) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-sb-charcoal/15">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather">
              CURATED SELECTIONS
            </span>
            <h2 className="font-serif text-3xl font-bold text-sb-navy uppercase mt-1">
              The Allocation Desk
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono tracking-widest uppercase text-sb-navy hover:text-sb-leather transition-colors flex items-center gap-1.5 mt-2 md:mt-0"
          >
            <span>View All 10 Volume I Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Dallas Mill Craftsmanship Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sb-navy text-sb-chalk rounded-xs p-8 sm:p-14 border border-sb-charcoal/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 border border-sb-brass/40 bg-sb-brass/10 rounded-xs">
                <span className="text-[10px] font-mono tracking-widest uppercase text-sb-brass">
                  THE MANUFACTURING PEDIGREE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase">
                {MANUFACTURED_BY}
              </h2>

              <p className="text-sm text-sb-chalk/80 leading-relaxed font-sans">
                Most direct-to-consumer apparel brands outsource their embroidery to third-party print-on-demand brokers who slap thin, puckered stitching on cheap polyester caps.
              </p>

              <p className="text-sm text-sb-chalk/80 leading-relaxed font-sans">
                Every Sponsor Backed cap, heavy canvas tote, and knit is decorated in Dallas, Texas on commercial multi-head Ricoma machinery operated by <strong>The Hat Company</strong>. We use dense, high-sheen Madeira threads, custom satin seam tape, and solid antique brass sliders engineered to withstand decades of board meetings and weekend travel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-sb-chalk/10 font-mono text-xs">
                <div>
                  <span className="text-sb-brass text-lg font-bold">100%</span>
                  <p className="text-sb-chalk/60 text-[10px] uppercase">Cotton Chino</p>
                </div>
                <div>
                  <span className="text-sb-brass text-lg font-bold">0.75&quot; - 1.0&quot;</span>
                  <p className="text-sb-chalk/60 text-[10px] uppercase">Crown Stitch Limit</p>
                </div>
                <div>
                  <span className="text-sb-brass text-lg font-bold">Dallas, TX</span>
                  <p className="text-sb-chalk/60 text-[10px] uppercase">Facility Origin</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-xs overflow-hidden border border-sb-brass/20 shadow-xl">
                <Image
                  src="/images/ebitda_rope_hat.jpg"
                  alt="The EBITDA 5-Panel Braided Rope Cap"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Closing Crate Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-sb-charcoal/20 bg-white rounded-xs p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 text-sb-leather text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>B2B Institutional Orders</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sb-navy uppercase">
              The Deal Toy 2.0: Bespoke Closing Crates
            </h2>
            <p className="text-sm text-sb-charcoal/80 font-sans leading-relaxed">
              Celebrate your closed transactions with custom-embroidered caps, monogrammed boat totes, and stamped brass coins tailored with your deal codename and close date. Minimum 12 sets.
            </p>
          </div>
          <Link
            href="/deal-toy"
            className="shrink-0 px-6 py-4 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-xs tracking-widest uppercase transition-all rounded-xs shadow-md flex items-center space-x-2"
          >
            <span>Launch Crate Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
