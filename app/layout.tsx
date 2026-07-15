import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import "@/app/globals.css";
import { seoConfig } from "@/src/content/seo";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  metadataBase: new URL(seoConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.url,
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F3F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.person.name,
    jobTitle: seoConfig.person.jobTitle,
    url: seoConfig.url,
    email: seoConfig.person.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: seoConfig.person.address.city,
      addressCountry: seoConfig.person.address.country,
    },
    sameAs: seoConfig.person.sameAs,
  };

  return (
    <html lang="tr" data-theme="light">
      <body className={geist.variable}>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}
