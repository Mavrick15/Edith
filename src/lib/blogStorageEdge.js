/**
 * Stockage Edge (Cloudflare KV) - sans dépendances Node.js
 * Variables d'environnement : CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_KV_NAMESPACE_ID, CLOUDFLARE_API_TOKEN
 */
import { blogArticles, blogList } from "./blogData";

const KV_PREFIX = "blog:article:";

function getKvConfig() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !namespaceId || !apiToken) return null;
  return { accountId, namespaceId, apiToken };
}

async function kvGet(key) {
  const cfg = getKvConfig();
  if (!cfg) return null;
  const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${cfg.apiToken}` },
  });
  if (!res.ok) return null;
  return res.text();
}

async function kvPut(key, value) {
  const cfg = getKvConfig();
  if (!cfg) return false;
  const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${cfg.apiToken}` },
    body: value,
  });
  return res.ok;
}

async function kvDelete(key) {
  const cfg = getKvConfig();
  if (!cfg) return false;
  const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/storage/kv/namespaces/${cfg.namespaceId}/values/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${cfg.apiToken}` },
  });
  return res.ok;
}

async function kvListKeys(prefix) {
  const cfg = getKvConfig();
  if (!cfg) return [];
  const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/storage/kv/namespaces/${cfg.namespaceId}/keys?prefix=${encodeURIComponent(prefix)}&limit=1000`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${cfg.apiToken}` },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.result || []).map((k) => k.name);
}

export async function loadContentArticles() {
  const keys = await kvListKeys(KV_PREFIX);
  const articles = {};
  const list = [];
  for (const key of keys) {
    const slug = key.replace(KV_PREFIX, "");
    const raw = await kvGet(key);
    if (!raw) continue;
    try {
      const article = JSON.parse(raw);
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
    } catch {}
  }
  return { articles, list };
}

export async function getContentArticle(slug) {
  const raw = await kvGet(KV_PREFIX + slug);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveContentArticle(article) {
  const key = KV_PREFIX + article.slug;
  return kvPut(key, JSON.stringify(article, null, 2));
}

export async function deleteContentArticle(slug) {
  return kvDelete(KV_PREFIX + slug);
}

export { blogArticles, blogList };
