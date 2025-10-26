import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "foundation",
  description: "foundation – The core of modern web experiences.",
  openGraph: {
    title: "foundation",
    description: "The core of modern web experiences.",
    url: "https://foundation.deepland.ir",
    siteName: "foundation",
    images: [
      {
        url: "https://foundation.deepland.ir/og-image.png",
        width: 1200,
        height: 630,
        alt: "foundation",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "foundation",
    description: "The core of modern web experiences.",
    images: ["https://foundation.deepland.ir/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background p-6 text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground md:text-6xl font-vazirmatn">
        foundation
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground font-vazirmatn">
        هسته‌ی تجربه‌های وب مدرن.
      </p>
      <div className="flex gap-4">
        <a
          href="/docs"
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          مستندات
        </a>
        <a
          href="https://github.com/deepland/foundation"
          className="rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          گیت‌هاب
        </a>
      </div>
    </main>
  );
}
