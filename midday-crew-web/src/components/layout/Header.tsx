'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import CartIcon from '@/components/cart/CartIcon';
import MobileMenu from '@/components/layout/MobileMenu';
import { SearchModal } from '@/components/layout/SearchModal';

const EXTENDED_NAV_LINKS = [
  ...NAV_LINKS,
  { label: 'Compare', href: '/compare' },
  { label: 'Matchmaker', href: '/matchmaker' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-40 transition-all duration-300 ease-in-out',
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#0A1C2A] hover:opacity-70 transition-opacity" 
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-1 justify-center md:justify-center">
              <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-medium uppercase text-center text-[#0A1C2A]">
                Midday Crew
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5">
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search (Cmd+K)" 
                className="text-[#0A1C2A] hover:opacity-70 transition-opacity hidden md:flex items-center gap-1.5"
              >
                <Search className="h-5 w-5" />
                <span className="text-[10px] bg-court-sand/40 px-1.5 py-0.5 rounded text-court-charcoal/70 font-sans tracking-widest hidden lg:inline-block">⌘K</span>
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search" 
                className="text-[#0A1C2A] hover:opacity-70 transition-opacity md:hidden p-1"
              >
                <Search className="h-5 w-5" />
              </button>
              <CartIcon />
            </div>
          </div>

          <nav className="mt-3 hidden md:block">
            <ul className="flex justify-center space-x-8">
              {EXTENDED_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sans text-xs uppercase tracking-widest transition-colors",
                      pathname === link.href ? "text-[#C86D51] font-medium" : "text-[#0A1C2A] hover:text-[#C86D51]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
