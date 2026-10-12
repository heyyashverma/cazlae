import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/site-footer";
import Wordmark from "../components/wordmark";
import { SITE_URL } from "../site";

// Draft for @OPS to confirm (CASL / PIPEDA) before launch.
export const metadata: Metadata = {
  title: "Privacy — cazlae",
  description: "How cazlae collects and uses your email address.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const UPDATED = "12 October 2026";

export default function PrivacyPage() {
  // The brand inbox the signup emails already come from.
  const contact = process.env.ZOHO_EMAIL;

  return (
    <>
      <header className="gutter flex h-(--nav-h) items-center justify-between text-ink">
        <Link href="/" aria-label="cazlae, home">
          <Wordmark className="h-6 w-auto" />
        </Link>
        <Link href="/" className="type-small link-line">
          Back
        </Link>
      </header>

      <main className="gutter pt-16 pb-28 md:pt-28 md:pb-40">
        <article className="mx-auto max-w-[40rem] text-espresso">
          <h1 className="serif type-h2 text-ink">Privacy</h1>
          <p className="type-small mt-6">Last updated {UPDATED}</p>

          <div className="type-body mt-12 space-y-10 [&_h2]:font-serif [&_h2]:tracking-[-0.02em] [&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_h2]:text-ink [&_p]:mt-3">
            <section>
              <h2>What we collect</h2>
              <p>
                When you join the list, we collect your email address, the
                date you joined, and the fact that you agreed to hear from us.
                Nothing else.
              </p>
            </section>

            <section>
              <h2>Why</h2>
              <p>
                To write to you when the first collection opens. We don&apos;t
                sell, rent or share your email address with anyone for their
                own use.
              </p>
            </section>

            <section>
              <h2>Where it is kept</h2>
              <p>
                Your address is stored in a private Google Sheet and our mail
                is sent through Zoho Mail. Only cazlae can see it. These
                services may store data outside Canada.
              </p>
            </section>

            <section>
              <h2>Leaving the list</h2>
              <p>
                Every email we send has a way to unsubscribe. You can also ask
                us at any time to remove your address or to tell you what we
                hold about you
                {contact ? (
                  <>
                    {" "}
                    by writing to{" "}
                    <a href={`mailto:${contact}`} className="link-under text-ink">
                      {contact}
                    </a>
                  </>
                ) : (
                  " by replying to any email from us"
                )}
                . We remove it promptly.
              </p>
            </section>

            <section>
              <h2>Who we are</h2>
              <p>cazlae, Toronto, Ontario, Canada.</p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
