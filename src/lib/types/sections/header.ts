import { Button } from "../ui/button";

export type LinkType = "anchor" | "external" | "internal";

export interface HeaderLink {
  label: string;
  link: string;
}

export interface HeaderData {
  nav_links: HeaderLink[];
  cta?: Button;
}
