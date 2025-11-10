import { Media } from "../ui/media";

export type Target = "x" | "facebook" | "youtube" | "linkedin" | "insagram";

export interface SocialMedia {
  target: Target;
  link: string;
}

export interface GeneralSettingData {
  logo_header?: Media;
  logo_footer?: Media;
  social_media?: SocialMedia[];
}
