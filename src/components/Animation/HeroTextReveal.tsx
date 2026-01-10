"use client";

import React, { Children, useEffect, useState } from "react";
import { motion } from "../../lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  safeLcp?: boolean; // по умолчанию true
  delayMs?: number; // задержка после первого paint
  staggerMs?: number; // шаг стаггера
  offsetY?: number; // насколько "подъезжает"
  fromOpacity?: number;
  scale?: number;
};

export function HeroTextReveal({
  children,
  className,
  style,
  safeLcp = true,
  delayMs = 0,
  staggerMs = 100,
  scale = 1.8,
}: Props) {
  const [go, setGo] = useState(!safeLcp);

  useEffect(() => {
    if (!safeLcp) return;

    // 1–2 кадра, чтобы браузер успел сделать первый paint (и LCP),
    // затем включаем анимацию.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (delayMs > 0) {
          const t = window.setTimeout(() => setGo(true), delayMs);
          return () => window.clearTimeout(t);
        }
        setGo(true);
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [safeLcp, delayMs]);

  const items = Children.toArray(children);

  return (
    <div className={className} style={style}>
      {items.map((child, idx) => (
        <motion.div
          key={idx}
          // ВАЖНО: элемент видим всегда, но пока go=false он чуть смещён
          initial={false}
          animate={
            go
              ? { scale: 1, filter: "blur(0px)" }
              : { scale: scale, filter: "blur(100px)" }
          }
          transition={
            go
              ? {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (idx * staggerMs) / 1000,
                }
              : undefined
          }
          style={{ willChange: go ? "transform" : undefined }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
