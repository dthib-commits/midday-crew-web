'use client';

import React from 'react';
import { X, Check } from 'lucide-react';

export function SizeGuideModal({
  isOpen,
  onClose,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}) {
  if (!isOpen) return null;

  const isCap = category === 'caps';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sb-navy/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] border border-sb-charcoal/20 rounded-xs max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sb-charcoal/60 hover:text-sb-navy"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-sb-charcoal/15 pb-4 mb-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-sb-leather">
            OFFICIAL SPECIFICATION SHEET
          </span>
          <h2 className="font-serif text-2xl font-bold text-sb-navy uppercase mt-0.5">
            {isCap ? 'Headwear Dimensions & Fit' : 'Garment Measurements & Fit'}
          </h2>
        </div>

        {isCap ? (
          <div className="space-y-6">
            <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
              Our caps feature an unstructured, relaxed 6-panel crown engineered to contour to the head naturally from the first wear. Finished with an antique brass sliding tri-glide buckle and tuck-in channel.
            </p>

            <div className="border border-sb-charcoal/15 bg-white rounded-xs overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-sb-chalk border-b border-sb-charcoal/15 text-sb-navy text-left">
                  <tr>
                    <th className="p-2.5">Dimension</th>
                    <th className="p-2.5">Measurement</th>
                    <th className="p-2.5">Fit Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sb-charcoal/10">
                  <tr>
                    <td className="p-2.5 font-bold">Circumference</td>
                    <td className="p-2.5">21.0&quot; – 24.0&quot;</td>
                    <td className="p-2.5 text-sb-charcoal/70">Hat Sizes 6 ⅞ to 7 ¾</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Crown Height</td>
                    <td className="p-2.5">4.25 inches</td>
                    <td className="p-2.5 text-sb-charcoal/70">Low-profile, soft contour</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Visor Length</td>
                    <td className="p-2.5">2.75 inches</td>
                    <td className="p-2.5 text-sb-charcoal/70">Pre-curved, shapeable</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Undervisor</td>
                    <td className="p-2.5">Augusta Green</td>
                    <td className="p-2.5 text-sb-green font-semibold">Glare-reducing twill</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sb-chalk p-3.5 rounded-xs space-y-1.5 text-xs font-mono text-sb-charcoal/80">
              <div className="flex items-center space-x-2 text-sb-green font-bold">
                <Check className="w-4 h-4" />
                <span>One Size Fits 98% of Allocators</span>
              </div>
              <p className="text-[11px] text-sb-charcoal/60 leading-normal">
                Self-fabric strap allows infinite micro-adjustments without uncomfortable plastic snap teeth.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-sb-charcoal/80 font-sans leading-relaxed">
              Knitted from dense 260 GSM combed cotton and 450 GSM loopback French terry. Cut in a classic 1990s relaxed boxy fit. Fits true to size; order your standard size.
            </p>

            <div className="border border-sb-charcoal/15 bg-white rounded-xs overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-sb-chalk border-b border-sb-charcoal/15 text-sb-navy text-left">
                  <tr>
                    <th className="p-2">Size</th>
                    <th className="p-2">Chest Width</th>
                    <th className="p-2">Body Length</th>
                    <th className="p-2">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sb-charcoal/10 text-center sm:text-left">
                  <tr>
                    <td className="p-2 font-bold">S</td>
                    <td className="p-2">20.5&quot;</td>
                    <td className="p-2">27.5&quot;</td>
                    <td className="p-2">8.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">M</td>
                    <td className="p-2">22.0&quot;</td>
                    <td className="p-2">28.5&quot;</td>
                    <td className="p-2">9.0&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">L</td>
                    <td className="p-2">23.5&quot;</td>
                    <td className="p-2">29.5&quot;</td>
                    <td className="p-2">9.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">XL</td>
                    <td className="p-2">25.0&quot;</td>
                    <td className="p-2">30.5&quot;</td>
                    <td className="p-2">10.0&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">XXL</td>
                    <td className="p-2">26.5&quot;</td>
                    <td className="p-2">31.5&quot;</td>
                    <td className="p-2">10.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-sb-charcoal/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sb-navy text-sb-chalk text-xs font-mono tracking-widest uppercase rounded-xs hover:bg-sb-green transition-colors"
          >
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  );
}
