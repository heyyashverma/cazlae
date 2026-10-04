import EmailForm from "./components/email-form";
import Hero from "./components/hero";
import { Line, Reveal } from "./components/motion";
import Wordmark from "./components/wordmark";

const socials = [
  { label: "Instagram", href: "https://instagram.com/shopcazlae" },
  { label: "X", href: "https://x.com/cazlae" },
  { label: "LinkedIn", href: "https://linkedin.com/company/cazlae" },
  { label: "TikTok", href: "https://tiktok.com/@shopcazlae" },
];

const pieces = ["The tee", "The oversized tee", "The polo"];

export default function Home() {
  return (
    <>
      {/* HEADER — wordmark only, sits over the hero image */}
      <header className="wordmark-fade gutter absolute inset-x-0 top-0 z-10 flex justify-center pt-[max(2rem,env(safe-area-inset-top))] text-estate-green md:justify-start md:pt-12">
        <Wordmark className="h-6 w-auto" />
      </header>

      <main>
        <Hero />

        {/* BRAND */}
        <section className="gutter py-24 md:py-36 lg:py-44">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal as="h2" className="type-h2 text-estate-green lg:col-span-5">
              Fewer, better essentials.
            </Reveal>
            <Reveal
              as="p"
              delay={0.15}
              className="type-body-l max-w-xl lg:col-span-6 lg:col-start-7"
            >
              The tee, the oversized tee, the polo — cut precisely in
              substantial cotton and a restrained palette built to work
              together, season after season. At a price that stays within
              reach.
            </Reveal>
          </div>

          {/* The pieces, named but not shown */}
          <Line className="mt-20 md:mt-32" />
          <ol className="grid md:grid-cols-3">
            {pieces.map((piece, index) => (
              <Reveal
                as="li"
                key={piece}
                delay={index * 0.14}
                className="border-b border-stone py-8 md:border-b-0 md:py-10"
              >
                <p className="type-label text-espresso">0{index + 1}</p>
                <p className="type-h3 mt-4 text-estate-green">{piece}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* WAITLIST */}
        <section
          id="waitlist"
          className="on-green gutter grid scroll-mt-0 gap-12 bg-estate-green py-24 text-ivory md:py-36 lg:grid-cols-12"
        >
          <Reveal as="h2" className="type-h2 lg:col-span-5">
            Join the waitlist for Drop 01.
          </Reveal>
          <Reveal delay={0.15} className="max-w-md lg:col-span-6 lg:col-start-7">
            <EmailForm />
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="gutter mt-auto pb-[max(2.5rem,env(safe-area-inset-bottom))] text-espresso">
        <div className="flex flex-col gap-8 pt-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Wordmark className="h-5 w-auto self-start text-estate-green" />
            <p className="type-caption">Based in Toronto.</p>
          </div>
          <div className="type-small flex flex-col gap-3 md:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              © {new Date().getFullYear()} Cazlae
              {/* TODO: add " · Privacy" link once a privacy page exists */}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
