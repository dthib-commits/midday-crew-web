import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart';
import { CartDrawer } from '@/components/cart/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SPONSOR BACKED | Fine Headwear & Heritage Goods for the Dealmaking Class',
  description:
    'The premier heritage outfitter for private equity and institutional dealmakers. Broken-in chino twill caps, 24 oz duck canvas boat totes, and B2B closing crates. Crafted in Dallas, Texas by The Hat Company.',
  keywords: [
    'Sponsor Backed',
    'Private Equity Apparel',
    'PE Hats',
    'EBITDA Hat',
    'Dealmaker Caps',
    'The Hat Company Dallas',
    'B2B Deal Toys',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-sb-cream text-sb-charcoal antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
