"use client";

import { motion, useScroll, useTransform } from "../../lib/motion";
import { useRef } from "react";
import { useScreenSize } from "src/hooks/useScreenSize";

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { width } = useScreenSize();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 10%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const startY = width <= 768 ? 55 : 25;
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);

  return (
    <section
      ref={ref}
      className="
        relative z-20
        md:min-h-[10dvh]
        min-h-[100svh]
        -mt-[12vh] sm:-mt-[16vh]
      "
    >
      <motion.div
        style={{
          scale: width >= 768 ? scale : undefined,
          y,
        }}
        className="transform-gpu will-change-transform  h-full min-h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
