import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";

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

    // TODO: Brancher sur votre backend (envoi email, base de données, etc.)
    // Exemples : Resend, SendGrid, nodemailer, ou API REST externe

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
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API contact:", error);
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500, headers: corsHeaders }
    );
  }
}
