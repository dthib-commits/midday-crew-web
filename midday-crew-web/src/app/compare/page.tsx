import { PaddleComparison } from '@/components/tools/PaddleComparison';

export const metadata = {
  title: 'The Midday Edit • Paddle Comparison Engine | Midday Crew',
  description: 'Compare tournament-grade performance paddles from Selkirk, JOOLA, and Diadem across normalized playability benchmarks.',
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-court-cream/30 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-sans uppercase tracking-widest text-court-terracotta font-semibold">
            The Midday Edit
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-court-navy mt-2 mb-4">
            Side-by-Side Comparison
          </h1>
          <p className="font-sans text-court-charcoal/70 text-lg max-w-2xl mx-auto leading-relaxed">
            No marketing jargon or confusing manufacturer specs. Compare Selkirk, JOOLA, and Diadem head-to-head across verified tournament metrics.
          </p>
        </div>

        <PaddleComparison />
      </div>
    </div>
  );
}
