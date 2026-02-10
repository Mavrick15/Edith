/**
 * URL de base de l'API blog.
 * Si NEXT_PUBLIC_BLOG_API_URL est défini, le frontend utilise ce backend externe.
 * Sinon on utilise les routes Next.js /api/blog (D1 ou fichiers).
 */
export function getBlogApiBase() {
  return typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BLOG_API_URL
    ? process.env.NEXT_PUBLIC_BLOG_API_URL.replace(/\/$/, "")
    : "";
}

export function useExternalBlogApi() {
  return !!getBlogApiBase();
}
