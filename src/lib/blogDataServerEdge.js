/**
 * Données blog pour le runtime Edge — Supabase si configuré, sinon D1.
 */
import { blogArticles, blogList, loadContentArticles } from "./blogStorageEdge";

export async function getBlogData() {
  const content = await loadContentArticles();
  const mergedArticles = { ...blogArticles, ...content.articles };
  const mergedList = [...blogList];
  content.list.forEach((item) => {
    if (!mergedList.find((b) => b.slug === item.slug)) {
      mergedList.push(item);
    }
  });
  mergedList.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return { articles: mergedArticles, list: mergedList };
}

export async function getBlogArticle(slug) {
  const { articles } = await getBlogData();
  return articles[slug] || null;
}
