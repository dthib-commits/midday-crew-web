import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MANUFACTURED_BY } from '@/lib/constants';
import { ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14 space-y-16">
      {/* Manifesto Cover */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
          THE SPONSOR BACKED MANIFESTO
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-navy uppercase tracking-tight">
          Why We Banned Meme Merch.
        </h1>
        <p className="text-base text-sb-charcoal/80 font-sans leading-relaxed">
          High finance and private equity represent some of the most disciplined capital allocators on Earth. Yet for a decade, the merchandise available to this industry has been an embarrassment.
        </p>
      </div>

      {/* Dual Column Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-sm text-sb-charcoal/80 font-sans leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-sb-navy uppercase">
              The Two Extremes of Finance Merch
            </h2>
            <p>
              On one side sit low-end print-on-demand tees shouting <em>&ldquo;Stonks&rdquo;</em>, <em>&ldquo;Buy Low Sell High&rdquo;</em>, or neon cryptocurrency graphics. They are gag gifts bought by distant relatives that end up in Goodwill bins within six months. No partner, VP, or serious analyst would ever wear them to an office or an airport lounge.
            </p>
            <p>
              On the other side sits generic corporate offsite swag: great high-end fleece vests co-branded with corporate bank logos, turning dealmakers into walking billboards for their employers.
            </p>
            <div className="border-l-2 border-sb-leather pl-4 py-2 italic font-serif text-sb-navy bg-[#FAF9F5]">
              &ldquo;Sponsor Backed exists in the white space: authentic, understated heritage prep tailored specifically to the cultural inside jokes of the private equity class.&rdquo;
            </div>
            <p>
              When you wear a Sponsor Backed cap, 98% of the public will see a classic, broken-in American dad hat. But to fellow allocators in Greenwich, Midtown, Dallas, or Chicago, it is an unmistakable, knowing nod.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-xs overflow-hidden border border-sb-charcoal/20 shadow-xl">
              <Image
                src="/images/sponsor_backed_cap.jpg"
                alt="Sponsor Backed Chino Cap on Boardroom Table"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* The Dallas Facility Section */}
      <section id="craft" className="bg-sb-navy text-sb-chalk py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-sb-brass">
              THE FACILITY &amp; PRODUCTION FLOOR
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase">
              {MANUFACTURED_BY}
            </h2>
            <p className="text-sm text-sb-chalk/80 leading-relaxed font-sans">
              Unlike 95% of digital apparel brands that drop-ship blind polyester blanks from overseas brokers, Sponsor Backed is tethered directly to commercial headwear manufacturing in Dallas, Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono text-xs">
            <div className="bg-sb-charcoal/40 p-6 rounded-xs border border-sb-chalk/10 space-y-3">
              <span className="text-sb-brass text-lg font-bold">01. Ricoma Multi-Head Rig</span>
              <p className="text-sb-chalk/70 font-sans text-xs leading-relaxed">
                Industrial embroidery heads running at 850 stitches per minute with tight mechanical tension to prevent puckering or thread fraying.
              </p>
            </div>
            <div className="bg-sb-charcoal/40 p-6 rounded-xs border border-sb-chalk/10 space-y-3">
              <span className="text-sb-brass text-lg font-bold">02. Authentic Madeira Thread</span>
              <p className="text-sb-chalk/70 font-sans text-xs leading-relaxed">
                100% German-engineered rayon and polyester threads with high tensile strength and colorfast resistance to sun and salt air.
              </p>
            </div>
            <div className="bg-sb-charcoal/40 p-6 rounded-xs border border-sb-chalk/10 space-y-3">
              <span className="text-sb-brass text-lg font-bold">03. Green Undervisor Standard</span>
              <p className="text-sb-chalk/70 font-sans text-xs leading-relaxed">
                Every classic chino cap is built with a heritage dark Augusta green twill undervisor to cut glare, matching 1980s American baseball specs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sb-navy uppercase">
          Ready to deploy dry powder?
        </h2>
        <div className="flex justify-center space-x-4 font-mono text-xs tracking-widest uppercase">
          <Link
            href="/catalog"
            className="px-6 py-3.5 bg-sb-navy hover:bg-sb-green text-sb-chalk transition-colors rounded-xs flex items-center space-x-2"
          >
            <span>Browse Volume I Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
