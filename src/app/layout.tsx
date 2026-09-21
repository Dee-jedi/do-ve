import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cinzel, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dorcas-victor.wedding"),
  title: "Dorcas & Victor | The Royal Wedding Celebration",
  description:
    "Join us in celebrating the holy union and eternal love story of Dorcas & Victor. Explore our journey, order of events, gallery, and leave your heartfelt wishes.",
  keywords: ["Dorcas and Victor", "Wedding", "Love Story", "Wedding Celebration", "Order of Events"],
  openGraph: {
    title: "Dorcas & Victor | The Royal Wedding Celebration",
    description: "Two souls, one divine journey. Welcome to the official wedding celebration website of Dorcas and Victor.",
    images: [
      {
        url: "/images/dorcas-victor-hero.jpg",
        width: 1080,
        height: 1350,
        alt: "Dorcas & Victor",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#070606",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${jakarta.variable} ${greatVibes.variable} bg-obsidian-950 text-gold-100 antialiased`}
    >
      <body className="min-h-screen bg-obsidian-950 text-gold-100 font-sans selection:bg-gold-500/30 selection:text-[#ffd98a]">
        {children}
      </body>
    </html>
  );
}
