"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import heroLake from "../../public/hero-lake.webp";
import { EASE } from "./motion";

// Text rises out of a clipped line, one element after another.
function Rise({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className ?? ""}`}>
      <m.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The image drifts down more slowly than the page; the text fades as it leaves.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={ref}
      className="gutter relative flex min-h-[max(100svh,40rem)] flex-col justify-between overflow-hidden pt-24 pb-12 text-estate-green md:pt-32 md:pb-16"
    >
      {/* Anchored to the top so the sky the text sits in is never cropped away.
          TODO: drifting mist over the water. */}
      <m.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <m.div
          className="absolute inset-0 origin-top"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        >
          <Image
            src={heroLake}
            alt="Mist over a still lake at dawn, with pine forest on the far shore"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-top"
          />
        </m.div>
      </m.div>

      <m.div style={{ opacity: textOpacity, y: textY }}>
        <p className="type-label">
          <Rise delay={0.3}>Drop 01</Rise>
        </p>
        <h1 className="type-display mt-5">
          <Rise delay={0.4}>Made to outlast trends</Rise>
        </h1>
        <p className="type-body-l mt-5 text-ink">
          <Rise delay={0.55}>Everyday essentials, precisely cut.</Rise>
        </p>
      </m.div>

      <m.a
        href="#waitlist"
        className="type-button inline-flex h-[54px] items-center self-center bg-estate-green px-8 text-ivory transition-colors duration-200 hover:bg-ink md:self-start"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
      >
        Join the waitlist
      </m.a>
    </section>
  );
}
