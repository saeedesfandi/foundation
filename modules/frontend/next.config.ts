import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withSerwistInit from "@serwist/next";

// === تنظیمات اصلی ===
const ENABLE_STATIC_EXPORT = process.env.EXPORT === "true"; // مثلاً: EXPORT=true npm run build

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // === تصاویر (Custom Loader) ===
  images: {
    loader: "custom",
    loaderFile: "./next-image-loader.js",
    unoptimized: true, // برای static export و custom loader
  },

  // === خروجی ===
  output: ENABLE_STATIC_EXPORT ? "export" : undefined,
  distDir: ENABLE_STATIC_EXPORT ? "build" : ".next",

  // === Rewrites (فقط در حالت سرور) ===
  async rewrites() {
    if (ENABLE_STATIC_EXPORT) return [];
    return [
      {
        source: "/cdn/:path*",
        destination: "https://shopgram.me/cdn/:path*",
      },
    ];
  },

  turbopack: {},
};

// === Serwist PWA (HOC) ===
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts", // مسیر فایل sw.ts
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

// export default withSerwist(nextConfig);
export default withNextIntl(nextConfig);
