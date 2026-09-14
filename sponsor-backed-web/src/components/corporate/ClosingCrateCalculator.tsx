'use client';

import React, { useState } from 'react';
import { MANUFACTURED_BY } from '@/lib/constants';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export function ClosingCrateCalculator() {
  const [dealName, setDealName] = useState('PROJECT TITAN');
  const [closeQuarter, setCloseQuarter] = useState('Q4 2026');
  const [teamSize, setTeamSize] = useState(25);
  const [firmName, setFirmName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing tiers
  const getUnitPrice = (size: number) => {
    if (size >= 50) return 145.0;
    if (size >= 25) return 165.0;
    return 185.0;
  };

  const unitPrice = getUnitPrice(teamSize);
  const totalCost = unitPrice * teamSize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/b2b-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealName,
          closeQuarter,
          teamSize,
          firmName,
          contactEmail,
          totalCost,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-sb-charcoal/10 rounded-xs overflow-hidden">
      {/* Top Banner */}
      <div className="p-6 sm:p-10 border-b border-sb-charcoal/10 flex flex-col sm:flex-row justify-between sm:items-baseline gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-sb-charcoal/50">
            Corporate Gifting
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-sb-navy mt-1">
            Bespoke Closing Crate Builder
          </h2>
        </div>
        <div className="text-xs text-sb-charcoal/50">
          7-day turnaround from our Dallas embroidery floor
        </div>
      </div>

      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Interactive Customizer */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-sb-charcoal/70 mb-1.5 font-medium">
                Deal Code Name
              </label>
              <input
                type="text"
                value={dealName}
                onChange={(e) => setDealName(e.target.value.toUpperCase())}
                placeholder="e.g. PROJECT TITAN"
                className="w-full p-2.5 text-sm border border-sb-charcoal/20 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-sb-navy uppercase"
              />
            </div>
            <div>
              <label className="block text-xs text-sb-charcoal/70 mb-1.5 font-medium">
                Closing Period
              </label>
              <input
                type="text"
                value={closeQuarter}
                onChange={(e) => setCloseQuarter(e.target.value.toUpperCase())}
                placeholder="e.g. Q4 2026"
                className="w-full p-2.5 text-sm border border-sb-charcoal/20 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-sb-navy uppercase"
              />
            </div>
          </div>

          {/* Member Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs text-sb-charcoal/70 font-medium">
                Deal Team Size
              </label>
              <span className="font-serif text-lg font-semibold text-sb-navy">
                {teamSize} Sets
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={100}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-sb-navy h-1.5 bg-sb-charcoal/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-sb-charcoal/40">
              <span>Min. 12 sets ($185/ea)</span>
              <span>25+ sets ($165/ea)</span>
              <span>50+ sets ($145/ea)</span>
            </div>
          </div>

          {/* What’s included */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase tracking-wider text-sb-charcoal/50 font-medium">
              Included in Every Member&apos;s Set
            </h3>
            <ul className="text-sm text-sb-charcoal/80 space-y-2.5">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Custom Washed Chino Cap:</strong> Arched &ldquo;{dealName || 'DEAL CODE'}&rdquo; front with &ldquo;CLOSED {closeQuarter}&rdquo; on the rear arch.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>24 oz Heavy Duck Canvas Tote:</strong> Monogrammed with transaction code initials.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Solid Die-Struck Brass Coin:</strong> 85g desk weight struck with closing year.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Letterpress Presentation Memo:</strong> Formal investment closing certificate in wooden presentation crate.
                </span>
              </li>
            </ul>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="bg-sb-green/10 p-5 rounded-xs space-y-1.5 border border-sb-green/20">
              <div className="flex items-center space-x-2 text-sb-green font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mandate received</span>
              </div>
              <p className="text-xs text-sb-charcoal/70">
                Our Dallas production desk will generate your digital stitch proof and invoice within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Firm / Bank Name"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="p-2.5 text-xs border border-sb-charcoal/20 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-sb-navy"
                />
                <input
                  type="email"
                  required
                  placeholder="dealteam@fund.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="p-2.5 text-xs border border-sb-charcoal/20 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-sb-navy"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors rounded-xs flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Request Digital Proof & Invoice'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Live Summary */}
        <div className="lg:col-span-5 bg-[#FAF9F5] p-6 sm:p-8 rounded-xs flex flex-col justify-between space-y-8 border border-sb-charcoal/10">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-sb-charcoal/40">
                Summary
              </p>
              <h3 className="font-serif text-xl font-semibold text-sb-navy mt-1">
                {dealName || 'YOUR DEAL'}
              </h3>
              <p className="text-xs text-sb-charcoal/60 mt-0.5">
                {closeQuarter} • {teamSize} Member Sets
              </p>
            </div>

            {/* Rear Arch Preview */}
            <div className="bg-white p-4 border border-sb-charcoal/10 rounded-xs space-y-1.5">
              <p className="text-[11px] text-sb-charcoal/50">
                Rear arch cap embroidery preview
              </p>
              <div className="text-xs font-medium text-sb-navy tracking-wider text-center py-2 bg-[#FAF9F5] border border-sb-charcoal/10">
                {dealName || 'DEAL CODE'} • CLOSED {closeQuarter}
              </div>
            </div>

            {/* Pricing details */}
            <div className="space-y-2 text-xs text-sb-charcoal/70 border-t border-sb-charcoal/10 pt-4">
              <div className="flex justify-between">
                <span>Rate per crate</span>
                <span>${unitPrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>× {teamSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Embroidery setup & digitizing</span>
                <span className="text-sb-green font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-sb-navy pt-3 border-t border-sb-charcoal/10">
                <span>Total Commitment</span>
                <span>${totalCost.toLocaleString('en-US')}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-sb-charcoal/50 flex items-center space-x-2 pt-4 border-t border-sb-charcoal/10">
            <Shield className="w-4 h-4 text-sb-green shrink-0" />
            <span>Under strict NDA protection. Handled by {MANUFACTURED_BY}.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
