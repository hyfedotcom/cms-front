import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface CardWorkFlow {
  heading: string;
  sub_heading: string;
  paragraph: string;
  media?: Media;
}
export interface WorkFlowData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  card?: CardWorkFlow[];
}
