/**
 * Enregistrement des messages contact et des demandes de rendez-vous dans Supabase.
 * Utilise les mêmes variables d'environnement que le blog.
 */
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Insère un message de contact.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function insertContactMessage(data) {
  const supabase = getSupabase();
  if (!supabase) return { ok: true }; // pas d'erreur : succès sans enregistrement

  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Insère une demande de rendez-vous.
 * @param {{ name: string, email: string, phone: string, medicalFileNumber?: string, preferredDate?: string, preferredTime?: string, reasonForVisit?: string, department?: string }} data
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function insertAppointmentRequest(data) {
  const supabase = getSupabase();
  if (!supabase) return { ok: true }; // pas d'erreur : succès sans enregistrement

  const { error } = await supabase.from("appointments").insert({
    name: data.name,
    email: data.email || null,
    phone: data.phone,
    medical_file_number: data.medicalFileNumber || null,
    preferred_date: data.preferredDate || null,
    preferred_time: data.preferredTime || null,
    reason_for_visit: data.reasonForVisit || null,
    department: data.department || null,
    status: "pending",
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
