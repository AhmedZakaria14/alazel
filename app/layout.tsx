import type { Metadata, Viewport } from "next";
import { services, siteConfig } from "./data";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;

const verification: Metadata["verification"] = {
  ...(googleVerification ? { google: googleVerification } : {}),
  ...(yandexVerification ? { yandex: yandexVerification } : {}),
  ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "شركة عزل بحائل | العازل للعزل الحديث",
    template: "%s | العازل للعزل الحديث",
  },
  description: siteConfig.description,
  keywords: [
    "شركة عزل بحائل",
    "عزل أسطح بحائل",
    "عزل فوم بحائل",
    "عزل مائي بحائل",
    "عزل حراري بحائل",
    "عزل خزانات بحائل",
    "عزل حمامات بحائل",
    "عزل مطابخ بحائل",
    "العازل للعزل الحديث",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "خدمات العزل والصيانة المنزلية",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/" },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "شركة عزل بحائل | العازل للعزل الحديث",
    description: siteConfig.shortDescription,
    images: [
      {
        url: siteConfig.heroImage,
        width: 1408,
        height: 768,
        alt: "تنفيذ أعمال العزل المائي والحراري في حائل بواسطة العازل للعزل الحديث",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة عزل بحائل | العازل للعزل الحديث",
    description: siteConfig.shortDescription,
    images: [siteConfig.heroImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification,
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

const businessId = `${siteConfig.url}/#business`;
const websiteId = `${siteConfig.url}/#website`;

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": businessId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      alternateName: siteConfig.legalName,
      description: siteConfig.description,
      slogan: "حماية مائية وحرارية بتنفيذ احترافي وضمان مكتوب",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
        width: 768,
        height: 768,
      },
      image: [
        `${siteConfig.url}${siteConfig.heroImage}`,
        `${siteConfig.url}${siteConfig.logo}`,
      ],
      telephone: `+${siteConfig.internationalPhone}`,
      priceRange: "$$",
      currenciesAccepted: "SAR",
      paymentAccepted: "Cash, Bank Transfer",
      knowsLanguage: ["ar"],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.countryCode,
      },
      areaServed: [
        { "@type": "City", name: siteConfig.city },
        { "@type": "AdministrativeArea", name: siteConfig.region },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.internationalPhone}`,
        contactType: "customer service",
        areaServed: siteConfig.countryCode,
        availableLanguage: ["Arabic"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات العزل في حائل",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: `${siteConfig.url}/services/${service.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: siteConfig.legalName,
      description: siteConfig.shortDescription,
      inLanguage: siteConfig.language,
      publisher: { "@id": businessId },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} dir="rtl">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </body>
    </html>
  );
}
