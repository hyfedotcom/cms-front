import clsx from "clsx";
import Image from "next/image";
import { CardWorkFlow } from "src/lib/types/sections/workFlow";

export function Card({
  data,
  position,
}: {
  data: CardWorkFlow;
  position: { 0: string; 1: string };
}) {
  const { heading, media, sub_heading, paragraph } = data;

  return (
    <div className="group mb-auto">
      {media?.url && (
        <div className="relative w-full h-full  sm:max-w-[330px] max-h-[380px] bg-[#F7F7F9] rounded-[20px] overflow-hidden">
          <Image
            src={media.url}
            alt={media.alt ?? ""}
            width={media.width}
            height={media.height}
            loading="lazy"
            className="z-1 relative group-hover:scale-110 transform-scale duration-500  "
          ></Image>
          {/* SHAPES */}
          <div
            className={clsx(
              "absolute w-[380px] group-hover:left-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-500  z-0 h-[380px] bg-[radial-gradient(circle_at_center,_#00AD99,_#F0F0F0)] rounded-full blur-[60px] opacity-50",
              position[0]
            )}
          ></div>
          <div
            className={clsx(
              "absolute w-[380px] group-hover:left-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-500  z-0 h-[380px] bg-[radial-gradient(circle_at_center,_#00AD99,_#F0F0F0)] rounded-full blur-[60px] opacity-50",
              position[1]
            )}
          ></div>{" "}
        </div>
      )}
      <div className="mt-4 sm:max-w-[330px]">
        {sub_heading && (
          <p className="text-[16px] leading-5 text-gray-700 uppercase mb-1">
            {sub_heading}
          </p>
        )}
        {heading && (
          <h3
            className={`font-medium !text-[20px] body-large ${
              paragraph ? "mb-3" : "mb-0"
            }`}
          >
            {heading}
          </h3>
        )}
        {paragraph && <p>{paragraph}</p>}
      </div>
    </div>
  );
}
