import { Media } from "./media";

export interface CardLink {
  title: string;
  text: string;
  link: string;
  media: Media;
  gradient: {
    colorStart: string;
    colorEnd: string;
  };
}

