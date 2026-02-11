const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "À propos",
  description:
    "Équipe Edith : gynécologues, obstétriciens et sages-femmes à Kinshasa. Expertise en maternité, fertilité et santé féminine.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "À propos | Edith - Centre médical Kinshasa",
    description:
      "Équipe Edith : gynécologues, obstétriciens et sages-femmes à Kinshasa. Expertise en maternité, fertilité et santé féminine.",
    url: `${siteUrl}/about`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos | Edith - Centre médical Kinshasa",
    description:
      "Équipe Edith : gynécologues, obstétriciens et sages-femmes à Kinshasa. Expertise en maternité, fertilité et santé féminine.",
    images: ["/opengraph-image"],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
