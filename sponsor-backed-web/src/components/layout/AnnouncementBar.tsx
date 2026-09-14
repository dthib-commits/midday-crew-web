'use client';

import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';

export function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sb-navy text-sb-chalk border-b border-sb-charcoal/20 text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 font-mono text-[10px] tracking-widest uppercase opacity-75">
          <span>SEC FILING NO. 001-SB</span>
          <span>•</span>
          <span>DALLAS, TX</span>
        </div>
        <div className="flex-1 text-center font-medium tracking-wide transition-opacity duration-300">
          {ANNOUNCEMENT_MESSAGES[currentIdx]}
        </div>
        <div className="hidden md:flex items-center space-x-2 font-mono text-[10px] tracking-widest uppercase opacity-75">
          <span>CATALOG VOL. I</span>
        </div>
      </div>
    </div>
  );
}
