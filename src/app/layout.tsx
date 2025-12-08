import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "src/components/Animation/LenisProvide";
import { Header } from "src/components/layouts/Header";
import { Footer } from "src/components/layouts/Footer/Footer";
import { GetSiteSettings } from "src/lib/api/GetGlobal";
import { GetHomePages } from "src/lib/api/getHome";
import { getSeoMetadata } from "src/lib/getSeoMetadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";
import {
  parseConsentFromCookieString,
  ANALYTICS_CONSENT_COOKIE,
  AnalyticsConsent,
} from "src/lib/cookies/cookies";
import { CookieBanner } from "src/components/cookie/CookieBanner";
import { AnalyticsLoader } from "src/components/analitics/AnalyticsLoader";
import { ConsentProvider } from "./context/ConsentContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const aoi = new GetHomePages("cough-monitor-suite", "home", false);
  const seo = await aoi.geSEO();
  
  return getSeoMetadata(seo);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const api = new GetSiteSettings("cough-monitor-suite");
  const header = await api.header();
  const settings = await api.settings();
  const footer = await api.footer();

  const cookiesStore = cookies();
  const raw = (await cookiesStore).get(ANALYTICS_CONSENT_COOKIE)?.value ?? null;
  const inittialConsent: AnalyticsConsent = parseConsentFromCookieString(
    raw ? `${ANALYTICS_CONSENT_COOKIE}=${raw}` : null
  );

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header data={header} settings={settings} />
        <ConsentProvider initialConsent={inittialConsent}>
          <LenisProvider>
            {" "}
            <CookieBanner />
            <AnalyticsLoader />
            {children}
          </LenisProvider>
        </ConsentProvider>

        <Footer data={footer} global={settings} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
