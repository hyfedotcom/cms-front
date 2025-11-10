import { AnimatedText } from "src/components/Animation/AnimatedText";
import { Paragraph } from "src/lib/types/ui/content";
import type { Button as ButtonType } from "src/lib/types/ui/button";
import { SubTitle } from "../Subtitle/SubTitle";
import { Button } from "../Button/Button";
import type { CSSProperties } from "react";

type Props = {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: ButtonType[];
  classContainer?: string;
  classP?: string;
  classH?: string;
  style?: CSSProperties 
};

export function Content({
  heading,
  sub_heading,
  content,
  cta,
  classContainer,
  classP,
  classH,
  style,
}: Props) {
  return (
    <AnimatedText className={` ${classContainer}`} style={style}>
      {sub_heading && <SubTitle label={sub_heading} />}
      {heading && (
        <h2
          className={`${
            heading.length <= 55 ? "h2-large" : "h2-default"
          } ${classH}`}
        >
          {heading}
        </h2>
      )}
      {content?.length != 0 && (
        <div className="space-y-4 mt-6">
          {content?.map((c, i) => (
            <p key={i} className={`${classP}`}>
              {c.paragraph}
            </p>
          ))}
        </div>
      )}
      {cta?.length != 0 && (
        <div className="flex flex-wrap gap-5 pt-10">
          {cta?.map((c, i) => (
            <Button key={i} data={c} />
          ))}
        </div>
      )}
    </AnimatedText>
  );
}
