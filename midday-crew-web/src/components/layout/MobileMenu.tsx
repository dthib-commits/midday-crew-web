'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Mail } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 top-0 z-[70] w-[85vw] max-w-sm bg-[#FAF8F5] shadow-xl"
          >
            <div className="flex h-full flex-col p-6 overflow-y-auto">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="p-2 text-[#0A1C2A] hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8 flex-1">
                <ul className="flex flex-col space-y-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="font-serif text-3xl text-[#0A1C2A] hover:text-[#C86D51] transition-colors block py-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 border-t border-[#D9D0C3] pt-8">
                <div className="mb-6">
                  <h3 className="font-serif text-xl text-[#0A1C2A] mb-2">Join the Midday Club</h3>
                  <p className="font-sans text-sm text-[#1A1A1A] mb-4">
                    Exclusive drops and private court clinics in Dallas.
                  </p>
                  <div className="flex items-center">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full border-b border-[#0A1C2A] bg-transparent py-2 font-sans text-sm outline-none placeholder:text-[#1A1A1A]/60"
                    />
                    <button className="border-b border-[#0A1C2A] p-2 text-[#0A1C2A]">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-[#0A1C2A] hover:opacity-70" aria-label="Instagram">
                    <Camera className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
