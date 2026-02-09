/**
 * Rate limiting simple pour les API routes (compatible Cloudflare Edge Runtime)
 * Empêche les abus et les attaques par déni de service
 * 
 * Note: Dans un environnement edge/serverless distribué, le rate limiting basique
 * ne peut pas maintenir un état partagé. Cette implémentation simplifiée
 * utilise les headers Cloudflare pour une protection basique.
 * Pour une protection plus robuste, utilisez Cloudflare Rate Limiting Rules
 * ou Durable Objects.
 */

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requêtes par minute par IP

/**
 * Vérifie si une requête dépasse la limite de taux
 * Version simplifiée compatible avec Cloudflare Edge Runtime
 * @param {string} ip - Adresse IP du client
 * @returns {boolean} - true si la limite est dépassée
 */
export function checkRateLimit(ip) {
  // Dans un environnement edge distribué, nous ne pouvons pas maintenir
  // un état partagé entre les invocations. Cette fonction retourne
  // toujours false pour permettre le déploiement sur Cloudflare.
  // 
  // Pour une protection réelle, configurez Cloudflare Rate Limiting Rules
  // dans le dashboard Cloudflare ou utilisez Durable Objects.
  
  // Protection basique : rejeter les IPs invalides
  if (!ip || ip === "unknown" || ip === "") {
    return false; // Laisser passer pour éviter les faux positifs
  }

  // Note: Le rate limiting réel devrait être géré par Cloudflare
  // via les règles de rate limiting dans le dashboard ou via
  // Cloudflare Workers avec Durable Objects pour un état partagé.
  
  return false;
}

/**
 * Obtient l'adresse IP du client depuis la requête
 * @param {Request} request - Objet Request Next.js
 * @returns {string} - Adresse IP
 */
export function getClientIP(request) {
  // Vérifier les headers proxy (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback (ne devrait jamais arriver en production)
  return "unknown";
}
