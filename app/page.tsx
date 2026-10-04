import Image from "next/image";
import heroLake from "../public/hero-lake.webp";
import EmailForm from "./components/email-form";
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
      <header className="gutter absolute inset-x-0 top-0 z-10 flex justify-center pt-[max(2rem,env(safe-area-inset-top))] text-estate-green md:justify-start md:pt-12">
        <Wordmark className="h-6 w-auto" />
      </header>

      <main>
        {/* HERO — full-screen image, anchored to the top so the sky the text sits
            in is never cropped away; the action sits on the rock */}
        <section className="gutter relative flex min-h-[max(100svh,40rem)] flex-col justify-between pt-24 pb-12 text-estate-green md:pt-32 md:pb-16">
          {/* TODO: animate this still (drifting mist, slow push-in) */}
          <Image
            src={heroLake}
            alt="Mist over a still lake at dawn, with pine forest on the far shore"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="-z-10 object-cover object-top"
          />
          <div className="hero-fade">
            <p className="type-label">Drop 01</p>
            <h1 className="type-display mt-5">Made to outlast trends</h1>
            <p className="type-body-l mt-6 text-ink">
              Everyday essentials, precisely cut.
            </p>
          </div>
          <a
            href="#waitlist"
            className="type-button hero-fade inline-flex h-[54px] items-center self-center bg-estate-green px-8 text-ivory transition-colors duration-200 hover:bg-ink md:self-start"
          >
            Join the waitlist
          </a>
        </section>

        {/* BRAND */}
        <section className="gutter py-24 md:py-36 lg:py-44">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className="type-h2 text-estate-green lg:col-span-5">
              Fewer, better essentials.
            </h2>
            <p className="type-body-l max-w-xl lg:col-span-6 lg:col-start-7">
              The tee, the oversized tee, the polo — cut precisely in
              substantial cotton and a restrained palette built to work
              together, season after season. At a price that stays within
              reach.
            </p>
          </div>

          {/* The pieces, named but not shown */}
          <ol className="mt-20 grid border-t border-stone md:mt-32 md:grid-cols-3">
            {pieces.map((piece, index) => (
              <li
                key={piece}
                className="border-b border-stone py-8 md:border-b-0 md:py-10"
              >
                <p className="type-label text-espresso">0{index + 1}</p>
                <p className="type-h3 mt-4 text-estate-green">{piece}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WAITLIST */}
        <section
          id="waitlist"
          className="on-green gutter grid scroll-mt-0 gap-12 bg-estate-green py-24 text-ivory md:py-36 lg:grid-cols-12"
        >
          <h2 className="type-h2 lg:col-span-5">
            Join the waitlist for Drop 01.
          </h2>
          <div className="max-w-md lg:col-span-6 lg:col-start-7">
            <EmailForm />
          </div>
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
