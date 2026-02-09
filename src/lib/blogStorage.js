/**
 * Stockage blog : D1 (Cloudflare) en Edge ou si configuré, sinon fichiers (Node).
 */
function isEdgeRuntime() {
  return typeof globalThis.EdgeRuntime === "string" || (typeof process !== "undefined" && process.env?.NEXT_RUNTIME === "edge");
}
function getD1Config() {
  return !!(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_D1_DATABASE_ID &&
    process.env.CLOUDFLARE_API_TOKEN
  );
}

export async function loadContentArticles() {
  if (isEdgeRuntime() || getD1Config()) {
    const { loadContentArticles: load } = await import("./blogStorageD1");
    return load();
  }
  const { loadContentArticles: load } = await import("./blogStorageNode");
  return load();
}

export async function getContentArticle(slug) {
  if (isEdgeRuntime() || getD1Config()) {
    const { getContentArticle: get } = await import("./blogStorageD1");
    return get(slug);
  }
  const { getContentArticle: get } = await import("./blogStorageNode");
  return get(slug);
}

export async function saveContentArticle(article) {
  if (isEdgeRuntime() || getD1Config()) {
    const { saveContentArticle: save } = await import("./blogStorageD1");
    return save(article);
  }
  const { saveContentArticle: save } = await import("./blogStorageNode");
  return save(article);
}

export async function deleteContentArticle(slug) {
  if (isEdgeRuntime() || getD1Config()) {
    const { deleteContentArticle: del } = await import("./blogStorageD1");
    return del(slug);
  }
  const { deleteContentArticle: del } = await import("./blogStorageNode");
  return del(slug);
}

export { blogArticles, blogList } from "./blogData";
