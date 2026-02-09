import { NextResponse } from "next/server";
import { blogArticles, blogList } from "@/lib/blogData";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const THUMB_OPTIONS = ["/images/blog/post_1.jpeg", "/images/blog/post_2.jpeg", "/images/blog/post_3.jpeg"];

async function loadContentArticles() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const articles = {};
    const list = [];

    for (const file of jsonFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      const article = JSON.parse(content);
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
  } catch {
    return { articles: {}, list: [] };
  }
}

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
    const { title, thumbUrl, date, author, sections } = body;

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

    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const filePath = path.join(CONTENT_DIR, `${articleSlug}.json`);
    await fs.writeFile(filePath, JSON.stringify(article, null, 2), "utf-8");

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
