import { ApiClient } from "./client";
import type { HeaderData } from "../types/sections/header";
import type { FooterData } from "../types/sections/footer";
import type { GeneralSettingData } from "../types/sections/generalSettingData";
import type { StrapiListResponse } from "../types/strapi/strapi";
import { normalizeCTA, normalizeImage } from "./utils";

export type SiteSettings = {
  header: HeaderData;
  footer: FooterData;
  general_setting: GeneralSettingData;
};

export class GetSiteSettings {
  constructor(private siteSlug: string, private client = new ApiClient()) {}

  private promise?: Promise<SiteSettings>;
  normalizeCTA = normalizeCTA;
  normalizeImage = normalizeImage;

  async fetch(): Promise<SiteSettings> {
    if (!this.promise) {
      const params = {
        "filters[site][slug][$eq]": this.siteSlug,
        "populate[header][populate]": "*",
        "populate[footer][populate][columns][populate][nav_links]": "*",
        "populate[footer][populate][policy_links][populate]": "*",
        "populate[general_setting][populate]": "*",
      };

      this.promise = (async () => {
        const res = await this.client.get<StrapiListResponse<SiteSettings>>(
          "/api/globals",
          params,
          { tag: `global-${this.siteSlug}` }
        );

        return res.data[0];
      })();
    }
    return this.promise;
  }

  // при необходимости — геттеры:
  async header(): Promise<HeaderData> {
    const data = await this.fetch();
    const header = data.header;

    return {
      nav_links: header?.nav_links,
      cta: header?.cta
        ? {
            ...header.cta,
          }
        : undefined,
    };
  }
  async footer(): Promise<FooterData> {
    const data = await this.fetch();
    const footer = data.footer;

    return {
      columns: footer?.columns
        ? footer.columns.map((c) => ({
            heading: c.heading,
            nav_links: c.nav_links ? [...c.nav_links] : [],
          }))
        : undefined,
      copyright: footer?.copyright,
      policy_links: footer?.policy_links ? [...footer.policy_links] : [],
    };
  }
  async settings(): Promise<GeneralSettingData> {
    const data = await this.fetch();
    const settings = data.general_setting;

    return {
      logo_header: settings?.logo_header?.url
        ? normalizeImage(settings.logo_header)
        : undefined,
      logo_footer: settings?.logo_footer?.url
        ? normalizeImage(settings.logo_footer)
        : undefined,
      social_media: settings?.social_media
        ? [...settings.social_media]
        : undefined,
    };
  }
}
