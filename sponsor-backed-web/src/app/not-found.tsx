import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-xs tracking-widest uppercase text-sb-charcoal/50">
          404 — Not Found
        </p>
        <h1 className="font-serif text-3xl font-semibold text-sb-navy">
          This page has been reallocated.
        </h1>
        <p className="text-sm text-sb-charcoal/60 leading-relaxed">
          The page you&rsquo;re looking for may have moved or no longer exists.
          Browse the collection instead.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors"
        >
          <span>Shop the Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
