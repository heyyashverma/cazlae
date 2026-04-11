import EmailForm from "./components/email-form";
import VideoBackground from "./components/video-background";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shopcazlae/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@cazlae",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/cazlae",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cazlae/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden">

      {/* VIDEO BACKGROUND — lazy loaded with blur-fade reveal */}
      <VideoBackground />

      {/* OVERLAY */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.58)" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center w-full px-10 sm:px-16 lg:px-24 py-12">

        {/* Center block */}
        <div className="flex flex-col gap-5 max-w-xl">

          <h1
            className="leading-none text-white select-none"
            style={{
              fontFamily: "var(--font-rekalgera)",
              fontSize: "clamp(4rem, 12vw, 9rem)",
              letterSpacing: "0.06em",
              fontWeight: 400,
            }}
          >
            cazlae
          </h1>

          <p
            className="text-[10px] tracking-[0.5em] uppercase text-white/50"
            style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700 }}
          >
            Launching soon
          </p>

          <p
            className="text-sm text-white/50 leading-relaxed max-w-sm"
            style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300 }}
          >
            Clothing built around intention — minimal by design, precise in every detail. Join early and be part of what we&apos;re building.
          </p>

          <div className="mt-1">
            <EmailForm />
          </div>

        </div>

      </div>

      {/* SOCIAL ICONS */}
      <div className="absolute bottom-8 right-10 sm:right-16 lg:right-24 z-10 flex items-center gap-5">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/30 transition-colors duration-300 hover:text-white/80"
          >
            {icon}
          </a>
        ))}
      </div>

    </main>
  );
}
