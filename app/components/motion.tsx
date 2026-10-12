"use client";

import { useSyncExternalStore } from "react";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

// One slow ease-out for everything, so the page moves as a single piece.
export const EASE = [0.22, 1, 0.36, 1] as const;

// reducedMotion="user": with reduced motion, transform animations are dropped
// and only opacity fades remain. Scroll-linked motion is switched off in each
// component with useReducedMotionSafe().
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/**
 * Reduced-motion preference that is false during server rendering and the
 * first client render, so the hydrated markup always matches the server's.
 */
const noopSubscribe = () => () => {};

export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion();
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return hydrated && Boolean(prefersReduced);
}

type Tag = "div" | "p" | "h2" | "span";

/**
 * A line that rises out of a mask the first time it scrolls into view. The
 * outer element watches the viewport (the masked inner line starts clipped, so
 * it can't be observed itself).
 */
export function MaskLine({
  children,
  className,
  as = "h2",
  delay = 0,
  duration = 1.1,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  duration?: number;
}) {
  const Outer = m[as];
  return (
    <Outer
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* pb keeps descenders inside the mask */}
      <span className="block overflow-hidden pb-[0.08em]">
        <m.span
          className="block"
          variants={{ hidden: { y: "100%" }, shown: { y: "0%" } }}
          transition={{ duration, ease: EASE, delay }}
        >
          {children}
        </m.span>
      </span>
    </Outer>
  );
}

/** Fades and lifts into place the first time it scrolls into view. */
export function FadeUp({
  children,
  className,
  as = "div",
  delay = 0,
  y = 16,
  duration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}
