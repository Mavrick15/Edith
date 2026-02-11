import { NextResponse } from "next/server";
import { validateAppointment } from "@/lib/validation";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";
import { insertAppointmentRequest } from "@/lib/supabaseContactAppointment";
import { notifyAdminAppointment } from "@/lib/sendAdminNotification";

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

    const result = await insertAppointmentRequest({
      name: data.name,
      phone: data.phone,
      medicalFileNumber: data.medicalFileNumber,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      reasonForVisit: data.reasonForVisit,
      department: data.department,
    });
    if (!result.ok) {
      try {
        if (process.env.NODE_ENV === "development") {
          console.error("Erreur Supabase appointment:", result.error);
        }
      } catch (e) {}
      return NextResponse.json(
        { error: "Impossible d'enregistrer votre demande. Veuillez réessayer." },
        { status: 503, headers: corsHeaders }
      );
    }

    const emailResult = await notifyAdminAppointment({
      name: data.name,
      phone: data.phone,
      medicalFileNumber: data.medicalFileNumber,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      reasonForVisit: data.reasonForVisit,
      department: data.department,
    });
    if (!emailResult.ok) {
      try {
        if (process.env.NODE_ENV === "development") {
          console.error("Erreur envoi email admin (rendez-vous):", emailResult.error);
        }
      } catch (e) {}
    }

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
    // Compatible Cloudflare Edge Runtime
    try {
      const env = typeof process !== "undefined" && process.env ? process.env.NODE_ENV : "production";
      if (env === "development") {
        console.error("Erreur API appointment:", error);
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
