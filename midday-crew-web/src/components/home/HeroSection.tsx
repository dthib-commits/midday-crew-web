import { BRAND_COPY } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-court-navy/10 to-court-cream px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8 mt-16">
        <span className="block uppercase tracking-widest text-xs font-sans text-court-sage">
          THE MIDDAY GAME • EST. 2024
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-court-navy leading-tight">
          {BRAND_COPY.heroHeadline}
        </h1>
        <p className="text-lg text-court-charcoal/70 max-w-2xl mx-auto">
          {BRAND_COPY.heroSubheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button as="link" href="/shop" variant="primary">
            Shop The Collection
          </Button>
          <Button as="link" href="/collections/paddles" variant="secondary">
            Explore Paddles
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-court-navy/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
