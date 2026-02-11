import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";
import { insertContactMessage } from "@/lib/supabaseContactAppointment";
import { notifyAdminContact } from "@/lib/sendAdminNotification";

export const runtime = "edge";

// Headers CORS pour sécurité
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer plus tard." },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const validation = validateContact(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, subject, message } = validation.data;

    const result = await insertContactMessage({ name, email, subject, message });
    if (!result.ok) {
      try {
        if (process.env.NODE_ENV === "development") {
          console.error("Erreur Supabase contact:", result.error);
        }
      } catch (e) {}
      return NextResponse.json(
        { error: "Impossible d'enregistrer votre message. Veuillez réessayer." },
        { status: 503, headers: corsHeaders }
      );
    }

    try {
      const emailResult = await notifyAdminContact({ name, email, subject, message });
      if (!emailResult.ok && process.env.NODE_ENV === "development") {
        console.error("Erreur envoi email admin (contact):", emailResult.error);
      }
    } catch (emailErr) {
      if (process.env.NODE_ENV === "development") {
        console.error("Envoi email admin contact (timeout/réseau):", emailErr?.cause?.message || emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    // Ne pas exposer les détails d'erreur en production
    // Compatible Cloudflare Edge Runtime
    try {
      const env = typeof process !== "undefined" && process.env ? process.env.NODE_ENV : "production";
      if (env === "development") {
        console.error("Erreur API contact:", error);
      }
    } catch (e) {
      // Ignorer si process.env n'est pas disponible (edge runtime)
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500, headers: corsHeaders }
    );
  }
}
