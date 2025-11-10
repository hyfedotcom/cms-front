import { Button } from "../ui/button";

import { Paragraph } from "../ui/content";
import { Media } from "../ui/media";

export interface howItWorksCard {
  heading?: string;
  sub_heading?: string;
  paragraph?: string;
  media?: Media;
  icon?: Media;
}

export interface HowItWorksData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  card?: howItWorksCard[];
}
