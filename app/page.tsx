import EmailForm from "./components/email-form";
import Wordmark from "./components/wordmark";

export default function Home() {
  return (
    <>
      {/* HEADER — wordmark only, sits over the hero */}
      <header className="gutter absolute inset-x-0 top-0 z-10 flex justify-center pt-[max(2rem,env(safe-area-inset-top))] text-ivory md:justify-start md:pt-12">
        <Wordmark className="h-6 w-auto" />
      </header>

      <main>
        {/* HERO */}
        <section className="on-green gutter flex flex-col justify-end bg-estate-green pt-36 pb-16 text-ivory md:pb-24 lg:min-h-svh">
          <div className="hero-fade">
            <p className="type-label text-sand-camel">Drop 01</p>
            <h1 className="type-display mt-5">Made to outlast trends</h1>
            <p className="type-body-l mt-6">
              Everyday essentials, precisely cut.
            </p>
            <div className="mt-10 max-w-md">
              <EmailForm />
            </div>
          </div>
        </section>

        {/* BRAND */}
        <section className="gutter grid gap-8 py-24 md:py-36 lg:grid-cols-12 lg:py-44">
          <h2 className="type-h2 text-estate-green lg:col-span-5">
            Fewer, better essentials.
          </h2>
          <p className="type-body-l max-w-xl lg:col-span-6 lg:col-start-7">
            The tee, the oversized tee, the polo — cut precisely in substantial
            cotton and a restrained palette built to work together, season
            after season. At a price that stays within reach.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="gutter mt-auto pb-[max(2.5rem,env(safe-area-inset-bottom))] text-espresso">
        <div className="flex flex-col gap-8 border-t border-stone pt-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Wordmark className="h-5 w-auto self-start text-estate-green" />
            <p className="type-caption">Based in Toronto.</p>
          </div>
          <div className="type-small flex flex-col gap-3 md:items-end">
            <ul className="flex gap-6">
              <li>
                <a
                  href="https://instagram.com/shopcazlae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Instagram
                </a>
              </li>
              {/* TODO: other social links — confirm before enabling
              <li><a href="https://tiktok.com/@cazlae">TikTok</a></li>
              <li><a href="https://x.com/cazlae">X</a></li>
              <li><a href="https://www.linkedin.com/company/cazlae/">LinkedIn</a></li>
              */}
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
