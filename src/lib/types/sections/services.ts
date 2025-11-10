import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface CardServices {
  heading: string;
  sub_heading?: string;
  paragraph: string;
  icon?: {
    url: string;
    alt: string;
  };
  media?: Media;
}

export interface ServicesData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  card?: CardServices[];
}
