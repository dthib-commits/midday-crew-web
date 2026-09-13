import { BRAND_COPY } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function StorySection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-court-sand/20 aspect-[3/4] md:aspect-auto flex items-center justify-center">
          <span className="font-sans text-court-navy/40 tracking-widest uppercase text-sm">
            Lifestyle Photography
          </span>
        </div>
        
        <div className="flex items-center px-8 py-20 md:p-24 lg:p-32">
          <div className="max-w-lg space-y-8">
            <span className="block uppercase tracking-widest text-xs font-sans text-court-sage">
              OUR STORY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-court-navy leading-tight">
              {BRAND_COPY.storyHeadline}
            </h2>
            <p className="text-court-charcoal/70 leading-relaxed font-sans">
              {BRAND_COPY.storyBody}
            </p>
            <div className="pt-4">
              <Button as="link" href="/about" variant="secondary">
                Read Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
