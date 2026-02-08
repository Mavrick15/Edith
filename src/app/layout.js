import "./sass/index.scss";
import Preloader from "./ui/Preloader";

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
    // Image générée par opengraph-image.jsx (1200×630)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="author" content="Edith - Centre médical Kinshasa" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
