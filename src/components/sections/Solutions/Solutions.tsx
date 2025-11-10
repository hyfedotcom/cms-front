import { SolutionsData } from "src/lib/types/sections/solutions";
import { Card } from "./Card";
import { Content } from "src/components/ui/Content/Content";

export function Solutions({ data }: { data: SolutionsData }) {
  const { card, cta, content, heading, sub_heading } = data;

  return (
    <section id="our-solutions" className="bg-[#D6F5F3]  z-3 relative">
      <div className="container space-y-15">
        <Content
          content={content}
          classH="text-balance"
          classP="text-balance"
          cta={cta}
          heading={heading}
          sub_heading={sub_heading}
        />
        {card && card.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {card.map((c, index) => (
              <Card card={c} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
