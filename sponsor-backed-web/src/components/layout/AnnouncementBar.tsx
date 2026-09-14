'use client';

import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';

export function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sb-navy text-sb-chalk/90 text-[11px] py-1.5 px-4 text-center tracking-wide">
      {ANNOUNCEMENT_MESSAGES[currentIdx]}
    </div>
  );
}
