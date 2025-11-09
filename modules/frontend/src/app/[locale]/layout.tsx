import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Vazirmatn } from "next/font/google";
import "../globals.css";

// برای Static Rendering
export function generateStaticParams() {
  return [{ locale: "fa" }, { locale: "en" }]; // فقط این دو رو pre-render کن
}

// === English Fonts (Geist) ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// === Persian Font (Vazirmatn) ===
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin-ext"],
  // weight: ["400", "500", "600", "700"],
  display: "swap",
});

// === Metadata ===
export const metadata: Metadata = {
  title: {
    default: "foundation",
    template: "%s | foundation",
  },
  description: "foundation – The core of modern web experiences.",
  metadataBase: new URL("https://foundation.deepland.ir"),
  openGraph: {
    title: "foundation",
    description: "The core of modern web experiences.",
    url: "https://foundation.deepland.ir",
    siteName: "foundation",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// === Root Layout (Minimal) ===
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // اگر locale نامعتبر، به notFound برو (پیش‌فرض fa)
  if (!["fa", "en"].includes(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
