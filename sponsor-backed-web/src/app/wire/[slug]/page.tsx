import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, WIRE_POSTS } from '@/lib/wire';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WIRE_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | The Wire — SPONSOR BACKED`,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      type: 'article',
    },
  };
}

export default async function WirePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  // Schema.org Article JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `https://sponsorbacked.com${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Sponsor Backed' },
    publisher: { '@type': 'Organization', name: 'Sponsor Backed' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pb-24 pt-10 sm:pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-sb-charcoal/50 mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-sb-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/wire" className="hover:text-sb-navy transition-colors">The Wire</Link>
            <span>/</span>
            <span className="text-sb-navy font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="space-y-4 border-b border-sb-charcoal/10 pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 bg-sb-charcoal/5 text-sb-charcoal/60 rounded-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-sb-navy leading-snug">
              {post.title}
            </h1>
            <p className="text-base text-sb-charcoal/70 italic leading-relaxed">
              {post.subtitle}
            </p>
            <div className="flex items-center space-x-3 text-xs text-sb-charcoal/50">
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-16/9 overflow-hidden bg-sb-chalk mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>

          {/* Body */}
          <div className="prose prose-sm max-w-none">
            {post.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-sb-charcoal/80 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-8 border-t border-sb-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/wire"
              className="text-sm text-sb-charcoal/60 hover:text-sb-navy transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to The Wire</span>
            </Link>
            <Link
              href="/catalog"
              className="px-5 py-2.5 bg-sb-navy hover:bg-sb-green text-sb-chalk text-sm font-medium tracking-wide transition-colors flex items-center space-x-2"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
