/**
 * Envoi d'un email à l'administrateur (contact@cmedith.com) via Resend.
 * Utilisé après un message contact ou une demande de rendez-vous.
 * Compatible Edge (fetch uniquement).
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@cmedith.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Centre Médical Edith <onboarding@resend.dev>";

function escapeHtml(str) {
  if (str == null || str === "") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Envoie un email via l'API Resend.
 * @param {{ to: string, subject: string, html: string }} payload
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
async function sendEmail(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY non configuré" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err || res.statusText };
  }
  return { ok: true };
}

/**
 * Notifie l'admin d'un nouveau message de contact.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
export async function notifyAdminContact(data) {
  const html = `
    <h2>Nouveau message depuis le formulaire de contact</h2>
    <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Sujet :</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><em>Centre Médical Edith – site web</em></p>
  `;
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Contact] ${escapeHtml(data.subject)} – ${escapeHtml(data.name)}`,
    html,
  });
}

const REASON_LABELS = {
  routineCheckup: "Bilan de routine",
  newPatientVisit: "Première consultation",
  specificConcern: "Problème spécifique",
};

/**
 * Notifie l'admin d'une nouvelle demande de rendez-vous.
 * @param {{ name: string, phone: string, medicalFileNumber?: string, preferredDate?: string, preferredTime?: string, reasonForVisit?: string, department?: string }} data
 */
export async function notifyAdminAppointment(data) {
  const reasonLabel = REASON_LABELS[data.reasonForVisit] || data.reasonForVisit || "—";
  const html = `
    <h2>Nouvelle demande de rendez-vous</h2>
    <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Dossier médical :</strong> ${escapeHtml(data.medicalFileNumber || "—")}</p>
    <p><strong>Date préférée :</strong> ${escapeHtml(data.preferredDate || "—")}</p>
    <p><strong>Heure préférée :</strong> ${escapeHtml(data.preferredTime || "—")}</p>
    <p><strong>Motif :</strong> ${escapeHtml(reasonLabel)}</p>
    <p><strong>Service :</strong> ${escapeHtml(data.department || "—")}</p>
    <hr>
    <p><em>Centre Médical Edith – site web</em></p>
  `;
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Rendez-vous] Demande de ${escapeHtml(data.name)} – ${escapeHtml(data.preferredDate || "sans date")}`,
    html,
  });
}
