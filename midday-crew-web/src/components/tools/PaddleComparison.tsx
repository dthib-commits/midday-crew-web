'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, PADDLE_SCORES } from '@/lib/mockData';
import { useCart } from '@/components/cart/CartProvider';
import { Check } from 'lucide-react';

const PADDLES = PRODUCTS.filter(p => p.productType === 'Paddle');

const PADDLE_TECH_SPECS: Record<string, {
  core: string;
  face: string;
  weight: string;
  handleLength: string;
  idealFor: string;
  verdict: string;
}> = {
  'selkirk-luxx-control-air': {
    core: '20mm Florek Honeycomb Core',
    face: 'Toray T700 Raw QuadCarbon',
    weight: '7.9 – 8.2 oz',
    handleLength: '5.35" Standard Elongated',
    idealFor: 'Kitchen finesse, soft resets, and zero popup drops',
    verdict: 'The pinnacle of soft-game touch. If your priority is resetting hard drives and placing dinks with surgeon accuracy, this is your weapon.'
  },
  'selkirk-vanguard-power-air-invikta': {
    core: '16mm ProPolyCore + FlexFoam',
    face: 'QuadFlex 4-Layer Hybrid Carbon',
    weight: '7.8 – 8.2 oz',
    handleLength: '5.25" Aerodynamic Reach',
    idealFor: 'Aggressive baseline drives, roll volleys, and hand speed',
    verdict: 'A baseline cannon. The edgeless throat maximizes hand speed through the air, delivering explosive pop and penetrating drives.'
  },
  'joola-ben-johns-perseus-16mm': {
    core: '16mm Dynamic Propulsion Core',
    face: 'Charged Carbon Surface (CFS)',
    weight: '7.9 – 8.3 oz',
    handleLength: '5.5" Extended (Two-Handed)',
    idealFor: 'All-court dominance and modern two-handed backhands',
    verdict: 'The gold standard of the modern pro tour. The extended 5.5" handle makes two-handed backhands effortless, paired with exceptional torsional twistweight.'
  },
  'joola-ben-johns-scorpeus': {
    core: '14mm Reactive Honeycomb Core',
    face: 'Carbon Friction Surface',
    weight: '7.6 – 7.9 oz',
    handleLength: '5.25" Widebody Grip',
    idealFor: 'Lightning-fast kitchen hand battles and oversized sweet spot',
    verdict: 'Built for reflex hand speed. The widebody shape offers an enormous sweet spot while the 14mm profile cuts through the air instantaneously.'
  },
  'diadem-edge-18k': {
    core: '16mm Polypropylene Honeycomb',
    face: '3D Triaxial 18K Carbon Fiber',
    weight: '8.0 – 8.2 oz',
    handleLength: '5.3" Natural Contour',
    idealFor: 'Maximum spin generation and shaped dipping passes',
    verdict: 'An artisan spin monster. The unique 3D weave grabs the ball like sandpaper, giving tennis converts familiar ball-pocketing and extreme rotation.'
  },
  'diadem-warrior-v2': {
    core: '19mm Multi-Layer Aramid Dampening',
    face: 'Toray T700 Raw Carbon',
    weight: '8.1 – 8.3 oz',
    handleLength: '5.3" Cushioned Grip',
    idealFor: 'Vibration absorption, tennis elbow relief, and plush stability',
    verdict: 'Ultimate plush comfort. The massive 19mm core absorbs shock entirely, making off-center hits feel smooth while protecting joints during long sessions.'
  }
};

export function PaddleComparison() {
  const [selectedHandles, setSelectedHandles] = useState<string[]>([
    'selkirk-luxx-control-air',
    'joola-ben-johns-perseus-16mm',
    'diadem-edge-18k'
  ]);
  const [addedHandle, setAddedHandle] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleSelectPaddle = (index: number, handle: string) => {
    const updated = [...selectedHandles];
    updated[index] = handle;
    setSelectedHandles(updated);
  };

  const handleAddToCart = (productHandle: string) => {
    const product = PADDLES.find(p => p.handle === productHandle);
    if (product) {
      addItem(product, product.variants[0], 1);
      setAddedHandle(productHandle);
      setTimeout(() => setAddedHandle(null), 2000);
    }
  };

  const comparedPaddles = selectedHandles.map(h => PADDLES.find(p => p.handle === h)!);

  return (
    <div className="w-full space-y-12">
      {/* Comparison Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedHandles.map((handle, idx) => {
          const product = PADDLES.find(p => p.handle === handle)!;
          return (
            <div key={idx} className="bg-white p-6 rounded-sm border border-court-sand/40 shadow-xs flex flex-col items-center text-center">
              <label className="text-[10px] font-sans uppercase tracking-widest text-court-charcoal/50 mb-2">
                Paddle {idx + 1}
              </label>
              <select
                value={handle}
                onChange={(e) => handleSelectPaddle(idx, e.target.value)}
                className="w-full text-xs font-sans text-court-navy font-medium bg-court-cream/50 border border-court-sand/40 rounded-xs p-2 mb-4 outline-none focus:border-court-navy"
              >
                {PADDLES.map(p => (
                  <option key={p.handle} value={p.handle}>
                    {p.vendor} — {p.title}
                  </option>
                ))}
              </select>

              <div className="relative w-40 h-40 bg-court-cream rounded-sm overflow-hidden mb-4">
                <Image
                  src={product.images[0]?.url || ''}
                  alt={product.title}
                  fill
                  className="object-contain p-2 mix-blend-multiply"
                />
              </div>

              <h4 className="font-serif text-lg text-court-navy mb-1">{product.title}</h4>
              <p className="font-sans text-sm text-court-charcoal font-semibold mb-4">
                ${product.priceRange.minVariantPrice.amount.toFixed(2)}
              </p>

              <button
                onClick={() => handleAddToCart(product.handle)}
                className="w-full py-2.5 bg-court-navy text-court-cream font-sans text-xs uppercase tracking-widest hover:bg-court-terracotta transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                {addedHandle === product.handle ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  'Add to Bag'
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Unified Scorecard Section */}
      <div className="bg-white p-8 rounded-sm border border-court-sand/40 shadow-xs">
        <div className="text-center mb-8">
          <span className="text-xs font-sans uppercase tracking-widest text-court-sage font-semibold">
            Standardized Playability Benchmarks
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-court-navy mt-1">The Midday Scorecard Comparison</h3>
          <p className="font-sans text-sm text-court-charcoal/70 mt-1 max-w-xl mx-auto">
            We test every model across the same 5 verified performance metrics so you can compare Selkirk, JOOLA, and Diadem on equal footing.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            { key: 'touch', label: 'Touch & Kitchen Resets' },
            { key: 'power', label: 'Drive & Baseline Power' },
            { key: 'spin', label: 'Spin & RPM Potential' },
            { key: 'handSpeed', label: 'Hand Speed & Reflex' },
            { key: 'sweetSpot', label: 'Sweet Spot Forgiveness' }
          ].map(metric => (
            <div key={metric.key} className="border-b border-court-sand/20 pb-4">
              <div className="font-sans text-xs uppercase tracking-wider font-semibold text-court-navy mb-3">
                {metric.label}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedHandles.map(handle => {
                  const scores = PADDLE_SCORES[handle] || { touch: 8, power: 8, spin: 8, handSpeed: 8, sweetSpot: 8 };
                  const val = scores[metric.key as keyof typeof scores];
                  const paddle = PADDLES.find(p => p.handle === handle)!;
                  return (
                    <div key={handle} className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="text-court-charcoal/60 truncate mr-2">{paddle.title.replace(/Selkirk |JOOLA |Diadem /g, '')}</span>
                        <span className="font-bold text-court-navy">{val}/10</span>
                      </div>
                      <div className="w-full h-2 bg-court-cream rounded-full overflow-hidden">
                        <div
                          className="h-full bg-court-sage rounded-full"
                          style={{ width: `${val * 10}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Specs & Verdicts */}
      <div className="bg-white p-8 rounded-sm border border-court-sand/40 shadow-xs">
        <h3 className="font-serif text-2xl text-court-navy mb-6 text-center">Technical Specifications</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-court-sand/40">
                <th className="py-3 px-4 font-semibold text-court-navy uppercase tracking-wider text-xs">Spec</th>
                {comparedPaddles.map(p => (
                  <th key={p.handle} className="py-3 px-4 font-serif text-base text-court-navy">
                    {p.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-court-sand/20">
              <tr>
                <td className="py-3 px-4 font-medium text-court-charcoal/60 text-xs uppercase tracking-wider">Core Tech</td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-3 px-4 text-court-navy">
                    {PADDLE_TECH_SPECS[p.handle]?.core || '16mm Honeycomb'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-court-charcoal/60 text-xs uppercase tracking-wider">Face Material</td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-3 px-4 text-court-navy">
                    {PADDLE_TECH_SPECS[p.handle]?.face || 'Raw Carbon Fiber'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-court-charcoal/60 text-xs uppercase tracking-wider">Weight</td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-3 px-4 text-court-navy">
                    {PADDLE_TECH_SPECS[p.handle]?.weight || '7.9 – 8.2 oz'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-court-charcoal/60 text-xs uppercase tracking-wider">Handle Length</td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-3 px-4 text-court-navy">
                    {PADDLE_TECH_SPECS[p.handle]?.handleLength || '5.3"'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-court-charcoal/60 text-xs uppercase tracking-wider">Ideal Playstyle</td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-3 px-4 text-court-sage font-medium text-xs">
                    {PADDLE_TECH_SPECS[p.handle]?.idealFor || 'All-Court'}
                  </td>
                ))}
              </tr>
              <tr className="bg-court-cream/30">
                <td className="py-4 px-4 font-serif text-court-navy text-xs uppercase tracking-wider align-top">
                  Editorial Verdict
                </td>
                {comparedPaddles.map(p => (
                  <td key={p.handle} className="py-4 px-4 text-court-charcoal/80 text-xs leading-relaxed">
                    {PADDLE_TECH_SPECS[p.handle]?.verdict || ''}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
