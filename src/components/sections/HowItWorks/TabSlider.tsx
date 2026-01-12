"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "../../../lib/motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { howItWorksCard } from "src/lib/types/sections/howItWorks";

export function TabSlider({ card }: { card: howItWorksCard[] }) {
  const [activ, setActiv] = useState(0);
  const active = card[activ];

  const nextCard = card.length ? card[(activ + 1) % card.length] : undefined;
  const prevCard = card.length
    ? card[(activ - 1 + card.length) % card.length]
    : undefined;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (card.length < 2) return;

    const urls = [nextCard?.media?.url, prevCard?.media?.url].filter(
      Boolean
    ) as string[];

    urls.forEach((url) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = url;
    });
  }, [nextCard, prevCard, card.length]);

  // const preload = (url: string) => {
  //   if (!url || url === "") return;
  //   const img = new window.Image();
  //   img.src = url;
  // };

  return (
    <div className="flex gap-5">
      <div className="space-y-3 md:space-y-0 max-[768px]:w-full max-[1300px]:w-1/2 ">
        {card.length > 0 &&
          card.map((c, index) => (
            <div
              key={index}
              onClick={() => setActiv(index)}
              // onMouseEnter={() => preload(c.media?.url || "")}
              className={clsx(
                "group md:max-w-[586px] p-4 md:px-5 rounded-[28px] cursor-pointer transition-all duration-400",
                index === activ
                  ? `bg-[#D6F7F4] py-4 md:py-5 ${activ === 0 ? "mb-3" : "my-3"}`
                  : "bg-gray-50 md:bg-transparent hover:bg-gray-50 "
              )}
            >
              <button type="button" className="cursor-pointer">
                <div className="flex items-center gap-3 md:gap-5">
                  <span
                    className={`w-13 min-w-13 h-13 min-h-13 transition-colors duration-400 ${
                      index === activ
                        ? "bg-white"
                        : "bg-white md:bg-gray-50 group-hover:bg-white"
                    } rounded-full flex items-center justify-center`}
                  >
                    <Image
                      src={c.icon?.url ?? "/icons/icon.svg"}
                      alt={c.icon?.alt ?? "icon"}
                      width={c.icon?.width}
                      height={c.icon?.height}
                      loading="lazy"
                    />
                  </span>
                  <h3 className="font-medium !text-[20px] md:!text-[24px] text-balance text-left">
                    {c.heading}
                  </h3>
                </div>
                <div
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    index === activ ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  aria-hidden={index !== activ}
                >
                  <div className="overflow-hidden">
                    <p className="min-lg:pl-[72px] mt-3 md:mt-0 text-left">
                      {c.paragraph}
                    </p>
                  </div>
                </div>
                {c.media?.url && activ === index && (
                  <span
                    className={clsx(
                      "relative w-full h-[400px] rounded-[20px] overflow-hidden mt-5 md:hidden",
                      index === activ ? "block" : "hidden"
                    )}
                  >
                    <motion.div
                      key={index}
                      initial={{ opacity: index === 0 ? 1 : 0 }}
                      animate={{ opacity: index === activ ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                      style={{ height: "100%" }}
                    >
                      <Image
                        src={c.media.url}
                        alt={c.media.alt || `Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes=" 90vw, 80vw"
                      />
                    </motion.div>
                  </span>
                )}
              </button>
            </div>
          ))}
      </div>

      <div className="hidden md:block w-full max-[1300px]:w-1/2 max-w-[820px] h-[440px] relative rounded-[20px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {active?.media?.url && (
            <motion.div
              key={active.media.url}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={active.media.url}
                alt={active.media.alt || ""}
                fill
                sizes="(min-width: 768px) 820px, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
