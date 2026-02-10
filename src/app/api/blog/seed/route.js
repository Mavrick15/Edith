import { NextResponse } from "next/server";
import { blogArticles } from "@/lib/blogData";
import { saveContentArticle } from "@/lib/blogStorageEdge";

export const runtime = "edge";

/**
 * Seed des 3 articles statiques dans la base (Supabase ou D1).
 * POST /api/blog/seed — à appeler une fois pour migrer les articles.
 */
export async function POST() {
  try {
    const slugs = ["infertilite-couple", "pma-fiv-kinshasa", "consultation-gynecologique"];
    const inserted = [];

    for (const slug of slugs) {
      const a = blogArticles[slug];
      if (!a) continue;

      const article = {
        slug: a.slug,
        title: a.title,
        thumbUrl: a.thumbUrl || "/images/blog/post_1.jpeg",
        date: a.date && a.date.length <= 10 ? `${a.date} 2025` : a.date,
        author: a.author || "Dr. Mboloko Esimo Justin",
        sections: a.sections || [],
      };

      const ok = await saveContentArticle(article);
      if (ok) inserted.push(slug);
    }

    return NextResponse.json({
      success: true,
      message: `${inserted.length} article(s) inséré(s) dans la base.`,
      inserted,
    });
  } catch (error) {
    console.error("Erreur seed blog:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'insertion des articles" },
      { status: 500 }
    );
  }
}
