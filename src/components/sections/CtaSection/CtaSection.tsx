"use client";

import { motion, useScroll, useTransform } from "../../../lib/motion";
import { useRef } from "react";
import { AnimatedText } from "src/components/Animation/AnimatedText";
import { Button } from "src/components/ui/Button/Button";
import { SubTitle } from "src/components/ui/Subtitle/SubTitle";
import { Video } from "src/components/Video/Video";
import { useScreenSize } from "src/hooks/useScreenSize";
import { CtaSectionData } from "src/lib/types/sections/ctaSection";

export function CtaSection({ data }: { data: CtaSectionData }) {
  const { content, cta, heading, sub_heading, video_mobile, video_pc } = data;
  const { width } = useScreenSize();

  const refContainer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start start", "end end"],
  });

  const videoWitdh = useTransform(
    scrollYProgress,
    [0, 0.7],
    width >= 768 ? ["60%", "100%"] : ["100%", "100%"]
  );
  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.7],
    width >= 768 ? ["60vh", "100vh"] : ["100vh", "100vh"]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7],
    width >= 768 ? ["90%", "100%"] : ["100%", "100%"]
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.7],
    width >= 768 ? ["50px", "0px"] : ["0px", "0px"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.4, 0.7],
    width >= 768 ? ["0%", "100%"] : ["100%", "100%"]
  );

  return (
    <section
      ref={refContainer}
      className="relative w-full md:h-[350vh] bg-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            width: videoWitdh,
            height: videoHeight,
            scale: scale,
            borderRadius: radius,
          }}
        >
          <div className="absolute inset-0 z-11 bg-gradient-to-b from-[#184242]/60 to-[#184242]/60"></div>

          <AnimatedText className="max-w-[750px] px-4 mx-auto text-center space-y-4 md:space-y-6 flex flex-col items-center justify-center h-full relative z-100">
            {sub_heading && (
              <motion.div
                style={{ opacity: opacity }}
                className="body-large text-white text-balance"
              >
                <SubTitle label={sub_heading} />
              </motion.div>
            )}
            {heading && (
              <motion.h2
                style={{ opacity: opacity }}
                className="h2-large text-white text-balance !font-semibold"
              >
                {heading}
              </motion.h2>
            )}

            {content?.length != 0 && (
              <motion.div className="space-y-4" style={{ opacity: opacity }}>
                {content?.map((c, i) => (
                  <p
                    key={i}
                    className="body-large text-white text-balance font-semibold"
                  >
                    {c.paragraph}
                  </p>
                ))}
              </motion.div>
            )}
            {cta && (
              <motion.div
                style={{ opacity: opacity }}
                className="space-x-5 mt-3"
              >
                {cta.map((c, i) => (
                  <Button key={i} data={c} />
                ))}
              </motion.div>
            )}
          </AnimatedText>
          <div className="absolute inset-0">
            {video_pc?.video && video_mobile?.video && (
              <Video video={width < 768 ? video_mobile : video_pc} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
