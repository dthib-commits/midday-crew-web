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
  metadataBase: new URL('https://sponsorbacked.com'),
  title: {
    default: 'SPONSOR BACKED | Fine Headwear & Goods for the Dealmaking Class',
    template: '%s | SPONSOR BACKED',
  },
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SPONSOR BACKED | Fine Headwear & Heritage Goods for the Dealmaking Class',
    description:
      'Archival chino twill caps, 24 oz duck canvas luggage, and bespoke closing crates. Embroidered in Dallas, Texas.',
    url: 'https://sponsorbacked.com',
    siteName: 'Sponsor Backed',
    images: [
      {
        url: '/images/sponsor_backed_cap.jpg',
        width: 1200,
        height: 630,
        alt: 'Sponsor Backed Broken-In Chino Cap',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPONSOR BACKED | Fine Headwear & Goods for the Dealmaking Class',
    description:
      'Archival chino twill caps, 24 oz duck canvas luggage, and bespoke closing crates. Embroidered in Dallas, Texas.',
    images: ['/images/sponsor_backed_cap.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sponsor Backed',
    url: 'https://sponsorbacked.com',
    logo: 'https://sponsorbacked.com/images/sponsor_backed_cap.jpg',
    description: 'Fine headwear and heritage goods for the dealmaking class. Crafted in Dallas, Texas.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
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
