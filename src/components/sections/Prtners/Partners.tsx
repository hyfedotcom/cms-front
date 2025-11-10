"use client";

import Image from "next/image";
import { motion, useAnimation } from "../../../lib/motion";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Content } from "src/components/ui/Content/Content";
import { PartnersData } from "src/lib/types/sections/partners";

export function Partners({ data }: { data: PartnersData }) {
  const { logo, content, heading, sub_heading, cta } = data;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const controls = useAnimation();

  useLayoutEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      const diff = contentWidth - containerWidth;
      setDistance(diff > 0 ? diff : 0);
    }
  }, [logo]);

  useEffect(() => {
    if (!distance) return;

    const loop = async () => {
      while (true) {
        await controls.start({
          x: -distance,
          transition: { duration: 25, ease: "linear" },
        });
        await controls.start({
          x: 0,
          transition: { duration: 25, ease: "linear" },
        });
      }
    };
    loop();
  }, [distance, controls]);

  return (
    <section className="bg-white overflow-hidden z-3 relative">
      <div className="pt-[140px] flex flex-col gap-10 md:gap-20">
        {(heading || sub_heading || cta || content) && (
          <div className="container !py-0 min-w-[277px]">
            <div className="">
              <Content
                classH="text-balance"
                content={content}
                cta={cta}
                heading={heading}
                sub_heading={sub_heading}
              />
            </div>
          </div>
        )}

        {/* Обёртка для горизонтального движения */}
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <motion.div
            ref={contentRef}
            className="grid items-center grid-flow-col auto-cols-max gap-10 md:gap-[200px]"
            animate={controls}
          >
            {logo?.length > 0 &&
              [...logo, ...logo].map((logo, index) => (
                <Image
                  key={index}
                  src={logo.url}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
      
                />
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
