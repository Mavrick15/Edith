const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Galerie",
  description:
    "Découvrez les moments forts et l'ambiance du centre médical Edith à Kinshasa.",
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: "Galerie | Edith - Centre médical Kinshasa",
    description:
      "Découvrez les moments forts et l'ambiance du centre médical Edith à Kinshasa.",
    url: `${siteUrl}/gallery`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie | Edith - Centre médical Kinshasa",
    description:
      "Découvrez les moments forts et l'ambiance du centre médical Edith à Kinshasa.",
    images: ["/opengraph-image"],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
