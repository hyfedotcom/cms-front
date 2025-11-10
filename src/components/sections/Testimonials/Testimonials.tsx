import { TestimonialsData } from "src/lib/types/sections/testimonials";
import { CardsWrapper } from "./CardsWrapper";
import { Content } from "src/components/ui/Content/Content";

export function Testimonials({ data }: { data: TestimonialsData }) {
  const { testimonials, cta, sub_heading, heading, content } = data;
  return (
    <section id="testimonials" className="bg-gray-50 overflow-hidden  z-300 relative">
      <div className="container !px-0 md:!px-10 space-y-10">
        <Content
          classContainer="px-4 md:px-0"
          classH="text-balance"
          classP="text-balance"
          content={content}
          cta={cta}
          heading={heading}
          sub_heading={sub_heading}
        />

        {testimonials && testimonials.length > 0 && (
          <CardsWrapper data={testimonials} />
        )}
      </div>
    </section>
  );
}
