import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-[#0A1C2A] text-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top section: Newsletter capture */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-serif text-4xl mb-4 text-[#FAF8F5]">Join the Midday Roster</h2>
          <p className="font-sans text-[#D9D0C3] mb-6 max-w-md">
            Sign up for exclusive drops, early access to new collections, and private court clinics in Dallas, TX.
          </p>
          <form className="flex max-w-md items-end border-b border-[#D9D0C3]/30 pb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent font-sans text-sm outline-none placeholder:text-[#D9D0C3]/60 text-[#FAF8F5]"
              required
            />
            <button
              type="submit"
              className="ml-4 text-[#556B55] hover:text-[#D8E038] transition-colors"
              aria-label="Submit"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Middle section: 4-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key}>
              <h3 className="font-sans text-xs uppercase tracking-widest text-[#D9D0C3] mb-6">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <ul className="flex flex-col space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-[#FAF8F5] hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D9D0C3]/20 pt-8 flex flex-col md:flex-row justify-between items-center font-sans text-xs text-[#D9D0C3]">
          <p>© {new Date().getFullYear()} Midday Crew. Court & Leisure Club.</p>
          <p className="mt-4 md:mt-0 uppercase tracking-widest">Dallas, TX</p>
        </div>
      </div>
    </footer>
  );
}
