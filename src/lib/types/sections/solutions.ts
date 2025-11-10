import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface CardLink {
  heading: string;
  paragraph: string;
  link: string;
  media?: Media;
  gradient_start: string;
  gradient_end: string;
}

export interface SolutionsData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  card?: CardLink[];
}
