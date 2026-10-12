"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import windowImage from "../../public/waitlist/window.jpg";
import linenImage from "../../public/waitlist/linen.jpg";
import { EASE, useReducedMotionSafe } from "./motion";

/** One room: opens from a thin vertical line, then drifts inside its frame. */
function Room({
  src,
  alt,
  y,
  reduced,
}: {
  src: StaticImageData;
  alt: string;
  y: MotionValue<string>;
  reduced: boolean;
}) {
  // The outer frame watches the viewport: a fully clipped element can't be
  // observed itself.
  return (
    <m.div
      className="relative aspect-[4/5]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      <m.div
        className="absolute inset-0 overflow-hidden bg-stone"
        variants={
          reduced
            ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
            : {
                hidden: { clipPath: "inset(0% 50% 0% 50%)" },
                shown: { clipPath: "inset(0% 0% 0% 0%)" },
              }
        }
        transition={{ duration: reduced ? 0.6 : 1.4, ease: EASE }}
      >
        {/* 20% taller than the frame, so the drift never shows an edge */}
        <m.div
          className="absolute inset-x-0 -top-[10%] h-[120%]"
          style={reduced ? undefined : { y }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </m.div>
      </m.div>
    </m.div>
  );
}

// 05 — two images, full bleed, no text. Stacked on mobile.
export default function Diptych() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-7.8%", "7.8%"]);

  return (
    <section ref={ref} className="grid md:grid-cols-2">
      <Room
        src={windowImage}
        alt="Morning light from a tall sash window falling across bare floorboards"
        y={leftY}
        reduced={reduced}
      />
      <Room
        src={linenImage}
        alt="Folded ivory linen and a green wool blanket on a rush-seat chair by a window"
        y={rightY}
        reduced={reduced}
      />
    </section>
  );
}
