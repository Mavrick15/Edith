/**
 * Utilitaires pour le partage social
 * Génère les URLs de partage pour les réseaux sociaux
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

/**
 * Génère l'URL de partage Facebook
 */
export function getFacebookShareUrl(url, text) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
}

/**
 * Génère l'URL de partage LinkedIn
 */
export function getLinkedInShareUrl(url, title, summary) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary || "");
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;
}

/**
 * Génère l'URL de partage Twitter/X
 */
export function getTwitterShareUrl(url, text) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
}

/**
 * Génère l'URL de partage WhatsApp
 */
export function getWhatsAppShareUrl(url, text) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
}

/**
 * Génère l'URL complète d'une page
 */
export function getFullUrl(path) {
  return `${siteUrl}${path}`;
}
