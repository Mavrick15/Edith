/**
 * Stockage blog via Supabase (Edge / Node).
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Table: blog_articles (slug, title, thumb_url, date, author, sections jsonb)
 */
import { createClient } from "@supabase/supabase-js";
import { blogArticles, blogList } from "./blogData";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function rowToArticle(row) {
  const sections = Array.isArray(row.sections) ? row.sections : [];
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
  const supabase = getSupabase();
  if (!supabase) return { articles: {}, list: [] };
  const { data, error } = await supabase
    .from("blog_articles")
    .select("slug, title, thumb_url, date, author, sections")
    .order("date", { ascending: false });
  if (error) return { articles: {}, list: [] };
  const articles = {};
  const list = [];
  for (const row of data || []) {
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
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_articles")
    .select("slug, title, thumb_url, date, author, sections")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return rowToArticle(data);
}

export async function saveContentArticle(article) {
  const supabase = getSupabase();
  if (!supabase) return false;
  const row = {
    slug: article.slug,
    title: article.title,
    thumb_url: article.thumbUrl || "/images/blog/post_1.jpeg",
    date: article.date,
    author: article.author,
    sections: article.sections || [],
  };
  const { error } = await supabase.from("blog_articles").upsert(row, {
    onConflict: "slug",
  });
  return !error;
}

export async function deleteContentArticle(slug) {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("blog_articles").delete().eq("slug", slug);
  return !error;
}

export { blogArticles, blogList };
