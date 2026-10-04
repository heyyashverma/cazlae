import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "./components/motion";
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
  metadataBase: new URL("https://cazlae.com"),
  keywords: ["cazlae", "waitlist"],
  openGraph: {
    title,
    description,
    url: "https://cazlae.com",
    siteName: "cazlae",
    // TODO: swap to /og.png (1200×630, "Open Graph link preview" frame in Figma)
    // once it is exported to /public/og.png. This is still the pre-rebrand image.
    images: [{ url: "/logo_opt.jpg", width: 800, height: 800, alt: "cazlae" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // TODO: swap to /og.png, as above.
    images: ["/logo_opt.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://cazlae.com",
  },
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
