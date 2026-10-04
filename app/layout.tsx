import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "./components/motion";
import SmoothScroll from "./components/smooth-scroll";
import { SITE_URL } from "./site";
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

const title = "cazlae — Made to outlast trends";
const description =
  "Everyday essentials, precisely cut. Join the waitlist for Drop 01.";

// TODO: favicon (app/favicon.ico) left unchanged — the monogram isn't decided yet.
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  applicationName: "cazlae",
  keywords: ["cazlae", "waitlist"],
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "cazlae",
    locale: "en_CA",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "cazlae wordmark over a misty lake at dawn",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
  themeColor: "#1E3328",
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
      lang="en"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
