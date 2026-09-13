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
      <div className="w-full aspect-[4/5] bg-court-sand/20 flex items-center justify-center rounded-sm">
        <span className="text-court-charcoal/50 font-sans">No image available</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square md:aspect-[4/5] bg-court-sand/20 rounded-sm overflow-hidden flex items-center justify-center">
        {/* Placeholder text for images that might not exist locally during dev */}
        <span className="absolute z-0 text-court-charcoal/30 font-sans text-sm">Product Image Placeholder</span>
        
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          fill
          className="object-cover object-center z-10"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-20 h-20 bg-court-sand/20 flex-none rounded-sm overflow-hidden border-2 transition-colors",
                selectedIndex === index ? "border-court-navy" : "border-transparent"
              )}
              aria-label={`Select image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
