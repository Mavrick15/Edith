/**
 * Rate limiting simple pour les API routes
 * Empêche les abus et les attaques par déni de service
 */

// Store en mémoire (pour production, utiliser Redis ou une solution persistante)
const requestCounts = new Map();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requêtes par minute par IP

/**
 * Vérifie si une requête dépasse la limite de taux
 * @param {string} ip - Adresse IP du client
 * @returns {boolean} - true si la limite est dépassée
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const key = ip;

  if (!requestCounts.has(key)) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  const record = requestCounts.get(key);

  // Réinitialiser si la fenêtre est expirée
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return false;
  }

  // Incrémenter le compteur
  record.count++;

  // Nettoyer les anciennes entrées périodiquement
  if (Math.random() < 0.01) {
    // 1% de chance de nettoyer
    for (const [k, v] of requestCounts.entries()) {
      if (now > v.resetTime) {
        requestCounts.delete(k);
      }
    }
  }

  return record.count > MAX_REQUESTS_PER_WINDOW;
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
