/**
 * Utilitaires serveur pour fusionner les articles statiques et dynamiques du blog.
 * Compatible Edge (Cloudflare) et Node.js.
 */
import { blogArticles, blogList, loadContentArticles } from "./blogStorage";

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
