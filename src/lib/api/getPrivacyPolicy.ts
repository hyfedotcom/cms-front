import { PrivacyPolicyData } from "../types/PrivacyPolicyData/PrivacyPolicy";
import { StrapiListResponse } from "../types/strapi/strapi";
import { ApiClient } from "./client";

export type PrivacyPolicy = {
  privacy_policy: PrivacyPolicyData;
  dynamic_zone: DynamicZone[];
};

export type DynamicZone = PrivacyPolicyRaw;

export interface PrivacyPolicyRaw extends PrivacyPolicyData {
  __component: "global.section-rich-text";
}

export class GetPrivacyPolicy {
  constructor(
    private siteSlug: string,
    private pageSlug: string,
    private client = new ApiClient()
  ) {}

  private promise?: Promise<PrivacyPolicy>;
  async fetch(): Promise<PrivacyPolicy> {
    if (!this.promise) {
      const params = {
        "filters[site][slug][$eq]": this.siteSlug,
        "filters[slug][$eq]": this.pageSlug,
        "populate[dynamic_zone][on][global.section-rich-text][populate]": "*",
      };

      this.promise = (async () => {
        const res = await this.client.get<StrapiListResponse<PrivacyPolicy>>(
          "/api/pages",
          params,
          { tag: `page-${this.siteSlug}/${this.pageSlug}` }
        );
        console.log(res.data[0]);
        return res.data[0];
      })();
    }

    return this.promise;
  }

  async privacyPolicy(): Promise<PrivacyPolicyData> {
    const data = await this.fetch();
    const privacy_policy = data.dynamic_zone.find(
      (p) => p.__component === "global.section-rich-text"
    );
    console.log(privacy_policy);
    return {
      heading: privacy_policy?.heading,
      content: privacy_policy?.content,
    };
  }
}
