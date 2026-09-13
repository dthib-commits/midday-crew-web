'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-white flex items-center justify-center rounded-sm border border-court-sand/30 shadow-xs">
        <span className="text-court-charcoal/50 font-sans tracking-widest uppercase text-sm">No image available</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewport */}
      <div className="relative w-full aspect-square md:aspect-[4/5] bg-white rounded-sm border border-court-sand/40 shadow-xs overflow-hidden flex items-center justify-center">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-20 h-20 bg-white flex-none rounded-sm overflow-hidden transition-all duration-200",
                selectedIndex === index 
                  ? "border-2 border-court-navy shadow-sm" 
                  : "border border-court-sand/50 opacity-70 hover:opacity-100 hover:border-court-navy/50"
              )}
              aria-label={`Select view ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
