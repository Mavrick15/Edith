import { NextResponse } from "next/server";
import { validateAppointment } from "@/lib/validation";

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateAppointment(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400 }
      );
    }

    const data = validation.data;

    // TODO: Brancher sur votre backend (agenda, base de données, etc.)
    // Exemples : Google Calendar API, Calendly, ou système de RDV maison

    return NextResponse.json({
      success: true,
      message:
        "Votre demande de rendez-vous a bien été enregistrée. Notre équipe vous contactera pour confirmation.",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API appointment:", error);
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
