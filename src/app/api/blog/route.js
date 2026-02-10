import { NextResponse } from "next/server";
import { blogArticles, blogList, loadContentArticles, saveContentArticle } from "@/lib/blogStorageEdge";

export const runtime = "edge";

const THUMB_OPTIONS = ["/images/blog/post_1.jpeg", "/images/blog/post_2.jpeg", "/images/blog/post_3.jpeg"];

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, thumbUrl, sections } = body;

    if (!title || !sections?.length) {
      return NextResponse.json(
        { error: "Titre et contenu requis" },
        { status: 400 }
      );
    }

    const articleSlug = slugify(title);
    const { list } = await loadContentArticles();
    const thumbIndex = list.length % THUMB_OPTIONS.length;
    const article = {
      slug: articleSlug,
      title,
      thumbUrl: thumbUrl || THUMB_OPTIONS[thumbIndex],
      date: new Date().toLocaleString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      author: "Dr. Mboloko Esimo Justin",
      sections: sections.map((s) => ({ type: s.type || "p", text: s.text || "" })),
    };

    const saved = await saveContentArticle(article);
    if (!saved) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer (vérifiez Supabase ou D1 et la table blog_articles)" },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: true, slug: articleSlug });
  } catch (error) {
    console.error("Erreur création article:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const content = await loadContentArticles();
    const mergedArticles = { ...blogArticles, ...content.articles };
    const mergedList = [...blogList];
    content.list.forEach((item) => {
      if (!mergedList.find((b) => b.slug === item.slug)) {
        mergedList.push(item);
      }
    });
    mergedList.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    return NextResponse.json({
      articles: mergedArticles,
      list: mergedList,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du chargement des articles" },
      { status: 500 }
    );
  }
}
