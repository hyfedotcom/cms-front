"use client";

import { motion } from "../../lib/motion";
import { container, item } from "./variants";
import type { CSSProperties } from "react";

export function AnimatedText({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      variants={container}
      initial=""
      whileInView=""
      viewport={{ once: true, amount: 0.4 }}
      className={` ${className}`}
      style={style}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  );
}
