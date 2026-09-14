'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-xs tracking-widest uppercase text-sb-charcoal/50">
          Something went wrong
        </p>
        <h1 className="font-serif text-3xl font-semibold text-sb-navy">
          We hit a snag.
        </h1>
        <p className="text-sm text-sb-charcoal/60 leading-relaxed">
          Our Dallas production desk has been notified. Please try again or
          return to the collection.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-sm text-sb-charcoal/60 hover:text-sb-navy transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
