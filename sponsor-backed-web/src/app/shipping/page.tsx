import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Truck, RotateCcw, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Shipping rates, delivery timelines, and return policy for Sponsor Backed. All orders fulfilled from Dallas, Texas by The Hat Company.',
};

export default function ShippingPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-sb-charcoal/10 pb-8 mb-10">
          <nav className="text-xs text-sb-charcoal/50 mb-6 flex items-center space-x-2">
            <Link href="/" className="hover:text-sb-navy transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sb-navy font-medium">Shipping &amp; Returns</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sb-navy">
            Shipping &amp; Returns
          </h1>
          <p className="text-sm text-sb-charcoal/60 mt-2">
            Every order is embroidered and quality-checked at The Hat Company in Dallas, Texas before shipping.
          </p>
        </div>

        {/* Quick Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="space-y-1.5">
            <Truck className="w-5 h-5 text-sb-navy" />
            <p className="text-xs font-medium text-sb-navy">Free over $120</p>
            <p className="text-[11px] text-sb-charcoal/60">Domestic US orders</p>
          </div>
          <div className="space-y-1.5">
            <Clock className="w-5 h-5 text-sb-navy" />
            <p className="text-xs font-medium text-sb-navy">24h Dispatch</p>
            <p className="text-[11px] text-sb-charcoal/60">Mon–Fri, in-stock items</p>
          </div>
          <div className="space-y-1.5">
            <RotateCcw className="w-5 h-5 text-sb-navy" />
            <p className="text-xs font-medium text-sb-navy">30-Day Returns</p>
            <p className="text-[11px] text-sb-charcoal/60">Unworn, tags attached</p>
          </div>
          <div className="space-y-1.5">
            <Shield className="w-5 h-5 text-sb-navy" />
            <p className="text-xs font-medium text-sb-navy">Dallas QC</p>
            <p className="text-[11px] text-sb-charcoal/60">Every stitch inspected</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Shipping Rates */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-sb-navy">
              Domestic Shipping Rates
            </h2>
            <div className="border border-sb-charcoal/10 rounded-xs overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FAF9F5] text-xs text-sb-charcoal/60 uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Method</th>
                    <th className="text-left px-4 py-3 font-medium">Delivery</th>
                    <th className="text-right px-4 py-3 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sb-charcoal/10">
                  <tr>
                    <td className="px-4 py-3 text-sb-navy font-medium">Standard (USPS Priority)</td>
                    <td className="px-4 py-3 text-sb-charcoal/70">2–4 business days</td>
                    <td className="px-4 py-3 text-right text-sb-navy font-medium">$5.95</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sb-navy font-medium">Express (USPS Priority Express)</td>
                    <td className="px-4 py-3 text-sb-charcoal/70">1–2 business days</td>
                    <td className="px-4 py-3 text-right text-sb-navy font-medium">$12.95</td>
                  </tr>
                  <tr className="bg-sb-green/5">
                    <td className="px-4 py-3 text-sb-green font-medium">Complimentary Allocation</td>
                    <td className="px-4 py-3 text-sb-charcoal/70">2–4 business days</td>
                    <td className="px-4 py-3 text-right text-sb-green font-medium">Free (orders $120+)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sb-charcoal/60 leading-relaxed">
              All orders ship from Dallas, Texas via USPS. Orders placed before 2:00 PM CT on business days typically ship same day. Tracking is provided via email once your order dispatches.
            </p>
          </section>

          {/* Processing */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-sb-navy">
              Processing &amp; Fulfillment
            </h2>
            <div className="text-sm text-sb-charcoal/70 leading-relaxed space-y-3">
              <p>
                Standard catalog items ship within 24 hours of order placement (Monday–Friday). Each cap, tote, and accessory is inspected for stitch registration, thread tension, and hardware alignment before packaging.
              </p>
              <p>
                <strong>Custom embroidery orders</strong> (rear arch monograms, custom deal codenames) may require an additional 1–2 business days for digitization and production.
              </p>
              <p>
                <strong>Closing Crate (B2B) orders</strong> are produced on a 7-day turnaround from mandate confirmation. Bulk orders of 50+ sets may require 10–14 business days.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-sb-navy">
              Returns &amp; Exchanges
            </h2>
            <div className="text-sm text-sb-charcoal/70 leading-relaxed space-y-3">
              <p>
                We accept returns within <strong>30 days</strong> of delivery for unworn, unwashed items with all original tags attached. Items must be in their original packaging.
              </p>
              <p>
                To initiate a return, email <a href="mailto:orders@sponsorbacked.com" className="text-sb-navy underline underline-offset-2 hover:text-sb-leather">orders@sponsorbacked.com</a> with your order number and reason for return. We&rsquo;ll provide a prepaid return label within one business day.
              </p>
              <p>
                <strong>Custom embroidered items</strong> (monograms, deal codenames, Closing Crate sets) are final sale and cannot be returned or exchanged.
              </p>
              <p>
                Refunds are processed to the original payment method within 5–7 business days of receiving the returned item at our Dallas facility.
              </p>
            </div>
          </section>

          {/* International */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-sb-navy">
              International Orders
            </h2>
            <p className="text-sm text-sb-charcoal/70 leading-relaxed">
              We currently ship to the <strong>United States</strong> only. International shipping is being evaluated for a future release. For international inquiries, contact <a href="mailto:orders@sponsorbacked.com" className="text-sb-navy underline underline-offset-2 hover:text-sb-leather">orders@sponsorbacked.com</a>.
            </p>
          </section>
        </div>

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-sb-charcoal/10">
          <Link
            href="/catalog"
            className="text-sm text-sb-charcoal/60 hover:text-sb-navy transition-colors flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to the Collection</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
