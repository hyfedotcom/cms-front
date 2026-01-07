import { PropsData } from "src/lib/types/sections/props";
import { Card } from "./Card";
import { Content } from "src/components/ui/Content/Content";

export function Props({ data }: { data: PropsData }) {
  const { card, sub_heading, content, heading, cta } = data;

  function getCardStyles(index: number) {
    const h = 160;
    const s = 30;
    const l = 95 - index * 3;

    // базовый цвет
    const base = `${h} ${s}% ${l}%`;

    // стопы
    const color0 = `hsl(${base} / 0)`; // центр прозрачный
    const color05 = `hsl(${base} / 0.5)`; // полупрозрачный на 39%
    const color1 = `hsl(${base} / 1)`; // полностью видимый на 100%

    const gradient = `radial-gradient(circle, ${color0} 0%, ${color05} 50%, ${color1} 65%)`;

    return { color: `hsl(${base})`, gradient };
  }

  return (
    <section className="w-full bg-white  z-3 relative">
      <div className="container !px-0 md:!px-10">
        <Content
          classContainer="mt-10 md:mb-15 items-center flex justify-center flex-col text-center"
          classH="h2-default text-balance"
          classP="text-balance"
          content={content}
          cta={cta}
          heading={heading}
          sub_heading={sub_heading}
        />

        {card && card.length > 0 && (
          <div className="space-y-10">
            {card.map((card, index) => (
              <Card
                data={card}
                key={index}
                styles={getCardStyles(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
