"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// One Lenis instance for the page, so links can hand it a scroll target.
let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

// Smooth, slightly weighted wheel and trackpad scrolling (lerp 0.1). Touch
// stays native, and visitors with reduced motion keep the browser's scroll.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}

/** Scrolls to an element (smoothly when Lenis is running), then runs `done`. */
export function scrollToElement(target: HTMLElement, done?: () => void) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, onComplete: () => done?.() });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  done?.();
}
