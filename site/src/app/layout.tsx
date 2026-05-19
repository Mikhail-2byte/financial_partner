import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { brand } from "@/content/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — бухгалтерские услуги для ИП и ООО в Екатеринбурге и по всей России`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "бухгалтерские услуги Екатеринбург",
    "бухгалтер для ИП",
    "бухгалтер для ООО",
    "аутсорсинг бухгалтерии",
    "ведение ИП",
    "нулевая отчётность",
    "восстановление учёта",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `https://${brand.domain}`,
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4731",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
