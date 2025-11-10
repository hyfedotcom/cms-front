import { HeroData } from "../types/sections/hero";
import { ApiClient } from "./client";
import { WorkFlowData } from "../types/sections/workFlow";
import { PartnersData } from "../types/sections/partners";
import { PropsData } from "../types/sections/props";
import { ServicesData } from "../types/sections/services";
import { HowItWorksData } from "../types/sections/howItWorks";
import { TestimonialsData } from "../types/sections/testimonials";
import { SolutionsData } from "../types/sections/solutions";
import { CtaSectionData } from "../types/sections/ctaSection";
import {
  assetsUrl,
  normalizeCTA,
  normalizeImage,
  normalizeVideo,
} from "./utils";
import { Media } from "../types/ui/media";
import { Seo } from "../types/setting/seo";
import { GalleryData } from "../types/sections/gallery";

export interface PageAttrs {
  id: number;
  title: string;
  slug: string;
  dynamic_zone: DynamicZone[];
  seo?: Seo;
}

export interface StrapiResponse<T> {
  data: T[];
}

export interface HeroRaw extends HeroData {
  __component: "cms.section-hero";
  admin_label?: string;
  key?: string;
}

export interface WorkflowRaw extends WorkFlowData {
  __component: "cms.section-workflow";
}

export interface PartnersRaw extends PartnersData {
  __component: "global.section-partners";
}

export interface PropsRaw extends PropsData {
  __component: "global.section-props";
}

export interface ServicesRaw extends ServicesData {
  __component: "global.section-cards";
}

export interface HowItWorksRaw extends HowItWorksData {
  __component: "global.section-accordion";
}

export interface TestimonialRaw extends TestimonialsData {
  __component: "global.section-testimonial";
}

export interface SolutionsRaw extends SolutionsData {
  __component: "global.section-links";
}

export interface CtaSectionRaw extends CtaSectionData {
  __component: "global.section-cta";
}

export interface GalleryRaw extends GalleryData {
  __component: "global.section-gallery";
}

export type DynamicZone =
  | HeroRaw
  | WorkflowRaw
  | PartnersRaw
  | PropsRaw
  | ServicesRaw
  | HowItWorksRaw
  | TestimonialRaw
  | SolutionsRaw
  | CtaSectionRaw
  | GalleryRaw;

export class GetHomePages {
  private client = new ApiClient();
  private siteSlug: string;
  private pageSlug: string;
  private preview: boolean;

  private pagePromise?: Promise<PageAttrs>;

  normalizeCTA = normalizeCTA;
  assetsUrl = assetsUrl;
  normalizeImage = normalizeImage;
  normalizeVideo = normalizeVideo;

  constructor(siteSlug: string, pageSlug: string, preview: boolean = false) {
    this.siteSlug = siteSlug;
    this.pageSlug = pageSlug;
    this.preview = preview;
  }

  async fetch() {
    const POPULATE_BY_UID: Record<string, string[]> = {
      "cms.section-hero": ["cta", "content"],
      "cms.section-workflow": ["content", "cta", "card"],
      "global.section-partners": ["cta", "logo", "content"],
      "global.section-props": ["content", "cta", "card"],
      "global.section-accordion": ["card", "content", "cta"],
      "global.section-testimonial": ["cta", "content", "testimonials"],
      "global.section-links": ["cta", "content", "card"],
      "global.section-cta": ["content", "cta"],
      "global.section-gallery": ["media"],
    };

    const buildPopulateParams = (map: Record<string, string[]>) =>
      Object.entries(map).reduce<Record<string, string>>((acc, [uid, keys]) => {
        keys.forEach((k) => {
          acc[`populate[dynamic_zone][on][${uid}][populate][${k}][populate]`] =
            "*";
        });
        return acc;
      }, {});

    const params = {
      "filters[site][slug][$eq]": this.siteSlug,
      "filters[slug][$eq]": this.pageSlug,
      "populate[site]": "true",
      status: this.preview ? "status=draft" : "status=published",
      "populate[seo][populate]": "*",
      ...buildPopulateParams(POPULATE_BY_UID),
    };

    if (!this.pagePromise) {
      this.pagePromise = (async () => {
        const res = await this.client.get<StrapiResponse<PageAttrs>>(
          "/api/pages",
          params,
          {
            tag: `page-${this.siteSlug}/${this.pageSlug}`,
            preview: this.preview,
          }
        );
        return res.data[0];
      })();
    }
    return this.pagePromise;
  }

  async getHero(): Promise<HeroData> {
    const data = await this.fetch();
    const hero = data.dynamic_zone.find(
      (h) => h.__component === "cms.section-hero"
    );

    if (!hero) {
      return { content: [] }; // дефолт, чтобы не упасть
    }

    return {
      heading: hero.heading,
      sub_heading: hero.sub_heading,
      content:
        hero.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: hero.cta ? normalizeCTA(hero.cta) : undefined,
      media_mobile: {
        placeholder: {
          url: "/video/hero-mobile-preview.png",
          width: 1080,
          height: 1920,
        },
        video: {
          url: "/video/hero-mobile-new.mp4",
          width: 1080,
          height: 1920,
        },
      },
      media_pc: {
        placeholder: {
          url: "/video/hero-pc-preview.png",
          width: 1080,
          height: 1920,
        },
        video: {
          url: "/video/hero-pc-new.mp4",
          width: 1080,
          height: 1920,
        },
      },
    };
  }

  async getWorkflow(): Promise<WorkFlowData> {
    const data = this.fetch();
    const worflow = (await data).dynamic_zone.find(
      (w) => w.__component === "cms.section-workflow"
    );

    if (!worflow) {
      return { content: [] }; // дефолт, чтобы не упасть
    }

    return {
      heading: worflow?.heading,
      sub_heading: worflow?.sub_heading,
      content:
        worflow?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: worflow?.cta && this.normalizeCTA(worflow?.cta),
      card:
        worflow?.card?.map((c) => ({
          sub_heading: c.sub_heading,
          heading: c.heading,
          media: c.media?.url ? normalizeImage(c.media) : undefined,
          paragraph: c.paragraph,
        })) ?? [],
    };
  }

  async getPartners(): Promise<PartnersData> {
    const data = await this.fetch();
    const partners = data.dynamic_zone.find(
      (p) => p.__component === "global.section-partners"
    );

    return {
      heading: partners?.heading,
      sub_heading: partners?.sub_heading,
      content:
        partners?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: partners?.cta && normalizeCTA(partners?.cta),
      logo:
        partners?.logo
          .map((l) => normalizeImage(l))
          .filter((img): img is Media => Boolean(img)) ?? [],
    };
  }

  async getProps(): Promise<PropsData> {
    const data = await this.fetch();
    const props = data.dynamic_zone.find(
      (p): p is PropsRaw =>
        p.__component === "global.section-props" && p.admin_label === "props"
    );

    return {
      admin_label: props?.admin_label,
      heading: props?.heading,
      sub_heading: props?.sub_heading,
      cta: props?.cta && normalizeCTA(props.cta),
      content: props?.content?.map((c) => ({ paragraph: c.paragraph })) ?? [],
      card:
        props?.card.map((c) => ({
          heading: c.heading,
          paragraph: c.paragraph,
          sub_heading: c.sub_heading,
          media:
            c.media?.url && c.media?.width && c.media?.height
              ? normalizeImage(c.media)
              : undefined,
        })) ?? [],
    };
  }

  async getServices(): Promise<ServicesData> {
    const data = await this.fetch();
    const services = data.dynamic_zone.find(
      (s): s is ServicesRaw =>
        s.__component === "global.section-props" && s.admin_label === "services"
    );

    return {
      heading: services?.heading,
      sub_heading: services?.sub_heading,

      content:
        services?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: services?.cta && normalizeCTA(services.cta),
      card: services?.card?.map((c) => ({
        heading: c.heading,
        paragraph: c.paragraph,
        media: c.media?.url ? normalizeImage(c.media) : undefined,
        icon: c.icon?.url ? normalizeImage(c.icon) : undefined,
      })),
    };
  }

  async getHowItWorks(): Promise<HowItWorksData> {
    const data = await this.fetch();
    const howItWorks = data.dynamic_zone.find(
      (h) => h.__component === "global.section-accordion"
    );

    return {
      heading: howItWorks?.heading,
      sub_heading: howItWorks?.sub_heading,
      content:
        howItWorks?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: howItWorks?.cta?.map && normalizeCTA(howItWorks.cta),
      card: howItWorks?.card?.map((c) => ({
        heading: c.heading,
        paragraph: c.paragraph,
        media: c.media?.url ? normalizeImage(c.media) : undefined,
        icon: c.icon?.url ? normalizeImage(c.icon) : undefined,
      })),
    };
  }

  async getTestimonials(): Promise<TestimonialsData> {
    const data = await this.fetch();
    const testimonails = data.dynamic_zone.find(
      (t) => t.__component === "global.section-testimonial"
    );

    return {
      heading: testimonails?.heading,
      sub_heading: testimonails?.sub_heading,
      cta: testimonails?.cta && normalizeCTA(testimonails.cta),
      content:
        testimonails?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      testimonials:
        testimonails?.testimonials?.map((t) => ({
          name: t.name,
          role: t.role,
          avatar: t.avatar?.url ? normalizeImage(t.avatar) : undefined,
          paragraph: t.paragraph,
          rating: t.rating,
        })) ?? [],
    };
  }

  async getGallery(): Promise<GalleryData> {
    const data = await this.fetch();
    const gallery = data.dynamic_zone.find(
      (e) => e.__component === "global.section-gallery"
    );

    return {
      media:
        gallery?.media
          .map((e) => normalizeImage(e))
          .filter((img): img is Media => Boolean(img)) ?? [],
    };
  }

  async getSolutions(): Promise<SolutionsData> {
    const data = await this.fetch();
    const solutions = data.dynamic_zone.find(
      (s) => s.__component === "global.section-links"
    );

    return {
      heading: solutions?.heading,
      sub_heading: solutions?.sub_heading,
      content:
        solutions?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      cta: solutions?.cta ? normalizeCTA(solutions.cta) : undefined,
      card: solutions?.card?.map((c) => ({
        heading: c.heading,
        paragraph: c.paragraph,
        link: c.link,
        gradient_start: c.gradient_start ?? "",
        gradient_end: c.gradient_end ?? "",
        media: c.media ? normalizeImage(c.media) : undefined,
      })),
    };
  }

  async getCta(): Promise<CtaSectionData> {
    const data = await this.fetch();
    const cta = data.dynamic_zone.find(
      (c) => c.__component === "global.section-cta"
    );

    return {
      heading: cta?.heading,
      sub_heading: cta?.sub_heading,
      content:
        cta?.content?.map((c) => ({
          paragraph: c.paragraph,
        })) ?? [],
      video_pc: {
        placeholder: {
          url: "/video/cta-pc-preview.png",
          width: 1080,
          height: 1920,
        },
        video: {
          url: "/video/pc-cta-3mb.mp4",
          width: 1080,
          height: 1920,
        },
      },
      video_mobile: {
        placeholder: {
          url: "/video/cta-mobile-preview.png",
          width: 1080,
          height: 1920,
        },
        video: {
          url: "/video/mobile-cta-1mb.mp4",
          width: 1080,
          height: 1920,
        },
      },
      cta: cta?.cta && normalizeCTA(cta.cta),
    };
  }

  async geSEO(): Promise<Seo> {
    const data = await this.fetch();
    const seo = data?.seo;

    return {
      is_indexable: seo?.is_indexable ?? false,
      meta_title: seo?.meta_title,
      meta_image: seo?.meta_image ? normalizeImage(seo.meta_image) : undefined,
      meta_description: seo?.meta_description,
      meta_robots: seo?.meta_robots,
      meta_viewport: seo?.meta_viewport,
      canonical_URL: seo?.canonical_URL,
      keywords: seo?.keywords,
      structured_data: seo?.structured_data,
    };
  }
}
