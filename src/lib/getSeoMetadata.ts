import { Metadata } from "next";
import { Seo } from "./types/setting/seo";

export function getSeoMetadata(seo?: Seo): Metadata {
  if (!seo) return {};

  const {
    meta_title,
    meta_description,
    meta_image,
    canonical_URL,
    meta_robots,
    is_indexable
  } = seo;

  return {
    title: meta_title,
    description: meta_description,
    alternates: {
      canonical: canonical_URL || undefined,
    },
    openGraph: {
      title: meta_title,
      description: meta_description,
      images: meta_image?.url ? [{ url: meta_image.url }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
      images: meta_image?.url ? [meta_image.url] : undefined,
    },
    robots: {
      index: !!is_indexable,
      follow: meta_robots !== "nofollow",
    },
  };
}
