import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function SizingPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather font-semibold">
          DEPARTMENT OF STANDARDS &amp; MEASUREMENTS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-navy uppercase tracking-tight">
          Size &amp; Fit Guide
        </h1>
        <p className="text-sm text-sb-charcoal/80 font-sans leading-relaxed">
          Comprehensive garment measurements, cap circumference specs, and garment-care guidelines for the Sponsor Backed collection.
        </p>
      </div>

      {/* Cap Sizing Specifications */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-sb-charcoal/15 pb-2">
          <span className="text-[10px] font-mono text-sb-leather uppercase tracking-widest">
            DEPARTMENT 01
          </span>
          <h2 className="font-serif text-2xl font-bold text-sb-navy uppercase">
            Field &amp; Boardroom Caps
          </h2>
        </div>

        <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
          All Sponsor Backed dad hats and 6-panel twill caps are built on an unstructured, relaxed-crown block. The self-fabric strap and antique brass sliding tri-glide buckle allow continuous micro-adjustments without rigid plastic notches.
        </p>

        <div className="border border-sb-charcoal/15 bg-white rounded-xs overflow-hidden shadow-xs">
          <table className="w-full text-xs font-mono">
            <thead className="bg-sb-chalk border-b border-sb-charcoal/15 text-sb-navy text-left">
              <tr>
                <th className="p-3">Specification</th>
                <th className="p-3">Imperial</th>
                <th className="p-3">Metric</th>
                <th className="p-3">Hat Size Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sb-charcoal/10">
              <tr>
                <td className="p-3 font-bold">Circumference (Min – Max)</td>
                <td className="p-3">21.0&quot; – 24.25&quot;</td>
                <td className="p-3">53.3 cm – 61.6 cm</td>
                <td className="p-3 text-sb-navy font-semibold">Sizes 6 ⅞ to 7 ¾</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Crown Height (Profile)</td>
                <td className="p-3">4.25 inches</td>
                <td className="p-3">10.8 cm</td>
                <td className="p-3 text-sb-charcoal/70">Low-profile unconstructed</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Visor Length (Bill)</td>
                <td className="p-3">2.75 inches</td>
                <td className="p-3">7.0 cm</td>
                <td className="p-3 text-sb-charcoal/70">Pre-curved moldable</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Visor Width (Ear to Ear)</td>
                <td className="p-3">7.0 inches</td>
                <td className="p-3">17.8 cm</td>
                <td className="p-3 text-sb-charcoal/70">Standard American width</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#FAF9F5] border border-sb-charcoal/15 p-4 rounded-xs space-y-2">
          <h4 className="font-mono text-xs font-bold uppercase text-sb-navy">
            How to Measure Your Head:
          </h4>
          <p className="text-xs text-sb-charcoal/70 font-sans leading-relaxed">
            Wrap a soft tailor&apos;s measuring tape around the widest part of your head, approximately 0.5 inches above your eyebrows and just above your ears. If your measurement falls between 21&quot; and 24&quot;, our caps will fit perfectly.
          </p>
        </div>
      </div>

      {/* Heavyweight Knits & Sweatshirt Sizing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-sb-charcoal/15 pb-2">
          <span className="text-[10px] font-mono text-sb-leather uppercase tracking-widest">
            DEPARTMENT 02
          </span>
          <h2 className="font-serif text-2xl font-bold text-sb-navy uppercase">
            Heavyweight Combed Tees &amp; French Terry
          </h2>
        </div>

        <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
          Our tees (260 GSM) and sweatshirts (450 GSM) are cut in a 1990s J. Crew relaxed boxy silhouette. They are pre-shrunk, but we recommend cold washing and line drying to preserve the embroidery tension.
        </p>

        <div className="border border-sb-charcoal/15 bg-white rounded-xs overflow-hidden shadow-xs">
          <table className="w-full text-xs font-mono">
            <thead className="bg-sb-chalk border-b border-sb-charcoal/15 text-sb-navy text-left">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest Width (Pit-to-Pit)</th>
                <th className="p-3">Body Length</th>
                <th className="p-3">Shoulder Width</th>
                <th className="p-3">Recommended Fit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sb-charcoal/10">
              <tr>
                <td className="p-3 font-bold">Small (S)</td>
                <td className="p-3">20.5 inches</td>
                <td className="p-3">27.5 inches</td>
                <td className="p-3">18.5 inches</td>
                <td className="p-3 text-sb-charcoal/70">Chest 36&quot; - 38&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Medium (M)</td>
                <td className="p-3">22.0 inches</td>
                <td className="p-3">28.5 inches</td>
                <td className="p-3">19.5 inches</td>
                <td className="p-3 text-sb-charcoal/70">Chest 39&quot; - 41&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Large (L)</td>
                <td className="p-3">23.5 inches</td>
                <td className="p-3">29.5 inches</td>
                <td className="p-3">20.5 inches</td>
                <td className="p-3 text-sb-charcoal/70">Chest 42&quot; - 44&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">X-Large (XL)</td>
                <td className="p-3">25.0 inches</td>
                <td className="p-3">30.5 inches</td>
                <td className="p-3">21.5 inches</td>
                <td className="p-3 text-sb-charcoal/70">Chest 45&quot; - 47&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">XX-Large (XXL)</td>
                <td className="p-3">26.5 inches</td>
                <td className="p-3">31.5 inches</td>
                <td className="p-3">22.5 inches</td>
                <td className="p-3 text-sb-charcoal/70">Chest 48&quot; - 50&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Garment Care Standards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-sb-charcoal/15 p-6 rounded-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-sb-navy uppercase">
            Garment Care &amp; Longevity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-sb-charcoal/80">
            <div className="space-y-1">
              <span className="font-bold text-sb-navy">Chino Caps:</span>
              <p className="text-sb-charcoal/70 font-sans">
                Spot clean with a damp cloth and mild detergent. Do not machine wash or dry clean, which can weaken the buckram and brass slider.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-sb-navy">Heavy Combed Knits:</span>
              <p className="text-sb-charcoal/70 font-sans">
                Machine wash cold inside out with similar colors. Line dry or tumble dry low. Never iron directly over high-density embroidery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
