import "./sass/index.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edith-medical.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo_icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo_icon.png", sizes: "48x48", type: "image/png" },
    ],
  },
  title: {
    absolute: "",
    default: "Edith - Centre médical Kinshasa",
    template: "%s | Edith - Centre médical Kinshasa",
  },
  description: "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.",
  openGraph: {
    title: "Edith - Centre médical Kinshasa",
    description: "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.",
    // Image générée par opengraph-image.jsx (1200×630)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="author" content="Edith - Centre médical Kinshasa" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
