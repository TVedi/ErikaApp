import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elite Paddle Coaching | Olympic Kayak Coaching by Erika Medveczky",
    template: "%s | Elite Paddle Coaching",
  },
  description:
    "Online kayak coaching, expert video technique analysis, and training camp opportunities with Olympic sprint kayaker and World Champion Erika Medveczky.",
  openGraph: {
    title: "Elite Paddle Coaching | Olympic Kayak Coaching by Erika Medveczky",
    description:
      "Online kayak coaching, expert video technique analysis, and training camps in Gainesville, Georgia.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e2436",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
