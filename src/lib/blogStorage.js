/**
 * Stockage des articles - sélectionne Edge (KV) ou Node (fs) selon le runtime
 */
function isEdgeRuntime() {
  return typeof globalThis.EdgeRuntime === "string" || (typeof process !== "undefined" && process.env?.NEXT_RUNTIME === "edge");
}

export async function loadContentArticles() {
  if (isEdgeRuntime()) {
    const { loadContentArticles: load } = await import("./blogStorageEdge");
    return load();
  }
  const { loadContentArticles: load } = await import("./blogStorageNode");
  return load();
}

export async function getContentArticle(slug) {
  if (isEdgeRuntime()) {
    const { getContentArticle: get } = await import("./blogStorageEdge");
    return get(slug);
  }
  const { getContentArticle: get } = await import("./blogStorageNode");
  return get(slug);
}

export async function saveContentArticle(article) {
  if (isEdgeRuntime()) {
    const { saveContentArticle: save } = await import("./blogStorageEdge");
    return save(article);
  }
  const { saveContentArticle: save } = await import("./blogStorageNode");
  return save(article);
}

export async function deleteContentArticle(slug) {
  if (isEdgeRuntime()) {
    const { deleteContentArticle: del } = await import("./blogStorageEdge");
    return del(slug);
  }
  const { deleteContentArticle: del } = await import("./blogStorageNode");
  return del(slug);
}

export { blogArticles, blogList } from "./blogData";
