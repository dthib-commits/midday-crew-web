'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle background visibility
      setIsScrolled(currentScrollY > 20);

      // Handle header visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 text-current" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-1 justify-center md:justify-center">
            <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-medium uppercase text-center text-[#0A1C2A]">
              Midday Crew
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            <button aria-label="Search" className="text-[#0A1C2A] hover:opacity-70 transition-opacity">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className="relative text-[#0A1C2A] hover:opacity-70 transition-opacity">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1E3A2F] text-[9px] text-white">
                0
              </span>
            </button>
          </div>
        </div>

        <nav className="mt-4 hidden md:block">
          <ul className="flex justify-center space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm uppercase tracking-widest text-[#0A1C2A] hover:text-[#C86D51] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
