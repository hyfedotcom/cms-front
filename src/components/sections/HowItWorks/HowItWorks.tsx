import { HowItWorksData } from "src/lib/types/sections/howItWorks";
import { TabSlider } from "./TabSlider";
import { Content } from "src/components/ui/Content/Content";

export function HowItWorks({ data }: { data: HowItWorksData }) {
  const { card, heading, content, cta, sub_heading } = data;
  return (
    <section id="how-it-works" className="bg-white z-100 relative pt-[100px] md:pt-[140px]">
      <div className="container space-y-15">
        <Content
          classContainer="text-center max-w-[900px] mx-auto flex flex-col items-center"
          classH="text-balance"
          classP="text-balance"
          content={content}
          cta={cta}
          heading={heading}
          sub_heading={sub_heading}
        />
        {card && card.length > 0 && <TabSlider card={card} />}
      </div>
    </section>
  );
}
