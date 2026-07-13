import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import "@/app/globals.css";
import { seoConfig } from "@/src/content/seo";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  metadataBase: new URL(seoConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.url,
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F9F8F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.person.name,
    jobTitle: seoConfig.person.jobTitle,
    url: seoConfig.url,
    email: seoConfig.person.email,
    address: { "@type": "PostalAddress", addressLocality: seoConfig.person.address.city, addressCountry: seoConfig.person.address.country },
    sameAs: seoConfig.person.sameAs,
  };
  const themeScript = `
    (function () {
      try {
        var saved = window.localStorage.getItem("theme");
        var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        var theme = saved || system;
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.style.colorScheme = "light";
      }
    })();
  `;

  return (
    <html lang="tr" suppressHydrationWarning className={`scroll-smooth ${geist.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
