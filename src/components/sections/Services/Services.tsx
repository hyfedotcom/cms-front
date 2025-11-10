import { ServicesData } from "src/lib/types/sections/services";
import CardsWrapper from "./CardsWrapper";
import { Content } from "src/components/ui/Content/Content";

export function Services({ data }: { data: ServicesData }) {
  const { card, heading, sub_heading, content, cta } = data;
  return (
    <section id="services" className=" bg-white w-full  z-100 relative">
      <div className="container !py-0 md:!pt-[140px] !pt-[100px] space-y-6 md:space-y-20 ">
        <Content
          classContainer="ml-auto min-[1120px]:w-[1074px] "
          classH="text-balance"
          classP="text-balance"
          content={content}
          cta={cta}
          heading={heading}
          sub_heading={sub_heading}
        />
        {card && card.length > 0 && <CardsWrapper card={card} />}
      </div>
    </section>
  );
}
