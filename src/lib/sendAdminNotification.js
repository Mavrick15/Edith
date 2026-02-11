/**
 * Envoi d'emails professionnels via Resend.
 * - Contact : un seul email à l'hôpital (contact@cmedith.com).
 * - Rendez-vous : email à l'hôpital + accusé de réception à l'utilisateur.
 * Compatible Edge (fetch uniquement).
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@cmedith.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Centre Médical Edith <onboarding@resend.dev>";
const BRAND_COLOR = "#274760";
const BORDER_COLOR = "#e0e6ec";

function escapeHtml(str) {
  if (str == null || str === "") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Enveloppe le contenu dans un template email professionnel.
 */
function emailWrapper(content, title) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; font-size: 15px; line-height: 1.5; color: #333;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0f4f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid ${BORDER_COLOR}; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND_COLOR} 0%, #1e3a4d 100%); color: #ffffff; padding: 24px 28px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.02em;">Centre Médical Edith</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.95;">Kinshasa – Santé &amp; bien-être</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px; background-color: #f8fafc; border-top: 1px solid ${BORDER_COLOR}; font-size: 12px; color: #64748b; text-align: center;">
              Cet email a été envoyé depuis le site <strong>Centre Médical Edith</strong>. Ne pas répondre directement à ce message si indiqué.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label, value) {
  const v = value != null && value !== "" ? escapeHtml(String(value)) : "—";
  return `
  <tr>
    <td style="padding: 10px 0 8px 0; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR}; width: 180px;">${escapeHtml(label)}</td>
    <td style="padding: 10px 0 8px 0; border-bottom: 1px solid ${BORDER_COLOR}; color: #334155;">${v}</td>
  </tr>`;
}

function rowRecap(label, value) {
  const v = value != null && value !== "" ? escapeHtml(String(value)) : "—";
  return `
  <tr>
    <td style="padding: 12px 18px 4px 18px; font-weight: 600; color: ${BRAND_COLOR}; width: 140px; vertical-align: top;">${escapeHtml(label)}</td>
    <td style="padding: 12px 18px 12px 0; color: #334155; vertical-align: top;">${v}</td>
  </tr>`;
}

/**
 * Envoie un email via l'API Resend.
 */
async function sendEmail(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY non configuré" };

  const body = {
    from: FROM_EMAIL,
    to: Array.isArray(payload.to) ? payload.to : [payload.to],
    subject: payload.subject,
    html: payload.html,
  };
  if (payload.replyTo) body.reply_to = payload.replyTo;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err || res.statusText };
  }
  return { ok: true };
}

/**
 * Contact : envoi uniquement à l'hôpital (pas d'accusé de réception à l'utilisateur).
 */
export async function notifyAdminContact(data) {
  const content = `
    <h2 style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLOR}; font-weight: 600;">Nouveau message – Formulaire de contact</h2>
    <p style="margin: 0 0 16px 0; color: #64748b;">Un visiteur a envoyé un message depuis le site.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 8px;">
      ${row("Nom", data.name)}
      ${row("Email", data.email)}
      ${row("Sujet", data.subject)}
      <tr>
        <td colspan="2" style="padding: 12px 0 8px 0; border-bottom: 1px solid ${BORDER_COLOR}; font-weight: 600; color: ${BRAND_COLOR};">Message</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 10px 0 0 0; color: #334155; white-space: pre-wrap;">${escapeHtml(data.message).replace(/\n/g, "<br>")}</td>
      </tr>
    </table>
    <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748b;">Vous pouvez répondre directement à cet email pour contacter ${escapeHtml(data.name)}.</p>
  `;
  return sendEmail({
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `[Contact] ${escapeHtml(data.subject)} – ${escapeHtml(data.name)}`,
    html: emailWrapper(content, "Nouveau message de contact"),
  });
}

const REASON_LABELS = {
  routineCheckup: "Bilan de routine",
  newPatientVisit: "Première consultation",
  specificConcern: "Problème spécifique",
};

/**
 * Rendez-vous : envoi à l'hôpital avec les détails de la demande.
 */
export async function notifyAdminAppointment(data) {
  const reasonLabel = REASON_LABELS[data.reasonForVisit] || data.reasonForVisit || "—";
  const content = `
    <h2 style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLOR}; font-weight: 600;">Nouvelle demande de rendez-vous</h2>
    <p style="margin: 0 0 16px 0; color: #64748b;">Une demande a été soumise depuis le site. Contacter le patient pour confirmer le créneau.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 8px;">
      ${row("Nom", data.name)}
      ${row("Email", data.email)}
      ${row("Téléphone", data.phone)}
      ${row("Dossier médical", data.medicalFileNumber)}
      ${row("Date préférée", data.preferredDate)}
      ${row("Heure préférée", data.preferredTime)}
      ${row("Motif", reasonLabel)}
      ${row("Service", data.department)}
    </table>
  `;
  return sendEmail({
    to: ADMIN_EMAIL,
    replyTo: data.email || undefined,
    subject: `[Rendez-vous] ${escapeHtml(data.name)} – ${escapeHtml(data.preferredDate || "sans date")}`,
    html: emailWrapper(content, "Demande de rendez-vous"),
  });
}

/**
 * Rendez-vous : accusé de réception envoyé à l'utilisateur pour confirmer sa demande.
 */
export async function notifyUserAppointment(userEmail, data) {
  const reasonLabel = REASON_LABELS[data.reasonForVisit] || data.reasonForVisit || "—";
  const content = `
    <h2 style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLOR}; font-weight: 600;">Demande de rendez-vous reçue</h2>
    <p style="margin: 0 0 16px 0;">Bonjour <strong>${escapeHtml(data.name)}</strong>,</p>
    <p style="margin: 0 0 16px 0;">Nous avons bien reçu votre demande de rendez-vous. Notre équipe vous contactera par téléphone ou par email pour confirmer la date et l'heure.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 16px 0; background-color: #f8fafc; border-radius: 8px; border: 1px solid ${BORDER_COLOR};">
      <tr><td colspan="2" style="padding: 14px 18px 8px 18px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">Récapitulatif de votre demande</td></tr>
      ${rowRecap("Date préférée", data.preferredDate)}
      ${rowRecap("Heure préférée", data.preferredTime)}
      ${rowRecap("Motif", reasonLabel)}
      ${rowRecap("Service", data.department)}
    </table>
    <p style="margin: 20px 0 0 0; font-size: 14px; color: #334155;">Pour toute question, vous pouvez nous contacter à <a href="mailto:${escapeHtml(ADMIN_EMAIL)}" style="color: ${BRAND_COLOR}; text-decoration: none;">${escapeHtml(ADMIN_EMAIL)}</a> ou par téléphone.</p>
    <p style="margin: 24px 0 0 0;">Cordialement,<br><strong>L'équipe du Centre Médical Edith</strong></p>
  `;
  return sendEmail({
    to: userEmail,
    subject: `Centre Médical Edith – Accusé de réception de votre demande de rendez-vous`,
    html: emailWrapper(content, "Accusé de réception – Rendez-vous"),
  });
}
