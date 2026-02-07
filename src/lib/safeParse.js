/**
 * Parse HTML pour affichage React.
 * Le contenu provient de données statiques (homeData, blogData).
 * Si du contenu utilisateur est ajouté plus tard, envisager DOMPurify pour la sanitization XSS.
 */
import parse from "html-react-parser";

/**
 * Parse du HTML en éléments React
 * @param {string} html - Contenu HTML à parser
 * @returns {import('react').ReactElement|string} Éléments React ou chaîne vide
 */
export function safeParse(html) {
  if (typeof html !== "string" || !html.trim()) {
    return "";
  }
  return parse(html);
}
