import EmailForm from "./components/email-form";

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg2.webm" type="video/mp4" />
      </video>

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
    </main>
  );
}
