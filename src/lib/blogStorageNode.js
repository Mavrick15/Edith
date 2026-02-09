/**
 * Stockage Node.js (fichiers) - pour build et dev local
 * Utilise content/blog/*.json
 */
import { blogArticles, blogList } from "./blogData";
import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export async function loadContentArticles() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const articles = {};
    const list = [];
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
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

export async function getContentArticle(slug) {
  try {
    const content = await fs.readFile(path.join(CONTENT_DIR, `${slug}.json`), "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function saveContentArticle(article) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(CONTENT_DIR, `${article.slug}.json`),
    JSON.stringify(article, null, 2),
    "utf-8"
  );
  return true;
}

export async function deleteContentArticle(slug) {
  try {
    await fs.unlink(path.join(CONTENT_DIR, `${slug}.json`));
    return true;
  } catch {
    return false;
  }
}

export { blogArticles, blogList };
