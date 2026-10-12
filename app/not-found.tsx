import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "./components/site-footer";
import Wordmark from "./components/wordmark";

export const metadata: Metadata = {
  title: "Page not found — cazlae",
};

export default function NotFound() {
  return (
    <>
      <header className="gutter flex h-(--nav-h) items-center text-ink">
        <Link href="/" aria-label="cazlae, home">
          <Wordmark className="h-6 w-auto" />
        </Link>
      </header>

      <main className="gutter flex min-h-[60svh] flex-col items-center justify-center py-28 text-center">
        <h1 className="serif type-h2 text-ink">This page doesn’t exist.</h1>
        <Link href="/" className="type-small link-under mt-10 text-ink">
          Return to cazlae
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}
