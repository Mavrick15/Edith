const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Nos services",
  description:
    "Gynécologie-obstétrique, maternité, fertilité & PMA à Kinshasa. Suivi de grossesse, accouchement, FIV, imagerie et laboratoire.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Nos services | Edith - Centre médical Kinshasa",
    description:
      "Gynécologie-obstétrique, maternité, fertilité & PMA à Kinshasa. Suivi de grossesse, accouchement, FIV, imagerie et laboratoire.",
    url: `${siteUrl}/services`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos services | Edith - Centre médical Kinshasa",
    description:
      "Gynécologie-obstétrique, maternité, fertilité & PMA à Kinshasa. Suivi de grossesse, accouchement, FIV, imagerie et laboratoire.",
    images: ["/opengraph-image"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
