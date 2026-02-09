import { NextResponse } from "next/server";
import { blogArticles } from "@/lib/blogData";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

async function loadContentArticle(slug) {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  const slug = params?.slug;
  if (!slug) return NextResponse.json({ error: "Slug requis" }, { status: 400 });
  const contentArticle = await loadContentArticle(slug);
  const staticArticle = blogArticles[slug];
  const article = contentArticle || staticArticle;
  if (!article) return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  return NextResponse.json(article);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PUT(request, { params }) {
  try {
    const currentSlug = params?.slug;
    const body = await request.json();
    const { slug, title, thumbUrl, date, author, sections } = body;

    if (!title || !sections?.length) {
      return NextResponse.json(
        { error: "Titre et contenu requis" },
        { status: 400 }
      );
    }

    const articleSlug = slug || slugify(title) || currentSlug;
    const existing = await loadContentArticle(currentSlug);
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

    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const filePath = path.join(CONTENT_DIR, `${articleSlug}.json`);
    await fs.writeFile(filePath, JSON.stringify(article, null, 2), "utf-8");

    if (currentSlug && currentSlug !== articleSlug) {
      try {
        await fs.unlink(path.join(CONTENT_DIR, `${currentSlug}.json`));
      } catch {}
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
    const slug = params?.slug;
    if (!slug) return NextResponse.json({ error: "Slug requis" }, { status: 400 });

    const contentArticle = await loadContentArticle(slug);
    if (!contentArticle) {
      return NextResponse.json(
        { error: "Cet article ne peut pas être supprimé (article statique)" },
        { status: 400 }
      );
    }

    const filePath = path.join(CONTENT_DIR, `${slug}.json`);
    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "ENOENT") {
      return NextResponse.json(
        { error: "Article non trouvé ou déjà supprimé" },
        { status: 404 }
      );
    }
    console.error("Erreur suppression article:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
