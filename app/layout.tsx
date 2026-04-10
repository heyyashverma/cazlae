import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const rekalgera = localFont({
  src: "../fonts/Rekalgera-Regular.otf",
  variable: "--font-rekalgera",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "cazlae — Coming Soon",
  description: "Something is coming.",
  openGraph: {
    title: "cazlae — Coming Soon",
    description: "Something is coming.",
    images: ["/logo.jpeg"],
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
      <body className="min-h-full flex flex-col bg-[#090909]">{children}</body>
    </html>
  );
}
