/**
 * Parse HTML pour affichage React.
 * Le contenu provient de données statiques (homeData, blogData).
 * Si du contenu utilisateur est ajouté plus tard, envisager DOMPurify pour la sanitization XSS.
 * En Edge/SSR sans DOM (ex. Cloudflare), on utilise dangerouslySetInnerHTML au lieu de html-react-parser.
 */
import parse from "html-react-parser";
import React from "react";

function canUseHtmlParser() {
  if (typeof document === "undefined") return false;
  try {
    return typeof document.implementation?.createHTMLDocument === "function";
  } catch {
    return false;
  }
}

/**
 * Parse du HTML en éléments React
 * @param {string} html - Contenu HTML à parser
 * @returns {import('react').ReactElement|string} Éléments React ou chaîne vide
 */
export function safeParse(html) {
  if (typeof html !== "string" || !html.trim()) {
    return "";
  }
  if (canUseHtmlParser()) {
    return parse(html);
  }
  return React.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
}
