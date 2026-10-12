"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { getImageProps } from "next/image";
import {
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import heroDesktop from "../../public/waitlist/hero_desktop.jpg";
import heroMobile from "../../public/waitlist/hero_mobile.jpg";
import { EASE, useReducedMotionSafe } from "./motion";
import RollText from "./roll-text";
import { scrollToElement } from "./smooth-scroll";
import Wordmark from "./wordmark";
import { WORDMARK_LETTERS, WORDMARK_VIEWBOX } from "./wordmark-paths";

const HERO_ALT =
  "A pale stone house alone in a frosted field, with a low dry-stone wall in front and mist behind";

// Width of the wordmark once it has docked in the nav (desktop: 512 × 0.12).
const DOCKED_WIDTH = 61;

// useLayoutEffect warns during server rendering; this runs only in the browser.
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Desktop and mobile crops of the house, chosen by the browser. */
function HeroPicture() {
  const common = { alt: HERO_ALT, sizes: "100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: heroDesktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: heroMobile, loading: "eager" });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      <img
        {...img}
        alt={HERO_ALT}
        width={undefined}
        height={undefined}
        className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
      />
    </picture>
  );
}

/** The six letters rise out of the sky one after another. */
function RisingWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="cazlae"
      fill="currentColor"
      className={className}
    >
      <defs>
        <clipPath id="wordmark-mask">
          <rect x="0" y="27" width="236" height="95" />
        </clipPath>
      </defs>
      <g clipPath="url(#wordmark-mask)">
        {WORDMARK_LETTERS.map((d, index) => (
          <m.path
            key={index}
            d={d}
            initial={{ y: 96 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 + index * 0.05 }}
          />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotionSafe();
  const heroRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress: leaving } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Measured in the browser; sensible desktop defaults until then.
  const heroHeight = useMotionValue(900);
  const dockDistance = useMotionValue(0);
  const dockedScale = useMotionValue(1);

  useIsoLayoutEffect(() => {
    function measure() {
      const hero = heroRef.current;
      const mark = markRef.current;
      if (!hero || !mark) return;
      // The h1 is fixed and its own box ignores the child's transform, so it
      // always reports the wordmark's resting size and position.
      const box = mark.getBoundingClientRect();
      const restingCentre = box.top + box.height / 2;

      const root = getComputedStyle(document.documentElement);
      const navCentre =
        (parseFloat(root.getPropertyValue("--nav-h")) * parseFloat(root.fontSize)) / 2;

      heroHeight.set(hero.offsetHeight);
      dockDistance.set(navCentre - restingCentre);
      dockedScale.set(Math.min(1, DOCKED_WIDTH / box.width));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced]);

  // 02 — the wordmark docks into the nav over the first 70% of the hero.
  const dockProgress = useTransform(() =>
    Math.min(1, Math.max(0, scrollY.get() / (0.7 * heroHeight.get()))),
  );
  const markY = useTransform(() => dockProgress.get() * dockDistance.get());
  const markScale = useTransform(
    () => 1 + dockProgress.get() * (dockedScale.get() - 1),
  );
  // The nav turns Ivory as the hero leaves (fully at 90%).
  const navBackground = useTransform(() => {
    const h = heroHeight.get();
    return Math.min(1, Math.max(0, (scrollY.get() - 0.82 * h) / (0.08 * h)));
  });

  // 03 — the house drifts down slower than the page.
  const imageY = useTransform(leaving, [0, 1], ["0%", "15%"]);

  function goToList(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("list");
    const input = document.getElementById("email") as HTMLInputElement | null;
    if (!target) return;
    event.preventDefault();
    scrollToElement(target, () => input?.focus({ preventScroll: true }));
  }

  // Starts at a near-invisible 0.001 rather than 0: the hero photo fills the
  // viewport, so browsers skip it as the "largest paint" and would otherwise
  // time the page by these small labels finishing their 1.2s-delayed fade.
  const fadeIn = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { duration: 1, ease: EASE, delay: 1.2 },
  };

  return (
    <>
      {/* NAV — Ink over the hero; Ivory band once the hero has gone */}
      <m.header
        className="gutter fixed inset-x-0 top-0 z-40 flex h-(--nav-h) items-center justify-between pt-[env(safe-area-inset-top)] text-ink"
        {...fadeIn}
      >
        <m.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ivory"
          style={{ opacity: navBackground }}
        />
        <p className="type-small hidden md:block">Collection 01</p>
        {/* Reduced motion: no docking, so the small wordmark simply fades in */}
        {reduced && (
          <m.a
            href="#top"
            aria-label="cazlae, back to top"
            className="absolute left-1/2 -translate-x-1/2"
            style={{ opacity: navBackground }}
          >
            <Wordmark className="h-6 w-auto" />
          </m.a>
        )}
        <a
          href="#list"
          onClick={goToList}
          className="type-small link-under ml-auto"
        >
          <RollText>Join the list</RollText>
        </a>
      </m.header>

      <section
        id="top"
        ref={heroRef}
        className="relative h-svh min-h-[34rem] overflow-hidden bg-stone"
      >
        <m.div className="absolute inset-0" style={reduced ? undefined : { y: imageY }}>
          <m.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <HeroPicture />
          </m.div>
        </m.div>

        {/* WORDMARK — fixed so it can glide up and dock in the nav centre */}
        <h1
          ref={markRef}
          className={`${
            reduced ? "absolute" : "fixed"
          } pointer-events-none left-1/2 top-[21svh] z-50 -translate-x-1/2 -translate-y-1/2 text-ink md:top-[24.5svh]`}
        >
          <m.div
            className="origin-center will-change-transform"
            style={reduced ? undefined : { y: markY, scale: markScale }}
          >
            <RisingWordmark className="wordmark-hero h-auto" />
          </m.div>
        </h1>

        {/* BOTTOM BAR */}
        <m.div
          className="gutter type-fine absolute inset-x-0 bottom-0 flex justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))] text-ink md:pb-7"
          {...fadeIn}
        >
          <p>
            <span className="md:hidden">Collection 01 — in progress</span>
            <span className="hidden md:inline">The first collection is in progress</span>
          </p>
          <p aria-hidden="true">Scroll</p>
        </m.div>
      </section>
    </>
  );
}
