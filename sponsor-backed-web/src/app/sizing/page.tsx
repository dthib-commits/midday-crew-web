import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SizingPage() {
  return (
    <div className="pb-24 pt-12 sm:pt-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <p className="text-xs uppercase tracking-wider text-sb-charcoal/50">
          Measurements &amp; Care
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-sb-navy">
          Size &amp; Fit Guide
        </h1>
        <p className="text-sm text-sb-charcoal/70 leading-relaxed max-w-xl mx-auto">
          Detailed dimensions, circumference measurements, and fabric care guidelines for every piece in the collection.
        </p>
      </div>

      {/* Cap Sizing */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-sb-charcoal/10 pb-3">
          <h2 className="font-serif text-2xl font-semibold text-sb-navy">
            Headwear &amp; Caps
          </h2>
          <p className="text-xs text-sb-charcoal/60 mt-1">
            Unstructured 6-panel relaxed crown with continuous antique brass strapback adjustment.
          </p>
        </div>

        <div className="border border-sb-charcoal/10 bg-white overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F5] border-b border-sb-charcoal/10 text-sb-navy">
              <tr>
                <th className="p-3 font-medium">Dimension</th>
                <th className="p-3 font-medium">Measurement</th>
                <th className="p-3 font-medium text-sb-charcoal/60">Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sb-charcoal/10 text-sb-charcoal/80">
              <tr>
                <td className="p-3 font-medium text-sb-navy">Circumference</td>
                <td className="p-3">21.0&quot; – 24.25&quot;</td>
                <td className="p-3 text-sb-charcoal/60">Hat Sizes 6 ⅞ to 7 ¾</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">Crown Height</td>
                <td className="p-3">4.25 inches</td>
                <td className="p-3 text-sb-charcoal/60">Low-profile, soft contour</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">Visor Length</td>
                <td className="p-3">2.75 inches</td>
                <td className="p-3 text-sb-charcoal/60">Pre-curved, shapeable</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">Visor Width</td>
                <td className="p-3">7.0 inches</td>
                <td className="p-3 text-sb-charcoal/60">Standard width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Apparel Sizing */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-sb-charcoal/10 pb-3">
          <h2 className="font-serif text-2xl font-semibold text-sb-navy">
            Heavyweight Knits &amp; Fleece
          </h2>
          <p className="text-xs text-sb-charcoal/60 mt-1">
            Cut in a classic 1990s relaxed boxy fit. Pre-shrunk cotton.
          </p>
        </div>

        <div className="border border-sb-charcoal/10 bg-white overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F5] border-b border-sb-charcoal/10 text-sb-navy">
              <tr>
                <th className="p-3 font-medium">Size</th>
                <th className="p-3 font-medium">Chest (Pit-to-Pit)</th>
                <th className="p-3 font-medium">Body Length</th>
                <th className="p-3 font-medium text-sb-charcoal/60">Recommended Chest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sb-charcoal/10 text-sb-charcoal/80">
              <tr>
                <td className="p-3 font-medium text-sb-navy">S</td>
                <td className="p-3">20.5&quot;</td>
                <td className="p-3">27.5&quot;</td>
                <td className="p-3 text-sb-charcoal/60">36&quot; – 38&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">M</td>
                <td className="p-3">22.0&quot;</td>
                <td className="p-3">28.5&quot;</td>
                <td className="p-3 text-sb-charcoal/60">39&quot; – 41&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">L</td>
                <td className="p-3">23.5&quot;</td>
                <td className="p-3">29.5&quot;</td>
                <td className="p-3 text-sb-charcoal/60">42&quot; – 44&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">XL</td>
                <td className="p-3">25.0&quot;</td>
                <td className="p-3">30.5&quot;</td>
                <td className="p-3 text-sb-charcoal/60">45&quot; – 47&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-sb-navy">XXL</td>
                <td className="p-3">26.5&quot;</td>
                <td className="p-3">31.5&quot;</td>
                <td className="p-3 text-sb-charcoal/60">48&quot; – 50&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Care */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-sb-charcoal/10 p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-lg font-medium text-sb-navy">
            Garment Care Guidelines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-sb-charcoal/70 leading-relaxed">
            <div className="space-y-1">
              <span className="font-medium text-sb-navy block">Chino Twill Caps</span>
              <p>Spot clean only with a damp cloth and mild detergent. Do not machine wash or dry clean, which can weaken the buckram and brass slider.</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-sb-navy block">Heavyweight Combed Knits</span>
              <p>Machine wash cold inside out with like colors. Line dry or tumble dry low. Never iron directly over high-density embroidery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
