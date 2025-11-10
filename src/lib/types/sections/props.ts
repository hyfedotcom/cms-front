import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface CardProps {
  heading: string;
  sub_heading: string;
  paragraph: string;
  media?: Media;
}

export interface PropsData {
  admin_label?: string;
  sub_heading?: string;
  heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  card: CardProps[];
}
