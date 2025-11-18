"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3GD8BYW5HK"
      />
      <Script
        id="ga-4"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3GD8BYW5HK', { anonymize_ip: true });
          `,
        }}
      />
    </>
  );
}
