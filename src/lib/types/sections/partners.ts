import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface PartnersData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  logo: Media[];
}
