import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";
import { MediaData } from "../ui/media";

export interface CtaSectionData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  video_pc?: MediaData;
  video_mobile?: MediaData;
}
