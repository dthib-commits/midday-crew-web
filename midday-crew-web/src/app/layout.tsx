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

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-court-cream text-court-charcoal">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
