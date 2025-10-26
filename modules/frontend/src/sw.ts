import { Serwist } from "serwist";
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "@serwist/precaching";
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from "serwist";
import { ExpirationPlugin } from "serwist";

// === Global Types ===
declare global {
  interface Window {
    __SW_MANIFEST: (PrecacheEntry | string)[];
  }
}

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[];
};

// === Serwist Instance ===
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  // === Runtime Caching ===
  runtimeCaching: [
    // 1. صفحات HTML (Network First)
    {
      matcher: ({ request }: { request: Request }) =>
        request.mode === "navigate" && request.destination === "document",
      handler: new NetworkFirst({
        cacheName: "pages",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
      }),
    },

    // 2. تصاویر، فونت‌ها، استایل‌ها (Cache First)
    {
      matcher: ({ request }: { request: Request }) =>
        ["style", "font", "image"].includes(request.destination),
      handler: new CacheFirst({
        cacheName: "assets",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    },

    // 3. APIها (Stale-While-Revalidate)
    {
      matcher: ({ request, url }: { request: Request; url: URL }) =>
        request.destination === "script" && url.pathname.startsWith("/api/"),
      handler: new StaleWhileRevalidate({
        cacheName: "api",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
      }),
    },

    // 4. Default Cache از @serwist/next
    ...defaultCache,
  ],

  // === صفحه آفلاین ===
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }: { request: Request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// === فعال‌سازی رویدادها ===
serwist.addEventListeners();
