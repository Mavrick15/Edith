import { NextResponse } from "next/server";
import { blogArticles, getContentArticle, saveContentArticle, deleteContentArticle } from "@/lib/blogStorage";

export const runtime = "edge";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request, { params }) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "Slug requis" }, { status: 400 });
  const contentArticle = await getContentArticle(slug);
  const staticArticle = blogArticles[slug];
  const article = contentArticle || staticArticle;
  if (!article) return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request, { params }) {
  try {
    const { slug: currentSlug } = await params;
    const body = await request.json();
    const { slug, title, thumbUrl, sections } = body;

    if (!title || !sections?.length) {
      return NextResponse.json(
        { error: "Titre et contenu requis" },
        { status: 400 }
      );
    }

    const articleSlug = slug || slugify(title) || currentSlug;
    const existing = await getContentArticle(currentSlug);
    const article = {
      slug: articleSlug,
      title,
      thumbUrl: thumbUrl || existing?.thumbUrl || "/images/blog/post_1.jpeg",
      date: existing?.date ||
        new Date().toLocaleString("fr-FR", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      author: existing?.author || "Dr. Mboloko Esimo Justin",
      sections: sections.map((s) => ({ type: s.type || "p", text: s.text || "" })),
    };

    await saveContentArticle(article);
    if (currentSlug && currentSlug !== articleSlug) {
      await deleteContentArticle(currentSlug);
    }

    return NextResponse.json({ success: true, slug: articleSlug });
  } catch (error) {
    console.error("Erreur sauvegarde article:", error);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug) return NextResponse.json({ error: "Slug requis" }, { status: 400 });

    const contentArticle = await getContentArticle(slug);
    if (!contentArticle) {
      return NextResponse.json(
        { error: "Cet article ne peut pas être supprimé (article statique)" },
        { status: 400 }
      );
    }

    await deleteContentArticle(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression article:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
