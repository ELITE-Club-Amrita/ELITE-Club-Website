import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ELITE Club | Where Leaders are Forged",
  description: "Entrepreneurship, Leadership, Innovation, Training, Exposure. Join the community where future leaders are forged.",
  keywords: ["ELITE", "leadership", "entrepreneurship", "innovation", "technology", "club"],
  openGraph: {
    title: "ELITE Club",
    description: "Where Leaders are Forged",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body
        className="bg-elite-black text-elite-silver antialiased cursor-none md:cursor-none font-satoshi"
      >
        <SmoothScroll>
          <NoiseOverlay />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
