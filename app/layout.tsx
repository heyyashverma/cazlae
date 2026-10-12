import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "./components/motion";
import SmoothScroll from "./components/smooth-scroll";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const title = SITE_TITLE;
const description = SITE_DESCRIPTION;

// Icons come from the file conventions: app/favicon.ico, app/icon.svg,
// app/apple-icon.png and app/manifest.ts (Figma page "Favicon — v1 2026-10-12").
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  applicationName: "cazlae",
  keywords: ["cazlae", "Toronto", "clothing label"],
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "cazlae",
    locale: "en_CA",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The cazlae wordmark above a stone house in a misty field",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  // TODO: add `verification: { google: "…" }` once the site is added to
  // Google Search Console.
};

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
        {/* Fine film grain over the whole page, to match Instagram */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
