import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MANUFACTURED_BY } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pb-24 pt-12 sm:pt-16 space-y-20">
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-xs uppercase tracking-wider text-sb-charcoal/50">
          The Manifesto
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-sb-navy">
          The Discipline of Quiet Capital.
        </h1>
        <p className="text-base text-sb-charcoal/70 leading-relaxed max-w-xl mx-auto">
          Private capital commands extraordinary rigor. We believe the goods surrounding that discipline should carry the exact same timeless authority.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5 text-sm text-sb-charcoal/80 leading-relaxed">
            <h2 className="font-serif text-2xl font-semibold text-sb-navy">
              Craft Over Corporate Swag
            </h2>
            <p>
              For decades, the goods associated with corporate finance have swung between two unfortunate poles: disposable mass-produced promotional freebies that end up in landfills, or high-gloss corporate gifts that turn partners and dealmakers into walking billboards.
            </p>
            <p>
              We built Sponsor Backed around an uncompromising alternative: archival American heritage goods tailored with understated insider wit and authentic manufacturing pedigree.
            </p>
            <blockquote className="border-l border-sb-charcoal/30 pl-4 py-1 italic font-serif text-sb-navy/90">
              &ldquo;When you wear a Sponsor Backed cap, 98% of the public sees an impeccably broken-in vintage American ballcap. To fellow allocators in Greenwich, Midtown, Dallas, or Chicago, it is an unmistakable nod.&rdquo;
            </blockquote>
            <p>
              Every piece is designed to wear like an heirloom from day one — softened by stone-enzyme washes, reinforced with heavy thread tension, and finished with solid antique brass hardware.
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden bg-sb-chalk">
            <Image
              src="/images/sponsor_backed_cap.jpg"
              alt="Sponsor Backed Chino Cap on Boardroom Table"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Dallas Facility Section */}
      <section className="border-y border-sb-charcoal/10 bg-[#FAF9F5] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-wider text-sb-charcoal/50">
              The Production Floor
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-sb-navy">
              {MANUFACTURED_BY}
            </h2>
            <p className="text-sm text-sb-charcoal/70 leading-relaxed">
              Sponsor Backed is tethered directly to commercial headwear manufacturing at The Hat Company in Dallas, Texas. No anonymous brokers or third-party print-on-demand shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-sb-navy">
                Multi-Head Ricoma Rigs
              </h3>
              <p className="text-xs text-sb-charcoal/60 leading-relaxed">
                Industrial embroidery heads running with calibrated mechanical tension to prevent puckering or thread fraying wash after wash.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-sb-navy">
                German Madeira Thread
              </h3>
              <p className="text-xs text-sb-charcoal/60 leading-relaxed">
                Colorfast rayon and polyester threads with high tensile strength that resist fading under sun, salt air, and long weekends.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-sb-navy">
                Augusta Green Undervisors
              </h3>
              <p className="text-xs text-sb-charcoal/60 leading-relaxed">
                Every classic chino cap is built with a heritage dark green twill undervisor to cut glare, matching 1980s American baseball standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-sb-navy">
          Explore the Collection
        </h2>
        <Link
          href="/catalog"
          className="inline-flex items-center space-x-2 bg-sb-navy hover:bg-sb-green text-sb-chalk px-6 py-3 text-sm font-medium transition-colors"
        >
          <span>View All 15 Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
