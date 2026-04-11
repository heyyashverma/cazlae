import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const rekalgera = localFont({
  src: "../fonts/Rekalgera-Regular.woff2",
  variable: "--font-rekalgera",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "cazlae — Coming Soon",
  description: "Clothing built around intention — minimal by design, precise in every detail. Join the cazlae waitlist for early access.",
  metadataBase: new URL("https://cazlae.com"),
  keywords: ["cazlae", "minimal fashion", "clothing brand", "coming soon", "waitlist"],
  openGraph: {
    title: "cazlae — Coming Soon",
    description: "Clothing built around intention — minimal by design, precise in every detail. Join the cazlae waitlist for early access.",
    url: "https://cazlae.com",
    siteName: "cazlae",
    images: [{ url: "/logo_opt.jpg", width: 800, height: 800, alt: "cazlae" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cazlae — Coming Soon",
    description: "Clothing built around intention — minimal by design, precise in every detail.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rekalgera.variable} ${bricolage.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/poster.jpg" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-[#090909]">{children}</body>
    </html>
  );
}
