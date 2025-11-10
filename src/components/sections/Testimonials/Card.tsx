import Image from "next/image";
import { TestimonialCard } from "src/lib/types/sections/testimonials";

export function Card({ testimonial }: { testimonial: TestimonialCard }) {
  const { avatar, name, paragraph, role } = testimonial;
  return (
    <div className=" p-4 md:p-6 h-full w-full bg-white rounded-[20px] flex flex-col-reverse items-start justify-between gap-6">
      <div className="flex  gap-3">
        {avatar && (
          <Image
            src={avatar?.url || "/avatars/avatar.png"}
            alt={avatar?.alt ?? "avatar"}
            width={50}
            height={50}
            loading="lazy"
            className="rounded-full min-w-[50px] min-h-[50px]"
          />
        )}
        <div>
          {name && (
            <p className="body-large text-gray-700 font-medium line-clamp-1">
              {name}
            </p>
          )}
          {role && (
            <p className="body-small text-gray-500 line-clamp-1">{role}</p>
          )}
        </div>
        {/* {rating && (
          <div className="ml-auto">
            <RatingCircle value={rating} />
          </div>
        )} */}
      </div>
      <p className="text-[16px] md:text-[18px] italic ">&ldquo;{paragraph}&rdquo;</p>
    </div>
  );
}
