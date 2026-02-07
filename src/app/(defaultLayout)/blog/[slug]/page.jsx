import { blogArticles, blogList } from "@/lib/blogData";
import BlogDetailsClient from "./BlogDetailsClient";

export function generateStaticParams() {
  return blogList.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const article = slug ? blogArticles[slug] : null;
  if (!article) return {};
  return {
    title: article.title,
    description: article.sections?.[0]?.text?.slice(0, 160) || article.title,
  };
}

export default function BlogDetailsPage({ params }) {
  const slug = params?.slug;
  return <BlogDetailsClient slug={slug} />;
}
