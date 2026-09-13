"use client";

import { useState } from "react";
import { BRAND_COPY } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-court-navy py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl text-court-cream">
          {BRAND_COPY.newsletterHeadline}
        </h2>
        <p className="text-court-cream/80 font-sans">
          {BRAND_COPY.newsletterSubheadline}
        </p>

        {submitted ? (
          <div className="bg-court-sage/20 text-court-cream py-4 px-6 rounded border border-court-sage/30 inline-block font-sans mt-4">
            Welcome to the club. Keep an eye on your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex-1 bg-transparent border-b border-court-cream/30 px-4 py-3 text-court-cream placeholder:text-court-cream/50 focus:outline-none focus:border-court-cream transition-colors font-sans"
            />
            <Button type="submit" variant="sage" className="whitespace-nowrap w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
