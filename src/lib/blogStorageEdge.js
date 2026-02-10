/**
 * Stockage blog pour le runtime Edge : Supabase si configuré, sinon D1.
 * N'importe pas blogStorageNode (fs) pour rester compatible Edge.
 */
function useSupabase() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function loadContentArticles() {
  if (useSupabase()) {
    const { loadContentArticles: load } = await import("./blogStorageSupabase");
    return load();
  }
  const { loadContentArticles: load } = await import("./blogStorageD1");
  return load();
}

export async function getContentArticle(slug) {
  if (useSupabase()) {
    const { getContentArticle: get } = await import("./blogStorageSupabase");
    return get(slug);
  }
  const { getContentArticle: get } = await import("./blogStorageD1");
  return get(slug);
}

export async function saveContentArticle(article) {
  if (useSupabase()) {
    const { saveContentArticle: save } = await import("./blogStorageSupabase");
    return save(article);
  }
  const { saveContentArticle: save } = await import("./blogStorageD1");
  return save(article);
}

export async function deleteContentArticle(slug) {
  if (useSupabase()) {
    const { deleteContentArticle: del } = await import("./blogStorageSupabase");
    return del(slug);
  }
  const { deleteContentArticle: del } = await import("./blogStorageD1");
  return del(slug);
}

export { blogArticles, blogList } from "./blogData";
