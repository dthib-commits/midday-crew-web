'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('announcementDismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={cn("relative flex h-10 items-center justify-center bg-[#0A1C2A] px-4 font-sans text-xs uppercase tracking-widest text-[#FAF8F5]")}>
      <div className="relative w-full max-w-7xl overflow-hidden text-center h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full truncate px-8"
          >
            {ANNOUNCEMENT_MESSAGES[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-4 p-1 transition-opacity hover:opacity-70 focus:outline-none"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
