'use client';

import React, { useState } from 'react';
import { Share2, Link2, Check, Mail } from 'lucide-react';

interface ShareWidgetProps {
  title: string;
  handle: string;
}

export function ShareWidget({ title, handle }: ShareWidgetProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://sponsorbacked.com/products/${handle}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`${title} — Sponsor Backed`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center space-x-3 pt-4 border-t border-sb-charcoal/10">
      <span className="text-[11px] text-sb-charcoal/50 flex items-center gap-1">
        <Share2 className="w-3 h-3" />
        Share with your deal team
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleCopyLink}
          className="p-1.5 text-sb-charcoal/40 hover:text-sb-navy transition-colors"
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-sb-green" /> : <Link2 className="w-3.5 h-3.5" />}
        </button>
        <a
          href={`mailto:?subject=${encodedTitle}&body=Thought you'd appreciate this: ${encodedUrl}`}
          className="p-1.5 text-sb-charcoal/40 hover:text-sb-navy transition-colors"
          aria-label="Share via email"
          title="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-sb-charcoal/40 hover:text-sb-navy transition-colors"
          aria-label="Share on LinkedIn"
          title="LinkedIn"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
