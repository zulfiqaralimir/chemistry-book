import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Source_Serif_4 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-reading",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chemistry-book.vercel.app"),
  title: "Chemistry Book",
  description:
    "Interactive chemistry from IGCSE through A-Level, connected to Physics, Biology, Mathematics, Environmental Science, Industry, and Everyday Life.",
  openGraph: {
    title: "Chemistry Made Simple — From Atoms to Reactions",
    description:
      "Interactive chemistry from IGCSE through A-Level, connected to Physics, Biology, Mathematics, Environmental Science, Industry, and Everyday Life.",
    url: "https://chemistry-book.vercel.app",
    siteName: "Chemistry Book",
    images: [
      {
        url: "/og-image.png",
        width: 1704,
        height: 923,
        alt: "Chemistry Made Simple — From Atoms to Reactions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chemistry Made Simple — From Atoms to Reactions",
    description:
      "Interactive chemistry from IGCSE through A-Level, connected to Physics, Biology, Mathematics, Environmental Science, Industry, and Everyday Life.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
