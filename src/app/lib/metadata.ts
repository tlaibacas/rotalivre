// lib/seo.ts
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

const SITE_URL = "https://rotalivre.com";

export async function generateSiteMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "meta" });

  const fullUrl = `${SITE_URL}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rota Livre",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.instagram.com/rotalivre",
      "https://www.facebook.com/rotalivre",
      "https://www.linkedin.com/company/rotalivre",
    ],
    description: t("description"),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title.default"),
      template: `%s | ${t("title.template")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: fullUrl,
      siteName: "Rota Livre",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Rota Livre - Explora o mundo sem limites",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("og.title"),
      description: t("og.description"),
      images: [`${SITE_URL}/og-image.jpg`],
      creator: "@rotalivre",
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${SITE_URL}/en`,
        pt: `${SITE_URL}/pt`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    themeColor: "#ffffff",
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}
