import { getBlogData } from "@/lib/blogDataServer";
import AdminBlogClient from "./AdminBlogClient";

export const metadata = {
  title: "Administration Blog",
  description: "Créer et modifier les articles du blog - Edith Centre médical",
};

export default async function AdminBlogPage() {
  const { articles, list } = await getBlogData();
  const articlesList = list.map((item) => ({
    ...item,
    author: articles[item.slug]?.author,
  }));

  return (
    <AdminBlogClient initialArticles={articlesList} initialArticlesMap={articles} />
  );
}
