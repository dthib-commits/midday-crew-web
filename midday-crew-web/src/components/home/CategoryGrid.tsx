import { Collection } from "@/lib/types";
import Link from "next/link";

interface CategoryGridProps {
  collections: Collection[];
}

export function CategoryGrid({ collections }: CategoryGridProps) {
  return (
    <section className="bg-court-cream py-16 md:py-24 px-6 border-t border-court-sand/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.handle}`}
              className="group relative aspect-square bg-court-sand/10 overflow-hidden flex flex-col items-center justify-center text-center p-6"
            >
              <div className="absolute inset-0 bg-court-navy/0 group-hover:bg-court-navy/5 transition-colors duration-500 z-0" />
              <div className="relative z-10 space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl text-court-navy">
                  {collection.title}
                </h3>
                <span className="inline-block font-sans text-sm text-court-navy uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
