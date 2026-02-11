const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

/**
 * robots.txt — directives pour les moteurs de recherche.
 * Permet l'indexation des pages publiques, bloque l'admin et les API.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
