'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { NAV_LINKS, SITE_NAME, MANUFACTURED_BY } from '@/lib/constants';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-sb-charcoal/15">
      {/* Top Heritage Sub-Header */}
      <div className="border-b border-sb-charcoal/10 py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] tracking-wider uppercase font-mono text-sb-charcoal/70">
          <span>Est. 2026 • Private Equity Edition</span>
          <span>{MANUFACTURED_BY}</span>
          <Link href="/deal-toy" className="hover:text-sb-leather transition-colors flex items-center gap-1">
            B2B Closing Crates <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-sb-charcoal hover:text-sb-leather focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Title (1990s J. Crew Catalog Serif) */}
        <div className="text-center md:text-left flex-1 md:flex-initial">
          <Link href="/" className="inline-block group">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] text-sb-navy uppercase group-hover:text-sb-leather transition-colors">
              {SITE_NAME}
            </h1>
            <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-sb-charcoal/60 uppercase mt-0.5">
              Fine Goods for Capital Allocators
            </p>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-widest uppercase">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-sb-navy font-bold border-b border-sb-navy'
                    : 'text-sb-charcoal/80 hover:text-sb-leather'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility: Allocation Bag (Cart) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openCart}
            className="flex items-center space-x-2 bg-sb-navy hover:bg-sb-green text-sb-chalk px-3.5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all duration-200 shadow-xs"
            aria-label="View Allocation Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-sb-brass text-sb-navy font-bold text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-sb-charcoal/20 px-4 pt-2 pb-6 space-y-3">
          <div className="border-b border-sb-charcoal/10 pb-2 mb-3">
            <p className="text-[10px] font-mono tracking-widest uppercase text-sb-charcoal/60">
              {MANUFACTURED_BY}
            </p>
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-mono tracking-wider uppercase text-sb-navy hover:text-sb-leather border-b border-sb-charcoal/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/deal-toy"
              onClick={() => setMobileOpen(false)}
              className="block text-center w-full py-2.5 bg-sb-navy text-sb-chalk text-xs font-mono tracking-widest uppercase"
            >
              B2B Closing Crates & Deal Toys
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
