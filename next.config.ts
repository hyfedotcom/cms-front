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
  },

  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        source: "/:path*",
        headers: isProd
          ? [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ]
          : [
              {
                key: "Cache-Control",
                value: "no-store",
              },
            ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
