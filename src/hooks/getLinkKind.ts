export type LinkKind = "external" | "internal" | "anchor";

export function getLinkKind(href: string): LinkKind {
  if (!href) return "internal";

  if (href.startsWith("#")) return "anchor";
  if (href.startsWith("/")) return "internal";
  if (href.startsWith("http://") || href.startsWith("https://"))
    return "external";

  return "external";
}
