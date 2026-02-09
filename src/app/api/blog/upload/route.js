import { NextResponse } from "next/server";

export const runtime = "edge";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Aucune image fournie" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format non autorisé (jpg, png, webp, gif uniquement)" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image trop volumineuse (max 5 Mo)" }, { status: 400 });
    }

    // Sur Cloudflare Pages (Edge), l'écriture fichier n'est pas disponible.
    // Utilisez une URL d'image existante ou un service externe (Cloudinary, R2, etc.).
    return NextResponse.json(
      {
        error: "Upload non disponible sur Cloudflare Pages. Utilisez une image existante (post_1.jpeg, post_2.jpeg, post_3.jpeg) ou un service externe.",
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("Erreur upload:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
