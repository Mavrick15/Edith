const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Tarifs",
  description:
    "Découvrez nos forfaits et tarifs : famille, bien-être, senior. Des soins de qualité adaptés à vos besoins à Kinshasa.",
  alternates: { canonical: `${siteUrl}/tarifs` },
  openGraph: {
    title: "Tarifs | Edith - Centre médical Kinshasa",
    description:
      "Découvrez nos forfaits et tarifs : famille, bien-être, senior. Des soins de qualité adaptés à vos besoins à Kinshasa.",
    url: `${siteUrl}/tarifs`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs | Edith - Centre médical Kinshasa",
    description:
      "Découvrez nos forfaits et tarifs : famille, bien-être, senior. Des soins de qualité adaptés à vos besoins à Kinshasa.",
    images: ["/opengraph-image"],
  },
};

export default function TarifsLayout({ children }) {
  return children;
}
