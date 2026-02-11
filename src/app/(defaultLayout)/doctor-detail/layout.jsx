const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Dr. Mboloko Esimo Justin",
  description:
    "Expert en gynécologie, fertilité et PMA à Kinshasa. Professeur ordinaire, plus de 30 ans d'expérience au service de la santé reproductive.",
  alternates: { canonical: `${siteUrl}/doctor-detail` },
  openGraph: {
    title: "Dr. Mboloko Esimo Justin | Edith - Centre médical Kinshasa",
    description:
      "Expert en gynécologie, fertilité et PMA à Kinshasa. Professeur ordinaire, plus de 30 ans d'expérience au service de la santé reproductive.",
    url: `${siteUrl}/doctor-detail`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Mboloko Esimo Justin | Edith - Centre médical Kinshasa",
    description:
      "Expert en gynécologie, fertilité et PMA à Kinshasa. Professeur ordinaire, plus de 30 ans d'expérience.",
    images: ["/opengraph-image"],
  },
};

export default function DoctorDetailLayout({ children }) {
  return children;
}
