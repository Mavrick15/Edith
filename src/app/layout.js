import "./sass/index.scss";
import Preloader from "./ui/Preloader";
import WebVitals from "./ui/WebVitals";
import { OrganizationSchema, MedicalBusinessSchema } from "./ui/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edith-medical.vercel.app";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#274760",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo_icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo_icon.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo_icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/logo_icon.png",
  },
  title: {
    absolute: "",
    default: "Edith - Gynécologie, obstétrique & fertilité | Kinshasa",
    template: "%s | Edith - Gynécologie & fertilité Kinshasa",
  },
  description: "Gynécologie-obstétrique, maternité & fertilité à Kinshasa. Suivi de grossesse, accouchement, FIV et PMA — accompagner votre projet parental.",
  openGraph: {
    title: "Edith - Gynécologie, obstétrique & fertilité à Kinshasa",
    description: "Gynécologie-obstétrique, maternité & fertilité à Kinshasa. Suivi de grossesse, accouchement, FIV et PMA — accompagner votre projet parental.",
    type: "website",
    locale: "fr_FR",
    siteName: "Edith - Centre médical Kinshasa",
    // Image générée par opengraph-image.jsx (1200×630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Edith - Gynécologie, obstétrique & fertilité à Kinshasa",
    description: "Gynécologie-obstétrique, maternité & fertilité à Kinshasa. Suivi de grossesse, accouchement, FIV et PMA.",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Ajoutez vos codes de vérification ici si nécessaire
    // google: "votre-code-google",
    // yandex: "votre-code-yandex",
    // bing: "votre-code-bing",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="author" content="Edith - Centre médical Kinshasa" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Preload pour améliorer les performances */}
        <link rel="preload" href="/images/logo.svg" as="image" type="image/svg+xml" />
        <OrganizationSchema />
        <MedicalBusinessSchema />
      </head>
      <body>
        <Preloader />
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
