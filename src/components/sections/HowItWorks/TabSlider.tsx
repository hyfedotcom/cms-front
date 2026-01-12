"use client";

import clsx from "clsx";
import { motion } from "../../../lib/motion";
import Image from "next/image";
import { useState } from "react";
import { howItWorksCard } from "src/lib/types/sections/howItWorks";

export function TabSlider({ card }: { card: howItWorksCard[] }) {
  const [activ, setActiv] = useState(0);

  return (
    <div className="flex gap-5">
      <div className="space-y-3 md:space-y-0 max-[768px]:w-full max-[1300px]:w-1/2">
        {card.length > 0 &&
          card.map((c, index) => (
            <div
              onClick={() => setActiv(index)}
              className={clsx(
                "group md:max-w-[586px] p-4 md:px-5 rounded-[28px] cursor-pointer transition-all duration-200",
                index === activ
                  ? "bg-[#D6F7F4] py-4 md:py-5 my-3"
                  : "bg-gray-50 md:bg-transparent hover:bg-gray-50 "
              )}
              key={index}
            >
              <div className="flex items-center gap-3 md:gap-5">
                <span
                  className={`w-13 min-w-13 h-13 min-h-13 transition-colors duration-200 ${
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
                </span>{" "}
                <h3 className="font-medium !text-[20px] md:!text-[24px] text-balance">
                  {c.heading}
                </h3>
              </div>
              <p
                className={clsx(
                  "min-lg:pl-[72px] overflow-hidden transition-all duration-600 ease-in-out",
                  index === activ
                    ? "opacity-100 max-h-40 mt-3 md:mt-0"
                    : "opacity-0 max-h-0"
                )}
              >
                {c.paragraph}
              </p>

              {c.media?.url && (
                <div
                  className={clsx(
                    "relative w-full h-[400px] rounded-[20px] overflow-hidden mt-5 md:hidden",
                    index === activ ? "block" : "hidden"
                  )}
                >
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
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
                </div>
              )}
            </div>
          ))}
      </div>
      {card.length > 0 && (
        <div className="hidden md:block w-full max-[1300px]:w-1/2 max-w-[820px] h-[440px] relative rounded-[20px] overflow-hidden">
          {card.map(
            (image, index) =>
              image.media?.url && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activ ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full"
                >
                  <Image
                    src={image.media?.url}
                    alt={image.media?.alt || ""}
                    fill
                    loading="lazy"
                    sizes=" 70vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              )
          )}
        </div>
      )}
    </div>
  );
}
