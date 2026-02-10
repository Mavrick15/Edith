import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const BUCKET = "blog";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

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

    const supabase = getSupabase();
    if (supabase) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const name = `uploads/blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const buf = await file.arrayBuffer();
      const { data, error } = await supabase.storage.from(BUCKET).upload(name, buf, {
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        console.error("Supabase upload:", error);
        return NextResponse.json({ error: error.message || "Erreur upload" }, { status: 500 });
      }
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
      return NextResponse.json({ url: urlData.publicUrl });
    }

    return NextResponse.json(
      { error: "Upload désactivé. Configurez Supabase (Storage bucket « blog ») ou utilisez les images par défaut." },
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
