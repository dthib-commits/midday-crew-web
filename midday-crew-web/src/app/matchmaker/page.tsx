import { PaddleMatchmaker } from '@/components/tools/PaddleMatchmaker';

export const metadata = {
  title: 'The Midday Matchmaker • Find Your Perfect Paddle | Midday Crew',
  description: 'Answer 3 quick questions about your playstyle to find the ideal tournament paddle from Selkirk, JOOLA, or Diadem.',
};

export default function MatchmakerPage() {
  return (
    <div className="min-h-screen bg-court-cream/30 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-sans uppercase tracking-widest text-court-sage font-semibold">
            Personalized Court Advisor
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-court-navy mt-2 mb-4">
            The Midday Matchmaker
          </h1>
          <p className="font-sans text-court-charcoal/70 text-lg max-w-xl mx-auto leading-relaxed">
            Answer 3 quick questions about your playstyle to unlock the exact Selkirk, JOOLA, or Diadem model built for your game.
          </p>
        </div>

        <PaddleMatchmaker />
      </div>
    </div>
  );
}
