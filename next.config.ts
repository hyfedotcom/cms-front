import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // compiler: {
  //   removeConsole:
  //     process.env.NODE_ENV === "production"
  //       ? { exclude: ["error", "warn"] }
  //       : false,
  // },

  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.strapiapp.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return [];

    return [
      // Static assets: пусть живут долго
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Pages (HTML): браузер не кеширует, CDN кеширует
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=300, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
