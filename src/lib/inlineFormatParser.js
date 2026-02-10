/**
 * Parse un paragraphe avec formatage inline (**gras**, *italique*, __souligné__, [font:Nom]...[/font])
 * et retourne un tableau de segments pour le rendu React.
 * @param {string} text
 * @returns {Array<{ type: 'text'|'bold'|'italic'|'underline'|'font', content: string, font?: string }>}
 */
export function parseInlineFormats(text) {
  if (!text || typeof text !== "string") return [{ type: "text", content: text || "" }];

  const segments = [];
  let i = 0;

  while (i < text.length) {
    // ** gras
    if (text.slice(i, i + 2) === "**") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        segments.push({
          type: "bold",
          content: text.slice(i + 2, end),
        });
        i = end + 2;
        continue;
      }
    }

    // * italique (un seul *, pas **)
    if (
      text[i] === "*" &&
      text[i + 1] !== "*" &&
      (i === 0 || text[i - 1] !== "*")
    ) {
      const end = text.indexOf("*", i + 1);
      if (end !== -1 && text[end + 1] !== "*") {
        segments.push({
          type: "italic",
          content: text.slice(i + 1, end),
        });
        i = end + 1;
        continue;
      }
    }

    // __ souligné
    if (text.slice(i, i + 2) === "__") {
      const end = text.indexOf("__", i + 2);
      if (end !== -1) {
        segments.push({
          type: "underline",
          content: text.slice(i + 2, end),
        });
        i = end + 2;
        continue;
      }
    }

    // [font:Nom]...[/font]
    const fontOpen = text.slice(i).match(/^\[font:([^\]]+)\]/);
    if (fontOpen) {
      const start = i + fontOpen[0].length;
      const end = text.indexOf("[/font]", start);
      if (end !== -1) {
        segments.push({
          type: "font",
          content: text.slice(start, end),
          font: fontOpen[1].trim(),
        });
        i = end + 7; // length of "[/font]"
        continue;
      }
    }

    // Texte brut jusqu'au prochain délimiteur
    const next = findNextDelimiter(text, i);
    const plainEnd = next === -1 ? text.length : next;
    if (plainEnd > i) {
      segments.push({ type: "text", content: text.slice(i, plainEnd) });
      i = plainEnd;
    } else {
      segments.push({ type: "text", content: text[i] || "" });
      i += 1;
    }
  }

  return segments.length ? segments : [{ type: "text", content: text }];
}

function findNextDelimiter(text, from) {
  const markers = ["**", "*", "__", "[font:"];
  let min = -1;
  for (const m of markers) {
    const pos = text.indexOf(m, from);
    if (pos !== -1 && (min === -1 || pos < min)) {
      if (m === "*" && (text[pos + 1] === "*" || (pos > 0 && text[pos - 1] === "*")))
        continue;
      min = pos;
    }
  }
  const fontClose = text.indexOf("[/font]", from);
  if (fontClose !== -1 && (min === -1 || fontClose < min)) min = fontClose;
  return min;
}

/**
 * Enveloppe le texte sélectionné avec les marqueurs de formatage.
 * @param {'bold'|'italic'|'underline'|'font'} format
 * @param {string} selectedText
 * @param {string} fontName - pour format === 'font'
 */
export function wrapWithFormat(format, selectedText, fontName = "") {
  switch (format) {
    case "bold":
      return `**${selectedText}**`;
    case "italic":
      return `*${selectedText}*`;
    case "underline":
      return `__${selectedText}__`;
    case "font":
      return `[font:${fontName || "Arial"}]${selectedText}[/font]`;
    default:
      return selectedText;
  }
}
