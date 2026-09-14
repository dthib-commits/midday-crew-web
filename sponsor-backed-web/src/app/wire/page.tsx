import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { WIRE_POSTS } from '@/lib/wire';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Wire',
  description:
    'Dispatches on heritage craftsmanship, quiet luxury, and the culture of dealmaking. From the editors at Sponsor Backed.',
};

export default function WirePage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-sb-charcoal/10 pb-8 mb-12">
          <p className="text-xs uppercase tracking-widest text-sb-charcoal/50">
            Dispatches
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sb-navy mt-2">
            The Wire
          </h1>
          <p className="text-sm text-sb-charcoal/60 mt-2 max-w-xl">
            Notes on heritage craftsmanship, quiet luxury, and the culture of dealmaking.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-16">
          {WIRE_POSTS.map((post, idx) => (
            <article key={post.slug} className={idx > 0 ? 'pt-16 border-t border-sb-charcoal/10' : ''}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <Link href={`/wire/${post.slug}`} className="block relative aspect-4/3 overflow-hidden bg-sb-chalk">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </Link>
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-sb-charcoal/50">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/wire/${post.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-sb-navy hover:text-sb-leather transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-sb-charcoal/70 italic">
                    {post.subtitle}
                  </p>
                  <p className="text-sm text-sb-charcoal/70 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/wire/${post.slug}`}
                    className="inline-flex items-center text-xs text-sb-navy hover:text-sb-leather font-medium transition-colors space-x-1"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-sb-charcoal/5 text-sb-charcoal/60 rounded-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
