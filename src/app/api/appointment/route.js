import { NextResponse } from "next/server";
import { validateAppointment } from "@/lib/validation";
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
    const validation = validateAppointment(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400, headers: corsHeaders }
      );
    }

    const data = validation.data;

    // TODO: Brancher sur votre backend (agenda, base de données, etc.)
    // Exemples : Google Calendar API, Calendly, ou système de RDV maison

    return NextResponse.json(
      {
        success: true,
        message:
          "Votre demande de rendez-vous a bien été enregistrée. Notre équipe vous contactera pour confirmation.",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    // Ne pas exposer les détails d'erreur en production
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API appointment:", error);
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500, headers: corsHeaders }
    );
  }
}
