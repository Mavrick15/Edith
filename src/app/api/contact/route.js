import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateContact(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // TODO: Brancher sur votre backend (envoi email, base de données, etc.)
    // Exemples : Resend, SendGrid, nodemailer, ou API REST externe

    return NextResponse.json({
      success: true,
      message:
        "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API contact:", error);
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
