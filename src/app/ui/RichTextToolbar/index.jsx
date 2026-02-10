"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { wrapWithFormat } from "@/lib/inlineFormatParser";

const FONTS = [
  { value: "", label: "Police" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Verdana, sans-serif", label: "Verdana" },
];

export default function RichTextToolbar({ textareaRef, value, onChange }) {
  const fontSelectRef = useRef(null);

  function applyFormat(format, fontName = "") {
    const ta = textareaRef?.current;
    if (!ta || typeof onChange !== "function") return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);

    if (!selected && format !== "font") return;

    const before = value.slice(0, start);
    const after = value.slice(end);
    let wrapped, newCursor;
    if (format === "font" && !selected) {
      const font = fontName || "Arial, sans-serif";
      wrapped = `[font:${font}][/font]`;
      newCursor = start + `[font:${font}]`.length; // curseur entre les balises
    } else {
      wrapped = wrapWithFormat(format, selected || " ", fontName);
      newCursor = start + wrapped.length;
    }
    const newText = before + wrapped + after;

    onChange(newText);

    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(newCursor, newCursor);
    });
  }

  function handleFontChange(e) {
    const font = e.target.value;
    if (!font) return;
    applyFormat("font", font);
    e.target.value = "";
  }

  return (
    <div className="rich-text-toolbar" role="toolbar" aria-label="Formatage du texte">
      <button
        type="button"
        className="rich-text-toolbar_btn"
        onClick={() => applyFormat("bold")}
        title="Gras"
        aria-label="Mettre en gras"
      >
        <Icon icon="mdi:format-bold" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rich-text-toolbar_btn"
        onClick={() => applyFormat("italic")}
        title="Italique"
        aria-label="Mettre en italique"
      >
        <Icon icon="mdi:format-italic" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rich-text-toolbar_btn"
        onClick={() => applyFormat("underline")}
        title="Souligné"
        aria-label="Souligner"
      >
        <Icon icon="mdi:format-underline" aria-hidden="true" />
      </button>
      <span className="rich-text-toolbar_sep" aria-hidden="true" />
      <select
        ref={fontSelectRef}
        className="rich-text-toolbar_select"
        title="Police"
        aria-label="Changer la police"
        onChange={handleFontChange}
        defaultValue=""
      >
        {FONTS.map((f) => (
          <option key={f.value || "default"} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
