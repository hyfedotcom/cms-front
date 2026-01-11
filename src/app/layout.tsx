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
import { CookieBanner } from "src/components/cookie/CookieBanner";
import { AnalyticsLoader } from "src/components/analitics/AnalyticsLoader";
import { ConsentProvider } from "./context/ConsentContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="consent-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var m = document.cookie.match(/(?:^|; )analytics_consent=([^;]+)/);
    var v = m && m[1];
    document.documentElement.dataset.consent =
      (v === 'granted' || v === 'denied') ? v : 'unset';
  } catch(e) {}
})();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header data={header} settings={settings} />
        <ConsentProvider>
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
