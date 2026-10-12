"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import hallImage from "../../public/waitlist/hall.jpg";
import EmailForm from "./email-form";
import { EASE, useReducedMotionSafe } from "./motion";

const stagger = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: EASE, delay: index * 0.12 },
});

// 06 — the list: hall image | Estate Green panel with the form.
export default function ListSection() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // The hall eases closer as the section fills the screen.
  const hallScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section ref={ref} className="grid md:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <m.div className="absolute inset-0" style={reduced ? undefined : { scale: hallScale }}>
          <Image
            src={hallImage}
            alt="A bare corridor leading to an open door, with a field beyond"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </m.div>
      </div>

      <div
        id="list"
        className="on-green flex scroll-mt-0 flex-col justify-center bg-estate-green px-6 pt-10 pb-[4.5rem] text-ivory md:px-24 md:py-24"
      >
        <div className="max-w-[33rem]">
          <m.p className="type-small text-ivory/75" {...stagger(0)}>
            The list
          </m.p>
          <m.h2 className="serif type-h2 mt-4 md:mt-6" {...stagger(1)}>
            Be the first to know.
          </m.h2>
          <m.p className="type-body mt-[1.125rem] md:mt-7" {...stagger(2)}>
            One letter when the first collection opens. Nothing else.
          </m.p>
          <m.div className="mt-7 md:mt-11" {...stagger(3)}>
            <EmailForm />
          </m.div>
        </div>
      </div>
    </section>
  );
}
