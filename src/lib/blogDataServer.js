/**
 * Utilitaires serveur pour fusionner les articles statiques et dynamiques du blog.
 * Si NEXT_PUBLIC_BLOG_API_URL → backend externe, sinon D1 ou fichiers (blogStorage).
 */
import { blogArticles, blogList } from "./blogData";
import { getBlogApiBase } from "./blogApiBase";
import { loadContentArticles } from "./blogStorage";

export async function getBlogData() {
  const base = getBlogApiBase();
  let content = { articles: {}, list: [] };

  if (base) {
    try {
      const res = await fetch(`${base}/articles`);
      if (res.ok) content = await res.json();
    } catch {
      // garde articles/list vides
    }
  } else {
    content = await loadContentArticles();
  }

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
