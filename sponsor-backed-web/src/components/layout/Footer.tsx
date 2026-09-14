'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FOOTER_LINKS, SITE_NAME, MANUFACTURED_BY } from '@/lib/constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-sb-navy text-sb-chalk border-t border-sb-charcoal/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-sb-chalk/10">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="font-serif text-2xl font-bold tracking-[0.15em] uppercase text-sb-chalk">
              {SITE_NAME}
            </h2>
            <p className="text-xs text-sb-chalk/70 leading-relaxed font-sans pr-6">
              The premier heritage outfitter for the buy-side. Built to outlast market cycles with broken-in chino twill, 24 oz duck canvas, and quiet insider wit.
            </p>
            <div className="inline-block px-3 py-1.5 border border-sb-brass/40 rounded-xs bg-sb-brass/10">
              <p className="text-[11px] font-mono tracking-wider text-sb-brass uppercase">
                {MANUFACTURED_BY}
              </p>
            </div>
          </div>

          {/* Departments */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-mono tracking-widest uppercase text-sb-brass">
              Departments
            </h3>
            <ul className="space-y-2 text-xs font-mono text-sb-chalk/75">
              {FOOTER_LINKS.departments.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sb-brass transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional / B2B */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-widest uppercase text-sb-brass">
              Institutional & B2B
            </h3>
            <ul className="space-y-2 text-xs font-mono text-sb-chalk/75">
              {FOOTER_LINKS.institutional.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sb-brass transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.dealDesk.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sb-brass transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Allocation List (Newsletter) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-widest uppercase text-sb-brass">
              The Allocation List
            </h3>
            <p className="text-xs text-sb-chalk/70 leading-relaxed font-sans">
              Join our limited-distribution catalog. Notice of new cap runs, corduroy capsules, and B2B closing crates.
            </p>
            {submitted ? (
              <div className="flex items-center space-x-2 text-xs text-sb-brass font-mono bg-sb-brass/10 p-2.5 rounded-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Allocation confirmed. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="partner@fund.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-sb-charcoal/60 border border-sb-chalk/20 text-sb-chalk placeholder-sb-chalk/40 px-3 py-2 text-xs font-mono w-full focus:outline-none focus:border-sb-brass rounded-l-xs"
                  />
                  <button
                    type="submit"
                    className="bg-sb-brass hover:bg-sb-leather text-sb-navy font-bold px-3 py-2 text-xs font-mono tracking-widest uppercase rounded-r-xs transition-colors flex items-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-sb-chalk/40 font-mono">
                  Zero spam. Strictly quarterly dispatches.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-sb-chalk/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} SPONSOR BACKED. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Class 25 Apparel</span>
            <span>•</span>
            <span>Dallas Embroidery Mill</span>
            <span>•</span>
            <span>No Meme Merch Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
