/**
 * Stockage blog (Node) : Supabase si configuré, sinon D1 si configuré, sinon fichiers.
 */
function useSupabase() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
function getD1Config() {
  return !!(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_D1_DATABASE_ID &&
    process.env.CLOUDFLARE_API_TOKEN
  );
}

export async function loadContentArticles() {
  if (useSupabase()) {
    const { loadContentArticles: load } = await import("./blogStorageSupabase");
    return load();
  }
  if (getD1Config()) {
    const { loadContentArticles: load } = await import("./blogStorageD1");
    return load();
  }
  const { loadContentArticles: load } = await import("./blogStorageNode");
  return load();
}

export async function getContentArticle(slug) {
  if (useSupabase()) {
    const { getContentArticle: get } = await import("./blogStorageSupabase");
    return get(slug);
  }
  if (getD1Config()) {
    const { getContentArticle: get } = await import("./blogStorageD1");
    return get(slug);
  }
  const { getContentArticle: get } = await import("./blogStorageNode");
  return get(slug);
}

export async function saveContentArticle(article) {
  if (useSupabase()) {
    const { saveContentArticle: save } = await import("./blogStorageSupabase");
    return save(article);
  }
  if (getD1Config()) {
    const { saveContentArticle: save } = await import("./blogStorageD1");
    return save(article);
  }
  const { saveContentArticle: save } = await import("./blogStorageNode");
  return save(article);
}

export async function deleteContentArticle(slug) {
  if (useSupabase()) {
    const { deleteContentArticle: del } = await import("./blogStorageSupabase");
    return del(slug);
  }
  if (getD1Config()) {
    const { deleteContentArticle: del } = await import("./blogStorageD1");
    return del(slug);
  }
  const { deleteContentArticle: del } = await import("./blogStorageNode");
  return del(slug);
}

export { blogArticles, blogList } from "./blogData";
