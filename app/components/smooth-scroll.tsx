"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Eases wheel and trackpad scrolling. Touch scrolling stays native, and
// visitors with reduced motion keep the browser's normal scroll.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.2,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
