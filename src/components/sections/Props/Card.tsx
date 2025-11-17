import Image from "next/image";
import { CardProps } from "src/lib/types/sections/props";

type CardStyles = { color: string; gradient: string };

export function Card({
  data,
  styles,
}: {
  data: CardProps;
  styles: CardStyles;
}) {
  const { heading, media, sub_heading, paragraph } = data;
  const { color } = styles;

  return (
    <div
      className="sticky top-12 md:top-25 flex flex-col md:flex-row justify-end w-full h-auto lg:h-[580px] rounded-[20px]"
      style={{ backgroundColor: color }}
    >
      <div className="w-full md:w-1/2 px-5 md:px-10 py-10">
        {sub_heading && (
          <p className="max-[768px]:mb-1 max-[768px]:!text-[14px] font-medium! text-gray-600">
            {sub_heading}
          </p>
        )}
        <div className="space-y-5  md:pt-[180px]">
          {heading && <h3 className="h3-default font-medium">{heading}</h3>}
          {paragraph && <p>{paragraph}</p>}
        </div>
      </div>

      <div className="w-full md:w-1/2 relative overflow-hidden">
        {media?.url && (
          <Image
            src={media.url}
            alt={media.alt ?? "seo"}
            width={media.width}
            height={media.height}
            loading="lazy"
            className="w-full  object-cover rounded-[20px] min-h-[450px] md:h-full z-0"
          />
        )}
        <div className="absolute inset-0 translate-x-[15%] scale-150 rounded-[20px] z-10" />
      </div>
    </div>
  );
}
