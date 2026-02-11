const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Prendre rendez-vous",
  description:
    "Prenez rendez-vous avec un professionnel de santé Edith. Formulaire en ligne simple et rapide.",
  alternates: { canonical: `${siteUrl}/appointments` },
  openGraph: {
    title: "Prendre rendez-vous | Edith - Centre médical Kinshasa",
    description:
      "Prenez rendez-vous avec un professionnel de santé Edith. Formulaire en ligne simple et rapide.",
    url: `${siteUrl}/appointments`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prendre rendez-vous | Edith - Centre médical Kinshasa",
    description:
      "Prenez rendez-vous avec un professionnel de santé Edith. Formulaire en ligne simple et rapide.",
    images: ["/opengraph-image"],
  },
};

export default function AppointmentsLayout({ children }) {
  return children;
}
