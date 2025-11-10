import { Button } from "../ui/button";
import { Paragraph } from "../ui/content";

export interface TestimonialCard {
  name?: string;
  role?: string;
  rating?: number;
  paragraph?: string;
  avatar?: {
    url?: string;
    alt?: string;
  };
}
export interface TestimonialsData {
  heading?: string;
  sub_heading?: string;
  content?: Paragraph[];
  cta?: Button[];
  testimonials?: TestimonialCard[];
}
