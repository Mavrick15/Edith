/**
 * Utilitaires serveur pour fusionner les articles statiques et dynamiques du blog.
 * Utilisable uniquement côté serveur (API routes, Server Components).
 */
import { blogArticles, blogList } from "./blogData";
import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

async function loadContentArticles() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const articles = {};
    const list = [];

    for (const file of jsonFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      const article = JSON.parse(content);
      articles[article.slug] = article;
      list.push({
        slug: article.slug,
        title: article.title,
        thumbUrl: article.thumbUrl,
        date: article.date,
        btnText: "En savoir plus",
        href: `/blog/${article.slug}`,
        socialShare: true,
      });
    }

    return { articles, list };
  } catch {
    return { articles: {}, list: [] };
  }
}

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
