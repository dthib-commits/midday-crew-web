'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { ShoppingBag, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/catalog', label: 'Shop' },
  { href: '/deal-toy', label: 'Corporate' },
  { href: '/wire', label: 'The Wire' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/97 backdrop-blur-sm border-b border-sb-charcoal/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -ml-2 text-sb-charcoal"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-wide transition-colors ${
                pathname === item.href
                  ? 'text-sb-navy font-medium'
                  : 'text-sb-charcoal/60 hover:text-sb-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Center Wordmark */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-serif text-xl sm:text-[22px] font-semibold tracking-[0.12em] text-sb-navy uppercase whitespace-nowrap">
            Sponsor Backed
          </span>
        </Link>

        {/* Right: Cart */}
        <button
          onClick={openCart}
          className="relative p-2 -mr-2 text-sb-charcoal hover:text-sb-navy transition-colors"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-sb-navy text-sb-chalk text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sb-charcoal/10 bg-[#FAF9F5] px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm text-sb-navy hover:text-sb-leather transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-sb-charcoal/10 mt-3">
            <p className="text-[11px] text-sb-charcoal/50">
              Crafted in Dallas, TX by The Hat Company
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
