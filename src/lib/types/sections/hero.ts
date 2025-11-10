import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { MediaData } from "../ui/media";

export interface HeroData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  media_pc?: MediaData;
  media_mobile?: MediaData;
}

