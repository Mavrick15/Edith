/**
 * Validation côté client pour les formulaires
 * Fournit des fonctions de validation réutilisables
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{8,20}$/;

/**
 * Valide un email
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'L\'email est requis' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Format d\'email invalide' };
  }
  return { valid: true };
}

/**
 * Valide un nom
 */
export function validateName(name) {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Le nom est requis' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Le nom doit contenir au moins 2 caractères' };
  }
  return { valid: true };
}

/**
 * Valide un numéro de téléphone
 */
export function validatePhone(phone) {
  if (!phone || phone.trim() === '') {
    return { valid: false, error: 'Le numéro de téléphone est requis' };
  }
  const cleaned = phone.replace(/\s/g, '');
  if (!PHONE_REGEX.test(cleaned)) {
    return { valid: false, error: 'Format de numéro de téléphone invalide' };
  }
  return { valid: true };
}

/**
 * Valide un message
 */
export function validateMessage(message) {
  if (!message || message.trim() === '') {
    return { valid: false, error: 'Le message est requis' };
  }
  if (message.trim().length < 10) {
    return { valid: false, error: 'Le message doit contenir au moins 10 caractères' };
  }
  if (message.length > 2000) {
    return { valid: false, error: 'Le message ne doit pas dépasser 2000 caractères' };
  }
  return { valid: true };
}

/**
 * Valide une date
 */
export function validateDate(date) {
  if (!date) {
    return { valid: false, error: 'La date est requise' };
  }
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { valid: false, error: 'La date ne peut pas être dans le passé' };
  }
  return { valid: true };
}
