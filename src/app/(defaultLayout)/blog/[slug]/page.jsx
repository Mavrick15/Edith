import { blogArticles, blogList } from "@/lib/blogData";
import BlogDetailsClient from "./BlogDetailsClient";

export function generateStaticParams() {
  return blogList.map((article) => ({
    slug: article.slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edith-medical.vercel.app";

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const article = slug ? blogArticles[slug] : null;
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

export default function BlogDetailsPage({ params }) {
  const slug = params?.slug;
  return <BlogDetailsClient slug={slug} />;
}
