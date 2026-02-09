import { getBlogData, getBlogArticle } from "@/lib/blogDataServerEdge";
import BlogDetailsClient from "./BlogDetailsClient";

export const runtime = "edge";
export const dynamicParams = true;
// Données à jour à chaque visite (articles créés via l'admin)
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const { list } = await getBlogData();
  return list.map((article) => ({
    slug: article.slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edith-medical.vercel.app";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = slug ? await getBlogArticle(slug) : null;
  if (!article) return {};
  
  const description = article.sections?.[0]?.text?.slice(0, 160) || article.title;
  const imageUrl = `${siteUrl}${article.thumbUrl}`;
  const pageUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      url: pageUrl,
      siteName: "Edith - Centre médical Kinshasa",
      images: [
        {
          url: imageUrl,
          width: 1110,
          height: 500,
          alt: article.title,
        },
      ],
      locale: "fr_FR",
      type: "article",
      publishedTime: article.date ? `2025-${article.date.replace("mars", "03")}` : undefined,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const article = slug ? await getBlogArticle(slug) : null;
  const { list } = await getBlogData();
  return <BlogDetailsClient slug={slug} article={article} blogList={list} />;
}
