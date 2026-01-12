"use client";

import { motion, useScroll, useTransform } from "../../lib/motion";
import { useRef } from "react";

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 10%"],
  });

  // числа, не проценты — удобнее для calc()
  const w = useTransform(scrollYProgress, [0, 1], [92, 100]);
  const yM = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const yD = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section
      ref={ref}
      className="relative z-20 md:min-h-[10dvh] min-h-[100svh] -mt-[12vh] sm:-mt-[16vh]"
    >
      <motion.div
        // Framer умеет писать MotionValue в CSS variables
        style={
          {
            ["--w"]: w,
            ["--yM"]: yM,
            ["--yD"]: yD,
          } as React.CSSProperties
        }
        className="sectionWrap mx-auto h-full min-h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
