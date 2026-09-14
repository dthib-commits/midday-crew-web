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
          Why We Banned Meme Merch.
        </h1>
        <p className="text-base text-sb-charcoal/70 leading-relaxed max-w-xl mx-auto">
          Private equity represents some of the most disciplined capital allocators in the world. Yet for a decade, the merchandise available to this industry has been an embarrassment.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5 text-sm text-sb-charcoal/80 leading-relaxed">
            <h2 className="font-serif text-2xl font-semibold text-sb-navy">
              The Two Extremes of Finance Merch
            </h2>
            <p>
              On one side sit low-end print-on-demand tees shouting <em>&ldquo;Stonks&rdquo;</em>, <em>&ldquo;Buy Low Sell High&rdquo;</em>, or neon crypto graphics. They are gag gifts bought by distant relatives that end up in donation bins within six months. No partner, VP, or serious analyst would ever wear them outside a dorm room.
            </p>
            <p>
              On the other side sits lifeless corporate offsite swag: high-end fleece vests co-branded with corporate bank logos, turning dealmakers into walking advertisements for their employers.
            </p>
            <blockquote className="border-l border-sb-charcoal/30 pl-4 py-1 italic font-serif text-sb-navy/90">
              &ldquo;Sponsor Backed exists in the white space: authentic, understated heritage prep tailored specifically to the cultural inside jokes of the private equity class.&rdquo;
            </blockquote>
            <p>
              When you wear a Sponsor Backed cap, 98% of the public sees a classic, broken-in American dad hat. But to fellow allocators in Greenwich, Midtown, Dallas, or Chicago, it is an unmistakable nod.
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden bg-sb-chalk">
            <Image
              src="/images/sponsor_backed_cap.jpg"
              alt="Sponsor Backed Chino Cap on Boardroom Table"
              fill
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
              Unlike digital apparel brands that drop-ship blind polyester blanks from overseas brokers, Sponsor Backed is tethered directly to commercial headwear manufacturing in Dallas, Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-sb-navy">
                Multi-Head Ricoma Rigs
              </h3>
              <p className="text-xs text-sb-charcoal/60 leading-relaxed">
                Industrial embroidery heads running with tight mechanical tension to prevent puckering or thread fraying wash after wash.
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
          <span>View All 14 Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
