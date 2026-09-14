import React from 'react';
import { ClosingCrateCalculator } from '@/components/corporate/ClosingCrateCalculator';
import { Clock, Shield, Award, Receipt } from 'lucide-react';
import { MANUFACTURED_BY } from '@/lib/constants';

export default function DealToyPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14 space-y-16">
      {/* Intro */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <p className="text-xs uppercase tracking-wider text-sb-charcoal/50">
          Institutional &amp; M&amp;A
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-sb-navy">
          The Deal Toy 2.0
        </h1>
        <p className="text-sm sm:text-base text-sb-charcoal/70 leading-relaxed max-w-2xl mx-auto">
          Replace dusty acrylic tombstones with functional luxury goods your deal team will actually wear to the golf course, client dinners, and partner retreats.
        </p>
      </div>

      {/* Calculator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClosingCrateCalculator />
      </div>

      {/* Assurance Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 border-t border-sb-charcoal/10">
          <div className="space-y-2">
            <Clock className="w-5 h-5 text-sb-charcoal/60" />
            <h3 className="text-sm font-medium text-sb-navy">
              7-Day Production Turn
            </h3>
            <p className="text-xs text-sb-charcoal/60 leading-relaxed">
              Because all embroidery is handled directly in Dallas, we turn bespoke deal team orders in under two weeks.
            </p>
          </div>

          <div className="space-y-2">
            <Shield className="w-5 h-5 text-sb-green" />
            <h3 className="text-sm font-medium text-sb-navy">
              Confidentiality First
            </h3>
            <p className="text-xs text-sb-charcoal/60 leading-relaxed">
              Transaction codenames, enterprise values, and team rosters remain strictly confidential under institutional non-disclosure standards.
            </p>
          </div>

          <div className="space-y-2">
            <Award className="w-5 h-5 text-sb-brass" />
            <h3 className="text-sm font-medium text-sb-navy">
              Solid Die-Struck Brass
            </h3>
            <p className="text-xs text-sb-charcoal/60 leading-relaxed">
              Each member receives an 85g antiqued brass desk coin struck with your closing date and transaction initials.
            </p>
          </div>

          <div className="space-y-2">
            <Receipt className="w-5 h-5 text-sb-charcoal/60" />
            <h3 className="text-sm font-medium text-sb-navy">
              Corporate Invoicing
            </h3>
            <p className="text-xs text-sb-charcoal/60 leading-relaxed">
              Billed directly via ACH, corporate card, or institutional wire. Net-30 available for verified sponsor desks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
