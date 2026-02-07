/**
 * Utilitaires de validation et sanitization pour les formulaires
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{8,20}$/;
const MAX_STRING_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Sanitize une chaîne : trim, limite la longueur, supprime les caractères dangereux pour XSS
 */
function sanitizeString(str, maxLength = MAX_STRING_LENGTH) {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, "");
}

/**
 * Schéma de validation pour le formulaire de contact
 */
export function validateContact(body) {
  const errors = [];
  const { name, email, subject, message } = body;

  const sanitizedName = sanitizeString(name);
  if (!sanitizedName) {
    errors.push("Le nom est requis");
  } else if (sanitizedName.length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }

  const sanitizedEmail = sanitizeString(email);
  if (!sanitizedEmail) {
    errors.push("L'email est requis");
  } else if (!EMAIL_REGEX.test(sanitizedEmail)) {
    errors.push("Format d'email invalide");
  }

  const sanitizedSubject = sanitizeString(subject || "Contact");
  const sanitizedMessage = sanitizeString(message, MAX_MESSAGE_LENGTH);
  if (!sanitizedMessage) {
    errors.push("Le message est requis");
  } else if (sanitizedMessage.length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    },
  };
}

/**
 * Schéma de validation pour le formulaire de rendez-vous
 */
export function validateAppointment(body) {
  const errors = [];
  const {
    name,
    phone,
    medicalFileNumber,
    preferredDate,
    preferredTime,
    reasonForVisit,
    department,
  } = body;

  const sanitizedName = sanitizeString(name);
  if (sanitizedName && sanitizedName.length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }

  const sanitizedPhone = sanitizeString(phone, 30);
  if (!sanitizedPhone) {
    errors.push("Le numéro de téléphone est requis");
  } else if (!PHONE_REGEX.test(sanitizedPhone.replace(/\s/g, ""))) {
    errors.push("Format de numéro de téléphone invalide");
  }

  const sanitizedMedicalFile = sanitizeString(medicalFileNumber, 50);
  const sanitizedPreferredDate = sanitizeString(preferredDate, 10);
  const sanitizedPreferredTime = sanitizeString(preferredTime, 10);
  const sanitizedReasonForVisit = sanitizeString(reasonForVisit, 100);
  const sanitizedDepartment = sanitizeString(department, 100);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: sanitizedName || null,
      phone: sanitizedPhone,
      medicalFileNumber: sanitizedMedicalFile || null,
      preferredDate: sanitizedPreferredDate || null,
      preferredTime: sanitizedPreferredTime || null,
      reasonForVisit: sanitizedReasonForVisit || null,
      department: sanitizedDepartment || null,
    },
  };
}
