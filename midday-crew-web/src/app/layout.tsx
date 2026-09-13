import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Midday Crew",
    default: "Midday Crew — Elevated Pickleball for the Modern Court",
  },
  description: "Dallas, TX premium pickleball storefront offering Selkirk, JOOLA, Diadem paddles and our own lifestyle apparel.",
  openGraph: {
    title: "Midday Crew",
    description: "Dallas, TX premium pickleball storefront.",
    url: "https://middaycrew.com",
    siteName: "Midday Crew",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1C2A",
  width: "device-width",
  initialScale: 1,
};

// Placeholder components to ensure clean compilation
const AnnouncementBar = () => <div className="bg-court-navy text-court-cream text-center text-sm py-2">Announcement</div>;
const Header = () => <header className="p-4 bg-court-cream text-court-navy">Header</header>;
const Footer = () => <footer className="p-4 bg-court-navy text-court-cream">Footer</footer>;
const CartProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
