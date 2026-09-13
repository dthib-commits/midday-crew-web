import { BRAND_COPY } from '@/lib/constants';

export const metadata = {
  title: 'About | Midday Crew',
  description: BRAND_COPY.storyBody,
};

export default function AboutPage() {
  return (
    <div className="bg-court-cream">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-court-navy mb-8">A Daily Ritual</h1>
        <p className="font-sans text-xl text-court-charcoal/80 max-w-2xl mx-auto leading-relaxed">
          {BRAND_COPY.storyHeadline}
        </p>
      </section>

      {/* Full-width image placeholder */}
      <div className="w-full h-[50vh] md:h-[70vh] bg-court-sand/30 flex items-center justify-center relative overflow-hidden">
        <div className="text-court-charcoal/50 font-sans uppercase tracking-[0.2em] z-10">Brand Image Placeholder</div>
      </div>

      {/* Story Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="font-sans text-lg md:text-xl text-court-charcoal leading-loose">
          {BRAND_COPY.storyBody}
        </p>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-court-sand/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="font-serif text-2xl text-court-navy mb-4">Performance</h3>
            <p className="font-sans text-court-charcoal/70 leading-relaxed">
              We carry only the finest paddles designed for elite execution on the court. Quality over everything.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-court-navy mb-4">Style</h3>
            <p className="font-sans text-court-charcoal/70 leading-relaxed">
              Drawing inspiration from classic country club aesthetics, redefined for the modern pickleball athlete.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-court-navy mb-4">Community</h3>
            <p className="font-sans text-court-charcoal/70 leading-relaxed">
              Rooted in Dallas, TX. We believe the best parts of the game happen between the points.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
