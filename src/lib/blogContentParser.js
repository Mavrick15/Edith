/**
 * Convertit un texte simple en sections structurées pour le blog.
 * Format :
 * - ## Titre → sous-titre (h2)
 * - > Citation → bloc citation (blockquote)
 * - Le reste → paragraphes (p), séparés par une ligne vide
 */
export function parseContentToSections(text) {
  if (!text?.trim()) return [];

  const lines = text.split("\n");
  const sections = [];
  let currentParagraph = [];

  function flushParagraph() {
    const text = currentParagraph.join(" ").trim();
    if (text) sections.push({ type: "p", text });
    currentParagraph = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      sections.push({ type: "h2", text: trimmed.slice(3).trim() });
    } else if (trimmed.startsWith("> ")) {
      flushParagraph();
      sections.push({ type: "blockquote", text: trimmed.slice(2).trim() });
    } else if (trimmed === "") {
      flushParagraph();
    } else {
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  return sections;
}

/**
 * Convertit les sections en texte simple pour l'édition.
 */
export function sectionsToContent(sections) {
  if (!sections?.length) return "";

  return sections
    .map((s) => {
      if (s.type === "h2") return `## ${s.text}`;
      if (s.type === "blockquote") return `> ${s.text}`;
      return s.text;
    })
    .join("\n\n");
}
