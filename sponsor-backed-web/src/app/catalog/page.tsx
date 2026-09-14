import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CatalogContent } from '@/components/catalog/CatalogContent';

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'Shop the full Sponsor Backed collection. Broken-in chino twill caps, heavyweight pocket tees, 24 oz duck canvas totes, and heritage accessories. Embroidered in Dallas, Texas.',
  openGraph: {
    title: 'The Collection | SPONSOR BACKED',
    description:
      'Shop broken-in chino twill caps, heavyweight pocket tees, and 24 oz duck canvas totes. Embroidered in Dallas, Texas.',
  },
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-sb-charcoal/40">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
