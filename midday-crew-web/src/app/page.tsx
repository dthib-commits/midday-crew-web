import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { StorySection } from "@/components/home/StorySection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PRODUCTS, COLLECTIONS } from "@/lib/mockData";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <main>
      <HeroSection />
      <FeaturedCollection products={featuredProducts} />
      <StorySection />
      <CategoryGrid collections={COLLECTIONS} />
      <NewsletterSection />
    </main>
  );
}
