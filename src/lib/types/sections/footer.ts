export interface FooterLink {
  label: string;
  link: string;
}

export interface FooterColumn {
  heading?: string;
  nav_links?: FooterLink[];
}

export interface FooterData {
  columns?: FooterColumn[];
  policy_links?: PolicyLinks[];
  copyright?: string;
}

export interface PolicyLinks {
  label: string;
  link: string;
}
