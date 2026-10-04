"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";

// One slow ease-out for everything, so the page moves as a single piece.
export const EASE = [0.22, 1, 0.36, 1] as const;

// reducedMotion="user": visitors with reduced motion get no movement at all,
// only a plain fade.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "h2" | "p";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** A hairline that draws itself from left to right. */
export function Line({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      className={`h-px origin-left bg-stone ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
