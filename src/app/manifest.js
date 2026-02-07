export default function manifest() {
  return {
    name: "Edith - Centre médical Kinshasa",
    short_name: "Edith",
    description: "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#274760",
    icons: [
      {
        src: "/images/logo_icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
