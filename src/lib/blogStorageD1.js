/**
 * Stockage Cloudflare D1 (Edge) - sans dépendances Node.js
 * Env: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_API_TOKEN
 */
import { blogArticles, blogList } from "./blogData";

const API_BASE = "https://api.cloudflare.com/client/v4";

function getD1Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !databaseId || !apiToken) return null;
  return { accountId, databaseId, apiToken };
}

async function d1Query(sql, params = []) {
  const cfg = getD1Config();
  if (!cfg) return { success: false, result: [], error: "D1 non configuré (variables d'environnement manquantes)" };
  const url = `${API_BASE}/accounts/${cfg.accountId}/d1/database/${cfg.databaseId}/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiToken}`,
    },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    const msg = data.errors?.[0]?.message || data.error || `HTTP ${res.status}`;
    return { success: false, result: [], error: msg };
  }
  const first = data.result?.[0];
  return { success: true, result: first?.results ?? [], meta: first?.meta };
}

function rowToArticle(row) {
  let sections = [];
  try {
    sections = typeof row.sections === "string" ? JSON.parse(row.sections) : row.sections || [];
  } catch {}
  return {
    slug: row.slug,
    title: row.title,
    thumbUrl: row.thumb_url || "/images/blog/post_1.jpeg",
    date: row.date,
    author: row.author || "Dr. Mboloko Esimo Justin",
    sections,
  };
}

export async function loadContentArticles() {
  const { success, result } = await d1Query(
    "SELECT slug, title, thumb_url, date, author, sections FROM blog_articles ORDER BY date DESC"
  );
  if (!success) return { articles: {}, list: [] };
  const articles = {};
  const list = [];
  for (const row of result) {
    const article = rowToArticle(row);
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
}

export async function getContentArticle(slug) {
  const { success, result } = await d1Query("SELECT slug, title, thumb_url, date, author, sections FROM blog_articles WHERE slug = ?", [slug]);
  if (!success || !result?.length) return null;
  return rowToArticle(result[0]);
}

export async function saveContentArticle(article) {
  const cfg = getD1Config();
  if (!cfg) return false;
  const sectionsJson = JSON.stringify(article.sections || []);
  const { success } = await d1Query(
    `INSERT INTO blog_articles (slug, title, thumb_url, date, author, sections) VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET title=excluded.title, thumb_url=excluded.thumb_url, date=excluded.date, author=excluded.author, sections=excluded.sections`,
    [
      article.slug,
      article.title,
      article.thumbUrl || "/images/blog/post_1.jpeg",
      article.date,
      article.author,
      sectionsJson,
    ]
  );
  return success;
}

export async function deleteContentArticle(slug) {
  const { success } = await d1Query("DELETE FROM blog_articles WHERE slug = ?", [slug]);
  return success;
}

export { blogArticles, blogList };
