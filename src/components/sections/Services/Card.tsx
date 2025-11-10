import Image from "next/image";
import { SubTitle } from "src/components/ui/Subtitle/SubTitle";
import { CardServices } from "src/lib/types/sections/services";

export function CardItem({ card }: { card: CardServices }) {
  const { media, heading, paragraph, sub_heading } = card;
  return (
    <div
      id={heading}
      className="relative max-w-[1074px] w-full min-h-[500px] md:min-h-auto md:h-[400px] p-5 md:p-10 bg-gray-100  flex items-center justify-center rounded-[20px] overflow-hidden"
    >
      <div className="z-3 max-w-[600px] space-y-4 mr-auto mt-auto">
        {sub_heading && <SubTitle label={sub_heading} />}
        {heading && (
          <h3 className="h3-default text-balance text-white font-semibold">{heading}</h3>
        )}
        {paragraph && (
          <p className="text-white text-balance font-semibold body-medium">{paragraph}</p>
        )}
      </div>

      {media && (
        <Image
          src={media?.url}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          className="z-1 absolute inset-0 w-full h-full object-cover"
        ></Image>
      )}
      <div className="z-2 absolute inset-0 w-full h-full object-cover bg-gradient-to-t md:bg-gradient-to-r from-[#0D4F47]/100 md:from-[#0D4F47]/80 md:via-[#0D4F47]/70 to-transparent"></div>
    </div>
  );
}
