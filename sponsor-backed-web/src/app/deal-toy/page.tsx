import React from 'react';
import { ClosingCrateCalculator } from '@/components/corporate/ClosingCrateCalculator';
import { ShieldCheck, Award, Clock, FileCheck } from 'lucide-react';
import { MANUFACTURED_BY } from '@/lib/constants';

export default function DealToyPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
          INSTITUTIONAL &amp; M&amp;A SERVICES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-navy uppercase tracking-tight mt-1">
          The Deal Toy 2.0
        </h1>
        <p className="text-sm sm:text-base text-sb-charcoal/80 font-sans mt-3 leading-relaxed">
          Every year, investment banks and private equity firms spend thousands on lucite acrylic tombstones that end up gathering dust on bookshelf corners. Sponsor Backed offers the modern alternative: functional, bespoke closing apparel your deal team will actually wear to Maidstone, Winged Foot, and partner retreats.
        </p>
      </div>

      {/* Interactive Builder Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClosingCrateCalculator />
      </div>

      {/* Institutional Assurance Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 border-t border-sb-charcoal/15">
          <div className="bg-white p-5 border border-sb-charcoal/15 rounded-xs space-y-2">
            <Clock className="w-5 h-5 text-sb-leather" />
            <h3 className="font-mono text-xs font-bold uppercase text-sb-navy">
              7-Day Production Turn
            </h3>
            <p className="text-xs font-sans text-sb-charcoal/70">
              Because all decoration is handled in-house in Dallas, TX, we turn bespoke deal team batches in under two weeks.
            </p>
          </div>

          <div className="bg-white p-5 border border-sb-charcoal/15 rounded-xs space-y-2">
            <FileCheck className="w-5 h-5 text-sb-green" />
            <h3 className="font-mono text-xs font-bold uppercase text-sb-navy">
              Strict NDA Protection
            </h3>
            <p className="text-xs font-sans text-sb-charcoal/70">
              Transaction code names and enterprise values remain strictly confidential under institutional non-disclosure standards.
            </p>
          </div>

          <div className="bg-white p-5 border border-sb-charcoal/15 rounded-xs space-y-2">
            <Award className="w-5 h-5 text-sb-brass" />
            <h3 className="font-mono text-xs font-bold uppercase text-sb-navy">
              Solid Die-Struck Brass
            </h3>
            <p className="text-xs font-sans text-sb-charcoal/70">
              Each member receives an 85-gram antiqued brass desk coin struck with your closing date and transaction initials.
            </p>
          </div>

          <div className="bg-white p-5 border border-sb-charcoal/15 rounded-xs space-y-2">
            <ShieldCheck className="w-5 h-5 text-sb-navy" />
            <h3 className="font-mono text-xs font-bold uppercase text-sb-navy">
              Corporate Invoicing
            </h3>
            <p className="text-xs font-sans text-sb-charcoal/70">
              Billed directly via ACH, corporate card, or institutional wire. Net-30 terms available for verified sponsor desks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
