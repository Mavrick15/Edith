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

    // Sur Cloudflare (Edge), pas d'écriture fichier : utiliser images par défaut ou R2 plus tard
    return NextResponse.json(
      { error: "Upload non disponible sur Cloudflare. Utilisez les images par défaut (post_1.jpeg, post_2.jpeg, post_3.jpeg)." },
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
