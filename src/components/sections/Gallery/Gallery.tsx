"use client";

import { container, item } from "src/components/Animation/variants";
import { motion } from "../../../lib/motion";

import Image from "next/image";
import { GalleryData } from "src/lib/types/sections/gallery";

const POSITION = [
  {
    cols: "col-span-2 md:col-span-1",
    rows: "row-span-3 md:row-span-1",
  },
  {
    cols: "col-span-2",
    rows: "row-span-4 md:row-span-2",
  },
  { cols: "col-span-1", rows: "row-span-3" },
  {
    cols: "col-span-1",
    rows: "row-span-5 md:row-span-1",
  },
  { cols: "col-span-1", rows: "row-span-2" },
  {
    cols: "col-span-2 md:col-span-1",
    rows: "row-span-2 md:row-span-1",
  },
  { cols: "col-span-1", rows: "row-span-1" },
  { cols: "col-span-1", rows: "row-span-1" },
  {
    cols: "col-span-2 md:col-span-1",
    rows: "row-span-1",
  },
];

export function Gallery({ data }: { data: GalleryData }) {
  const media = data?.media.slice(0, 9) ?? [];

  if (!media.length) return null;
  console.log(data.media);
  const images = media.map((ele, index) => {
    const pos = POSITION[index];
    return { src: ele.url, alt: ele.alt, ...pos };
  });
  return (
    <section className="bg-white relative px-4 md:px-10 py-[100px] md:py-[140px] z-100">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-5 grid-rows-7 md:grid-rows-3 gap-4 w-full  min-h-[900px] "
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`${img.cols} ${img.rows} relative overflow-hidden rounded-xl min-h-[200px]`}
          >
            <Image
              alt={img.alt}
              src={img.src}
              fill
              className="object-cover hover:scale-115 transition-scale duration-250"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              priority={i === 0}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
