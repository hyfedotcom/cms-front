import { FooterData } from "../sections/footer";
import { GeneralSettingData } from "../sections/generalSettingData";
import { HeaderData } from "../sections/header";

export type SiteSettings = {
  header: HeaderData;
  footer: FooterData;
  general_setting: GeneralSettingData;
};

export interface PageAttrs {
  id: number;
  title: string;
  slug: string;
  data: GlobalData[];
}

export interface GlobalData {
  header: HeaderData;
  footer: FooterData;
  general_setting: GeneralSettingData;
}
