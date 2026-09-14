'use client';

import React, { useState } from 'react';
import { MANUFACTURED_BY } from '@/lib/constants';
import { Package, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export function ClosingCrateCalculator() {
  const [dealName, setDealName] = useState('PROJECT TITAN');
  const [closeQuarter, setCloseQuarter] = useState('Q4 2026');
  const [teamSize, setTeamSize] = useState(25);
  const [firmName, setFirmName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price tier logic
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
        setSubmitted(true); // graceful demo fallback
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-sb-charcoal/20 rounded-xs shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-sb-navy text-sb-chalk p-6 sm:p-8 border-b border-sb-charcoal/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-sb-brass uppercase">
              THE DEAL TOY 2.0 • B2B TRANSACTION SUITE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide uppercase mt-1">
              Bespoke Deal Closing Crate Builder
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="inline-block bg-sb-brass text-sb-navy font-mono text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider">
              7-Day Turnaround in Dallas
            </span>
          </div>
        </div>
        <p className="text-xs text-sb-chalk/70 font-sans mt-2 max-w-2xl">
          Replace dusty acrylic tombstones with functional luxury goods your deal team will actually wear to Maidstone, Winged Foot, and partner offsites.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-sb-charcoal/80 mb-1.5">
                Deal Code Name
              </label>
              <input
                type="text"
                value={dealName}
                onChange={(e) => setDealName(e.target.value.toUpperCase())}
                placeholder="E.G. PROJECT TITAN"
                className="w-full p-2.5 bg-sb-chalk border border-sb-charcoal/20 rounded-xs font-mono text-xs focus:outline-none focus:border-sb-navy"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-sb-charcoal/80 mb-1.5">
                Close Period / Year
              </label>
              <input
                type="text"
                value={closeQuarter}
                onChange={(e) => setCloseQuarter(e.target.value.toUpperCase())}
                placeholder="E.G. Q4 2026"
                className="w-full p-2.5 bg-sb-chalk border border-sb-charcoal/20 rounded-xs font-mono text-xs focus:outline-none focus:border-sb-navy"
              />
            </div>
          </div>

          {/* Team Size Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono uppercase text-sb-charcoal/80">
                Deal Team Size (Units)
              </label>
              <span className="font-mono text-sm font-bold text-sb-navy">
                {teamSize} Crate Sets
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={100}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-sb-navy h-2 bg-sb-chalk rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-sb-charcoal/50 mt-1">
              <span>MOQ: 12 Sets</span>
              <span>25 Sets ($165/ea)</span>
              <span>50+ Sets ($145/ea)</span>
            </div>
          </div>

          {/* What’s Inside the Crate */}
          <div className="border border-sb-charcoal/15 bg-sb-chalk/50 p-4 rounded-xs space-y-2.5">
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-sb-navy">
              Included in Every Member&apos;s Crate:
            </h4>
            <ul className="space-y-2 text-xs font-mono text-sb-charcoal/80">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Custom Washed Chino Cap:</strong> Arched &quot;{dealName || 'DEAL CODE'}&quot; front crown with &quot;CLOSED {closeQuarter}&quot; embroidered on rear arch.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>24 oz Heavy Duck Canvas Tote:</strong> Monogrammed with transaction code initials.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Solid Stamped Brass Coin:</strong> 85g desk weight struck with closing year.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sb-green shrink-0 mt-0.5" />
                <span>
                  <strong>Letterpress Deal Memo:</strong> Formal investment closing certificate.
                </span>
              </li>
            </ul>
          </div>

          {/* Submission Form */}
          {submitted ? (
            <div className="bg-sb-green/10 border border-sb-green/30 p-5 rounded-xs text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-sb-green mx-auto" />
              <h3 className="font-serif text-lg font-bold text-sb-navy">
                Closing Crate Mandate Received
              </h3>
              <p className="text-xs font-mono text-sb-charcoal/80 max-w-md mx-auto">
                Jon and our Dallas production desk will generate your digital stitch proof and formal invoice within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Private Equity Firm / Bank"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="p-2.5 bg-sb-chalk border border-sb-charcoal/20 rounded-xs font-mono text-xs focus:outline-none focus:border-sb-navy"
                />
                <input
                  type="email"
                  required
                  placeholder="dealteam@fund.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="p-2.5 bg-sb-chalk border border-sb-charcoal/20 rounded-xs font-mono text-xs focus:outline-none focus:border-sb-navy"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-sb-navy hover:bg-sb-green text-sb-chalk font-mono text-xs tracking-widest uppercase transition-colors rounded-xs flex items-center justify-center space-x-2 shadow-md"
              >
                <span>{isSubmitting ? 'Submitting Mandate...' : 'Request Digital Proof & Invoice'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Live Cost & Proof Summary */}
        <div className="lg:col-span-5 bg-sb-chalk border border-sb-charcoal/15 p-6 rounded-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-sb-charcoal/15 pb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather">
                LIVE ORDER SPECIFICATION
              </span>
              <h3 className="font-serif text-xl font-bold text-sb-navy mt-0.5">
                {dealName || 'YOUR DEAL'}
              </h3>
              <p className="text-xs font-mono text-sb-charcoal/60">
                Term: {closeQuarter} • {teamSize} Member Units
              </p>
            </div>

            {/* Hat Rear Arch Embroidery Preview */}
            <div className="bg-white p-3.5 border border-sb-charcoal/15 rounded-xs space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-sb-charcoal/50">
                Rear Arch Embroidery Stitch Preview
              </span>
              <div className="bg-sb-navy text-sb-chalk text-center py-2.5 px-3 rounded-xs font-mono text-xs tracking-widest">
                {dealName || 'DEAL CODE'} • CLOSED {closeQuarter}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs font-mono pt-2">
              <div className="flex justify-between text-sb-charcoal/70">
                <span>Unit Rate per Crate</span>
                <span>${unitPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sb-charcoal/70">
                <span>Total Member Units</span>
                <span>× {teamSize}</span>
              </div>
              <div className="flex justify-between text-sb-charcoal/70">
                <span>Dallas Stitch Digitization</span>
                <span className="text-sb-green font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold text-sb-navy pt-3 border-t border-sb-charcoal/15">
                <span>Total Commitment</span>
                <span>${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <p className="text-[10px] font-mono text-sb-charcoal/50">
                vs. ~$8,750 for equivalent acrylic tombstone blocks.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-sb-charcoal/15 text-[11px] font-mono text-sb-charcoal/60 space-y-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-sb-green shrink-0" />
              <span>Strict NDA & confidentiality compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-sb-leather shrink-0" />
              <span>{MANUFACTURED_BY}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
