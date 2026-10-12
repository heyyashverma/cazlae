import Link from "next/link";
import { SOCIALS } from "../site";
import Wordmark from "./wordmark";

export default function SiteFooter() {
  return (
    <footer className="gutter pt-14 pb-[max(1.75rem,env(safe-area-inset-bottom))] text-ink md:pt-[4.5rem] md:pb-9">
      <div className="flex flex-col items-center gap-5 md:grid md:grid-cols-3 md:items-end md:gap-0">
        <Link href="/" aria-label="cazlae, home" className="md:justify-self-start">
          <Wordmark className="wordmark-footer h-auto" />
        </Link>
        <ul className="type-small flex gap-x-7 md:justify-self-center md:pb-[0.1rem]">
          {SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-line">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="type-small -mt-1.5 text-espresso md:mt-0 md:justify-self-end">
          Toronto, Canada · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
