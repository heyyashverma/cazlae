import Diptych from "./components/diptych";
import Hero from "./components/hero";
import ListSection from "./components/list-section";
import { FadeUp, MaskLine } from "./components/motion";
import SiteFooter from "./components/site-footer";
import { SITE_DESCRIPTION, SITE_URL, SOCIALS } from "./site";

// Structured data: tells search engines who the brand is and which social
// profiles belong to it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cazlae",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/cazlae-logo.png`,
      image: `${SITE_URL}/og.jpg`,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressCountry: "CA",
      },
      sameAs: SOCIALS.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "cazlae",
      inLanguage: "en-CA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        {/* 1 — Hero (with the fixed nav) */}
        <Hero />

        {/* 2 — Statement */}
        <section className="gutter py-[7.5rem] text-center md:py-[13.75rem]">
          <MaskLine className="serif type-statement text-ink">Made to be kept.</MaskLine>
          <FadeUp
            as="p"
            delay={0.2}
            className="type-body mx-auto mt-6 max-w-[32.5rem] text-espresso md:mt-10"
          >
            A new label from Toronto, making everyday clothes to a quiet
            standard. The first collection is in progress.
          </FadeUp>
        </section>

        {/* 3 — Two rooms */}
        <Diptych />

        {/* 4 — The list */}
        <ListSection />
      </main>

      {/* 5 — Footer */}
      <SiteFooter />
    </>
  );
}
