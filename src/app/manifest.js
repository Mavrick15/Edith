export default function manifest() {
  return {
    name: "Edith - Centre médical Kinshasa",
    short_name: "Edith",
    description: "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#274760",
    categories: ["medical", "health"],
    lang: "fr",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/images/logo_icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/images/logo_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [],
    shortcuts: [
      {
        name: "Prendre rendez-vous",
        short_name: "RDV",
        description: "Réserver un créneau avec nos spécialistes",
        url: "/appointments",
        icons: [{ src: "/images/logo_icon.png", sizes: "192x192" }],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Nous contacter",
        url: "/contact",
        icons: [{ src: "/images/logo_icon.png", sizes: "192x192" }],
      },
    ],
  };
}
