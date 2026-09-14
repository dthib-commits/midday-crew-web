'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';
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
    <footer className="bg-sb-navy text-sb-chalk pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-sb-chalk/10">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="font-serif text-lg font-semibold tracking-[0.12em] uppercase">
              Sponsor Backed
            </h2>
            <p className="text-sm text-sb-chalk/60 leading-relaxed max-w-xs">
              Heritage headwear and canvas goods for the dealmaking class. Every piece crafted in Dallas, Texas.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-medium tracking-wider uppercase text-sb-chalk/40">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-sb-chalk/60">
              {FOOTER_LINKS.departments.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sb-chalk transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-medium tracking-wider uppercase text-sb-chalk/40">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-sb-chalk/60">
              <li><Link href="/about" className="hover:text-sb-chalk transition-colors">About & Mill</Link></li>
              <li><Link href="/sizing" className="hover:text-sb-chalk transition-colors">Size Guide</Link></li>
              <li><Link href="/deal-toy" className="hover:text-sb-chalk transition-colors">Corporate Orders</Link></li>
              <li><Link href="mailto:jon@hat.company" className="hover:text-sb-chalk transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-medium tracking-wider uppercase text-sb-chalk/40">
              The Allocation List
            </h3>
            <p className="text-sm text-sb-chalk/60">
              New drops and limited runs. Quarterly, never more.
            </p>
            {submitted ? (
              <div className="flex items-center space-x-2 text-sm text-sb-brass">
                <CheckCircle2 className="w-4 h-4" />
                <span>Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  required
                  placeholder="you@fund.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-sb-chalk/10 border border-sb-chalk/15 text-sb-chalk placeholder-sb-chalk/30 px-3 py-2 text-sm w-full focus:outline-none focus:border-sb-chalk/40 rounded-l-sm"
                />
                <button
                  type="submit"
                  className="bg-sb-chalk/15 hover:bg-sb-chalk/25 text-sb-chalk px-3 py-2 border border-sb-chalk/15 border-l-0 rounded-r-sm transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-sb-chalk/35 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} Sponsor Backed</p>
          <p>Crafted in Dallas, TX by The Hat Company</p>
        </div>
      </div>
    </footer>
  );
}
